using System.ComponentModel;

namespace WebApi.MidResponseResult{
    public enum MessageEnum  
    {  
        [Description("İstek başarılı.")]  
        Success,  
        [Description("İstek hata ile dönüş yapıyor.")]  
        Exception,  
        [Description("İstek iptal edildi. [Oturum Kontrol]")]  
        UnAuthorized,  
        [Description("İstek doğrulanma hataları ile dönüş yapıyor.")]  
        ValidationError,  
        [Description("İstek işlenemiyor.")]  
        Failure  
    }  
}