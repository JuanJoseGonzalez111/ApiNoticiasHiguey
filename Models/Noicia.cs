﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace ApiNoticiasHiguey.Models;

public partial class Noicia
{
    public int Id { get; set; }

    public string Titulo { get; set; }

    public byte[] Foto { get; set; }

    public string Resumen { get; set; }

    public string Contenido { get; set; }

    public int? Categoria { get; set; }

    public int? Pais { get; set; }

    public string Autor { get; set; }

    public DateTime? FechaPublicacion { get; set; }
}