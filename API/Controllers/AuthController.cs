using System;
using System.Threading.Tasks;
using API.Dtos;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUserAsync(UserToRegister userToRegisterDTO)
        {
            try
            {
                var result = _authService.RegisterUserAsync(userToRegisterDTO);
                return Ok(await result);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUserAsync(UserToLogin userToLoginDTO)
        {
            try
            {
                var result = _authService.LoginUserAsync(userToLoginDTO);
                return Ok(await result);
            }
            catch(Exception e)
            {
                return Unauthorized(e.Message);
            }
        }
    }
}