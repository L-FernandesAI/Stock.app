import React, { useState } from "react";
import { useTranslate } from "../context/TranslationContext";

function ProductForm({ onProductAdded }) {
  const { t } = useTranslate();
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !nome ||
      !preco ||
      !categoria ||
      !quantidade ||
      parseFloat(preco.replace(",", ".")) <= 0 ||
      quantidade < 0
    ) {
      alert(t("formError"));
      return;
    }

    const produto = {
      nome,
      preco: parseFloat(preco.replace(",", ".")),
      categoria,
      quantidade: parseInt(quantidade, 10),
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/produtos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(produto),
        }
      );

      if (response.ok) {
        setNome("");
        setPreco("");
        setCategoria("");
        setQuantidade("");
        onProductAdded();
      } else {
        const erro = await response.text();
        alert(t("saveError") + erro);
      }
    } catch (err) {
      alert(t("connectionError"));
      console.error("Erro de rede:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 text-white p-8 rounded-2xl shadow-2xl max-w-xl mx-auto mt-10 space-y-6 border border-zinc-700"
    >
      <h2 className="text-3xl font-extrabold text-center">
        {t("productForm")}
      </h2>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-300">
          {t("name")}
        </label>
        <input
          className="w-full px-4 py-2 border border-zinc-700 bg-zinc-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder={t("name")}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-300">
          {t("price")}
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-zinc-700 bg-zinc-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          placeholder={t("price")}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-300">
          {t("category")}
        </label>
        <input
          className="w-full px-4 py-2 border border-zinc-700 bg-zinc-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          placeholder={t("category")}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-300">
          {t("quantity")}
        </label>
        <input
          type="number"
          min="0"
          className="w-full px-4 py-2 border border-zinc-700 bg-zinc-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          placeholder={t("quantity")}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg"
      >
        {t("saveProduct")}
      </button>
    </form>
  );
}

export default ProductForm;
