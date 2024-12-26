import React, { FC, useEffect, useState } from "react";
import { ProdutoService } from "../../../service/produtosService";
import { EstoqueService } from "../../../service/estoqueService";
import Select from "react-select"; // Importe o react-select

const produtoService = new ProdutoService();
const estoqueService = new EstoqueService();

interface ModalAdminEstoqueProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    data: Record<string, any> | null; // Dados para edição ou null para criar
    recarregarLista: () => void;
}

const ModalAdminEstoque: React.FC<ModalAdminEstoqueProps> = ({
    isOpen,
    onClose,
    title,
    data,
    recarregarLista,
}) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        produto_Id: "",
        quantidade: "",
    });

    // Atualiza o estado com os dados fornecidos (caso esteja editando)
    useEffect(() => {
        if (data) {
            setFormData(data);
        } else {
            setFormData({
                produto_Id: "",
                quantidade: "",
            });
        }
    }, [data]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Função para atualizar o produto_id quando uma opção for selecionada
    const handleSelectChange = (selectedOption: any) => {
        setFormData((prev) => ({ ...prev, produto_Id: selectedOption.value }));
        console.log("Produto selecionado", selectedOption);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (data) {
            console.log("Editando produto:", formData);
            // Se estiver editando, faça algo com os dados
            const estoqueData = {
                id: data.id,
                produto_Id: formData.produto_Id,
                quantidade: parseInt(formData.quantidade),
            };

            // Envia os dados do produto
            await estoqueService.atualizarEstoque(estoqueData)
        } else {
            console.log("Criando novo produto:", formData);
            const estoqueData = {
                produto_Id: formData.produto_Id,
                quantidade: parseInt(formData.quantidade),
            };

            // Envia os dados do produto
            await estoqueService.adicionarEstoque(estoqueData)
        }
        onClose();
        recarregarLista();
    };

    const [produtos, setProdutos] = useState<any[]>([]);

    useEffect(() => {
        console.log("useEffect chamado");
        carregarProdutos();
    }, []);

    const carregarProdutos = () => {
        produtoService
            .listarTodos()
            .then((response) => {
                console.log("Produtos carregados:", response.data);
                setProdutos(response.data); // Atualiza o estado com os dados
            })
            .catch((error) => {
                console.error("Erro ao carregar produtos:", error);
            });
    };

    // Função para formatar as opções do select
    const customSelectOptions = produtos.map((produto) => ({
        value: produto.id,
        label: produto.nome, // Apenas o nome aqui
        imagem: produto.imagem.file, // Armazene o caminho da imagem
    }));

    // Customização da opção do Select
    const customSingleValue = ({ data }: any) => (
        <div className="flex items-center">
            <img
                src={`http://localhost:3000/API/${data.imagem}`} // URL da imagem
                alt={data.label}
                className="w-8 h-8 mr-2"
            />
            {data.label}
        </div>
    );
    console.log(data)

    const customOption = (props: any) => {
        const { data, innerRef, innerProps } = props;
        return (
            <div ref={innerRef} {...innerProps} className="flex items-center p-2 cursor-pointer">
                <img
                    src={`http://localhost:3000/API/${data.imagem}`} // URL da imagem
                    alt={data.label}
                    className="w-12 h-12 mr-2"
                />
                {data.label}
            </div>
        );
    };

    if (!isOpen) return null; // Verificação para não renderizar quando não estiver aberto

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md w-[40%]">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h2 className="text-xl font-bold">{data ? "Editar Produto" : "Adicionar Produto ao Estoque"}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        ✖
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2">Produto</label>
                    <Select
    
                        name="produto_Id"
                        value={data ? customSelectOptions.find(option => option.value === data.produto.id) : null}  // Seleciona o produto baseado no valor do formData
                        onChange={handleSelectChange} // Atualiza o produto_id
                        options={customSelectOptions}
                        getOptionLabel={(e) => e.label} // Para garantir que a label personalizada seja usada
                        components={{
                            SingleValue: customSingleValue, // Para a opção selecionada
                            Option: customOption, // Para as opções no dropdown
                        }}
                    />
                    <label className="block mb-2">Quantidade</label>
                    <input
                        type="number"
                        name="quantidade"
                        value={formData.quantidade}
                        onChange={handleInputChange}
                        className="w-full border px-2 py-1 rounded"
                    />
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

export default ModalAdminEstoque;
