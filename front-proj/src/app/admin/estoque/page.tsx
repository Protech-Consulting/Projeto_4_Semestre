"use client";
import { useEffect, useState } from "react";
import { EstoqueService } from "../../../../service/estoqueService";
import ModalAdminEstoque from "@/app/components/modal-admin-estoque";
ModalAdminEstoque
const estoqueService = new EstoqueService();

export default function EstoquePage() {
  const [estoque, setEstoque] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    carregarEstoque();
  }, []);
  

  const carregarEstoque = () => {
    estoqueService
      .listarEstoque()
      .then((response) => setEstoque(response.data))
      .catch((error) => console.error("Erro ao carregar produtos:", error));
  };

  return (
    <main className="text-black p-4">
      <h1 className="text-[1.5rem] mb-4 font-bold">Gestão de Estoque</h1>
      <button className="px-2 py-1 bg-[#F28403] text-white rounded hover:bg-[#ff972f]" onClick={()=>{
         setCurrentData(null);
         setIsModalOpen(true); // Abre o modal
      }}>Adicionar ao Estoque
      </button>
      <table
        className="my-3 table-auto w-full border border-gray-300"
      >
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Imagem</th>
            <th className="border border-gray-300 px-4 py-2">Nome</th>
            <th className="border border-gray-300 px-4 py-2">Quantidade</th>
            <th className="border border-gray-300 px-4 py-2">Valor</th>
            <th className="border border-gray-300 px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {estoque.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={`http://localhost:3000/API/${item.produto.imagem.file}`} // URL da imagem
                  alt={item.produto.nome} // Texto alternativo
                  className="w-24 h-24 object-cover border border-gray-300 rounded"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">{item.produto.nome}</td>
              <td className="border border-gray-300 px-4 py-2">{item.quantidade}</td>
              <td className="border border-gray-300 px-4 py-2">R$ {item.produto.valor.toLocaleString()}</td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex gap-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                   onClick={() => {
                    setCurrentData(item); // Define os dados do produto para o modal
                    setIsModalOpen(true); // Abre o modal
                  }}>
                    Editar
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={async ()=>{
                    await estoqueService.deletarEstoque(item.id)
                    carregarEstoque()
                  }}>
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalAdminEstoque
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Editar Produto"
        data={currentData}
        recarregarLista={carregarEstoque}
      />
    </main>
  );
}
