let title = document.getElementById("title")
let form = document.getElementById("form")
const API_mysql = "https://api1-bsgv.herokuapp.com"
const API_psql = "http://localhost:5019"

const API_URL = API_psql;

title.innerHTML = `
<nav class="d-inline">
<a href="main.html"><img src="../img/casa-icono-silueta.png" alt="Imagen de home" class="m-5" style="width: 5%"
        id="imgHome"></a>
        <a href="../chat-pro/static/html/login.html">
    <img src="../img/account.png" alt="Imagen de logo" class="m-5" style="width: 5%; float: right;"
        id="imgLogo">
</a>
</nav>
<h1 class="text-center mb-5">Ahora podemos registrar un auto nuevo </h1>   
 `;

 
form.innerHTML = `<div class="form-floating mb-3">
<input type="text" class="form-control text-uppercase" id="placaNew" placeholder="PWI349" required maxlength="6" autofocus>
<label for="floatingInput">Placa</label>
</div>
<div class="form-floating mb-3">
<input type="text" class="form-control text-uppercase" id="imagen" placeholder="PWI349" required autofocus>
<label for="floatingInput">URL de la imagen</label>
</div>
<select class="form-select mb-3 p-3" id="nameMarca" aria-label="Default select example" required>
<option>Marca</option>
<option value=1>Mazda</option>
<option value=2>Toyota</option>
<option value=3>Chevrolet</option>
<option value=4>Suzuki</option>
<option value=5>Volkswagen</option>
<option value=6>Audi</option>
<option value=7>BMW</option>
<option value=8>Ford</option>
<option value=9>Mercedes-Benz</option>
<option value=10>Tesla</option>
</select>
<div class="form-floating mb-3">
<input type="date" class="form-control" id="modelo" placeholder="19/04/2005" required>
<label for="floatingInput">Módelo</label>
</div>
<div class="form-floating mb-3">
<input type="date" class="form-control" id="seguro" placeholder="19/04/2005" required>
<label for="floatingInput">Fecha vencimiento del seguro</label>
</div>
<div class="form-floating mb-3">
<input type="date" class="form-control" id="tecno" placeholder="19/04/2005" required>
<label for="floatingInput">Fecha vencimiento de la técno mecánica</label>
</div>
<input class="btn btn-primary mt-3 w-50 mx-auto fs-5" type="submit" value="Crear">`


form.addEventListener('submit', async (e) => {
  e.preventDefault()

  swal("Datos enviados", "Los datos se han enviado correctamente", "success", { timer: 3000 })
  let num_placa = document.getElementById("placaNew").value
  let url_img = document.getElementById("imagen").value
  let linea = document.getElementById("nameMarca").value
  let modelo = document.getElementById("modelo").value
  let fch_vence_seg = document.getElementById("seguro").value
  let fch_vence_tecno = document.getElementById("tecno").value

  const vehiculoNew = { num_placa, url_img, linea, modelo, fch_vence_tecno, fch_vence_seg }

  let brayan = await fetch(`${API_URL}/vehiculo`, {
    method: 'POST',
    body: JSON.stringify(vehiculoNew),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    res.json(),
      swal("Datos enviados", "Los datos se han enviado correctamente", "success", { timer: 3000 });
  })
    .catch(error => error)

  function limpiar() {
    document.getElementById("placaNew").value = ""
    document.getElementById("imagen").value = ""
    document.getElementById("nameMarca").value = ""
    document.getElementById("modelo").value = ""
    document.getElementById("seguro").value = ""
    document.getElementById("tecno").value = ""
  }
  limpiar()

})