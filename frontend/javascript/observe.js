let title = document.getElementById("title")
let container = document.getElementById("garajeAutos")
let user = JSON.parse(localStorage.getItem("datosUsuario"));
let body = document.getElementById("card");
let { nombre } = user;
let marca

const API_mysql = "https://api1-bsgv.herokuapp.com"
const API_psql = "http://localhost:5019"

const API_URL = API_psql;


const info = async () => {
    const respuesta = await fetch(`${API_URL}/vehiculo`);
    try {
        console.log(`Estado ${respuesta.status}: ${respuesta.statusText}`);
        const datos = await respuesta.json();
        printCard(datos);

    } catch (error) {
        console.log(`Error ${respuesta.status}: ${respuesta.statusText}`);
    }
}

info();



function printCard(datos) {

    datos.forEach(auto => {
        let { fch_vence_seg, fch_vence_tecno, linea, modelo, num_placa, url_img } = auto;
        let modeloSimple = modelo.slice(0, -20);
        let fch_vence_seg_simple = fch_vence_seg.slice(0, -14)
        let fch_vence_tecno_simple = fch_vence_tecno.slice(0, -14)
        num_placa = num_placa.toUpperCase()

        convertLine(linea)
        container.innerHTML += `
        <div class="card h-50 m-3" style="max-width: 45%;" id="card">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${url_img}" alt="Imagen del vehículo ${num_placa}" class="img-fluid rounded-start" style="margin-top: 1.5em; margin-bottom: 1.5 em; margin-left: 0.5em">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${num_placa}</h5>
                        <ul>
                            <li class="mb-2"><b>Marca:</b> ${marca}</li>
                            <li class="mb-2"><b>Módelo:</b> ${modeloSimple}</li>
                            <li class="mb-2"><b>Fecha vencimiento del seguro:</b></br>${fch_vence_seg_simple}</li>
                            <li class="mb-2"><b>Fecha vencimiento de la técno:</b></br>${fch_vence_tecno_simple}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-danger w-25 mx-auto mb-3" id="borrar_${num_placa}" name="btn">Borrar</button>
        </div>
        
`
    });

    title.innerHTML = `<h1 class="text-center mb-5">${nombre}, estos son los autos guardados</h1>`
}

function convertLine(linea) {

    switch (linea) {
        case 1:
            marca = "Mazda"
            break;
        case 2:
            marca = "Toyota"
            break;
        case 3:
            marca = "Chevrolet"
            break;
        case 4:
            marca = "Suzuki"
            break;
        case 5:
            marca = "Volkswage";
            break;
        case 6:
            marca = "Audi";
            break;
        case 7:
            marca = "BMW";
            break;
        case 8:
            marca = "Ford";
            break;
        case 9:
            marca = "Mercedes-Benz";
            break;
        case 10:
            marca = "Tesla";
            break;
        default:
            break;
    }
}


container.addEventListener('click', async (e) => {
    let idCompleto = e.target.id
    let idSimple = idCompleto.slice(0, 7);
    if (idSimple == "borrar_") {
        let idVehiculo = idCompleto.slice(7, 15);
        const result_delete = await fetch(`${API_URL}/vehiculo/${idVehiculo}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        try {
            console.log(`Estado ${result_delete.status}: ${result_delete.statusText}`);
            swal("Vehículo eliminado", "Se han borrado correctamente los datos", "success", { timer: 3000 })
            setTimeout(document.location = document.location, 5000)
            // window.location.href = "./observe.html"
        } catch (error) { 
            swal("Error", "Actualmente presentamos problemas", "error", {timer: 3000})
            
        }


    }    
    
})
