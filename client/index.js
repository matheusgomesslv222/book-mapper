document.addEventListener('DOMContentLoaded', () => {
    const renderingRegister = ()=>{
        const registerLayout = document.querySelector('.form').innerHTML = `
            <form action="#">
                <div class="form-header">
                    <div class="title">
                        <h1>Cadastre-se</h1>
                    </div>
                    <div class="login-button">
                        <button class="btn"><a href="#">Entrar</a></button>
                    </div>
                </div>
    
                <div class="input-group">
                    <div class="input-box">
                        <label for="firstname">Primeiro Nome</label>
                        <input id="firstname" type="text" name="firstname" placeholder="Digite seu primeiro nome" required>
                    </div>
    
                    <div class="input-box">
                        <label for="lastname">Sobrenome</label>
                        <input id="lastname" type="text" name="lastname" placeholder="Digite seu sobrenome" required>
                    </div>
                    <div class="input-box">
                        <label for="email">E-mail</label>
                        <input id="email" type="email" name="email" placeholder="Digite seu e-mail" required>
                    </div>
    
                    <div class="input-box">
                        <label for="number">Número de telefone</label>
                        <input id="number" type="tel" name="number" placeholder="(xx) xxxx-xxxx" required>
                    </div>
    
                    <div class="input-box">
                        <label for="password">Senha</label>
                        <input id="password" type="password" name="password" placeholder="Digite sua senha" required>
                    </div>
    
    
                    <div class="input-box">
                        <label for="confirmPassword">Confirme sua Senha</label>
                        <input id="confirmPassword" type="password" name="confirmPassword" placeholder="Digite sua senha novamente" required>
                    </div>
    
                </div>
    
                <div class="gender-inputs">
                    <div class="gender-title">
                        <h6>Gênero</h6>
                    </div>
    
                    <div class="gender-group">
                        <div class="gender-input">
                            <input id="female" type="radio" name="gender">
                            <label for="female">Feminino</label>
                        </div>
    
                        <div class="gender-input">
                            <input id="male" type="radio" name="gender">
                            <label for="male">Masculino</label>
                        </div>
    
                        <div class="gender-input">
                            <input id="others" type="radio" name="gender">
                            <label for="others">Outros</label>
                        </div>
    
                        <div class="gender-input">
                            <input id="none" type="radio" name="gender">
                            <label for="none">Prefiro não dizer</label>
                        </div>
                    </div>
                </div>
    
                <div class="continue-button">
                    <button id="cadastro-feito"><a href="#">Continuar</a> </button>
                </div>
            </form>
        `
        
        const getButtonLogin = document.querySelector('.btn');
        getButtonLogin.addEventListener('click', () => {
            renderingLogin();
        });
        //Coleta de dados do cadastro
        const cadastroFeitoButton = document.getElementById('cadastro-feito');
                cadastroFeitoButton.addEventListener('click', () => {
                    const nome = document.getElementById('firstname').value;
                    const sobrenome = document.getElementById('lastname').value;
                    const email = document.getElementById('email').value;
                    const numero_telefone = document.getElementById('number').value;
                    const senha = document.getElementById('password').value;
                    const confirmarSenha = document.getElementById('confirmPassword').value;

                    const usuario = {
                        nome: nome,
                        sobrenome: sobrenome,
                        email: email,
                        numero_telefone: numero_telefone,
                        senha: senha,
                    }
                    const URL = 'http://localhost:3000/cadastro-usuario'
                    axios.post(URL, usuario)
                        .then(response =>{
                            console.log('Resposta do Servidor: ' , response.data);
                        })
                        .catch(error =>{
                            console.error('Erro na solicitação', error);
                        })
                });
    }
    
    const renderingLogin = ()=>{
        const registerLayout = document.querySelector('.form').innerHTML = `
            <form action="#">
                <div class="form-header">
                    <div class="title">
                        <h1>Login</h1>
                    </div>
                    <div class="login-button">
                        <button class="register-btn"><a href="#">Cadastrar</a></button>
                    </div>
                </div>
    
                <div class="input-group">
                    <div class="input-box">
                        <label for="email">E-mail</label>
                        <input id="email" type="email" name="email" placeholder="Digite seu e-mail" required>
                    </div>
    
                    <div class="input-box">
                        <label for="password">Senha</label>
                        <input id="password" type="password" name="password" placeholder="Digite sua senha" required>
                    </div>
                </div>           
                <div class="continue-button">
                    <button><a href="#">Login</a></button>
                </div>
            </form>
        `
        const getButtonRegister = document.querySelector('.register-btn');
        getButtonRegister.addEventListener('click', () => {
            renderingRegister();
        });
        
        const loginInputGroup = document.querySelectorAll('.input-group');
        
        loginInputGroup.forEach(input => {
            input.classList.add('login-input-group');
        });
    
        const loginInputBoxes = document.querySelectorAll('.input-box');
    
        loginInputBoxes.forEach(input => {
            input.classList.add('login-input-box');
        });
    
        const loginInput = document.querySelectorAll('.continue-button');
    
        loginInput.forEach(input => {
            input.classList.add('login-input-box');
        });
    }
    renderingRegister();

});







