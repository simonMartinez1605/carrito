const contador = () => {  
    let cantidad = 1; 
    const valor = document.querySelector(".valor");  
    const sumar = document.querySelector(".sumar"); 
    const restar = document.querySelector(".restar");  

    sumar.addEventListener("click", () => {
        valor.value = parseInt(valor.value)+1; 
        cantidad++; 
    }); 
    restar.addEventListener("click", ()=> {
        if(valor.value <=0){
            valor.value = 0;
        }
        else{
            valor.value = parseInt(valor.value)-1; 
            cantidad--;
        }
    }); 
} 

document.addEventListener("DOMContentLoaded" ,function(){
    contador(); 
}) 

///contador 




const btnCart = document.querySelector('.container-cart-icon')  
const containerCartProducts = document.querySelector('.container-cart-products')

btnCart.addEventListener('click', ()=>{
    containerCartProducts.classList.toggle('hidden-cart')  
}) 



//carrito 


const cartinfo = document.querySelector('.cart-product') 