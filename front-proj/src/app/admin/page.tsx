"use client";

import { useEffect, useState } from "react";
import { ProdutoService } from "../../../service/produtosService";
import ModalAdminProducts from "../components/modal-admin-produtos";

const produtoService = new ProdutoService();

export default function AdminPage() {
  const [produtos, setProdutos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState<Record<string, any> | null>(null);

  // Carrega os produtos ao montar o componente
  useEffect(() => {
    carregarProdutos();
  }, []);
  

  const carregarProdutos = () => {
    produtoService
      .listarTodos()
      .then((response) => setProdutos(response.data))
      .catch((error) => console.error("Erro ao carregar produtos:", error));
  };

  console.log(produtos);

  return (
    <main style={{ color: "black", padding: "1rem" }}>
      <h1 className="text-[1.5rem] mb-4">Produtos</h1>
      <button className="px-2 py-1 bg-[#F28403] text-white rounded hover:bg-[#ff972f]" onClick={() => {
         setCurrentData(null);
                    setIsModalOpen(true); // Abre o modal
                  }}>Adicionar Produto</button>
      <table
        border="1"
        width="100%"
        style={{ borderCollapse: "collapse" }}
        className="table-auto"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Imagem</th>
            <th scope="col">Nome</th>
            <th scope="col">Tratamento</th>
            <th scope="col">Marca</th>
            <th scope="col">Unidade de Medida</th>
            <th scope="col">Metragem</th>
            <th scope="col">Valor</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {produtos.map((produto, index) => (
            <tr key={produto.id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={`http://localhost:3000/API/${produto.imagem.file}`} // URL da imagem
                  alt={produto.nome} // Texto alternativo
                  style={{ width: "50px", height: "50px", objectFit: "cover" }} // Ajuste de tamanho
                />
              </td>
              <td>{produto.nome}</td>
              <td>{produto.tratamento}</td>
              <td>{produto.marca}</td>
              <td>{produto.unidade_de_medida}</td>
              <td>{produto.metragem}</td>
              <td>R$ {produto.valor.toLocaleString()}</td>
              <td>
                {/* Botão de editar que abre o modal */}
                <button
                  onClick={() => {
                    setCurrentData(produto); // Define os dados do produto para o modal
                    setIsModalOpen(true); // Abre o modal
                  }}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Editar
                </button>
                {/* Botão de excluir */}
                <button
                  onClick={async() =>{ 
                    await produtoService.deletarProduto(produto.id)
                     carregarProdutos()}
                    }
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal renderizado condicionalmente */}
      <ModalAdminProducts
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Editar Produto"
        data={currentData}
        recarregarLista={carregarProdutos}
      />
    </main>
  );
}
