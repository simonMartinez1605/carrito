//Mostrar carrito 
const btnCart = document.querySelector('.container-cart-icon')  
const containerCartProducts = document.querySelector('.container-cart') 

const containerVoid = document.querySelector('.container-void') 

btnCart.addEventListener('click', ()=>{ 
    containerCartProducts.classList.toggle('hidden-cart') 
    precio.length == 0 || precio== 0? containerVoid.classList.add('hidden-void')
    :containerVoid.classList.remove('hidden-void') 
}); 


//Funcion cerrar el carrito 
const btnCloseCart = document.querySelector('.close')
const containerCart = document.querySelector('.container-cart')

btnCloseCart.addEventListener('click', ()=>{
    containerCart.classList.toggle('hidden-cart') 
}); 



//Funcion para mostrar el la casilla de buscar 
const btnBuscar = document.querySelector('.btn-buscar') 
const containerBuscador = document.querySelector('.filtro_input')
btnBuscar.addEventListener('click', ()=>{
    containerBuscador.classList.toggle('filtro_input')  
}); 


//Botones de el checkout 
const btnAbrir = document.querySelector('.pagar')
const containerCheckout = document.querySelector('.dad-checkout')
const btnCerrar = document.querySelector('.boton-cerrar')

//Abrir checkout 
btnAbrir.addEventListener('click', ()=>{
    if(precio.length ==0 || precio == 0){
        Swal.fire({
            icon: "error",
            title: "Lo sentimos...",
            text: "En este momento no tienes nada en el carrito", 
        });
    } 
    else{
        containerCheckout.classList.toggle('hidden-checkout') 
    }
    containerCart.classList.toggle('hidden-cart') 
}); 

//Cerrar checkout 
btnCerrar.addEventListener('click', ()=>{
    containerCheckout.classList.toggle('hidden-checkout')  
}); 


//Mostrar y ocultar menu categoria 

const btnFilterCategoria = document.querySelector('.icon-filter')
const containerItems = document.querySelector('.main-wrapper')

btnFilterCategoria.addEventListener('click', ()=>{
    containerItems.classList.toggle('hidden-categoria') 
})

const body = document.querySelector('body')

body.addEventListener('click', ()=>{
    containerCheckout.classList.replace('hidden-checkout') 
})