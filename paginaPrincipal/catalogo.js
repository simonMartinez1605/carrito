//Url de la api 
URL_PRODUCTOS= "https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Productos_1_hora"

//Variables de contenido 
let listProductsHTML = document.querySelector('.cards_dad')
let listCartHTML = document.querySelector('.container-cart-products') 

const cantidad = document.querySelector('.contador-productos')
const total = document.querySelector('.precio-total') 



//Contenedores de listas y las cards del carrito (a su vez son variables universales para modificar)
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
            newProduct.dataset.imagen = product.Imagen_publica; 

            //Convercion de numero a valor de moneda 

            const number = product.Precio_Mayorista; 
            valor = new Intl.NumberFormat('es-CO').format(number)

            //Mostrar los productos de la api en el html 
            newProduct.innerHTML = `
            <div id= "product"> 
                <div class="card" style="width: 18rem; height: 24rem;" data-id="${product.ID}" data-price="${product.Precio_Mayorista}" data-referencia="${product.Referencia}" data-imagen="${product.Imagen_publica.url}"> 
                    <div class="card-body"> 
                        <img src="${product.Imagen_publica.url}" class="card-img-top" alt="...">  
                        <h5 class="card-title" id="title">${product.Referencia}</h5>   
                        <p  class="card-text">${product.Caracteristicas} </p>  
                        <h6>$${valor}</h6>     
                        <div class="container-botones">
                            <button class="sumar"> Agregar </button>                                
                        </div> 
                    </div>                                          
                </div> 
            </div>  
            `
            //creacion del html con appendchild 
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
            const imagen = cardElement.dataset.imagen; 
            addToCart(product_id,price, referencia,imagen);  
            //console.log(imagen);
        }
    } 
    
});


//Constante de info para añadir al carrito 
const addToCart = (product_id,price,referencia,imagen) =>{  
    let position = carts.findIndex((value) => value.product_id == product_id); 
    if(carts.length <= 0){
        carts = [{
            product_id : product_id, 
            quantity : 1, 
            price : price, 
            referencia : referencia,
            imagen : imagen, 
        }]
    }else if (position < 0){
        carts.push({
            product_id : product_id, 
            quantity : 1, 
            price: price, 
            referencia: referencia, 
            imagen: imagen,
        })
    }else{
        carts[position].quantity = carts[position].quantity + 1; 
    }
    //console.log(imagen)
    addCartToHTML(); 
    // Llamad de funcion para el local storage
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
    let totalPrice = 0; 

    if(carts.length > 0){
        carts.forEach(cart =>{ 

            totalQuantity = totalQuantity + cart.quantity; 
            price = cart.price * cart.quantity;

            //Convercion de numero a valor de moneda en el precio de las cards
            valor = new Intl.NumberFormat('es-CO').format(price) 

            //Suma de todos los productos 
            totalPrice += price ;  

            //Convercion de numero a valor de moneda de la suma de todos los productos  
            totalValor = new Intl.NumberFormat('es-CO').format(totalPrice) 

            let newCart = document.createElement('div') 
            newCart.classList.add('container-cart-products')
            newCart.dataset.id = cart.product_id; 
            //console.log(cart.product_id) 
            console.log(cart.imagen) 

            newCart.innerHTML = ` 
            
            <div class="cart-product" data-id="${cart.product_id}" > 
                <div class="row-product">
                    <div class="info-cart-product">

                        <div class="imagen-carrito">
                            <img src="${cart.imagen}" alt=""> 
                        </div> 

                        <p class="nombre-product">
                        ${cart.referencia} 
                        </p>
                        <span class="precio-product">
                            $${valor}  
                        </span>

                        <div class="quantity">
                            <div class="cantidad">
                                <h6>Cantidad: </h6>
                            </div>
                            <button class="minus"> - </button>
                            <span> ${cart.quantity} </span> 
                            <button class="plus"> + </button>
                        </div>
                    </div>
                </div> 
            </div>    
            `;

            listCartHTML.appendChild(newCart) 
            // console.log(cart.product_id) 
        }); 
    }
    total.innerText = `$${totalValor}`  
    cantidad.innerText = totalQuantity; 
    console.log(totalValor)  
}

//Captura del id con los botones minus and plus 
listCartHTML.addEventListener('click', (event) =>{
    let positionClick = event.target; 
    const cardElement = positionClick.closest('.cart-product');

    if(cardElement){

        if (positionClick.classList.contains('minus')|| positionClick.classList.contains('plus')){
            const product_id = cardElement.dataset.id; 
            let type = 'minus'
            if(positionClick.classList.contains('plus')){
                type = 'plus'; 
            }
            //funcion para cambiar cantidad
            changeQuantity(product_id, type)
        }
    }
})


//Funcion para cambiar cantidad 
const changeQuantity = (product_id, type) =>{
    let positionItemInCart = carts.findIndex((value)=> value.product_id == product_id); 
    if (positionItemInCart >= 0){
        //Evaluacion de type  y ejecucion de declaraciones 
        switch (type){
            case 'plus': 
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1; 
                break; 
            
            default: 
                let valueChange = carts[positionItemInCart].quantity -1; 
                if(valueChange >0){
                    carts[positionItemInCart].quantity = valueChange; 
                }
                else{
                    carts.splice(positionItemInCart, 1) 
                }
                break; 
        }
    }
    //Añadir a la memoria y al carrito para refrescar  
    addCartToMemory(); 
    addCartToHTML(); 
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
    const containerCartProducts = document.querySelector('.container-cart') 
    
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

const btnCloseCart = document.querySelector('.close')
const containerCart = document.querySelector('.container-cart')

btnCloseCart.addEventListener('click', ()=>{
    containerCart.classList.toggle('hidden-cart') 
}) 