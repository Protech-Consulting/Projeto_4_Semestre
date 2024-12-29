'use client';
import { AnunciosService } from "../../service/anunciosService";
import { useEffect, useState } from "react";
import CardProdutos from "./components/card-produtos";
const anunciosService = new AnunciosService();

export default function Home() {
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
    console.log(anuncios)

  return (
    <>
    <CardProdutos data={anuncios}/>
  </>

  );
}
