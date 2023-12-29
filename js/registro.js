const boton = document.querySelector('button') 

boton.addEventListener('click', ()=>{
    Swal.fire({
        icon: "success",
        title: "LISTO",
        text: "Ya estas registrado en nuestra base de datos",
        footer: '<a href="/carrito/HTML/catalogo.html">Sigue comprando</a>'
    });
})