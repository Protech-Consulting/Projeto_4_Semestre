const divProducts = document.querySelector("#div-products");
const buttonModalAddProduct = document.querySelector("#button-modal-add-product");
const modalAddProduct = document.querySelector("#modal-add-product");
const modalUpdateProduct = document.querySelector("#modal-update-product");
const formAddProduct = document.querySelector("#form-add-product");
const formUpdateProduct = document.querySelector('#form-update-product')
const inputImagem = document.querySelector("#imagemFile");
const content = document.querySelector('.principal');
const buttonCloseModal = document.querySelector('#close-modal');
const buttonCloseModalUpdate = document.querySelector('#close-modal-update');
let productId = null
console.log(buttonCloseModalUpdate)
function formatarMoeda(e) {
  var elemento = e;
  var valor = elemento.value;
  
  valor = valor + '';
  valor = parseInt(valor.replace(/[\D]+/g,''));
  
  debugger;
  valor = valor + '';
  
  debugger;
  valor = valor.replace(/([0-9]{2})$/g, ",$1");

  if (valor.length > 6) {
    valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  }
  
  if(isNaN(valor)){
     debugger;
  }else{
    debugger;
  }
  
  elemento.value = valor;
}
// Fecha o modal quando o botão de fechar for clicado
buttonCloseModalUpdate.addEventListener("click", function () {
  modalUpdateProduct.classList.remove('show');
  content.classList.remove('show');
  modalUpdateProduct.classList.add('hide');
  console.log("Modal fechado");
});
buttonCloseModal.addEventListener("click", function () {
  modalAddProduct.classList.remove('show');
  content.classList.remove('show');
  modalAddProduct.classList.add('hide');
  console.log("Modal fechado");
});


// Abre o modal quando o botão de adicionar produto for clicado
buttonModalAddProduct.addEventListener("click", function () {
  modalAddProduct.classList.remove('hide');
  modalAddProduct.classList.add('show');
  content.classList.add('show');
  console.log("Modal aberto");
});

// Envio do formulário
formAddProduct.addEventListener("submit", async function (event) {
  event.preventDefault(); // Impede a atualização da página
  const submitButton = event.target.querySelector("button[type='submit']");
  submitButton.disabled = true; // Desabilita o botão enquanto o envio está ocorrendo

  const nome = event.currentTarget.txtNomeProduto.value;
  const marca = event.currentTarget.txtMarcaProduto.value
  const unidade_de_medida = event.currentTarget.txtUnidadeMedida.value
  const metragem = event.currentTarget.txtMetragemProduto.value
  const valor = event.currentTarget.txtValorProduto.value
  const tratamento = event.currentTarget.txtTratamento.value
  const imagemFile = event.currentTarget.txtImagem.files[0];

  const urlImageUpload = "http://localhost:3000/picture";
  const urlProductUpload = "http://localhost:3000/produtos";
  const formData = new FormData();

  // Verifique se o arquivo foi selecionado corretamente
  if (imagemFile) {
    formData.append("file", imagemFile);

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
        nome: nome,
        unidade_de_medida: unidade_de_medida,
        metragem: parseFloat(metragem),
        imagem_Id: imageJson.id, // Use o ID retornado da imagem
        marca: marca,
        tratamento: tratamento,
        valor: parseFloat(valor),
      };

      const productResponse = await fetch(urlProductUpload, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData), // Envia os dados como JSON
      });

      if (!productResponse.ok) {
        throw new Error(`Erro ao enviar o produto: ${productResponse.status}`);
      }

      const productJson = await productResponse.json();
      console.log("Produto enviado com sucesso:", productJson);

      // Opcional: Fechar o modal após o envio
      modalAddProduct.classList.remove('show');
      content.classList.remove('show');
      modalAddProduct.classList.add('hide');
      console.log("Modal fechado após envio");

      // Carregar novamente a lista de produtos
      loadProducts();

    } catch (error) {
      console.error("Erro:", error.message);
    }
  } else {
    console.log("Nenhuma imagem selecionada.");
  }

  // Reabilita o botão ao final
  submitButton.disabled = false;
});

