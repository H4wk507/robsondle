using System.ComponentModel.DataAnnotations.Schema;

namespace RobWorldeMVC.Models
{
    public class Sessions
    {
        public int Id { get; set; }
        public DateTime ExpirationDate { get; set; }
        public Guid Token { get; set; }
        [ForeignKey("UserId")]
        public Users User { get; set; }
        [ForeignKey("CurrentPromptId")]
        public Prompts? CurrentPrompt { get; set; }
    }
}
