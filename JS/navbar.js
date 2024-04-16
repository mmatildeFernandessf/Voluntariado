//login

const Perfil = document.getElementById("Log");
const Logado = JSON.parse(localStorage.getItem('UtilizadorLogado'));

console.log(Perfil);

if(Logado){
    Perfil.innerHTML=Logado.nome;
    Perfil.addEventListener('click', () => {
        window.location.href='PerfilUser.html'
    })
}else{
    Perfil.addEventListener('click', () => {
        window.location.href='Login.html'
    })
}

