// Obter o elemento HTML onde a tabela será exibida
const tabelaContainer = document.getElementById('tabela-container');

// Obter os dados das marcações do localStorage
const marcaData = JSON.parse(localStorage.getItem('marcacao')) || [];

// Obter o UtilizadorLogado do localStorage
const utilizadorLogado = JSON.parse(localStorage.getItem('UtilizadorLogado')) || {};

// Obter o nome de usuário do UtilizadorLogado
const nomeUsuarioDesejado = utilizadorLogado.username;

// Filtrar as marcações por nome de usuário
const marcaDataFiltrada = marcaData.filter(marca => marca.username === nomeUsuarioDesejado);

// Verificar se há dados disponíveis
if (marcaDataFiltrada.length > 0) {
  // Criar a div de contêiner para a tabela
  const tabelaDiv = document.createElement('div');
  tabelaDiv.classList.add('table-responsive');

  // Criar a estrutura HTML da tabela
  const tabelaElement = document.createElement('table');
  tabelaElement.classList.add('table');

  // Criar a linha de cabeçalho da tabela
  const cabecalhoElement = document.createElement('thead');
  const cabecalhoRowElement = document.createElement('tr');
  const cabecalhoOrganizacaoElement = document.createElement('th');
  cabecalhoOrganizacaoElement.textContent = 'Organização';
  const cabecalhoFuncionarioElement = document.createElement('th');
  cabecalhoFuncionarioElement.textContent = 'Funcionário';
  const cabecalhoContactoElement = document.createElement('th');
  cabecalhoContactoElement.textContent = 'Contacto';
  const cabecalhoDataElement = document.createElement('th');
  cabecalhoDataElement.textContent = 'Data';
  const cabecalhoEstadoElement = document.createElement('th');
  cabecalhoEstadoElement.textContent = 'Estado';

  // Adicionar as colunas de cabeçalho à linha de cabeçalho
  cabecalhoRowElement.appendChild(cabecalhoOrganizacaoElement);
  cabecalhoRowElement.appendChild(cabecalhoFuncionarioElement);
  cabecalhoRowElement.appendChild(cabecalhoContactoElement);
  cabecalhoRowElement.appendChild(cabecalhoDataElement);
  cabecalhoRowElement.appendChild(cabecalhoEstadoElement);

  // Adicionar a linha de cabeçalho ao cabeçalho da tabela
  cabecalhoElement.appendChild(cabecalhoRowElement);
  tabelaElement.appendChild(cabecalhoElement);

  // Criar o corpo da tabela
  const corpoElement = document.createElement('tbody');

  // Iterar sobre as marcações e criar as linhas do corpo da tabela
  marcaDataFiltrada.forEach(marca => {
    // Criar uma nova linha na tabela
    const linhaElement = document.createElement('tr');

    // Criar as células da linha com os dados da marcação
    const organizacaoElement = document.createElement('td');
    organizacaoElement.textContent = marca.Organizacao;

    const funcionarioElement = document.createElement('td');
    funcionarioElement.textContent = marca.funcionario;

    const contatoElement = document.createElement('td');
    contatoElement.textContent = marca.Contacto;

    const dataElement = document.createElement('td');
    dataElement.textContent = marca.Data;

    const estadoElement = document.createElement('td');
    const estadoBotaoElement = document.createElement('button');
    estadoBotaoElement.textContent = marca.estado;

    // Definir classes CSS e estilo do botão de acordo com o estado
    switch (marca.estado) {
      case 'Pendente':
        estadoBotaoElement.classList.add('btn', 'btn-warning');
        estadoBotaoElement.style.width = '100px'; // Ajustar o tamanho do botão para Pendente
        break;
      case 'Aceite':
        estadoBotaoElement.classList.add('btn', 'btn-success');
        estadoBotaoElement.style.width = '100px'; // Ajustar o tamanho do botão para Aceite
        break;
      case 'Rejeitado':
        estadoBotaoElement.classList.add('btn', 'btn-danger');
        estadoBotaoElement.style.width = '100px'; // Ajustar o tamanho do botão para Rejeitada
        break;
      default:
        estadoBotaoElement.classList.add('btn', 'btn-secondary');
        estadoBotaoElement.style.width = '100px'; // Ajustar o tamanho do botão para outros estados
        break;
    }

    // Desabilitar o botão para evitar interações
    estadoBotaoElement.disabled = true;

    // Adicionar o botão de estado à célula
    estadoElement.appendChild(estadoBotaoElement);

    // Adicionar as células à linha
    linhaElement.appendChild(organizacaoElement);
    linhaElement.appendChild(funcionarioElement);
    linhaElement.appendChild(contatoElement);
    linhaElement.appendChild(dataElement);
    linhaElement.appendChild(estadoElement);

    // Adicionar a linha ao corpo da tabela
    corpoElement.appendChild(linhaElement);
  });

  // Adicionar o corpo da tabela à tabela
  tabelaElement.appendChild(corpoElement);

  // Adicionar a tabela à div de contêiner
  tabelaDiv.appendChild(tabelaElement);

  // Adicionar a div de contêiner ao elemento HTML
  tabelaContainer.appendChild(tabelaDiv);
} else {
  // Se não houver marcações, exibir uma mensagem de nenhum dado encontrado
  const mensagemElement = document.createElement('p');
  mensagemElement.textContent = 'Nenhuma marcação encontrada.';
  tabelaContainer.appendChild(mensagemElement);
}
