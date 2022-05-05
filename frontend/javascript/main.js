let editarAuto = document.getElementById("editarAuto");
let observarAutos = document.getElementById("observarAutos");
let crearAuto = document.getElementById("crearAuto");
let body = document.getElementById("body");

let user = JSON.parse(localStorage.getItem("datosUsuario"));
let { nombre } = user;
init();
function init() {
    body.innerHTML = `
<nav class="d-inline">
        <a href="../chat-pro/static/html/login.html"><img src="../img/casa-icono-silueta.png" alt="Imagen de home" class="m-5" style="width: 5%"
                id="imgHome"></a>
        <a href="../index.html">
            <img src="../img/account.png" alt="Imagen de logo" class="m-5" style="width: 5%; float: right;"
                id="imgLogo">
        </a>
    </nav>
    <h1 class="text-center mb-5">${nombre}, ¿qué realizaremos hoy? </h1>
    <div class="w-75 mx-auto mb-2">

        <div class="row row-cols-1 row-cols-md-2 g-4">
            <div class="col">
                <div class="card">
                    <img src="../img/rueda.png" class="card-img-top w-25 mx-auto mt-3" alt="Ruedas">
                    <div class="card-body d-flex flex-column">
                        <h2 class="card-title mx-auto">Crear un nuevo auto</h2>
                        <p class="card-text mx-auto text-center">Los cambios o creaciones se verá reflejado en el
                            apartado de "Observa los autos".</p>
                        <a href="new.html" class="d-flex">
                            <input class="btn btn-primary mt-3 w-50  mx-auto fs-5" type="submit" value="Registrar"
                                id="crearAuto">
                        </a>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <img src="../img/rompecabezas.png" class="card-img-top w-25 mx-auto mt-3" alt="Rompecabezas">
                    <div class="card-body d-flex flex-column">
                        <h2 class="card-title mx-auto">Editar un auto existente</h2>
                        <p class="card-text mx-auto text-center">Editaremos los autos que se encuentren en el
                            "inventario" o garaje.</p>
                        <a href="edit.html" class="d-flex">
                            <input class="btn btn-primary mt-3 w-50  mx-auto fs-5" type="submit" value="Editar"
                                id="editarAuto">
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="col w-50 mt-4 mx-auto">
            <div class="card">
                <img src="../img/ojos.png" class="card-img-top w-25 mx-auto mt-3" alt="Ojos">
                <div class="card-body d-flex flex-column">
                    <h2 class="card-title mx-auto">Observa los autos</h2>
                    <p class="card-text mx-auto text-center">En este apartado podrás ver todos los cambios que hemos
                        hecho hasta el momento.</p>
                    <a href="observe.html" class="d-flex">
                        <input class="btn btn-primary mt-3 w-50  mx-auto fs-5" type="submit" value="Observar"
                            id="observarAutos">
                    </a>

                </div>
            </div>
        </div>
    </div>
    <br><br>
    <a href="../chat-pro/static/html/chat.html">
    <div class="w-100 mb-4 fixed-bottom">
    <button type="button" class="btn btn-outline-primary rounded-pill float-end mr-5" style="width:20%" id="chat">
        <svg xmlns="http://www.w3.org/2000/svg" width="20%" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
            <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
        </svg>
        </button>
    </div>
    </a>
    `;
}
