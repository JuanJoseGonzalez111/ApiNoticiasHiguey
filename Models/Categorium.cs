﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace ApiNoticiasHiguey.Models;

public partial class Categorium
{
    public int Id { get; set; }

    public string Nombre { get; set; }

    public DateTime? FechaCreacion { get; set; }

    public virtual ICollection<Noicia> Noicia { get; set; } = new List<Noicia>();

    public virtual ICollection<UserCategorium> UserCategoria { get; set; } = new List<UserCategorium>();
}