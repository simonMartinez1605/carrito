//Conexion de la api y creacion del forEach para mostrar los productos 


//Url de la api 
URL_PRODUCTOS= "https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Productos_1_hora"

//Variables de contenido 
let listProductsHTML = document.querySelector('.cards_dad')
let listCartHTML = document.querySelector('.container-cart-products')

const cantidad = document.querySelector('.contador-productos')


//Contenedores de listas y las cards del carrito 
let listProducts = []
let carts = []


//Constante para agregar la info de la api al html 
const addDataToHTMl = () =>{
    listProductsHTML.innerHTML =''; 

    if(listProducts.length > 0 ){
        listProducts.forEach(product => {
            let newProduct = document.createElement('div')
            newProduct.classList.add('card'); 

            //Colocar la info en el dataset de cada card 
            newProduct.dataset.id = product.ID;
            newProduct.dataset.price = product.Precio_Mayorista; 
            newProduct.dataset.referencia = product.Referencia; 
            newProduct.innerHTML = `
            <div id= "product"> 
            <div class="card" style="width: 18rem; height: 24rem;" data-id="${product.ID}" data-price="${product.Precio_Mayorista}" data-referencia="${product.Referencia}" > 
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
        </div>  
            `

            listProductsHTML.appendChild(newProduct) 

        })
    }
}; 

//Funcion para tomar el evento de suma y resta para los productos 

listProductsHTML.addEventListener('click', (event) => { 
    let positionClick = event.target;   
    if (positionClick.classList.contains("sumar")) {
        // Encuentra el elemento padre con la clase "card"
        const cardElement = positionClick.closest('.card');
        if (cardElement) {
            // Obtén el product_id del atributo data-id del elemento encontrado
            const product_id = cardElement.dataset.id;
            const price = cardElement.dataset.price; 
            const referencia = cardElement.dataset.referencia; 
            addToCart(product_id,price, referencia);  
            // console.log(product_id);     
        }
    } 
    
});


//Constante de info para añadir al carrito 
const addToCart = (product_id,price,referencia) =>{ 
    let position = carts.findIndex((value) => value.product_id == product_id); 
    if(carts.length <= 0){
        carts = [{
            product_id : product_id, 
            quantity : 1, 
            price : price, 
            referencia : referencia,
        }]
    }else if (position < 0){
        carts.push({
            product_id : product_id, 
            quantity : 1, 
            price: price, 
            referencia: referencia, 
        })
    }else{
        carts[position].quantity = carts[position].quantity + 1; 
    }
    console.log(carts)
    addCartToHTML(); 
    //Funcion para el local storage
    addCartToMemory(); 
}


//Funcion para el local storage 
const addCartToMemory = () =>{
    localStorage.setItem('cart', JSON.stringify(carts));
} 


//Funcion para añadir al carrito 
const addCartToHTML = () =>{
    listCartHTML.innerHTML = ''; 
    let totalQuantity = 0; 

    if(carts.length > 0){
        carts.forEach(cart =>{ 

            totalQuantity = totalQuantity + cart.quantity; 

            let newCart = document.createElement('div') 
            newCart.classList.add('.container-cart-products')
            // console.log(cart.referencia) 
            newCart.innerHTML = ` 
            
            <div class="cart-product">
            <div class="row-product">
                <div class="info-cart-product">
                    <span class="cantidad">
                        ${cart.quantity} 
                    </span>
                    <p class="nombre-product">
                       ${cart.referencia} 
                    </p>
                    <span class="precio-product">
                        ${cart.price * cart.quantity}  
                    </span>
                </div>
                </div>
            </div> 
            
        </div> 

            `;

            listCartHTML.appendChild(newCart) 
        })
    }
    cantidad.innerText = totalQuantity; 
}

//Funcion para llamar a la api 
const initApp =() =>{
    fetch(URL_PRODUCTOS) 
    .then(response => response.json())
    .then(data =>{
        listProducts = data; 
        addDataToHTMl();    


        //obtener info de la memoria 

        if(localStorage.getItem('cart')){
            carts = JSON.parse(localStorage.getItem('cart')); 
            addCartToHTML(); 
        }
    })
    .catch(error => console.log(error)); 
}; 

initApp(); 


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

const btnCart = document.querySelector('.container-cart-icon')  
    const containerCartProducts = document.querySelector('.container-cart-products')
    
    btnCart.addEventListener('click', ()=>{
        containerCartProducts.classList.toggle('hidden-cart')  
}); 


//La busqueda 

const inputBuscar = document.getElementById('buscar')

const cards = document.getElementsByTagName('h5')

const dad = document.getElementsByClassName('card-body') 

inputBuscar.addEventListener('keyup', (e) =>{
    let text = e.target.value
    // console.log(text) 

    let search = new RegExp (text, "i") 
    for(let i= 0; i<cards.length ; i++){  
        let valor = cards[i] 
        let container = dad[i]  
        // console.log(valor) 
        if (search.test(valor.innerText)){
            valor.classList.remove('cards')  
            container.classList.remove('dads')
            
        }
        else{
            valor.classList.add('cards')     
            container.classList.add('dads')     
        }
    } 
})