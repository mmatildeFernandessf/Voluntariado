// Obter utilizadores do localStorage ou criar array vazio
let utilizador = JSON.parse(localStorage.getItem("utilizador")) || [];


function registar(){

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let username = document.getElementById('username').value;
    let pw = document.getElementById('pw').value;
    let lowerCaseLetters = /[a-z]/g;
    let upperCaseLetters = /[A-Z]/g;
    let numbers = /[0-9]/g;
    let emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if(!emailValido){
        alert('Por favor, introduza um email válido');
        return;
    }

    if(!name){
        alert('Por favor, preencha o campo de nome');
        return;
    }

    // Verificar se o utilizador já existe
    if(utilizador.some(u => u.username === username)){
        alert('Já existe um utilizador com este nome de utilizador');
        return;
    }

    if(utilizador.some(u => u.email === email)){
        alert('Já existe um utilizador com este endereço de email');
        return;
      }
      

    if (pw.length < 6 || !/\d/.test(pw)) {
        alert("A senha deve ter pelo menos 6 caracteres e conter pelo menos 1 número.");
        return;
      }
      

    // Validar outros campos do utilizador...

    let novo = {"role": "cliente", "nome": name, "email": email, "username": username, "password": pw}
    utilizador.push(novo); 
    localStorage.setItem("utilizador", JSON.stringify(utilizador));
    alert('A sua conta foi criada');
    window.location.href = "Login.html";
}



// Registar evento de clique no botão de registo 
document.getElementById("registo").addEventListener("click", registar);

