import React, { FC, useEffect, useState } from "react";
import { ProdutoService } from "../../../service/produtosService";
import { AnunciosService } from "../../../service/anunciosService";
import Select from "react-select";

const produtoService = new ProdutoService();
const anunciosService = new AnunciosService();

interface ModalAdminAnunciosProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: Record<string, any> | null; // Dados para edição ou null para criar
  recarregarLista: () => void;
}

const ModalAdminAnuncios: React.FC<ModalAdminAnunciosProps> = ({
  isOpen,
  onClose,
  title,
  data,
  recarregarLista,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({
    title: "",
    content: "",
    produtoId: "",
    quantidade: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [produtos, setProdutos] = useState<any[]>([]);

  // Atualiza o estado com os dados fornecidos (caso esteja editando)
  useEffect(() => {
    if (data) {
      setFormData(data);
    } else {
      setFormData({
        produtoId: "",
        title: "",
        content: "",
      });
    }
  }, [data]);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = () => {
    produtoService
      .listarTodos()
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar produtos:", error);
      });
  };

  // Lida com mudanças nos campos de entrada
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Atualiza o produto selecionado
  const handleSelectChange = (selectedOption: any) => {
    setFormData((prev) => ({ ...prev, produtoId: selectedOption.value }));
  };

  // Adiciona imagens selecionadas
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files!);
    setImages((prev) => [...prev, ...selectedFiles]);
  };

  // Remove uma imagem
  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("title", formData.title);
    formPayload.append("content", formData.content);
    formPayload.append("produtoId", formData.produtoId);

    images.forEach((image) => {
        formPayload.append("files", image); // Adicione todos os arquivos na chave "files"
      });
     // Debug do conteúdo do FormData
     for (const pair of formPayload.entries()) {
        console.log(pair[0], pair[1]);
    }
    try {
      if (data) {
        await anunciosService.atualizarAnuncio(formPayload);
      } else {
        console.log(formPayload)
        await anunciosService.adicionarAnuncio(formPayload);
      }
      onClose();
      recarregarLista();
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  // Opções de produtos no select
  const customSelectOptions = produtos.map((produto) => ({
    value: produto.id,
    label: produto.nome,
    imagem: produto.imagem.file,
  }));

  const customSingleValue = ({ data }: any) => (
    <div className="flex items-center">
      <img
        src={`http://localhost:3000/API/${data.imagem}`}
        alt={data.label}
        className="w-8 h-8 mr-2"
      />
      {data.label}
    </div>
  );

  const customOption = (props: any) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div ref={innerRef} {...innerProps} className="flex items-center p-2 cursor-pointer">
        <img
          src={`http://localhost:3000/API/${data.imagem}`}
          alt={data.label}
          className="w-12 h-12 mr-2"
        />
        {data.label}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-[40%]">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            ✖
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Produto</label>
          <Select
            name="produtoId"
            value={data ? customSelectOptions.find((option) => option.value === data.produto.id) : null}
            onChange={handleSelectChange}
            options={customSelectOptions}
            components={{
              SingleValue: customSingleValue,
              Option: customOption,
            }}
          />
          <label className="block mb-2 mt-4">Titulo</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full border px-2 py-1 rounded"
          />
           <label className="block mb-2 mt-4">Conteudo</label>
          <input
            type="text"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="w-full border px-2 py-1 rounded"
          />
          <label className="block mb-2 mt-4">Imagens</label>
          <input name="files" type="file" multiple onChange={handleImageChange} className="w-full" />
          <div className="flex flex-wrap mt-2">
            {images.map((image, index) => (
              <div key={index} className="relative mr-2 mb-2">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`upload-preview-${index}`}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 flex">
            <button type="submit" className="w-full px-4 py-2 bg-[#F28403] text-white rounded hover:bg-[#ff972f]">
              {data ? "Salvar Alterações" : "Adicionar Produto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAdminAnuncios;
