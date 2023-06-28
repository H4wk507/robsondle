namespace RobWorldeMVC.Models
{
    public class Prompts
    {
        public int Id { get; set; }
        public string Prompt { get; set; }
        public List<Categories> Categories { get; set; } = new();
    }
}
