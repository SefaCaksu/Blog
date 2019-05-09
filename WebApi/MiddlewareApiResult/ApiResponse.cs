using System.Runtime.Serialization;

namespace WebApi.MiddlewareApiResult
{
    [DataContract]
    public class APIResponse
    {
        [DataMember]
        public bool IsSuccess { get; set; }

        [DataMember]
        public int StatusCode { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public ApiError Error { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public object Result { get; set; }

        public APIResponse(bool isSuccess, int statusCode, object result = null, ApiError apiError = null)
        {
            this.IsSuccess = isSuccess;
            this.StatusCode = statusCode;
            this.Result = result;
            this.Error = apiError;
        }
    }
}