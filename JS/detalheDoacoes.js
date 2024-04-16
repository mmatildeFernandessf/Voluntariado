// Obtém os valores do localStorage
let postsDetalhesDoacoes = JSON.parse(localStorage.getItem("ImagensDetalhesDoacoes"));
let postcolunaDetalhesDoacoes = JSON.parse(localStorage.getItem("DetalhesDoacoes"));
let postsHTMLDetalhesDoacoes = '';
let colunaHTMLDetalhesDoacoes = '';

const TipoDoacaoSelecionado = JSON.parse(localStorage.getItem("TipoEscolhido1"));
const containerDetalhesDoacoes = document.getElementById("postcolumnDetalhesDoacoes");
const container = document.getElementById("postcolumnDetalhesDoacoes")



// Recupera as informações da última doação armazenada
const ultimaDoacao = JSON.parse(localStorage.getItem('UltimaDoacao'));

// Obtém o valor total de doações armazenado no localStorage para o tipo selecionado
let totalDinheiroDoado = parseFloat(localStorage.getItem(`TotalDinheiroDoado_${TipoDoacaoSelecionado}`)) || 0;

let todasDoacoes = JSON.parse(localStorage.getItem('TodasDoacoes')) || [];

// Obtém o valor máximo para o tipo de doação selecionado
const valorMaximo = postcolunaDetalhesDoacoes.find(post => post.TipoDoacoes === TipoDoacaoSelecionado).valorMaximo;



