import { createUser, logIn, logInGoogle } from "./firebase.js";

const form_registration = document.getElementById('form-registration');
const form_login = document.getElementById('form-login');
const btn_google = document.getElementById('btn-google');


if (form_registration !== null) {
    form_registration.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const nameU = document.getElementById("name").value;
        const lastnameU = document.getElementById("lastname").value;
        let user = {"email": email};
        localStorage.setItem("datosUsuario", JSON.stringify(user));
        const { error, data } = await createUser(email, password);
        if (error) {
            switch (data.code) {
                case 'auth/email-already-in-use': swal("Usuario registrado", "El usuario se registró satisfactoriamente", "success", { timer: 3000 })
                    break;
                case 'auth/weak-password': swal("Contraseña corta", "La contraseña debe ser de mínimo 6 caracteres", "error", { timer: 3000 })
                    break;
                default:
                    swal("Error", "Error inesperado", "error", { timer: 3000 })
                    break;
            }
        } else {
            swal("Usuario registrado", "El usuario se registró satisfactoriamente", "success", { timer: 3000 });
            window.location.href = './login.html';
        }
    })
}

if (form_login !== null) {
    form_login.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const { error, data } = await logIn(email, password);

        if (error) {
            switch (data.code) {
                case 'auth/wrong-password': swal("Contraseña incorrecta", "La contraseña no coincide, intenta nuevamente", "error", { timer: 3000 })
                    break;
                case 'auth/user-not-found': alert('Correo no registrado');
                    swal("Correo no registrado", "El correo ingresado no coincide, intenta con uno nuevo", "error", { timer: 3000 })
                    break;
                default: swal("Error", "Error inesperado", "error", { timer: 3000 })
                    break;
            }
        } else {
            swal("Bienvenido", "Iniciaste sesión satisfactoriamente", "success", { timer: 3000 });
            const user = { "email": data.email, "uid": data.uid }
            localStorage.setItem('user', JSON.stringify(user))
            window.location.href = "../../../html/main.html";
            
        }
    })
}

if (btn_google !== null) {
    btn_google.addEventListener('click', async (e) => {
        const { error, data } = await logInGoogle();
        if (error) {
            swal("Error", "Error inesperado", "error", { timer: 3000 })
        } else {
            localStorage.setItem('user', JSON.stringify({ email: data.email, uid: data.uid }))
            window.location.href = "./chat.html"
        }
    })
}