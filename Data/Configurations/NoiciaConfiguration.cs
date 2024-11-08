﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using ApiNoticiasHiguey.Data;
using ApiNoticiasHiguey.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;

namespace ApiNoticiasHiguey.Data.Configurations
{
    public partial class NoiciaConfiguration : IEntityTypeConfiguration<Noicia>
    {
        public void Configure(EntityTypeBuilder<Noicia> entity)
        {
            entity.Property(e => e.Autor)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("autor");
            entity.Property(e => e.Contenido).HasColumnType("text");
            entity.Property(e => e.FechaPublicacion).HasColumnType("date");
            entity.Property(e => e.Foto).IsUnicode(false);
            entity.Property(e => e.Titulo)
                .HasMaxLength(200)
                .IsUnicode(false);

            entity.HasOne(d => d.CategoriaNavigation).WithMany(p => p.Noicia)
                .HasForeignKey(d => d.Categoria)
                .HasConstraintName("FK_Noicias_Categoria");

            entity.HasOne(d => d.PaisNavigation).WithMany(p => p.Noicia)
                .HasForeignKey(d => d.Pais)
                .HasConstraintName("FK_Noicias_Pais");

            OnConfigurePartial(entity);
        }

        partial void OnConfigurePartial(EntityTypeBuilder<Noicia> entity);
    }
}
