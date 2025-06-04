using Microsoft.AspNetCore.Mvc;
using EstoqueApp.Data;
using EstoqueApp.Models;
using System;
using System.Linq;

namespace EstoqueApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutosController : ControllerBase
    {
        private readonly EstoqueDbContext _context;

        public ProdutosController(EstoqueDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetProdutos()
        {
            return Ok(_context.Produtos.ToList());
        }

        [HttpPost]
        public IActionResult AdicionarProduto([FromBody] Produto produto)
        {
            _context.Produtos.Add(produto);
            _context.SaveChanges();
            return Ok(produto);
        }

        [HttpDelete("{id}")]
        public IActionResult RemoverProduto(int id)
        {
            var produto = _context.Produtos.Find(id);
            if (produto == null) return NotFound();

            _context.Produtos.Remove(produto);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult AtualizarProduto(int id, [FromBody] Produto produto)
        {
            var p = _context.Produtos.Find(id);
            if (p == null) return NotFound();

            // 🔍 DEBUG PESADO: VERIFICANDO O QUE TÁ VINDO DO FRONT
            Console.WriteLine($"⛏️ EDITANDO PRODUTO {id}: DE {p.Preco} PARA {produto.Preco}");

            p.Nome = produto.Nome;
            p.Preco = produto.Preco; // 👈 LINHA CRUCIAL AGORA FUNCIONAL
            p.Categoria = produto.Categoria;
            p.Quantidade = produto.Quantidade;

            _context.SaveChanges();
            return Ok(p);
        }
    }
}
