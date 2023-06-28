namespace RobWorldeMVC.Models
{
    public class Categories
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Prompts> Prompts { get; set; } = new();
    }
}
