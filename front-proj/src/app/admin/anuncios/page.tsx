"use client";

import { useEffect, useState } from "react";
import { AnunciosService } from "../../../../service/anunciosService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ModalAdminAnuncios from "@/app/components/modal-admin-anuncios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const anunciosService = new AnunciosService();

export default function AnunciosPage() {
  const [anuncios, setProdutos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState<Record<string, any> | null>(
    null
  );

  // Carrega os produtos ao montar o componente
  useEffect(() => {
    carregarAnuncios();
  }, []);

  const carregarAnuncios = () => {
    anunciosService
      .listarAnuncios()
      .then((response) => setProdutos(response.data))
      .catch((error) => console.error("Erro ao carregar produtos:", error));
  };

  return (
    <main className="text-black p-4">
      <h1 className="text-[1.5rem] mb-4 font-bold">Gestão de Anúncios</h1>
      <button
        className="px-2 py-1 bg-[#F28403] text-white rounded hover:bg-[#ff972f]"
        onClick={() => {
          setCurrentData(null);
          setIsModalOpen(true); // Abre o modal
        }}
      >
        Adicionar anuncio
      </button>
      <table className="my-3 table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Produto</th>
            <th className="border border-gray-300 px-4 py-2">Título</th>
            <th className="border border-gray-300 px-4 py-2">Descrição</th>
            <th className="border border-gray-300 px-4 py-2">Valor</th>
            <th className="border border-gray-300 px-4 py-2">Quantidade no estoque</th>
            <th className="border border-gray-300 px-4 py-2">Imagens</th>
            <th className="border border-gray-300 px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {anuncios.map((anuncio, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={`http://localhost:3000/API/${anuncio.produto.imagem.file}`} // URL da imagem
                  alt={anuncio.produto.nome} // Texto alternativo
                  className="w-24 h-24 object-cover border border-gray-300 rounded"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {anuncio.title}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {anuncio.content}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                R$ {anuncio.produto.valor.toLocaleString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {anuncio.produto.Stock?.[0]?.quantidade}
              </td>
              <td className="border border-gray-300 px-0 py-2">
                {/* Carrossel de imagens */}
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  spaceBetween={10}
                  slidesPerView={1}
                  className="w-48 h-28"
                >
                  {anuncio.images.map((image) => (
                    <SwiperSlide key={image.id}>
                      <img
                        src={`http://localhost:3000/API/${image.file}`}
                        alt={anuncio.title}
                        className="w-full h-full object-cover rounded"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => {
                      setCurrentData(anuncio); // Define os dados do anúncio para o modal
                      setIsModalOpen(true); // Abre o modal
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={async () => {
                      await anunciosService.deletarAnuncio(anuncio.id);
                      carregarAnuncios();
                    }}
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalAdminAnuncios
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Editar Produto"
        data={currentData}
        recarregarLista={carregarAnuncios}
      />
    </main>
  );
}
