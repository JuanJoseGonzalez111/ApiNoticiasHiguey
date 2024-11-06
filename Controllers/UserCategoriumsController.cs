using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiNoticiasHiguey.Data;
using ApiNoticiasHiguey.Models;

namespace ApiNoticiasHiguey.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserCategoriumsController : ControllerBase
    {
        private readonly NoticiasProyecttoContext _context;

        public UserCategoriumsController(NoticiasProyecttoContext context)
        {
            _context = context;
        }

        // GET: api/UserCategoriums
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserCategorium>>> GetUserCategoria()
        {
            return await _context.UserCategoria.ToListAsync();
        }

        // GET: api/UserCategoriums/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserCategorium>> GetUserCategorium(int id)
        {
            var userCategorium = await _context.UserCategoria.FindAsync(id);

            if (userCategorium == null)
            {
                return NotFound();
            }

            return userCategorium;
        }

        // PUT: api/UserCategoriums/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserCategorium(int id, UserCategorium userCategorium)
        {
            if (id != userCategorium.Id)
            {
                return BadRequest();
            }

            _context.Entry(userCategorium).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserCategoriumExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/UserCategoriums
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserCategorium>> PostUserCategorium(UserCategorium userCategorium)
        {
            _context.UserCategoria.Add(userCategorium);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserCategorium", new { id = userCategorium.Id }, userCategorium);
        }

        // DELETE: api/UserCategoriums/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserCategorium(int id)
        {
            var userCategorium = await _context.UserCategoria.FindAsync(id);
            if (userCategorium == null)
            {
                return NotFound();
            }

            _context.UserCategoria.Remove(userCategorium);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserCategoriumExists(int id)
        {
            return _context.UserCategoria.Any(e => e.Id == id);
        }
    }
}
