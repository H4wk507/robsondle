using System.ComponentModel.DataAnnotations.Schema;

namespace RobWorldeMVC.Models
{
    public class Attempts
    {
        public int Id { get; set; }
        [ForeignKey("UserId")]
        public Users User { get; set; }
        [ForeignKey("PromptId")]
        public Prompts Prompt { get; set; }
        public string Attempt { get; set; }
    }
}
