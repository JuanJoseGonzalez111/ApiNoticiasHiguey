using ApiNoticiasHiguey.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ApiNoticiasHiguey
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Habilitar CORS para permitir un origen específico
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin", // Asegúrate de que este nombre coincida al usar la política
                    builder => builder.WithOrigins("http://localhost:5173") // Cambia esto por el origen de tu frontend
                                      .AllowAnyHeader()
                                      .AllowAnyMethod()
                                      .AllowCredentials());
            });

            builder.Services.AddControllers();
            builder.Services.AddAuthorization();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Configuración de bases de datos
            builder.Services.AddDbContext<NoticiasProyecttoContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("NoticiasConnectionStrings")));

            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("ApplicationConnectionString")));

            builder.Services.AddIdentityApiEndpoints<IdentityUser>()
                .AddEntityFrameworkStores<ApplicationDbContext>();

            var app = builder.Build();

            // Aplicar migraciones pendientes
            using (var scope = app.Services.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                dbContext.Database.Migrate();
            }

            app.MapIdentityApi<IdentityUser>();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // Usar CORS con la política configurada
            app.UseCors("AllowSpecificOrigin"); 
            app.UseHttpsRedirection();
            app.UseAuthorization();

            // Registrar los controladores
            app.MapControllers().RequireAuthorization();

            app.Run();
        }
    }
}
