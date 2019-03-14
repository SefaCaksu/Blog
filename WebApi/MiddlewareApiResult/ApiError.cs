using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace WebApi.MiddlewareApiResult{
    public class ApiError  
    {  
        public string Message { get; set; }  
        public string Details { get; set; }  
        public string ReferenceErrorCode { get; set; }  
        public string ReferenceDocumentLink { get; set; }  
        public IEnumerable<ValidationError> ValidationErrors { get; set; }  
  
        public ApiError(string message)  
        {  
            this.Message = message;  
        }  
  
        public ApiError(ModelStateDictionary modelState)  
        {  
            if (modelState != null && modelState.Any(m => m.Value.Errors.Count > 0))  
            {  
                this.Message = "Lütfen doğrulama alanlarını düzeltip. Tekrar deneyin.";  
                this.ValidationErrors = modelState.Keys  
                .SelectMany(key => modelState[key].Errors.Select(x => new ValidationError(key, x.ErrorMessage)))  
                .ToList();  
            }  
        }  
    }  
}