var userData = localStorage.getItem('UtilizadorLogado');
var storedUsersData = localStorage.getItem('utilizador'); //obtem os dados do utilizador armazenados em localstorage

//UtilizadorLogado: Essa chave é usada para armazenar os dados do utilizador quando ele faz login ou está autenticado no sistema

if (userData) {
  // Converter os dados de volta para um objeto JavaScript
  var userr = JSON.parse(userData);

  console.log(userr);
  console.log(userr.nome); // em localstorage é nome

  // Exibir os dados do usuário no container
  document.getElementById('display-name').textContent = userr.nome;
  document.getElementById('display-username').textContent = userr.username;
  document.getElementById('display-email').textContent = userr.email;

  // Selecionar o botão "Editar Perfil"
  var editProfileButton = document.getElementById('edit-profile-button');

  // Adicionar evento de clique ao botão
  editProfileButton.addEventListener('click', function () {
    var userData = localStorage.getItem('UtilizadorLogado');
    if (userData) {
      var user = JSON.parse(userData);

      // Armazenar os dados do usuário no LocalStorage com a chave "UtilizadorEdit"
      localStorage.setItem('UtilizadorEdit', JSON.stringify(user));
    }
    
  });

  var logoutButton = document.getElementById('logout-button');

  // Adicionar um ouvinte de evento para o botão de logout
  logoutButton.addEventListener('click', function () {
    // Exibir uma janela de confirmação
    var confirmLogout = confirm('Tem certeza que deseja terminar sessão?');

    // Verificar se o usuário confirmou o logout
    if (confirmLogout) {
      // Remover os dados do perfil do usuário do LocalStorage
      localStorage.removeItem('UtilizadorLogado');

      alert("Sessão terminada");

      // Redirecionar o usuário para a página de login ou para onde for apropriado
      window.location.href = 'HelpMates.html';
    } else {
      // Nenhuma ação adicional é necessária neste caso
    }
  });

  var deleteAccountButton = document.getElementById('delete-account-button');

    // Adicionar um ouvinte de evento para o botão "Eliminar Conta"
    deleteAccountButton.addEventListener('click', function () {
      // Exibir uma janela de confirmação
      var confirmDelete = confirm('Tem certeza que deseja eliminar a sua conta?');

      // Verificar se o usuário confirmou a exclusão
      if (confirmDelete) {
        // Obter os dados dos utilizadores do localStorage
        var users = JSON.parse(storedUsersData);

        // Encontrar o índice do usuário atualmente logado no array
        var userIndex = users.findIndex(function (user) {
          return user.username === userr.username; // Faça a correspondência com o critério adequado para identificar o usuário
        });

        // Remover o usuário do array
        if (userIndex !== -1) {
          users.splice(userIndex, 1);
        }

        // Atualizar os dados dos utilizadores no localStorage
        localStorage.setItem('utilizador', JSON.stringify(users));

        // Remover os dados do perfil do usuário logado
        localStorage.removeItem('UtilizadorLogado');

        alert("Conta Eliminada");

        // Redirecionar o usuário para a página de login ou para onde for apropriado
        window.location.href = 'HelpMates.html';
      } else {
        // Fechar a janela de confirmação
        // Nenhuma ação adicional é necessária neste caso
      }
    });

  }