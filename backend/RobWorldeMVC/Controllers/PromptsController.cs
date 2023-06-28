using backend.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RobWorldeMVC.DTO;
using RobWorldeMVC.Models;

namespace RobWorldeMVC.Controllers
{
    [ApiController]
    [Route("api/prompts")]
    public class PromptsController : Controller
    {
        private readonly ApplicationDbContext context;
        public PromptsController(ApplicationDbContext context)
        {
            this.context = context;
        }

        public Prompts getRandomPrompt()
        {
            return context.Prompts.OrderBy(r => EF.Functions.Random()).Take(1).First();
        }

        [HttpPost("add")]
        public async Task<ActionResult> Add(promptCreationDTO promptCreationDTO)
        {
            var categories = context.Categories.ToList().Where(category => ((IList<string>)promptCreationDTO.Categories).Contains(category.Name));

            var prompt = new Prompts
            {
                Prompt = promptCreationDTO.Data,
                Categories = categories.ToList(),
            };

            await context.AddAsync(prompt);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("random")]
        public async Task<ActionResult> GetRandom()
        {
            var prompt = getRandomPrompt();
            return Ok(prompt);
        }


        [HttpPost("addMany")]
        public async Task<ActionResult> AddMany(promptCreationMultipleDTO promptCreationMultipleDTO)
        {
            for (var i = 0; i < promptCreationMultipleDTO.Data.Length; i++)
            {
                if (promptCreationMultipleDTO.Data[i].Length == 5) {
                    var prompt = new Prompts
                    {
                        Prompt = promptCreationMultipleDTO.Data[i]
                    };
                    await context.AddAsync(prompt);
                }
            }
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("initialize")]
        public async Task<ActionResult> initialize()
        {
            context.Sessions.RemoveRange(context.Sessions.Where(token => token.ExpirationDate < DateTime.UtcNow.AddSeconds(30)));
            await context.SaveChangesAsync();

            var requestToken = new Guid(Request.Headers.Authorization.ToString());
            var session = await context.Sessions.Where(t => t.Token == requestToken).FirstOrDefaultAsync();
            if (session == null)
            {
                return NotFound();
            }

            session.CurrentPrompt = getRandomPrompt();
            context.Update(session);
            await context.SaveChangesAsync();

            return Ok(session.CurrentPrompt);
        }

        [HttpPost("addCategory")]
        public async Task<ActionResult> AddCategory(CategoryCreationDTO data) {

            var category = new Categories { Name = data.Data };
            context.Add(category);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("categories")]
        public async Task<ActionResult> Categories()
        {
            return Ok(context.Categories.ToList());
        }

        [HttpPost("test")]
        public async Task<ActionResult> test(PromptDataDTO promptDataDTO)
        {
            context.Sessions.RemoveRange(context.Sessions.Where(token => token.ExpirationDate < DateTime.UtcNow.AddSeconds(30)));
            await context.SaveChangesAsync();

            var requestToken = new Guid(Request.Headers.Authorization.ToString());
            var session = await context.Sessions.Include(s => s.CurrentPrompt).Include(s => s.User).Where(t => t.Token == requestToken).FirstOrDefaultAsync();
            
            if (session == null)
            {
                return NotFound("User");
            }

            if (session.CurrentPrompt == null)
            {
                return NotFound("Prompt");
            }

            var attempt = new Attempts
            {
                Attempt = promptDataDTO.tested,
                Prompt = session.CurrentPrompt,
                User = session.User,
            };
            context.Add(attempt);
            await context.SaveChangesAsync();

            var validationResluts = session.CurrentPrompt.Prompt.Select((character, index) =>
            {
                if (character == promptDataDTO.tested[index])
                {
                    return "Green";
                }
                if (promptDataDTO.tested.Contains(character))
                {
                    return "Orange";
                }
                return "Grey";
            });

            return Ok(validationResluts);

        }
    }
}
