import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000"
})
export class AnunciosService {
    listarAnuncios() {
        return axiosInstance.get("http://localhost:3000/posts")
    }
    adicionarAnuncio(anuncioData) {
        console.log(anuncioData)
        return axiosInstance
            .post("/posts", anuncioData) // Usando axiosInstance para a requisição POST
            .then((response) => response.data)
            .catch((error) => {
                console.error("Erro ao adicionar produto ao Estoque:", error, anuncioData);
                throw error;
            });
    }
    atualizarAnuncio(anuncioData) {
            return axiosInstance
              .put(`/posts/${anuncioData.id}`, anuncioData) // Usando axiosInstance para a requisição POST
              .then((response) => response.data)
              .catch((error) => {
                console.error("Erro ao adicionar produto ao Estoque:", error);
                throw error;
              });
              
          }
    excluirAnuncio(id){
         console.log(id)
                return axiosInstance
                .delete(`/posts/${id}`)
                .then((response)=> response.data)
                .catch((error)=>{
                    console.error("Erro ao deletar produto ao Estoque",error)
                    throw error;
                })
    }
    buscarAnuncioPorId(id){
        return axiosInstance.get(`http://localhost:3000/posts/${id}`)
    }
}