if (TipoDoacaoSelecionado) {
    const imagensDetalhesDoacoes = postsDetalhesDoacoes.filter(postDetalhesDoacoes => postDetalhesDoacoes.TipoDoacoes === TipoDoacaoSelecionado);
    const textoDetalheDoacoes = postcolunaDetalhesDoacoes.filter(postDetalhesDoacoes => postDetalhesDoacoes.TipoDoacoes === TipoDoacaoSelecionado);

    // Define o valor máximo para cada tipo de doação no objeto postcolunaDetalhesDoacoes
    postcolunaDetalhesDoacoes.forEach(post => {
        if (post.TipoDoacoes === "Medicamentos") {
            post.valorMaximo = 200; 
        } else if (post.TipoDoacoes === "Casas Seguras") {
            post.valorMaximo = 300; 
        } else if (post.TipoDoacoes === "Cuidar Animais") {
            post.valorMaximo = 400; 
        }
        else if (post.TipoDoacoes === "Roupas") {
            post.valorMaximo = 500; 
        }
        else if (post.TipoDoacoes === "Ensinar") {
            post.valorMaximo = 600; 
        }
        else if (post.TipoDoacoes === "Comida Animais") {
            post.valorMaximo = 700; 
        }
    });

    const valorMaximo = postcolunaDetalhesDoacoes.find(post => post.TipoDoacoes === TipoDoacaoSelecionado).valorMaximo;


    for (let i = 0; i < textoDetalheDoacoes.length; i++) {
        // Verifica se o tipo de doação atual é igual ao tipo selecionado pelo usuário
        if (textoDetalheDoacoes[i].TipoDoacoes === TipoDoacaoSelecionado) {
            const postElementDetalhesDoacoes = document.createElement('div');
            postElementDetalhesDoacoes.classList.add("cartao1");
            postElementDetalhesDoacoes.innerHTML = '<div id="' + textoDetalheDoacoes[i].Instituicao + '" class="cartaodinamico">' +
                '<div id="c" class="card2DetalhesDoacoes">' +
                '<div class="row g-0">' +
                '<div class="col-8 col-md-5">' +
                '<img src="' + imagensDetalhesDoacoes[i].imagemDoacoes + '" style="width:auto; height:auto; padding-right:20px" ' +
                'class="card-img img-fluid rounded-start" alt="Categoria" />' +
                '</div>' +
                '<div class="col-4 col-md-7">' +
                '<div id="body-detalhe" class="card-body d-flex flex-column">' +
                '<div class="h-100">' +
                '<h3 id="tituloDetalheDoacoes" class="card-title">' + textoDetalheDoacoes[i].titulo + '</h3>' +
                '<p id="tipo" class="card-desc">' + textoDetalheDoacoes[i].TipoDoacoes + '</p>' +
                '<p id="descDetalheDoacoes" class="card-desc">' + textoDetalheDoacoes[i].DescricaoDoacoes + '</p>' +
                '<p id="Instituicao" class="card-title">' + '<i class="bi bi-chat-square-heart icon-orange"></i> ' + textoDetalheDoacoes[i].Instituicao + '</p>' +
                '<p id="multibanco" class="card-desc">' + '<i class="bi bi-cash-coin icon-orange"></i> ' + textoDetalheDoacoes[i].ReferenciaMultibanco + '</p>' +
                '<p id="ContactoInstituicao" class="card-desc">' + '<i class="bi bi bi-telephone icon-orange"> ' + '</i>' + textoDetalheDoacoes[i].ContactoInstituicao + '</p>' +
                '<div id="valorDoacoes" class="form-group">' +
                '<label for="valorDoacao">Valor da doação (Máximo: ' + valorMaximo + ')</label>' +
                '<input type="number" id="valorDoacao' + i + '" class="form-control" placeholder="Insira o valor da doação">' +
                '</div>' +
                '<p>' + '<a id="' + textoDetalheDoacoes[i].ContactoInstituicao + '" class="btn btn-primary marcar"> Doar </a></p>' +
                '<div id="progress-bar-container">' +
                '<div id="progress-bar"></div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
            containerDetalhesDoacoes.appendChild(postElementDetalhesDoacoes);
        }
    }

    const progressBar = document.getElementById('progress-bar');
    const progress = (totalDinheiroDoado / valorMaximo) * 100;

    if (progress <= 100) {
        progressBar.style.width = progress + '%';
        progressBar.innerText = progress.toFixed(1) + '%';
    } else {
        progressBar.style.width = '100%';
        progressBar.innerText = '100%';
    }

    const btnDoar = document.querySelectorAll(".marcar");

    btnDoar.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const Logado = JSON.parse(localStorage.getItem('UtilizadorLogado'));

            if (Logado) {
                const valorDoacaoInput = document.getElementById('valorDoacao' + index);
                const valorDoacao = valorDoacaoInput.value.trim();


                if (valorDoacao === "" || Number(valorDoacao) <= 0) {
                    alert("Por favor, insira um valor de doação válido.");
                } else if (Number(valorDoacao) > valorMaximo) {
                    alert("Não é possível doar essa quantia!");
                } else if (Number(valorDoacao) + totalDinheiroDoado > valorMaximo) {
                    alert("Não é possível doar essa quantia!");
                }else {
                    // Armazena as informações da doação no localStorage
                    const doacao = {
                        valor: valorDoacao,
                        username: Logado.username,
                        instituicao: textoDetalheDoacoes[index].Instituicao
                    };

                    // Adiciona a nova doação ao array de todas as doações
                    todasDoacoes.push(doacao);

                    // Salva o array atualizado no localStorage
                    localStorage.setItem('TodasDoacoes', JSON.stringify(todasDoacoes));
                    localStorage.setItem('UltimaDoacao', JSON.stringify(doacao));

                    // Adiciona o valor doado ao total específico para o tipo selecionado
                    totalDinheiroDoado += Number(valorDoacao);

                    // Atualiza a barra de progresso específica para o tipo selecionado
                    const progress = (totalDinheiroDoado / valorMaximo) * 100;

                    if (progress <= 100) {
                        progressBar.style.width = progress + '%';
                        progressBar.innerText = progress.toFixed(1) + '%';
                    } else {
                        progressBar.style.width = '100%';
                        progressBar.innerText = '100%';
                    }

                    // Verifica se o valor máximo foi atingido para o tipo selecionado
                    if (totalDinheiroDoado > valorMaximo) {
                        alert("O valor de doação excede o valor máximo!");
                       
                    } else {
                        // Salva o novo valor total de doações específico para o tipo selecionado no localStorage
                        localStorage.setItem(`TotalDinheiroDoado_${TipoDoacaoSelecionado}`, totalDinheiroDoado.toString());

                        // Exibe as informações da última doação no console
                        console.log('Última doação:');
                        console.log('Valor: ' + doacao.valor);
                        console.log('Utilizador: ' + doacao.utilizador);
                        console.log('Instituição: ' + doacao.instituicao);
                        console.log('Valor total das doações para o tipo ' + TipoDoacaoSelecionado + ': ' + totalDinheiroDoado);



                        // Processar a doação
                        alert('Doação efetuada com sucesso!');
                    }
                }
            } else {
                alert('Você precisa fazer login primeiro.');
                //window.location.href = 'login.html'; // Redireciona para a página de login
            }
        });
    });
    console.log("Máximo que pode doar: " + valorMaximo);
}