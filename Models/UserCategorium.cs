﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace ApiNoticiasHiguey.Models;

public partial class UserCategorium
{
    public int Id { get; set; }

    public int CategoriaId { get; set; }

    public string UserId { get; set; }

    public virtual Categorium Categoria { get; set; }
}