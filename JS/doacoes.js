const tabelaDoacoes = document.getElementById('tabela-doacoes');

// Obter os dados das doações do localStorage
const listaDoacoes = JSON.parse(localStorage.getItem('TodasDoacoes')) || [];

// Obter o UtilizadorLogado do localStorage
const utilizadorLog = JSON.parse(localStorage.getItem('UtilizadorLogado')) || {};

// Obter o nome de usuário do UtilizadorLogado
const nomeUsuarioDesej = utilizadorLog.username;

// Filtrar as doações por nome de usuário
const listaDoacoesFiltrada = listaDoacoes.filter(doacao => doacao.username === nomeUsuarioDesej);

// Verificar se há dados disponíveis
if (listaDoacoesFiltrada.length > 0) {
  // Criar a div de contêiner para a tabela
  const tabelaDiv1 = document.createElement('div');
  tabelaDiv1.classList.add('table-responsive');

  // Criar a estrutura HTML da tabela
  const tabelaElement1 = document.createElement('table');
  tabelaElement1.classList.add('table');

  // Criar a linha de cabeçalho da tabela
  const cabecalhoElement1 = document.createElement('thead');
  const cabecalhoRowElement1 = document.createElement('tr');
  const cabecalhoInstituicaoElement1 = document.createElement('th');
  cabecalhoInstituicaoElement1.textContent = 'Instituição';
  const cabecalhoValorElement1 = document.createElement('th');
  cabecalhoValorElement1.textContent = 'Valor Doado';

  // Adicionar as colunas de cabeçalho à linha de cabeçalho
  cabecalhoRowElement1.appendChild(cabecalhoInstituicaoElement1);
  cabecalhoRowElement1.appendChild(cabecalhoValorElement1);

  // Adicionar a linha de cabeçalho ao cabeçalho da tabela
  cabecalhoElement1.appendChild(cabecalhoRowElement1);
  tabelaElement1.appendChild(cabecalhoElement1);

  // Criar o corpo da tabela
  const corpoElement1 = document.createElement('tbody');

  // Iterar sobre as doações e criar as linhas do corpo da tabela
  listaDoacoesFiltrada.forEach(doacao => {
    // Criar uma nova linha na tabela
    const linhaElement1 = document.createElement('tr');

    // Criar as células da linha com os dados da doação
    const instituicaoElement1 = document.createElement('td');
    instituicaoElement1.textContent = doacao.instituicao;

    const valorElement1 = document.createElement('td');
    valorElement1.textContent = doacao.valor;

    // Adicionar as células à linha
    linhaElement1.appendChild(instituicaoElement1);
    linhaElement1.appendChild(valorElement1);

    // Adicionar a linha ao corpo da tabela
    corpoElement1.appendChild(linhaElement1);
  });

  // Adicionar o corpo da tabela à tabela
  tabelaElement1.appendChild(corpoElement1);

  // Adicionar a tabela à div de contêiner
  tabelaDiv1.appendChild(tabelaElement1);

  // Adicionar a div de contêiner ao elemento HTML
  tabelaDoacoes.appendChild(tabelaDiv1);
} else {
  // Se não houver doações, exibir uma mensagem de nenhum dado encontrado
  const mensagemElement1 = document.createElement('p');
  mensagemElement1.textContent = 'Nenhuma doação encontrada.';
  tabelaDoacoes.appendChild(mensagemElement1);
}
