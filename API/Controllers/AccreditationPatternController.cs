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
    public class AccreditationPatternController : ControllerBase
    {
        private readonly IAccreditationPatternService service;
        public AccreditationPatternController(IAccreditationPatternService service)
        {
            this.service = service;
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost]
        public async Task<IActionResult> AddAsync(AccreditationPatternToAdd accreditationPatternToAdd)
        {
            try 
            {
                var result = service.AddAsync(accreditationPatternToAdd);
                return Ok(await result);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize(Policy = "RequireUserRole")]
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
                return NotFound(e.Message);
            }
        }

        [Authorize(Policy = "RequireUserRole")]
        [HttpGet("{accreditationPatternId}")]
        public async Task<IActionResult> GetAsync(int accreditationPatternId)
        {
            try
            {
                var result = service.GetAsync(accreditationPatternId);
                return Ok(await result);
            }
            catch(Exception e)
            {
                return NotFound(e.Message);
            }
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpDelete("{accreditationPatternId}")]
        public async Task<IActionResult> DeleteAsync(int accreditationPatternId)
        {
            try
            {
                var result = service.DeleteAsync(accreditationPatternId);
                return Ok(await result);
            }
            catch(Exception e)
            {
                return NotFound(e.Message);
            }
        }
    }
}