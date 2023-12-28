//Mostrar carrito 
const btnCart = document.querySelector('.container-cart-icon')  
const containerCartProducts = document.querySelector('.container-cart') 
    
btnCart.addEventListener('click', ()=>{ 
    containerCartProducts.classList.toggle('hidden-cart')  
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
    containerCheckout.classList.toggle('hidden-checkout')
    //console.log('hola') 
}); 

//Cerrar checkout 
btnCerrar.addEventListener('click', ()=>{
    containerCheckout.classList.toggle('hidden-checkout') 
}); 