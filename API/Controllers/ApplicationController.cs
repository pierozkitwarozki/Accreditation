using System;
using System.Threading.Tasks;
using API.Dtos;
using API.Services;
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

        [HttpPost]
        public async Task<IActionResult> AddAsync(ApplicationToAdd applicationToAdd)
        {
            try
            {
                return Ok(await service.AddAsync(applicationToAdd));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            try
            {
                return Ok(await service.DeleteAsync(id));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            try
            {
                return Ok(await service.GetAllAsync());
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("non-approved")]
        public async Task<IActionResult> GetAllNonApprovedAsync()
        {
            try
            {
                return Ok(await service.GetAllNonApprovedAsync());
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpGet("for-user/{id}")]
        public async Task<IActionResult> GetAllForUserAsync(int id)
        {
            try
            {
                return Ok(await service.GetAllForUserAsync(id));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(int id)
        {
            try
            {
                return Ok(await service.GetAsync(id));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("comment/{id}")]
        public async Task<IActionResult> CommentAsync(int id, string comment)
        {
            try
            {
                return Ok(await service.CommentApplicationAsync(id, comment));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("approve/{id}")]
        public async Task<IActionResult> ApproveAsync(int id)
        {
            try
            {
                return Ok(await service.ApproveAsync(id));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}