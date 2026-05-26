const API_URL = 'https://fakestoreapi.com/products';

async function carregarProdutos() {
  const container = document.getElementById('produtos-container');

  if (!container) return;

  try {
    const response = await fetch(API_URL);
    const produtos = await response.json();

    container.innerHTML = '';

    produtos.slice(0, 10).forEach((produto) => {
      const card = document.createElement('div');
      card.className = 'produto-card';

      card.innerHTML = `
                <img src="${produto.image}" alt="${produto.title}">
                <h3>${produto.title}</h3>
                <p class="preco">R$ ${produto.price.toFixed(2)}</p>
                <button onclick="comprar('${produto.title.replace(/'/g, "\\'")}')">Comprar</button>
            `;

      container.appendChild(card);
    });
  } catch (error) {
    container.innerHTML = '<p>Erro ao carregar os produtos. Tente novamente mais tarde.</p>';
    console.error('Erro na requisição:', error);
  }
}

function comprar(nomeProduto) {
  alert(`Você adicionou "${nomeProduto}" ao carrinho!`);
}

function configurarFormulario() {
  const form = document.getElementById('contato-form');
  const mensagem = document.getElementById('form-mensagem');

  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;

    mensagem.textContent = `Obrigado pela mensagem, ${nome}! Entraremos em contato em breve.`;
    form.reset();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  carregarProdutos();
  configurarFormulario();
});
