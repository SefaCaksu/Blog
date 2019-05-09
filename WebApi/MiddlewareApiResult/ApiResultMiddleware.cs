using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Dynamic;
using System.Globalization;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace WebApi.MiddlewareApiResult
{
    public class ApiResultMiddleware
    {
        private readonly RequestDelegate _next;

        public ApiResultMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            if (context.Request.Path.StartsWithSegments("/swagger"))
            {
                await this._next(context);
            }
            else
            {
                var originalBodyStream = context.Response.Body;

                using (var responseBody = new MemoryStream())
                {
                    context.Response.Body = responseBody;

                    try
                    {
                        await _next.Invoke(context);

                        if (context.Response.StatusCode == (int)HttpStatusCode.OK)
                        {
                            var body = await FormatResponse(context.Response);
                            await SuccessRequest(context, body, context.Response.StatusCode);
                        }
                        else
                        {
                            await NotSuccessRequest(context, context.Response.StatusCode);
                        }
                    }
                    catch (System.Exception ex)
                    {
                        await ExceptionRequest(context, ex);
                    }
                    finally
                    {
                        responseBody.Seek(0, SeekOrigin.Begin);

                        await responseBody.CopyToAsync(originalBodyStream);
                    }
                }
            }
        }

        private static Task ExceptionRequest(HttpContext context, Exception exception)
        {
            ApiError apiError = null;
            APIResponse apiResponse = null;
            int statusCode = 0;

            if (exception is ApiException)
            {
                var ex = exception as ApiException;
                apiError = new ApiError(ex.Message);
                apiError.ValidationErrors = ex.Errors;
                apiError.ReferenceErrorCode = ex.ReferenceErrorCode;
                apiError.ReferenceDocumentLink = ex.ReferenceDocumentLink;
                statusCode = ex.StatusCode;
                context.Response.StatusCode = statusCode;
            }
            else if (exception is UnauthorizedAccessException)
            {
                apiError = new ApiError("Oturum izni yok.");
                statusCode = (int)HttpStatusCode.Unauthorized;
                context.Response.StatusCode = statusCode;
            }
            else
            {
#if !DEBUG
                var msg = "İstenmeyen hata oluştu.;  
                string stack = null;  
#else
                var msg = exception.GetBaseException().Message;
                string stack = exception.StackTrace;
#endif

                apiError = new ApiError(msg);
                apiError.Details = stack;
                statusCode = (int)HttpStatusCode.InternalServerError;
                context.Response.StatusCode = statusCode;
            }

            context.Response.ContentType = "application/json";

            apiResponse = new APIResponse(false, statusCode, null, apiError);

            var json = JsonConvert.SerializeObject(apiResponse);
            return context.Response.WriteAsync(json);
        }

        private static Task NotSuccessRequest(HttpContext context, int statusCode)
        {
            context.Response.ContentType = "application/json";
            ApiError apiError = null;
            APIResponse apiResponse = null;

            if (statusCode == (int)HttpStatusCode.NotFound)
            {
                apiError = new ApiError("Belirtilen URI mevcut değil.");
            }
            else if (statusCode == (int)HttpStatusCode.NotFound)
            {
                apiError = new ApiError("Belirtilen URI bir içerik taşımıyor.");
            }
            else
            {
                apiError = new ApiError("İstek eşleşmiyor. Lütfen yetkili ile iletişime geçin.");
            }

            apiResponse = new APIResponse(false, statusCode, null, apiError);
            context.Response.StatusCode = statusCode;
            var json = JsonConvert.SerializeObject(apiResponse);
            return context.Response.WriteAsync(json);
        }

        private static Task SuccessRequest(HttpContext context, object body, int statusCode)
        {
            context.Response.ContentType = "application/json";
            string json = String.Empty;
            string bodyText = String.Empty;
            APIResponse apiResponse = null;

            bool isJson = false;
            if ((body.ToString().Trim().StartsWith("{") && body.ToString().Trim().EndsWith("}")) || (body.ToString().Trim().StartsWith("[") && body.ToString().Trim().EndsWith("]")))
            {
                try
                {
                    isJson = true;
                }
                catch (JsonReaderException)
                {
                    isJson = false;
                }
                catch (Exception)
                {
                    isJson = false;
                }
            }
            else
            {
                isJson = false;
            }

            if (!isJson)
            {
                bodyText = JsonConvert.SerializeObject(body);
            }
            else
            {
                bodyText = body.ToString();
            }

            dynamic content = JsonConvert.DeserializeObject<dynamic>(bodyText);

            if (body.ToString().Trim().StartsWith("{") && body.ToString().Trim().EndsWith("}"))
            {
                dynamic expando = new ExpandoObject();
                var expandoDict = (IDictionary<string, object>)expando;

                foreach (dynamic j in content)
                {
                    if (expandoDict.ContainsKey(j.Name))
                        expandoDict[j.Name] = j.Value;
                    else
                        expandoDict.Add(j.Name, j.Value);
                }

                content = expando;
            }


            Type type = content?.GetType();

            if (type.Equals(typeof(Newtonsoft.Json.Linq.JObject)))
            {
                apiResponse = JsonConvert.DeserializeObject<APIResponse>(bodyText);
                if (apiResponse.StatusCode != statusCode)
                {
                    json = JsonConvert.SerializeObject(apiResponse);
                }
                else if (apiResponse.Result != null)
                {
                    json = JsonConvert.SerializeObject(apiResponse);
                }
                else
                {
                    apiResponse = new APIResponse(true, statusCode, content, null);
                    json = JsonConvert.SerializeObject(apiResponse);
                }
            }
            else
            {
                apiResponse = new APIResponse(true, statusCode, content, null);
                json = JsonConvert.SerializeObject(apiResponse);
            }

            return context.Response.WriteAsync(json);
        }

        private async Task<string> FormatResponse(HttpResponse response)
        {
            response.Body.Seek(0, SeekOrigin.Begin);
            var plainBodyText = await new StreamReader(response.Body).ReadToEndAsync();
            response.Body.Seek(0, SeekOrigin.Begin);

            return plainBodyText;
        }
    }
}