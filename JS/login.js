let utilizador = JSON.parse(localStorage.getItem("utilizador"));


function loginn() {
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;

  // Verificar se o utilizador existe
  let user = utilizador.find(u => u.username === username);
  
  if (!user) {
    alert('Nome de usuário ou senha inválidos');
    return;
  }

  // Verificar se a senha está correta
  if (user.password !== password) {
    alert('Nome de usuário ou senha inválidos');
    return;
  }

  // Login bem-sucedido, redirecionar para a página de perfil do utilizador
  alert('Login bem-sucedido');
  localStorage.setItem('UtilizadorLogado', JSON.stringify(user));

  
  window.location.href = "HelpMates.html";
  
  // redirecionar para a página de perfil do utilizador
}


// Registrar evento de clique no botão de registo e login

document.getElementById("login").addEventListener("click", loginn);


