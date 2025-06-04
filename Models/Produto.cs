using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema; // 👈 NECESSÁRIO PRA [Column]

namespace EstoqueApp.Models
{
    public class Produto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Nome é obrigatório")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Categoria é obrigatória")]
        public string Categoria { get; set; }

        [Required(ErrorMessage = "Quantidade é obrigatória")]
        [Range(1, int.MaxValue, ErrorMessage = "Quantidade deve ser maior que zero")]
        public int Quantidade { get; set; }

        [Required(ErrorMessage = "Preço é obrigatório")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Preço deve ser maior que zero")]
        [Column(TypeName = "decimal(10,2)")] // 👈 AQUI É ONDE A MAGIA ACONTECE
        public decimal Preco { get; set; }

        public DateTime DataCadastro { get; set; } = DateTime.Now;
    }
}
