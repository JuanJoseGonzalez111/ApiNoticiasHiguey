﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace ApiNoticiasHiguey.Models;

public partial class SolicitudPermiso
{
    public int SolicitudId { get; set; }

    public string UsuarioId { get; set; }

    public DateTime? FechaSolicitud { get; set; }

    public string EstadoSolicitud { get; set; }

    public DateTime? FechaRespuesta { get; set; }

    public string Comentario { get; set; }
}