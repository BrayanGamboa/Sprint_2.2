let form = document.getElementById("form");

console.log(form);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let imagen = document.getElementById("imagen").value
    console.log(imagen);
})

form.innerHTML = `<input type="file" name="myImage" id="imagen" accept="image/x-png,image/jpeg" required/><br><br>
<input type="submit" value="Enviar">`
