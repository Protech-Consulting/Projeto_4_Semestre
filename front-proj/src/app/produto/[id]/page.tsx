'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnunciosService } from '../../../../service/anunciosService'; // Seu serviço de anúncios
import Image from 'next/image';

const ProdutoPage = () => {
  const { id } = useParams(); // Acessando o parâmetro "id" da URL

  const [produto, setProduto] = useState(null); // Para armazenar os dados do produto
  const [loading, setLoading] = useState(true);
  const [quantidade, setQuantidade] = useState(1);
  const [imagemPrincipal, setImagemPrincipal] = useState(null); // Estado para a imagem principal

  useEffect(() => {
    if (id) {
      const anunciosService = new AnunciosService();

      anunciosService
        .buscarAnuncioPorId(id)
        .then((response) => {
          if (response && response.data) {
            setProduto(response.data); // Armazena os dados do produto
            setImagemPrincipal(response.data.images[0].file); // Definir a primeira imagem como imagem principal
          } else {
            console.error("Produto não encontrado");
          }
          setLoading(false); // Termina o carregamento
        })
        .catch((error) => {
          console.error("Erro ao buscar produto:", error);
          setLoading(false);
        });
    }
  }, [id]); // Recarregar quando o "id" mudar

  if (loading) return <div>Carregando...</div>;

  if (!produto) return <div>Produto não encontrado.</div>;

  // Função para aumentar/diminuir a quantidade
  const handleQuantidadeChange = (type) => {
    if (type === 'increase') {
      setQuantidade(quantidade + 1);
    } else if (type === 'decrease' && quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };

  // Função para mudar a imagem principal
  const handleImageClick = (file) => {
    setImagemPrincipal(file); // Altera a imagem principal para a imagem clicada
  };

  return (
    <div className="container mx-auto px-16 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Carrossel de Imagens (Coluna Esquerda) */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-[400px] h-auto">
            {/* Mostra a imagem principal */}
            <Image
              src={`http://localhost:3000/API/${imagemPrincipal}`}  // Caminho absoluto
              alt={produto.title}
              width={600}
              height={600}
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
        </div>

        {/* Detalhes do Produto (Coluna Direita) */}
        <div className="flex flex-col">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{produto.title}</h1>
            <p className="text-xl text-violet-500 mt-2">
              R${produto.produto.valor.toFixed(2)}
            </p>

            {/* Opções de Pagamento */}
            <div className="mt-4">
              <p className="text-sm text-gray-600">Em até 3x de R${(produto.produto.valor / 3).toFixed(2)}</p>
            </div>

            {/* Quantidade */}
            <div className="mt-4 flex items-center space-x-4">
              <label className="block text-gray-700">Quantidade</label>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantidadeChange('decrease')}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantidade}
                  min="1"
                  className="w-16 text-center border border-gray-300 rounded-md mx-2"
                  readOnly
                />
                <button
                  onClick={() => handleQuantidadeChange('increase')}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  +
                </button>
              </div>
            </div>

            {/* Avaliações */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800">Avaliações</h2>
              <div className="flex mt-2">
                {/* Exemplo de avaliação */}
                <span className="text-yellow-400">★★★★☆</span>
                <p className="text-sm text-gray-600 ml-2">4.0 de 5 estrelas</p>
              </div>
            </div>
          </div>

          {/* Botão de Compra */}
          <div className="mt-6">
            <button className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800">
              Comprar
            </button>
          </div>
        </div>
      </div>

      {/* Exibe as imagens adicionais */}
      <div className="flex flex-wrap gap-4 mt-6">
        {produto.images.map((image, index) => (
          <div key={index} className="w-24 h-24">
            <Image
              src={`http://localhost:3000/API/${image.file}`}
              alt={`Imagem ${index + 1}`}
              width={100}
              height={100}
              className="w-full h-full object-cover rounded-md cursor-pointer"
              onClick={() => handleImageClick(image.file)} // Altera a imagem principal ao clicar
            />
          </div>
        ))}
      </div>
      <div className='descricao'>
        <h3>Descrição</h3>
        <p>{produto.content}</p>
      </div>
    </div>
  );
};

export default ProdutoPage;
