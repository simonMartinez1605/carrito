//Funciones para los botones 


//Mostrar y ocultar el menu de categoria 

const optionMenu = document.querySelector('.select-menu'), 
        selectBtn = optionMenu.querySelector('.select-btn'), 
        options = optionMenu.querySelectorAll('.option'), 
        sBtn_text = optionMenu.querySelector('.sBtn-text');  
    
    selectBtn.addEventListener('click', () => optionMenu.classList.toggle('active')); 

    
    options.forEach(option => {
        option.addEventListener('click', ()=>{
            const selectOption = option.querySelector('.option-text').innerText; 
            sBtn_text.innerText = selectOption; 
    
            //console.log(selectOption)
            optionMenu.classList.remove('active');  


            // sBtn_text.addEventListener('click', () =>{
            //     var filtro = listProducts; 
            //     const found = filtro.filter(product =>{
            //         nombre = product.Referencia; 
            //         //console.log(nombre) 
            
            //         return filtro; 
            //     }); 
            //     console.log(selectOption) 
            //     let text = sBtn_text.target
            //     console.log(text) 
            
            // }); 
        }); 

    }); 


 
const btnCart = document.querySelector('.container-cart-icon')  
    const containerCartProducts = document.querySelector('.container-cart') 
    
    btnCart.addEventListener('click', ()=>{
        containerCartProducts.classList.toggle('hidden-cart')  
}); 

//Funcion para mostrar y cerrar el carrito 
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