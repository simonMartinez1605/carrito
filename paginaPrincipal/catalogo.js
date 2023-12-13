//conexion de la api y creacion del forEach para mostrar los productos 

// const { all } = require("axios"); 

URL_PRODUCTOS= "https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Productos_1_hora"
const containerProduct = document.querySelector(".cards_dad")
const obtenerProductos = async() => {
    try{
        const respuesta =await axios.get (URL_PRODUCTOS)
        console.log(respuesta.data)
        return respuesta.data;
    }
    catch (error) {
        console.log(error) 
        return[];
    }
}

obtenerProductos();    


//Mostrar los productos desde la api al html
const printProducts = (products, container) => {
    container.innerHTML = ''; 

    products.forEach(product =>{ 
        container.innerHTML += `
        <div class="card" style="width: 18rem; height: 24rem; "> 
        <div class="card-body"> 
            <img src="${product.Imagen_publica.url}" class="card-img-top" alt="...">
            <h5 class="card-title" id="title">${product.Referencia}</h5>   
            <p  class="card-text">
            ${product.Caracteristicas} 
            </p>  
            <h6>$${product.Precio_Mayorista}</h6>     
            <div class="container-botones">
                <button class="restar">-</button>  
                <input value="1" class="contador">  
                <button class="sumar"> + </button>                                
            </div> 
        </div>                                          
    </div>
        `
    })
}
document.addEventListener("DOMContentLoaded", async () => {
 const productos = await obtenerProductos(URL_PRODUCTOS);
 printProducts (productos, containerProduct)
}); 


//Mostrar y ocultar el menu de categoria 

const optionMenu = document.querySelector('.select-menu'), 
        selectBtn = optionMenu.querySelector('.select-btn'), 
        options = optionMenu.querySelectorAll('.option'), 
        sBtn_text = optionMenu.querySelector('.sBtn-text');  
    
    selectBtn.addEventListener('click', () => optionMenu.classList.toggle('active')); 
    
    options.forEach(option => {
        option.addEventListener('click', ()=>{
            let selectOption = option.querySelector('.option-text').innerText; 
            sBtn_text.innerText = selectOption; 
    
            console.log(selectOption)
            optionMenu.classList.remove('active');  
        })
}); 


//Mostrar y cerrar el menu del carrito 

const btnCart = document.querySelector('.container-cart-icon')  
    const containerCartProducts = document.querySelector('.container-cart-products')
    
    btnCart.addEventListener('click', ()=>{
        containerCartProducts.classList.toggle('hidden-cart')  
}); 


//Lista de contendores 

const cartinfo = document.querySelector('.cart-product')

const rowProduct = document.querySelector('.row-product')


//Variable de arreglos de productos 
const productList = document.querySelector('.cards_dad') 


let allProducts = []

const valorTotal = document.querySelector('.total-pagar')

const countProducts = document.querySelector('.contador-productos')

const valorCard = document.querySelector('input.value')


//Sumar y restar productos al carrito 

productList.addEventListener('click', e =>{
    if (e.target.classList.contains('sumar')){
        const product = e.target.parentElement; 

        const infoProducts = {
            quantity: 1,
            title: product.Referencia, 
            Price: product.Precio_Mayorista, 
        }; 

        const exits = allProducts.some(product => product.title === infoProducts.title) 

        if(exits){
            const products = allProducts.map( product => {
                if (product.title === infoProducts.title){
                    product.quantity ++; 
                    return product 
                }
                else{
                    return product 
                }
            })  
                allProducts = [...products] 
        }
        else{
            allProducts = [...allProducts, infoProducts]
        }

        console.log(allProducts)
        showHTML() 
    }




        if (e.target.classList.contains('restar')){
            const product = e.target.parentElement; 

            const infoProducts ={
                quantity : 1, 
                title: product.Referencia, 
                Price: product.Precio_Mayorista, 
            }; 

            const validar = allProducts.some(product => product.quantity === product.quantity)

                if (validar){
                    const products = allProducts.map(product=>{
                        if(product.quantity !=0){
                            product.quantity --; 
                            return product
                        }
                        else{
                            return product
                        }
                    })

                }
                else{
                    allProducts = [...allProducts, infoProducts]
                }


                showHTML()   
        }
})


//Icono de cerrar 

rowProduct.addEventListener('click', e =>{
    if (e.target.classList.contains('icon-close')){
        const products = e.target.parentElement; 
        const quantity = document.querySelector('span'); 

        allProducts = allProducts.filter(product => product.quantity === 0); 

        console.log(allProducts)
        showHTML()
    }
})


//Funcion para mostrar los productos 

const showHTML = () =>{
    rowProduct.innerHTML = ''; 

    lit = total = 0; 
    lit = totalOffProducts = 0; 
    lit = contador = document.getElementsByClassName('.contador'); 

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div')
        containerProduct.classList.add('cart-product')

        containerProduct.innerHTML = `
        
        <div class="info-cart-product">
            <span class="cantidad">
            ${product.quantity} 
            </span>
            <p class="nombre-product">
                ${product.Referencia}
            </p>
            <span class="precio-product">
                ${product.Price} 
            </span>
        </div> 
        `

        rowProduct.append(containerProduct)

        total = total + parseInt (product.quantity * product.price) 

        totalOffProducts = totalOffProducts + product.quantity; 

        contador = contador + product.quantity; 

    }); 

    valorTotal.innerHTML = ''; 
    countProducts.innerHTML =totalOffProducts; 

    valorCard.innerHTML = contador; 
}; 