let body = document.getElementById("body");
let formGet = document.getElementById("formGet");
let formPut = document.getElementById("formPut");
let placa = document.getElementById("placa");

const API_mysql = "https://api1-bsgv.herokuapp.com"
const API_psql = "http://localhost:5019"

const API_URL = API_psql;
let datos


formGet.addEventListener('submit', (e) => {
    e.preventDefault();
    let placaGet = document.getElementById("placaNew").value

    const obtenerInfo = async () => {
        const respuesta = await fetch(`${API_URL}/vehiculo/${placaGet}`);
        try {
            datos = await respuesta.json();
            printData(datos)
        } catch (error) {
                swal("No hay datos", "No tenemos un vehiculo con esta placa", "error", { timer: 3000 });
                document.getElementById("placaNew").value = ""

        }

        function printData(datos) {
            let { fch_vence_seg, fch_vence_tecno, linea, modelo, num_placa, url_img } = datos;
            let modeloFecha = modelo.slice(0, -14);
            let fch_vence_seg_simple = fch_vence_seg.slice(0, -14)
            let fch_vence_tecno_simple = fch_vence_tecno.slice(0, -14)


            num_placa = num_placa.toUpperCase()
            placa.value = num_placa
            urlImage.value = url_img
            marca.value = linea
            añoModelo.value = modeloFecha
            fechaSeguro.value = fch_vence_seg_simple
            fechaTecno.value = fch_vence_tecno_simple

        }
    }


    obtenerInfo();
})


// let modeloSimple = modelo.slice(0, -20);
// let fch_vence_seg_simple = fch_vence_seg.slice(0,-14)
// let fch_vence_tecno_simple = fch_vence_tecno.slice(0,-14)



formPut.addEventListener('submit', async (e) => {
    e.preventDefault()
    let num_placa = document.getElementById("placa").value
    let url_img = document.getElementById("urlImage").value
    let linea = document.getElementById("marca").value
    let modelo = document.getElementById("añoModelo").value
    let fch_vence_seg = document.getElementById("fechaSeguro").value
    let fch_vence_tecno = document.getElementById("fechaTecno").value

    const vehiculoNew = { url_img, linea, modelo, fch_vence_tecno, fch_vence_seg }

    const result = await fetch(`${API_URL}/vehiculo/${num_placa}`, {
        method: 'PUT',
        body: JSON.stringify(vehiculoNew),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        res.json(),
            swal("Datos enviados", "Los datos se han enviado correctamente", "success", { timer: 3000 }),
            limpiar()

    })
        .catch(error => error)
})


function limpiar() {
    document.getElementById("fechaTecno").value = ""
    document.getElementById("fechaSeguro").value = ""
    document.getElementById("añoModelo").value = ""
    document.getElementById("marca").value = ""
    document.getElementById("urlImage").value = ""
    document.getElementById("placa").value = ""
    document.getElementById("placaNew").value = ""
}
