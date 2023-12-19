//Conexion de la api y creacion del forEach para mostrar los productos 


//Url de la api 
URL_PRODUCTOS= "https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Productos_1_hora"

//Variable del contenido HTML a donde va la info 
const containerProduct = document.querySelector(".cards_dad")

//Funcion de llamada a los productos de la api 

// const obtenerProductos = async() => {
//     try{
//         const respuesta =await axios.get (URL_PRODUCTOS)
//         console.log(respuesta.data)
//         return respuesta.data;
//     }
//     catch (error) {
//         console.log(error) 
//         return[];
//     }
// }

// obtenerProductos();     


//Mostrar los productos desde la api al html
// const printProducts = (products, container) => {
//     container.innerHTML = ''; 

//     products.forEach(product =>{ 
//         container.innerHTML += `
//         <div class="card" style="width: 18rem; height: 24rem; "> 
//         <div class="card-body"> 
//             <img src="${product.Imagen_publica.url}" class="card-img-top" alt="...">
//             <h5 class="card-title" id="title">${product.Referencia}</h5>   
//             <p  class="card-text">
//             ${product.Caracteristicas} 
//             </p>  
//             <h6>$${product.Precio_Mayorista}</h6>     
//             <div class="container-botones">
//                 <button class="restar">-</button>  
//                 <input value="1" class="contador">  
//                 <button class="sumar"> + </button>                                
//             </div> 
//         </div>                                          
//     </div>
//         ` 
//     }) 
//    } 

// document.addEventListener("DOMContentLoaded", async () => {
//     const productos = await obtenerProductos(URL_PRODUCTOS);
//     printProducts (productos, containerProduct)
// });  


//Ingreso de los productos al carrito 


const containerCarrito = document.querySelector('.container-cart-products') 

const printProductsCarrito = (products, container) => {
    container.innerHTML = ''; 

    products.forEach(product => {
        container.innerHTML += `
        <div class="info-cart-product">
        <span class="cantidad">
        ${product.quantity} 
        </span>
        <p class="nombre-product">
            ${product.Referencia}
        </p>
        <span class="precio-product">
            ${product.Precio_Mayorista}  
        </span>
    </div> 
        
        `  
    })
}; 


const sumar = addEventListener('click', (e) =>{
    if (e.target.classList.contains('sumar')){

        document.addEventListener('click', async () => {
            const productos = await obtenerProductos(URL_PRODUCTOS); 
            printProductsCarrito(productos, containerCarrito)
            console.log(productos)
        }); 


    }
})
// document.addEventListener('DOMContentLoaded', async () => {
//     const productos = await obtenerProductos(URL_PRODUCTOS); 
//     printProductsCarrito(productos, containerCarrito)
//     console.log(productos) 
// }); 

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


//Prueba de session storage 

// const dato = localStorage.getItem(sumar); 

// if(dato){
//     console.log('tengo el dato ')
// }
// else{
//     console.log('no tengo el dato') 
// }


// document.addEventListener('DOMContentLoaded', () =>{
//     localStorage.setItem('dato', 'dato2'); 
// })


//Prueba de filtros de busqueda 



//Se hace referencia a los elementos del DOM 
const inputBuscar = document.getElementById('buscar')

const cards = document.getElementsByTagName('h5') 

//Se traen los datos de la api 

// const obtenerProductos = async() => {
//     try{
//         const respuesta =await axios.get (URL_PRODUCTOS)
//         console.log(respuesta.data)
//         res = respuesta.data; 
//         return res; 
//     }
//     catch (error) {
//         console.log(error) 
//         return[];
//     }

// }

// obtenerProductos();   

// const obtenerProductos = async () =>{
//     try{
//         const api = await axios.get(URL_PRODUCTOS) 

//         const respuesta = api.data
//         return respuesta;  
//     }
//     catch (error) {
//         console.log(error)
//         return []; 
//     }
// }

// const respuesta = (data) =>{
//     let cards_dad = ''; 
//     for(let i = 0; i <data.length; i++){
//         cards_dad += `
//         <div class="info-cart-product">
//         <span class="cantidad">
//         ${product.quantity} 
//         </span>
//         <p class="nombre-product">
//             ${product.Referencia}
//         </p>
//         <span class="precio-product">
//             ${product.Precio_Mayorista}  
//         </span>
//     </div> 
//         `
//     }
// }

//Mostrar los productos 


//Fetch 

fetch(URL_PRODUCTOS)
    .then(respuesta => respuesta.json())
    .then(json => mostrarDatos(json))
    .catch( e => console.log(e)) 

const mostrarDatos = (data) =>{
    // console.log(data)
    let cards_dad = ''
    for(let i=0; i<data.length; i++){
        cards_dad += `
        <div class="card" style="width: 18rem; height: 24rem; "> 
        <div class="card-body"> 
            <img src="${data[i].Imagen_publica.url}" class="card-img-top" alt="...">
            <h5 class="card-title" id="title">${data[i].Referencia}</h5>   
            <p  class="card-text">
            ${data[i].Caracteristicas} 
            </p>  
            <h6>$${data[i].Precio_Mayorista}</h6>     
            <div class="container-botones">
                <button class="restar">-</button>  
                <input value="1" class="contador">  
                <button class="sumar"> + </button>                                
            </div> 
        </div>                                          
    </div>
        `
    }

    document.querySelector('.cards_dad').innerHTML = cards_dad
}


//La busqueda 
inputBuscar.addEventListener('keyup', (e) =>{
    let text = e.target.value
    // console.log(text) 

    let search = new RegExp (text, "i") 
    for(let i= 0; i<cards.length ; i++){
        let valor = cards[i] 
        // console.log(valor) 
        if (search.test(valor.innerText)){
            valor.classList.remove('cards')  
        }
        else{
            valor.classList.add('cards')  
        }
    }  
})