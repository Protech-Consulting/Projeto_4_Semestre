import React, { useEffect, useState } from "react";
import { ProdutoService } from "../../../service/produtosService";

const produtoService = new ProdutoService();

interface ModalAdminProductsProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    data: Record<string, any> | null; // Dados para edição ou null para criar
    recarregarLista: () => void;
}

const ModalAdminProducts: React.FC<ModalAdminProductsProps> = ({
    isOpen,
    onClose,
    title,
    data,
    recarregarLista,
}) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        nome: "",
        tratamento: "",
        marca: "",
        unidade_de_medida: "",
        metragem: "",
        valor: "",
        imagem: null, // Caso precise trabalhar com uploads
    });

    // Atualiza o estado com os dados fornecidos (caso esteja editando)
    useEffect(() => {
        if (data) {
            setFormData(data);
        } else {
            setFormData({
                nome: "",
                tratamento: "",
                marca: "",
                unidade_de_medida: "",
                metragem: "",
                valor: "",
                imagem: null,
            });
        }
    }, [data]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (data) {
            console.log("Atualizando produto:", formData);
            // Chame aqui a função de atualização do produto
              // Prepara os dados do produto para envio
              const productData = {
                id: data.id,
                nome: formData.nome,
                unidade_de_medida: formData.unidade_de_medida,
                metragem: parseFloat(formData.metragem),
                marca: formData.marca,
                tratamento: formData.tratamento,
                valor: parseFloat(formData.valor),
            };

            // Envia os dados do produto
            await produtoService.atualizarProduto(productData)

        } else {
            console.log("Criando novo produto:", formData);
            try {
                // Verifica se a imagem foi selecionada
                if (!formData.imagem) {
                    alert("Por favor, selecione uma imagem.");
                    return;
                }

                // Envia a imagem para o servidor
                const imageFormData = new FormData();
                imageFormData.append("file", formData.imagem);

                const imageJson = await produtoService.adicionarImagem(imageFormData)
                console.log("Imagem enviada com sucesso:", imageJson);

                // Prepara os dados do produto para envio
                const productData = {
                    nome: formData.nome,
                    unidade_de_medida: formData.unidade_de_medida,
                    metragem: parseFloat(formData.metragem),
                    imagem_Id: imageJson.id, // Use o ID retornado pela API
                    marca: formData.marca,
                    tratamento: formData.tratamento,
                    valor: parseFloat(formData.valor),
                };

                // Envia os dados do produto
                await produtoService.adicionarProduto(productData)

                alert("Produto enviado com sucesso!");
                // Opcional: Limpar o formulário ou fechar modal
            } catch (error: any) {
                console.error("Erro:", error.message);
                alert(`Erro ao enviar o produto: ${error.message}`);
            }
        }
        onClose();
        recarregarLista();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md w-[40%]">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h2 className="text-xl font-bold">{data ? "Editar Produto" : "Adicionar Produto"}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        ✖
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2">
                        Nome:
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleInputChange}
                            className="w-full border px-2 py-1 rounded"
                        />
                    </label>
                    <label className="block mb-2">
                        Marca:
                        <input
                            type="text"
                            name="marca"
                            value={formData.marca}
                            onChange={handleInputChange}
                            className="w-full border px-2 py-1 rounded"
                        />
                    </label>
                    {data ? null : <label className="block mb-2">
                        Imagem:
                        <input
                            type="file"
                            name="imagem"
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    const file = e.target.files[0]; // Captura o primeiro arquivo selecionado
                                    setFormData((prev) => ({ ...prev, imagem: file })); // Armazena o arquivo no estado
                                }
                            }}
                            className="w-full border px-2 py-1 rounded"
                        />
                        </label>}
                        <label className="block mb-2">
                            Tratamento
                            <select
                                name="tratamento" // Corrige o nome do campo
                                value={formData.tratamento} // Corrige o valor do estado correspondente
                                onChange={handleInputChange}
                                className="w-full border px-2 py-1 rounded" // Adiciona estilização opcional
                            >
                                <option value="Limpeza">Limpeza</option>
                                <option value="Piscina">Piscina</option>
                            </select>
                        </label>
                        <label className="block mb-2">
                            Unidade de Medida
                            <select
                                name="unidade_de_medida" // Corrige o nome do campo
                                value={formData.unidade_de_medida} // Corrige o valor do estado correspondente
                                onChange={handleInputChange}
                                className="w-full border px-2 py-1 rounded" // Adiciona estilização opcional
                            >
                                <option value="Metros">Metros</option>
                                <option value="Centimetros">Centímetros</option>
                            </select>
                        </label>
                        <label className="block mb-2">
                        Metragem:
                        <input
                            type="number"
                            name="metragem"
                            value={formData.metragem}
                            onChange={handleInputChange}
                            className="w-full border px-2 py-1 rounded"
                        />
                    </label>
                    <label className="block mb-2">
                        Valor:
                        <input
                            type="number"
                            name="valor"
                            value={formData.valor}
                            onChange={handleInputChange}
                            className="w-full border px-2 py-1 rounded"
                        />
                    </label>
                        {/* Adicione os outros campos conforme necessário */}
                        <div className="mt-4 flex">
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-[#F28403] text-white rounded hover:bg-[#ff972f]"
                            >
                                {data ? "Salvar Alterações" : "Adicionar Produto"}
                            </button>
                        </div>
                </form>
            </div>
        </div>
    );
};

export default ModalAdminProducts;