// Função para carregar os produtos
async function loadProducts() {
  const url = "http://localhost:3000/produtos";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao carregar os produtos: ${response.status}`);
    }

    const produtos = await response.json();
    console.log("Produtos carregados:", produtos);

    divProducts.innerHTML = `<table class="table table-light table-hover table-striped mt-3">
                    <thead>
                        <tr>
                            <th></th>
                            <th scope="col">Nome</th>
                            <th scope="col">Tratamento</th>
                            <th scope="col">Marca</th>
                            <th scope="col">ID</th>
                            <th scope="col">Unidade de Medida</th>
                            <th scope="col">Metragem</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody id="div-products-body">
                    </tbody>
                </table>`;

    const divProductsBody = document.querySelector("#div-products-body");

    produtos.forEach(produto => {
      let cardProduct = document.createElement('tr');
      cardProduct.innerHTML = `
        <td class="produto-name">
          <img class="imagem-product" src="../../API/${produto.imagem.file}" alt="Imagem do produto">
        </td>
        <td>${produto.nome}</td>
        <td>${produto.tratamento}</td>
        <td>${produto.marca}</td>
        <td>${produto.id}</td>
        <td>${produto.unidade_de_medida}</td>
        <td>${produto.metragem}</td>
        <td>${produto.valor}</td>
        <td>
          <button class="btn btn-outline-warning" value="${produto.id}" id="button-update-product"><i class="bi bi-pencil-fill"></i></button>
          <button class="btn btn-outline-danger" value="${produto.id}" id="button-delete-product"><i class="bi bi-trash3"></i></button>
        </td>
      `;

      // Adiciona os eventos de exclusão dinamicamente
      const buttonDeleteProduct = cardProduct.querySelector("#button-delete-product");
      const buttonUpdateProduct = cardProduct.querySelector("#button-update-product");
      console.log(buttonUpdateProduct)
      buttonUpdateProduct.addEventListener("click", async function () {
        productId = buttonUpdateProduct.value
        const url = `http://localhost:3000/produtos/${productId}`
        try {
          const response = await fetch(url, {
            method: "GET",
          });

          if (!response.ok) {
            throw new Error(`Erro ao Buscar o produto: ${response.status}`);
          }

          console.log("Produto Buscado com sucesso");
          const produto = await response.json();
          const txtNomeUpdate = document.querySelector('#txtNomeProdutoUpdate')
          const txtMarcaProdutoUpdate = document.querySelector('#txtMarcaProdutoUpdate')
          const txtTratamentoUpdate = document.querySelector('#txtTratamentoUpdate')
          const txtUnidade_de_medida = document.querySelector('#txtUnidadeMedidaUpdate')
          console.log(txtUnidade_de_medida)
          const txtMetragem = document.querySelector('#txtMetragemProdutoUpdate')
          const txtValor = document.querySelector('#txtValorProdutoUpdate')
          txtNomeUpdate.value = produto.nome
          txtMarcaProdutoUpdate.value = produto.marca
          txtUnidade_de_medida.value = produto.unidade_de_medida
          txtMetragem.value = produto.metragem
          txtValor.value = produto.valor
          txtTratamentoUpdate.value = produto.tratamento
          console.log(produto)
          modalUpdateProduct.classList.remove('hide');
          modalUpdateProduct.classList.add('show');
          content.classList.add('show');
          console.log("Modal aberto");

          formUpdateProduct.addEventListener("submit", async function (event) {
            event.preventDefault(); // Impede a atualização da página
            const submitButton = event.target.querySelector("button[type='submit']");
            submitButton.disabled = true; // Desabilita o botão enquanto o envio está ocorrendo

            const nome = event.currentTarget.txtNomeProdutoUpdate.value;
            const marca = event.currentTarget.txtMarcaProdutoUpdate.value
            const unidade_de_medida = event.currentTarget.txtUnidadeMedidaUpdate.value
            const metragem = event.currentTarget.txtMetragemProdutoUpdate.value
            const valor = event.currentTarget.txtValorProdutoUpdate.value
            const tratamento = event.currentTarget.txtTratamentoUpdate.value
            const urlProductUpload = `http://localhost:3000/produtos/${productId}`;
            console.log(urlProductUpload)
            try {


              // Envia os dados do produto para o servidor
              const productData = {
                nome: nome,
                unidade_de_medida: unidade_de_medida,
                metragem: parseFloat(metragem),
                marca: marca,
                tratamento: tratamento,
                valor: parseFloat(valor),
              };

              const productResponse = await fetch(urlProductUpload, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(productData), // Envia os dados como JSON
              });

              if (!productResponse.ok) {
                throw new Error(`Erro ao enviar o produto: ${productResponse.status}`);
              }

              const productJson = await productResponse.json();
              console.log("Produto enviado com sucesso:", productJson);

              // Opcional: Fechar o modal após o envio
              modalUpdateProduct.classList.remove('show');
              content.classList.remove('show');
              modalUpdateProduct.classList.add('hide');
              console.log("Modal fechado após envio");

              // Carregar novamente a lista de produtos
              loadProducts();

            } catch (error) {
              console.error("Erro:", error.message);
            }

            // Reabilita o botão ao final
            submitButton.disabled = false;
          });


        } catch (error) {
          console.error("Erro ao Buscar o produto:", error.message);
        }

      })
      buttonDeleteProduct.addEventListener("click", async function () {
        console.log('OK')
        const productId = buttonDeleteProduct.value;
        const url = `http://localhost:3000/produtos/${productId}`;

        try {
          const response = await fetch(url, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error(`Erro ao deletar o produto: ${response.status}`);
          }

          console.log("Produto deletado com sucesso");
          loadProducts(); // Atualiza a lista de produtos após a exclusão
        } catch (error) {
          console.error("Erro ao deletar o produto:", error.message);
        }
      });

      divProductsBody.appendChild(cardProduct);
    });
  } catch (error) {
    console.error("Erro ao carregar os produtos:", error.message);
  }
}

// Carregar os produtos assim que a página for carregada
loadProducts();