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
const btnPagar = document.querySelector('.pagar')
const containerCheckout = document.querySelector('.dad-checkout')
const btnCerrar = document.querySelector('.boton-cerrar')

//Abrir checkout 
btnPagar.addEventListener('click', ()=>{
    if(precio.length ==0 || precio == 0){
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "En este momento no tienes nada en el carrito", 
        });
    } 
}); 

//Mostrar y ocultar menu categoria 

const btnFilterCategoria = document.querySelector('.icon-filter')
const containerItems = document.querySelector('.main-wrapper')

//Botones para ocultar el filtro por categoria 
const btnTodo = document.querySelector('#todo') 
const btnAudi = document.querySelector('#audifonos') 
const btnPower = document.querySelector('#powerbank') 
const btnCarg = document.querySelector('#cargador')
const btnCable = document.querySelector('#cables')
const btnBocinas = document.querySelector('#bocina') 


btnAudi.addEventListener('click',()=>{
    containerItems.classList.toggle('hidden-categoria')
})
btnPower.addEventListener('click',()=>{
    containerItems.classList.toggle('hidden-categoria')
})
btnCarg.addEventListener('click',()=>{
    containerItems.classList.toggle('hidden-categoria')
})
btnCable.addEventListener('click',()=>{
    containerItems.classList.toggle('hidden-categoria')
})
btnBocinas.addEventListener('click',()=>{
    containerItems.classList.toggle('hidden-categoria')
})

btnFilterCategoria.addEventListener('click', ()=>{
    containerItems.classList.toggle('hidden-categoria') 
})

btnTodo.addEventListener('click', ()=>{
    containerItems.classList.toggle('hidden-categoria') 
})

const body = document.querySelector('body')

// body.addEventListener('click', ()=>{
//     containerCheckout.classList.toggle('hidden-checkout')
// })

//Habilitar y deshabilitar el boton de paggar cuando el carrito no tenga algo 
const carrito = document.querySelector('.cart') 

carrito.addEventListener('click', ()=>{
    if(precio.length == 0 ||precio == 0){
       btnPagar.disabled = true
    }
    else{
        btnPagar.disabled = false 
    }
}) 