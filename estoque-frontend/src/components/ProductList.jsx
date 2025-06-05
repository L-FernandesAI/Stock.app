import React, { useState } from "react";
import { useTranslate } from "../context/TranslationContext";
import "./ProductList.css";

function ProductList({ produtos, onDelete, onEdit }) {
  const { t } = useTranslate();
  const [edicaoId, setEdicaoId] = useState(null);
  const [nomeEdit, setNomeEdit] = useState("");
  const [precoEdit, setPrecoEdit] = useState("");
  const [categoriaEdit, setCategoriaEdit] = useState("");
  const [quantidadeEdit, setQuantidadeEdit] = useState("");

  const iniciarEdicao = (produto) => {
    setEdicaoId(produto.id);
    setNomeEdit(produto.nome);
    setPrecoEdit(
      typeof produto.preco === "number" ? produto.preco.toFixed(2) : ""
    );
    setCategoriaEdit(produto.categoria || "");
    setQuantidadeEdit(produto.quantidade || 0);
  };

  const cancelarEdicao = () => {
    setEdicaoId(null);
    setNomeEdit("");
    setPrecoEdit("");
    setCategoriaEdit("");
    setQuantidadeEdit("");
  };

  const salvarEdicao = () => {
    const precoConvertido = parseFloat(precoEdit.replace(",", "."));
    const produtoEditado = {
      nome: nomeEdit,
      preco: precoConvertido,
      categoria: categoriaEdit,
      quantidade: parseInt(quantidadeEdit, 10),
    };

    console.log("ENVIANDO PARA EDIT:", produtoEditado);

    onEdit(edicaoId, produtoEditado);
    cancelarEdicao();
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value || 0);
  };

  return (
    <div className="product-list-container">
      <h2>{t("productList")}</h2>

      {produtos.length === 0 ? (
        <p className="empty">{t("noProducts")}</p>
      ) : (
        <ul className="product-list">
          {produtos.map((p) => (
            <li key={p.id} className="product-card">
              {edicaoId === p.id ? (
                <div className="edit-group">
                  <div className="field">
                    <label>{t("name")}</label>
                    <input
                      value={nomeEdit}
                      onChange={(e) => setNomeEdit(e.target.value)}
                      placeholder={t("name")}
                    />
                  </div>
                  <div className="field">
                    <label>{t("price")}</label>
                    <input
                      type="text"
                      value={precoEdit}
                      onChange={(e) => setPrecoEdit(e.target.value)}
                      placeholder={t("price")}
                    />
                  </div>
                  <div className="field">
                    <label>{t("category")}</label>
                    <input
                      value={categoriaEdit}
                      onChange={(e) => setCategoriaEdit(e.target.value)}
                      placeholder={t("category")}
                    />
                  </div>
                  <div className="field">
                    <label>{t("quantity")}</label>
                    <input
                      type="number"
                      value={quantidadeEdit}
                      onChange={(e) => setQuantidadeEdit(e.target.value)}
                      placeholder={t("quantity")}
                    />
                  </div>
                  <div className="btn-group">
                    <button className="save" onClick={salvarEdicao}>
                      {t("save")}
                    </button>
                    <button className="cancel" onClick={cancelarEdicao}>
                      {t("cancel")}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="view-group">
                  <span>
                    <strong>{p.nome}</strong> - {formatPrice(p.preco)} |{" "}
                    {t("category")}: {p.categoria || "N/A"} | {t("quantity")}:{" "}
                    {p.quantidade || 0}
                  </span>
                  <div className="btn-group">
                    <button className="edit" onClick={() => iniciarEdicao(p)}>
                      {t("edit")}
                    </button>
                    <button className="delete" onClick={() => onDelete(p.id)}>
                      {t("delete")}
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;
