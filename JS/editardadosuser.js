// JavaScript (Editar Perfil)

// Quando o utilizador faz alterações em seu perfil na página "EditarPerfilUser.html", os novos valores são armazenados na chave "UtilizadorEdit" de maneira temporaria no LocalStorage.

document.addEventListener('DOMContentLoaded', function () {
    // Obter os elementos de entrada de dados
    var nameInput = document.getElementById('name-input');
    var passwordInput = document.getElementById('password-input');
    var emailInput = document.getElementById('email-input');
    var saveChangesButton = document.getElementById('save-changes-button');



    // Carregar os dados do usuário armazenados no LocalStorage em array UtilizadorEdit
    var userData = localStorage.getItem('UtilizadorEdit');
    if (userData) {
        var useredicao = JSON.parse(userData);

        // Preencher os campos de entrada com os dados do usuário
        nameInput.value = useredicao.nome;
        emailInput.value = useredicao.email;
        passwordInput.value = useredicao.password;
    }

    // Lidar com o evento de clique no botão de guardar alterações
    saveChangesButton.addEventListener('click', function () {
        event.preventDefault();
        console.log('.................')
        // Obter os valores atualizados dos campos de entrada
        var updatedName = nameInput.value;
        var updatedEmail = emailInput.value;
        var updatedPassword = passwordInput.value;

        if (!updatedName || !updatedEmail || !updatedPassword) {
            alert('Por favor, preencha todos os campos.');
            return; // Interrompe a execução da função
          }


          let emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedEmail);

          if(!emailValido){
              alert('Por favor, introduza um email válido');
              return;
          }

          if (updatedPassword.length < 6 || !/\d/.test(updatedPassword)) {
            alert("A senha deve ter pelo menos 6 caracteres e conter pelo menos 1 número.");
            return;
          }

        // Obter os dados do usuário armazenados no LocalStorage
        var storedUserData = localStorage.getItem('UtilizadorLogado');
        //console.log(storedUserData)
        if (storedUserData) {
            console.log("FUNCIONOU")
            var storedUser = JSON.parse(storedUserData);
            console.log(storedUser)

            var storedUsersData = localStorage.getItem('utilizador');
            var storedUsers = JSON.parse(storedUsersData);

            var indexElementoEncontrado = storedUsers.findIndex(elemento => elemento.username === storedUser.username);

            // Atualizar os dados do usuário com os valores dos campos de entrada atualizados
            storedUser.nome = updatedName;
            storedUser.email = updatedEmail;
            storedUser.password = updatedPassword;

            if(indexElementoEncontrado !== -1){
                storedUsers[indexElementoEncontrado] = storedUser;
                localStorage.setItem('utilizador', JSON.stringify(storedUsers));
            }

            // Armazenar os dados atualizados no LocalStorage na chave 'utilizador'
            //localStorage.setItem('utilizador', JSON.stringify(storedUser));

            // Armazenar os dados atualizados no LocalStorage
            localStorage.setItem('UtilizadorLogado', JSON.stringify(storedUser));

            // Exibir uma mensagem de sucesso (opcional)
            alert('Alterações guardadas com sucesso!');


            window.location.href = 'PerfilUser.html';

        }


    });
});