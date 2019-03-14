using Microsoft.AspNetCore.Builder;

namespace WebApi.MiddlewareApiResult
{
    public static class ApiResultMiddlewareExtension
    {
        public static IApplicationBuilder UseApiResultMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ApiResultMiddleware>();
        }
    }
}