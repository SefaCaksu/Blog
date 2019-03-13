using System;
using System.ComponentModel;
using System.Globalization;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace WebApi.MidResponseResult
{
    public class ResponseResultMiddleware
    {
        private readonly RequestDelegate _next;

        public ResponseResultMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            using (var resBody = new MemoryStream())
            {
                context.Request.Body = resBody;

                try
                {
                    await _next.Invoke(context);
                }
                catch (Exception ex)
                {

                }
                finally
                {

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
                var msg = "An unhandled error occurred.";  
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
  
            apiResponse = new APIResponse(statusCode, MessageEnum.Exception.GetDescription(), null, apiError);  
  
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

            apiResponse = new APIResponse(statusCode, MessageEnum.Failure.GetDescription(), null, apiError);
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

            if (!body.ToString().IsJson())
            {
                bodyText = JsonConvert.SerializeObject(body);
            }
            else
            {
                bodyText = body.ToString();
            }

            dynamic content = JsonConvert.DeserializeObject<dynamic>(bodyText);
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
                    apiResponse = new APIResponse(statusCode, MessageEnum.Success.GetDescription(), content, null);
                    json = JsonConvert.SerializeObject(apiResponse);
                }
            }
            else
            {
                apiResponse = new APIResponse(statusCode, MessageEnum.Success.GetDescription(), content, null);
                json = JsonConvert.SerializeObject(apiResponse);
            }

            return context.Response.WriteAsync(json);
        }
    }

    public static class Helper
    {
        public static bool IsJson(this string text)
        {
            text = text.Trim();
            if ((text.StartsWith("{") && text.EndsWith("}")) ||
                (text.StartsWith("[") && text.EndsWith("]")))
            {
                try
                {
                    var obj = JToken.Parse(text);
                    return true;
                }
                catch (JsonReaderException jex)
                {
                    return false;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        public static string GetDescription<T>(this T e) where T : IConvertible
        {
            string description = null;

            if (e is Enum)
            {
                Type type = e.GetType();
                Array values = System.Enum.GetValues(type);

                foreach (int val in values)
                {
                    if (val == e.ToInt32(CultureInfo.InvariantCulture))
                    {
                        var memInfo = type.GetMember(type.GetEnumName(val));
                        var descriptionAttributes = memInfo[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
                        if (descriptionAttributes.Length > 0)
                        {
                            description = ((DescriptionAttribute)descriptionAttributes[0]).Description;
                        }

                        break;
                    }
                }
            }

            return description;
        }
    }
}