using backend.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RobWorldeMVC.DTO;
using RobWorldeMVC.Models;

namespace RobWorldeMVC.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : Controller
    {
        private readonly ApplicationDbContext context;
        public UsersController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpPost("create")]
        public async Task<ActionResult> Post(UsersCreationDTO usersCreationDTO)
        {
            var usernameConflict = await context.Users.Where(u => u.Name == usersCreationDTO.Name).FirstOrDefaultAsync();
            if (usernameConflict != null)
            {
                return BadRequest("username taken");
            }

            var user = new Users
            {
                Name = usersCreationDTO.Name,
                Password = usersCreationDTO.Password,
            };

            var session = new Sessions {
                ExpirationDate = DateTime.UtcNow.AddMinutes(40),
                User = user,
                Token = Guid.NewGuid()
            };

            await context.AddAsync(user);
            await context.AddAsync(session);
            await context.SaveChangesAsync();
            return Ok(session.Token);
        }

        [HttpGet]
        [HttpPost("flush")]
        public async Task<ActionResult> FlushSessions()
        {
            context.Sessions.RemoveRange(context.Sessions);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet]
        [HttpPost("authenticate")]
        public async Task<ActionResult> authenticate(UsersCreationDTO usersCreationDTO)
        {
            context.Sessions.RemoveRange(context.Sessions.Where(token => token.ExpirationDate < DateTime.UtcNow.AddSeconds(30)));
            await context.SaveChangesAsync();

            var user = await context.Users.Where(x => x.Name == usersCreationDTO.Name).FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            if (user.Password != usersCreationDTO.Password)
            {
                return BadRequest();
            }

            var session = await context.Sessions.Where(session => session.User == user).FirstOrDefaultAsync();

            if (session == null)
            {
                var token = Guid.NewGuid();
                var newToken = new Sessions { ExpirationDate = DateTime.UtcNow.AddMinutes(40), User = user, Token = token };
                await context.AddAsync(newToken);
                await context.SaveChangesAsync();
                return Ok(newToken);
            }

            session.ExpirationDate = DateTime.UtcNow.AddMinutes(40);
            context.Sessions.Update(session);
            await context.SaveChangesAsync();
            return Ok(session.Token.ToString());
        }

        [HttpGet("test")]
        public async Task<ActionResult> test()
        {
            var session = await context.Sessions.Include(s => s.User).ToListAsync();
            return Ok(session);
        }
    }
}