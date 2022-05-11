import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
const socket = io("http://localhost:5020");

let room = document.getElementById("room");
let btn = document.getElementById("enviarDatos");
let tablero = document.getElementById("tablero");
let box = document.getElementById("box");
let roomcontent = document.getElementById("room");
let form = document.getElementById("form");

const printMessage = (emailUser, message) => {
  tablero.innerHTML += `<b>${emailUser}</b>: ${message} <br>`;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailUser = JSON.parse(localStorage.getItem("user")).email;
  const mensaje = document.getElementById("mensaje").value;
  if (mensaje == '') {
    swal("Error", "No puede enviar un mensaje vacio", "error");
  } else {
    socket.emit("sendMessage", { emailUser, mensaje });
  }
});

socket.on('connect', function() {
    let hola = 6
    room = `Sala ${hola}`;
    socket.emit('room', room);
    roomcontent.innerHTML = room;
});

socket.on("sendMessage", (data) => {
  printMessage(data.emailUser, data.mensaje);
});
