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

const rowProduct = document.querySelector('.row-product') 

// Listas de todos los contenedores 


const productList = document.querySelector('.cards_dad') 

//variable de arreglos de productos 

let allProducts = []


const valorTotal = document.querySelector('.total-pagar')

const countProducts = document.querySelector('#contador-productos')


productList.addEventListener('click', e => {
    if (e.target.classList.contains('boton_carrito')){   
        const product = e.target.parentElement 

        const infoProducts = {
            quantity: 1, 
            title: product.querySelector('h5').textContent ,
            price: product.querySelector('h6').textContent, 
        }; 

        const exits = allProducts.some(product => product.title === infoProducts.title)

        if(exits){
            const products = allProducts.map(product =>{
                if(product.title === infoProducts.title){ 
                    product.quantity++;  
                    return product 
                }
                else{
                    return product 
                }
            })
               allProducts = [...products] 
            
        }
        else{
            allProducts =[...allProducts, infoProducts] 
        }

        showHTML()
    }
}); 

rowProduct.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon-close')){
        const product = e.target.parentElement
        const title = document.querySelector('h5').textContent 


        allProducts = allProducts.filter(product=> product.title != title)
    }; 

    console.log(allProducts) 
    showHTML() 
})


//funcion para mosrtrar 

const showHTML = () => {



    if(!allProducts.length){
        containerCartProducts.innerHTML = `
            <p class = "cart-empty"> El carrito esta vacio  </p>
        `
    }

    //limpiar html

    rowProduct.innerHTML = ''; 

    lit = total = 0; 
    lit = totalOfProducts = 0; 

    allProducts.forEach(product =>{
        const containerProduct = document.createElement('div')
        containerProduct.classList.add('cart-product') 

        containerProduct.innerHTML = `

        <div class="info-cart-product">
        <span class="cantidad">
            ${product.quantity}
        </span>
        <p class="nombre-product">
            ${product.title}
        </p>
        <span class="precio-product">
            ${product.price} 
        </span>
         </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="icon-close" viewBox="0 0 16 16"> 
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
        </svg> 

        `

        rowProduct.append(containerProduct) 
        
        total = total + parseInt( product.quantity * product.price.slice(1))

        totalOfProducts = totalOfProducts + product.quantity; 
    }); 

    valorTotal.innerText = `$${total}`; 
    countProducts.innerText = totalOfProducts; 
}; 