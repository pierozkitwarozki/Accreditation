using System;
using System.Threading.Tasks;
using API.Dtos;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttachmentController : ControllerBase
    {
        private readonly IAttachmentService service;
        public AttachmentController(IAttachmentService service)
        {
            this.service = service;
        }

        [HttpPost]
        public async Task<IActionResult> AddAsync([FromForm] AttachmentToAdd attachmentToAdd)
        {
            try
            {
                return Ok(await service.AddAsync(attachmentToAdd));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{attachmentId}")]
        public async Task<IActionResult> DeleteAsync(int attachmentId)
        {
            try
            {
                return Ok(await service.DeleteAsync(attachmentId));
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
                return NotFound(e.Message);
            }
        }

        [HttpGet("{attachmentId}")]
        public async Task<IActionResult> GetAsync(int attachmentId)
        {
            try 
            {
                return Ok(await service.GetAsync(attachmentId));
            }
            catch(Exception e)
            {
                return NotFound(e.Message);
            }
        }
    }
}