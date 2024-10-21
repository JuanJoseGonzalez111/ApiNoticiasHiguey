using ApiNoticiasHiguey.Data;
using ApiNoticiasHiguey.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ApiNoticiasHiguey.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoticiasApiController : ControllerBase
    {
        private readonly NoticiasProyecttoContext _context;

        public NoticiasApiController(NoticiasProyecttoContext noticiasProyecttoContext) {
         this._context = noticiasProyecttoContext;
        
        }
        [HttpGet(Name= nameof(ListaNoticias))]
        [ProducesResponseType(StatusCodes.Status200OK, Type =typeof (List<Noicia>))]
        public IActionResult ListaNoticias() {
            return Ok(_context.Noicias.ToList());
        }

        [HttpGet("{id}", Name = nameof(GetNoticiasbyid))]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Noicia))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ProblemDetails))]
        public IActionResult GetNoticiasbyid(int id) {

            var noticias = _context.Noicias.Find(id);

            if (noticias == null)
            {
                return NotFound();
            }

            return Ok(noticias);
        
        
        }
        [HttpPost(Name=nameof(CrearNoticia))]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Noicia))]
        public IActionResult CrearNoticia(Noicia noicia) {

           var Noticia =   _context.Noicias.Add(noicia);
            _context.SaveChanges();
            return Ok(Noticia);
        }
        [HttpPut("{id}", Name= nameof(UpdateNoticia))]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ProblemDetails))]
        public IActionResult UpdateNoticia(int id, Noicia noicia)
        {
         var noticia =    _context.Noicias.Find(id);
            if(noticia == null)
            {
                return NotFound();
            }
            _context.SaveChanges();



            return Ok(noicia);

        }

        [HttpDelete("{id}",Name = nameof(DeleteNoticia))]

        public IActionResult DeleteNoticia(int id)
        {

            var noticia = _context.Noicias.Find(id);
            if (noticia == null)
            {
                return NotFound();
            }

            return Ok(noticia);
        }


    }
}
