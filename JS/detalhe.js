let posts = JSON.parse(localStorage.getItem("ImagemDetalhe"))
let postcoluna = JSON.parse(localStorage.getItem("ItensDetalhe"))
let postsHTML = '';
let colunaHTML = '';
let z = 0;

const TipoSelecionado = JSON.parse(localStorage.getItem("TipoEscolhido"))
const container = document.getElementById("postcolumn")
container.classList.add("coluna");

if (TipoSelecionado) {
    const imagens = posts.filter(post => post.Tipo === TipoSelecionado)
    const texto = postcoluna.filter(post => post.Tipo === TipoSelecionado)

    for (let i = 0; i < texto.length; i++) {
        const postElement = document.createElement('div');
        postElement.classList.add("cartao1Detalhe");
        postElement.innerHTML = '<div id="' + texto[i].Organizacao + '" class="cartaodinamicoDetalhe">' +
            '<div id = "c" class="card2DetalheOpo">' +
            '<div class="row g-0">' +
            '<div class="col-8 col-md-5">' +
            '<img src="' + imagens[i].imagem + '" style="width:auto; height:auto; padding-right:20px" ' +
            'class="card-img img-fluid rounded-start" alt="animais" />' +
            '</div>' +
            '<div class="col-4 col-md-7">' +
            '<div id="body-detalhe" class="card-body d-flex flex-column">' +
            '<div class="h-100">' +
            '<h3 id="OrganizacaoDetalheOpo" class="card-title">' + texto[i].Organizacao + '</h3>' +
            '<p id="descDetalheOpo" class="card-desc">' + texto[i].Descricaoo + '</p>' +
            '<p id="DataOpo" class="card-desc">' + '<i class= "bi bi-calendar-date icon-orange"> ' + '</i>' + texto[i].Data + '</p>' +
            '<p  id="LocalOpo" class="card-desc">' + '<i class="bi bi-map icon-orange">' + '</i> ' + texto[i].Local + '</p>' +
            '<p id="VagasOpo" class="card-desc">' + '<i class="bi bi-people-fill icon-orange"> ' + '</i>' + texto[i].VagasDisponiveis + '</p>' +
            '<p id="ContactoOpo" class="card-desc">' + '<i class="bi bi bi-telephone icon-orange"> ' + '</i>' + texto[i].Contacto + '</p>' +
            '<p >' + '<a id="' + texto[i].Contacto + '" class="btn btn-primary marcar botao-detalhe">Inscrever-se </a></p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        container.appendChild(postElement);
        



    };

    const botoes = document.querySelectorAll(".cartaodinamicoDetalhe");
    console.log(botoes);
    botoes.forEach((botao) => {
        const idcartao = botao.querySelector(".marcar");
        idcartao.addEventListener('click', () => {
            const Logado = JSON.parse(localStorage.getItem('UtilizadorLogado'));
            const Op = JSON.parse(localStorage.getItem('ItensDetalhe'));
            const Op1 = Op.filter(post=>post.Contacto===idcartao.id);
            
            if (Logado) {
                
                let marca = { "estado": "Pendente", "Organizacao": Op1[0].Organizacao, "Contacto": Op1[0].Contacto, "Data": Op1[0].Data, "Vagas": Op1[0].Vagas, "username": Logado.username, "funcionario":"Por definir" }
                const Data1 = JSON.parse(localStorage.getItem('marcacao')) || []; //Data1 o que vai buscar a marcaçoes
                const Data2 = Data1.filter(post => post.username === Logado.username); //Data2 ir buscar o filtro
                const EC = Data2.find(obj => obj.Contacto===marca.Contacto)
                if(EC){
                    alert('Você já se candidatou para esta vaga.');
                }else{
                    alert('Marcação registada, aguarde por confirmação');
                    Data1.push(marca);
                    localStorage.setItem("marcacao", JSON.stringify(Data1));
                }
                
                
            }else{
                window.location.href="Login.html";
            }
        })
    })

}