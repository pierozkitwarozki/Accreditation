using System;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService service;
        public UserController(IUserService service)
        {
            this.service = service;
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            try
            {
                var result = service.DeleteAsync(id);
                return Ok(await result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(int id)
        {
            try
            {
                var result = service.GetAsync(id);
                return Ok(await result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize(Policy = "RequireUserRole")]
        [HttpGet("my-profile")]
        public async Task<IActionResult> GetMyProfileAsync()
        {
            try
            {
                var id =
                       int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

                var result = service.GetAsync(id);

                return Ok(await result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            try
            {
                var result = service.GetAllAsync();
                return Ok(await result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("admins")]
        public async Task<IActionResult> GetAllAdminsAsync()
        {
            try
            {
                var result = service.GetAllAdminsAsync();
                return Ok(await result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsersAsync()
        {
            try
            {
                var result = service.GetAllUsersAsync();
                return Ok(await result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}