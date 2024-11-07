using ApiNoticiasHiguey.Data;
using ApiNoticiasHiguey.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace ApiNoticiasHiguey.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoticiasApiController : ControllerBase
    {
        private readonly NoticiasProyecttoContext _context;
        private readonly string _rutaArchivos;


        public NoticiasApiController(NoticiasProyecttoContext noticiasProyecttoContext) {
         this._context = noticiasProyecttoContext;
            
            _rutaArchivos = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "imagenes"); 
            if (!Directory.Exists(_rutaArchivos))
            {
                Directory.CreateDirectory(_rutaArchivos); 
            }

        }

      
        [HttpGet(Name = nameof(ListaNoticias))]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<NoticiaDto>))]
        public IActionResult ListaNoticias(
    string? autor = null,
    string? titulo = null,
    int? categoriaId = null,
    int? paisId = null,
    DateTime? fechaInicio = null,
    DateTime? fechaFin = null,
    int page = 1,
    int pageSize = 10)
        {
            var query = _context.Noicias
                .Include(n => n.CategoriaNavigation)
                .Include(n => n.PaisNavigation)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(autor))
            {
                query = query.Where(n => n.Autor.Contains(autor));
            }

            if (!string.IsNullOrWhiteSpace(titulo))
            {
                query = query.Where(n => n.Titulo.Contains(titulo));
            }

            if (categoriaId.HasValue)
            {
                query = query.Where(n => n.Categoria == categoriaId);
            }

            if (paisId.HasValue)
            {
                query = query.Where(n => n.Pais == paisId);
            }

            if (fechaInicio.HasValue)
            {
                query = query.Where(n => n.FechaPublicacion >= fechaInicio.Value);
            }

            if (fechaFin.HasValue)
            {
                query = query.Where(n => n.FechaPublicacion <= fechaFin.Value);
            }

            var totalCount = query.Count();

            var noticias = query
                .OrderBy(n => n.FechaPublicacion)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(n => new NoticiaDto2
                {
                    Id = n.Id,
                    Titulo = n.Titulo,
                    Resumen = n.Resumen,
                    Autor = n.Autor,
                    Contenido = n.Contenido,
                    Categoria = n.CategoriaNavigation.Nombre,
                    Pais = n.PaisNavigation.Pais,
                    FechaPublicacion = n.FechaPublicacion ?? DateTime.MinValue,
                   FotoUrl = n.Foto
                })
                .ToList();

            var response = new
            {
                TotalCount = totalCount,
                PageSize = pageSize,
                CurrentPage = page,
                TotalPages = (int)Math.Ceiling((double)totalCount / pageSize),
                Noticias = noticias
            };

            return Ok(response);
        }

   
        public class NoticiaDto2
        {
            public int Id { get; set; }
            public string Titulo { get; set; }
            public string Resumen { get; set; }
            public string Autor { get; set; }
            public string Contenido { get; set; }
            public string Categoria { get; set; }
            public string Pais { get; set; }
            public DateTime FechaPublicacion { get; set; }
            public string? FotoUrl { get; set; }
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
        [HttpGet("titulo/{titulo}", Name = nameof(GetNoticiasbytitulo))]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Noicia))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ProblemDetails))]
        public IActionResult GetNoticiasbytitulo(string Titulo)
        {

            var noticias = _context.Noicias.FirstOrDefault(n => n.Titulo == Titulo);

            if (noticias == null)
            {
                return NotFound();
            }

            return Ok(noticias);


        }
        [HttpPost(Name = nameof(CrearNoticia))]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Noicia))]
        public async Task<IActionResult> CrearNoticia([FromForm] NoticiaDto noticiaDto, IFormFile? foto)
        {
            string? rutaArchivo = null;

            // Manejo de imagen
            if (foto != null && foto.Length > 0)
            {
                try
                {
                    var extension = Path.GetExtension(foto.FileName);
                    var nombreArchivo = Guid.NewGuid().ToString() + extension;
                    var rutaCompleta = Path.Combine(_rutaArchivos, nombreArchivo);

                    using (var stream = new FileStream(rutaCompleta, FileMode.Create))
                    {
                        await foto.CopyToAsync(stream);
                    }

                    rutaArchivo = $"/imagenes/{nombreArchivo}";
                }
                catch (Exception ex)
                {

                    return StatusCode(500, new { error = "Error al guardar la imagen", details = ex.Message });
                }
            }
           // Manejo de imagen
           //if (noticiaDto.FotoRuta != null && N.Length > 0)
           //{
           //    try
           //    {
           //        var extension = Path.GetExtension(foto.FileName);
           //        var nombreArchivo = Guid.NewGuid().ToString() + extension;
           //        var rutaCompleta = Path.Combine(_rutaArchivos, nombreArchivo);

           //        using (var stream = new FileStream(rutaCompleta, FileMode.Create))
           //        {
           //            await foto.CopyToAsync(stream);
           //        }

           //        rutaArchivo = $"/imagenes/{nombreArchivo}";
           //    }
           //    catch (Exception ex)
           //    {

           //        return StatusCode(500, new { error = "Error al guardar la imagen", details = ex.Message });
           //    }
           //}
           // Validar categoría
           var categoria = await _context.Categoria.FirstOrDefaultAsync(c => c.Nombre == noticiaDto.Categoria);
            if (categoria == null)
            {
                return BadRequest($"La categoría '{noticiaDto.Categoria}' no existe.");
            }

            // Validar país
            var pais = await _context.Pais.FirstOrDefaultAsync(p => p.Pais == noticiaDto.Pais);
            if (pais == null)
            {
                return BadRequest($"El país '{noticiaDto.Pais}' no existe.");
            }

            // Crear la noticia
            var noticia = new Noicia
            {
                Titulo = noticiaDto.Titulo,
                Resumen = noticiaDto.Resumen,
                Autor = noticiaDto.Autor,
                Contenido = noticiaDto.Contenido,
                Categoria = categoria.Id,
                Pais = pais.Id,
                FechaPublicacion = noticiaDto.FechaPublicacion,
                Foto = rutaArchivo,
            };

            try
            {
                _context.Noicias.Add(noticia);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(CrearNoticia), new { id = noticia.Id }, noticia);
            }
            catch (Exception ex)
            {
               
                return StatusCode(500, new { error = "Error al guardar la noticia", details = ex.Message });
            }
        }


        public class NoticiaDto
        {
            public string Titulo { get; set; }
            public string Resumen { get; set; }
            public string Autor { get; set; }
            public string Contenido { get; set; }
            public string Categoria { get; set; }
            public string Pais { get; set; }
            public DateTime FechaPublicacion { get; set; }
           // public IFormFile FotoRuta { get; set; } 
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
