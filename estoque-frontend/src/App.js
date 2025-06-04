import React, { useState, useEffect } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import LanguageToggle from "./components/LanguageToggle";
import { useTranslate } from "./context/TranslationContext";
import "./index.css";

function App() {
  const { t } = useTranslate();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/produtos`
      );
      if (!response.ok) throw new Error("Erro na resposta da API");
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error("🔴 Erro ao carregar produtos:", error);
      alert(t("connectionError"));
    }
  };

  const deletarProduto = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/produtos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        carregarProdutos();
      } else {
        const erro = await response.text();
        alert(t("deleteError") + erro);
      }
    } catch (error) {
      alert(t("networkDeleteError"));
      console.error("🔴 Erro ao deletar:", error);
    }
  };

  const editarProduto = async (id, produto) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/produtos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(produto),
        }
      );

      if (response.ok) {
        carregarProdutos();
      } else {
        const erro = await response.text();
        alert(t("editError") + erro);
      }
    } catch (err) {
      alert(t("networkEditError"));
      console.error("🔴 Erro ao editar:", err);
    }
  };

  return (
    <div>
      <LanguageToggle />
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        {t("stockControl")}
      </h1>

      <ProductForm onProductAdded={carregarProdutos} />

      <ProductList
        produtos={produtos}
        onDelete={deletarProduto}
        onEdit={editarProduto}
      />
    </div>
  );
}

export default App;
