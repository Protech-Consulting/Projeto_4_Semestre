import axios from "axios";
import { error } from "console";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000"
})

export class EstoqueService{
    listarEstoque(){
        return axiosInstance.get("/estoque");
    }
    adicionarEstoque(estoqueData: { produto_Id: any; quantidade: number; }){
         return axiosInstance
              .post("/estoque", estoqueData) // Usando axiosInstance para a requisição POST
              .then((response) => response.data)
              .catch((error) => {
                console.error("Erro ao adicionar produto ao Estoque:", error,estoqueData);
                throw error;
              });
    }
    atualizarEstoque(estoqueData: { produto_Id?: any; quantidade?: number; id?: any; }) {
        return axiosInstance
          .put(`/estoque/${estoqueData.id}`, estoqueData) // Usando axiosInstance para a requisição POST
          .then((response) => response.data)
          .catch((error) => {
            console.error("Erro ao adicionar produto ao Estoque:", error);
            throw error;
          });
          
      }
    deletarEstoque(id){
        console.log(id)
        return axiosInstance
        .delete(`/estoque/${id}`)
        .then((response)=> response.data)
        .catch((error)=>{
            console.error("Erro ao deletar produto ao Estoque",error)
            throw error;
        })
    }
}