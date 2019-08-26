namespace Business
{
    public static class Helper
    {
        public static string LinkReplace(this string title)
        {
            title = title.Replace(" ", "-")
                        .Replace("(", "")
                        .Replace(")", "")
                        .Replace("#", "sharp");

            return title;
        }
    }
}