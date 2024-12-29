import { link } from 'fs';
import Link from 'next/link';
import React, { useState } from 'react';

const CardProdutos = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const itemsPerPage = 8; // Número de itens por página

  // Cálculo do índice inicial e final dos itens da página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Itens da página atual
  const currentItems = data.slice(startIndex, endIndex);

  // Número total de páginas
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Função para mudar de página
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="pagination-container">
      {/* Cards */}
      <div className="products px-32 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {currentItems.map((anuncio, index) => (
          <Link href={`/produto/${anuncio.id}`} key={anuncio.id || `anuncio-${index}`} >
          <div
            key={anuncio.id || index}
            className="card min-h-[350px] bg-white rounded-lg transition-transform shadow-md p-6 flex flex-col items-center hover:scale-105"> 
            <div className="image w-full">
              <img
                src={`http://localhost:3000/API/${anuncio.images[0].file}`}
                alt={anuncio.title}
                className="w-full h-[250px] object-cover rounded-md mb-4"
              />
            </div>
            <h2 className="text-xl font-bold text-violet-500 text-center mb-2">{anuncio.title}</h2>
            <p className="text-xl font-semibold text-center text-gray-800 mb-1">
              R${anuncio.produto.valor.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 text-center mb-4">
              3x de R${(anuncio.produto.valor / 3).toFixed(2)}
            </p>
            <div className="flex justify-between w-full">
              <button className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800">
                Comprar
              </button>
            </div>
          </div>
          </Link>
        ))}
      </div>

      {/* Controles de Paginação */}
      <div className="pagination flex justify-center items-center mt-4 space-x-2">
        <button
          className="bg-gray-300 px-3 py-2 rounded hover:bg-gray-400"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-2 rounded ${
              currentPage === index + 1 ? 'bg-violet-500 text-white' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            onClick={() => changePage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="bg-gray-300 px-3 py-2 rounded hover:bg-gray-400"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default CardProdutos;
