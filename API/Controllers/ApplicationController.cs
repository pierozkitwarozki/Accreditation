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
    public class ApplicationController : ControllerBase
    {
        private readonly IApplicationService service;
        public ApplicationController(IApplicationService service)
        {
            this.service = service;
        }

        [Authorize(Policy = "RequireUserRole")]
        [HttpPost]
        public async Task<IActionResult> AddAsync(ApplicationToAdd applicationToAdd)
        {
            try
            {
                var result = service.AddAsync(applicationToAdd);
                return Ok(await result);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
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
            catch(Exception e)
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
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize(Policy = "RequireUserRole")]
        [HttpGet("non-approved")]
        public async Task<IActionResult> GetAllNonApprovedAsync()
        {
            try
            {
                var result = service.GetAllNonApprovedAsync();
                return Ok(await result);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize(Policy = "RequireUserRole")]
        [HttpGet("single/{patternId}/{userId}")]
        public async Task<IActionResult> GetSingleAsync(int patternId, int userId)
        {
            try
            {
                var result = service.GetSingleAsync(patternId, userId);
                return Ok(await result);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize(Policy = "RequireUserRole")]
        [HttpGet("for-user/{id}")]
        public async Task<IActionResult> GetAllForUserAsync(int id)
        {
            try
            {
                var result = service.GetAllForUserAsync(id);
                return Ok(await result);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize(Policy = "RequireUserRole")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(int id)
        {
            try
            {
                var result = service.GetAsync(id);
                return Ok(await result);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPut("comment/{id}")]
        public async Task<IActionResult> CommentAsync(int id, CommentToAdd comment)
        {
            try
            {
                var result = service.CommentApplicationAsync(id, comment);
                return Ok(await result);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPut("approve/{id}")]
        public async Task<IActionResult> ApproveAsync(int id)
        {
            try
            {
                var result = service.ApproveAsync(id);
                return Ok(await result);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}