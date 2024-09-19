const divProducts = document.querySelector("#div-products")
const buttonModalAddProduct = document.querySelector("#button-modal-add-product")
const modalAddProduct = document.querySelector("#modal-add-product")
const formAddProduct = document.querySelector("#form-add-product")
const inputImagem = document.querySelector("#imagemFile")
console.log(modalAddProduct)

// inputImagem.addEventListener("change", async function(event) {
//   event.preventDefault();
//   const url = "http://localhost:3000/picture";
//   const formData = new FormData();

//   // Adiciona o arquivo ao objeto FormData
//   formData.append("file", inputImagem.files[0]);

//   console.log(inputImagem.files[0]); // Verifique se o arquivo foi selecionado corretamente

//   try {
//     const response = await fetch(url, {
//       method: "POST", // Use POST para enviar dados ao servidor
//       body: formData, // Envia o FormData com o arquivo
//     });

//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }

//     const json = await response.json();
//     console.log(json);
//   } catch (error) {
//     console.error(error.message);
//   }
// });

buttonModalAddProduct.addEventListener("click", function () {
  modalAddProduct.classList.add('show')
  console.log("OK")
})
formAddProduct.addEventListener("submit", async function (event) {
  event.preventDefault();

  const urlImageUpload = "http://localhost:3000/picture";
  const urlProductUpload = "http://localhost:3000/produtos";
  const formData = new FormData();

  // Adiciona o arquivo ao objeto FormData
  formData.append("file", event.currentTarget.txtImagem.files[0]);
 // Verifique se o arquivo foi selecionado corretamente

  try {
    // Envia a imagem para o servidor
    const imageResponse = await fetch(urlImageUpload, {
      method: "POST",
      body: formData, // Envia o FormData com o arquivo
    });

    if (!imageResponse.ok) {
      throw new Error(`Erro ao enviar a imagem: ${imageResponse.status}`);
    }

    const imageJson = await imageResponse.json();
    console.log("Imagem enviada com sucesso:", imageJson);

    // Envia os dados do produto para o servidor
    const productData = {
      nome: "Testando",
      unidade_de_medida: "Metros",
      imagem_Id: imageJson.id, // Use o ID retornado da imagem
      marca: "gg",
      tratamento: "piscina",
      valor: 123.12,
    };

    const productResponse = await fetch(urlProductUpload, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData), // Envia os dados como JSON
    });

    if (!productResponse.ok) {
      alert('Erro')
      throw new Error(`Erro ao enviar o produto: ${productResponse.status}`);
    }

    const productJson = await productResponse.json();
    console.log("Produto enviado com sucesso:", productJson);
  } catch (error) {
    console.error("Erro:", error.message);
  }
});


console.info(divProducts)
async function loadProdcuts() {
  const url = "http://localhost:3000/produtos";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    let produtos = json
    produtos.forEach((produto, index) => {
      let cardProduct = document.createElement('div')
      cardProduct.innerHTML = `
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img src="../../API/${produto.imagem.file}" alt="Front of men&#039;s Basic Tee in black." class="h-full w-full object-cover object-center lg:h-full lg:w-full">
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <a href="#">
                  ${produto.nome}
                </a>
              </h3>
              <p class="mt-1 text-sm text-gray-500">Black</p>
            </div>
            <p class="text-sm font-medium text-gray-900">$${produto.valor}</p>
        </div>
        `
      divProducts.appendChild(cardProduct)

    });
  } catch (error) {
    console.error(error.message);
  }
}
loadProdcuts()