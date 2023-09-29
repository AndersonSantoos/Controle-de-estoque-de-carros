class Carro {
    constructor(nome, preco, cor, ano, marca) {
        this.nome = nome;
        this.ano = ano;
        this.preco = preco;
        this.cor = cor;
        this.marca = marca;
    }
}

const carros = [
    new Carro("Gol", 35000, "Branco", 2023, "Volkswagen"),
    new Carro("Onix", 42000, "Prata", 2023, "Chevrolet"),
    new Carro("Argo", 58000, "Vermelho", 2018, "Fiat"),
    new Carro("Mobi", 42800, "Prata", 2017, "Fiat"),
    new Carro("Kwid", 49900, "Preto", 2019, "Renault"),
    new Carro("Sandero", 55900, "Prata", 2021, "Renault"),
    new Carro("Crossfox", 51000, "Branco", 2016, "Volkswagen"),
    new Carro("Siena", 38900, "Bege", 2015, "Fiat"),
    new Carro("Logan", 50900, "Branco", 2020, "Renault"),
    new Carro("Hilux", 155000, "Prata", 2013, "Toyota"),
    // Adicione mais carros aqui...
];

let usuarioLogado = false;
let carroSelecionado = null;

const loginPage = document.getElementById("loginPage");
const mainPage = document.getElementById("mainPage");
const purchasePage = document.getElementById("purchasePage");
const carList = document.getElementById("carList");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const addCarBtn = document.getElementById("addCarBtn");
const editCarBtn = document.getElementById("editCarBtn");
const deleteCarBtn = document.getElementById("deleteCarBtn");
const backToMainBtn = document.getElementById("backToMainBtn");

loginBtn.addEventListener("click", () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Simples validação de usuário e senha para este exemplo
    if (username === "admin" && password === "12345") {
        usuarioLogado = true;
        exibirPaginaPrincipal();
    } else {
        alert("Usuário ou senha incorretos.");
    }
});

logoutBtn.addEventListener("click", () => {
    usuarioLogado = false;
    exibirPaginaLogin();
});

addCarBtn.addEventListener("click", () => {
    const novoCarro = criarCarro();
    carros.push(novoCarro);
    atualizarListaDeCarros();
});

editCarBtn.addEventListener("click", () => {
    const novoCarro = criarCarro();
    carros[carroSelecionado] = novoCarro;
    atualizarListaDeCarros();
    carroSelecionado = null;
});

deleteCarBtn.addEventListener("click", () => {
    if (carroSelecionado !== null) {
        carros.splice(carroSelecionado, 1);
        atualizarListaDeCarros();
        carroSelecionado = null;
    }
});

backToMainBtn.addEventListener("click", () => {
    exibirPaginaPrincipal();
});

function criarCarro() {
    const nome = prompt("Nome do carro:");
    const preco = parseFloat(prompt("Preço do carro:"));
    const cor = prompt("Cor do carro:");
    const ano = parseInt(prompt("Ano do carro:"));
    const marca = prompt("Marca do carro:");

    return new Carro(nome, preco, cor, ano, marca);
}

function atualizarListaDeCarros() {
    carList.innerHTML = "";
    carros.forEach((carro, index) => {
        const li = document.createElement("li");
        li.textContent = `Nome: ${carro.nome} - Preço R$: ${carro.preco.toFixed(2)} - Ano: ${carro.ano}`;
        li.addEventListener("click", () => {
            selecionarCarro(index);
        });

        // Adicione uma classe CSS 'selecionado' se o carro estiver selecionado
        if (index === carroSelecionado) {
            li.classList.add("selecionado");
        }

        carList.appendChild(li);
    });
}


function selecionarCarro(index) {
    // Remova a seleção do carro anteriormente selecionado
    const carroSelecionadoAnterior = document.querySelector(".selecionado");
    if (carroSelecionadoAnterior) {
        carroSelecionadoAnterior.classList.remove("selecionado");
    }

    // Atualize a variável 'carroSelecionado' com o novo índice selecionado
    carroSelecionado = index;

    // Adicione uma classe CSS 'selecionado' ao carro selecionado atual
    const carroSelecionadoAtual = document.querySelector(`#carList li:nth-child(${index + 1})`);
    if (carroSelecionadoAtual) {
        carroSelecionadoAtual.classList.add("selecionado");
    }

    // Exibir as informações do carro selecionado na página principal
    const carro = carros[index];
    const carInfo = `Nome: ${carro.nome}\nPreço: R$ ${carro.preco.toFixed(2)}\nCor: ${carro.cor}\nAno: ${carro.ano}\nMarca: ${carro.marca}`;
    alert(`Informações do Carro:\n\n${carInfo}`);
}


function exibirPaginaLogin() {
    loginPage.style.display = "block";
    mainPage.style.display = "none";
    purchasePage.style.display = "none";
}

function exibirPaginaPrincipal() {
    loginPage.style.display = "none";
    mainPage.style.display = "block";
    purchasePage.style.display = "none";
    atualizarListaDeCarros();
}

function exibirPaginaCompra() {
    loginPage.style.display = "none";
    mainPage.style.display = "none";
    purchasePage.style.display = "block";
}

exibirPaginaLogin();