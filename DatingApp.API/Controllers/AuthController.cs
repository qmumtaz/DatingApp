using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using DatingApp.API.Dtos;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;

namespace DatingApp.API.Controllers
{
   // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        public AuthController(IAuthRepository repo , IConfiguration config)
        {
            _repo = repo;
            _config = config;
        }
        
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDto dto){
            //validate

            dto.Username = dto.Username.ToLower();
            if(await _repo.UserExists(dto.Username))
            return BadRequest("User already exists");

            var usertocreate = new User{
                Username = dto.Username
            };

            var createduser = await _repo.Register(usertocreate,dto.Password);

            return StatusCode(201);

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto dto){

            var userfromrepo = await _repo.Login(dto.Username.ToLower(),dto.Password);

            if(userfromrepo == null)
            return Unauthorized();

            var claims = new []{
                new Claim(ClaimTypes.NameIdentifier , userfromrepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userfromrepo.Username)

            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config
            .GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key , SecurityAlgorithms.HmacSha512Signature);
            var tokendes = new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(claims),
                Expires = System.DateTime.Now.AddDays(1)
            };

            var tokenhandler = new JwtSecurityTokenHandler();

            var token = tokenhandler.CreateToken(tokendes);

            return Ok(new {
                token = tokenhandler.WriteToken(token)
            });


        }
 
    }
}