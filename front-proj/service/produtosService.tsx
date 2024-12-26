import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000"
})

export class ProdutoService {
  // Método para listar todos os produtos
  listarTodos() {
    return axiosInstance.get("/produtos");
  }

  // Método para adicionar um produto com imagem
  adicionarProduto(produtoData: { nome: any; unidade_de_medida: any; metragem: number; imagem_Id: any; marca: any; tratamento: any; valor: number; }) {
    return axiosInstance
      .post("/produtos", produtoData) // Usando axiosInstance para a requisição POST
      .then((response) => response.data)
      .catch((error) => {
        console.error("Erro ao adicionar produto:", error);
        throw error;
      });
      
  }
  atualizarProduto(produtoData: { nome: any; unidade_de_medida: any; metragem: number; marca: any; tratamento: any; valor: number;id:any }) {
    return axiosInstance
      .put(`/produtos/${produtoData.id}`, produtoData) // Usando axiosInstance para a requisição POST
      .then((response) => response.data)
      .catch((error) => {
        console.error("Erro ao adicionar produto:", error);
        throw error;
      });
      
  }

    async adicionarImagem(formData: FormData) {
        try {
          const response = await axiosInstance.post("/picture", formData, {
            headers: {
              "Content-Type": "multipart/form-data", // Necessário para enviar arquivos
            },
          });
          return response.data; // Retorna a resposta do upload da imagem
        } catch (error) {
          console.error("Erro ao adicionar imagem:", error);
          throw error;
        }
      }
    async deletarProduto(id: string){
        return axiosInstance
        .delete("produtos/"+id)
        .then((response) => response.data)
        .catch((error) => {
          console.error("Erro ao adicionar produto:", error);
          throw error;
        });
    }
}
