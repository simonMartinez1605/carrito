//filtros de busqued

//Url de la api para traer los datos 
URL_PRODUCTOS= "https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Productos_1_hora"

//Variable para almacenar la info de la api 
let cards = [] 

//constantes para guardar la info 
const input = document.querySelector('#buscar')
const dad = document.querySelector('.cards_dad')


//Cargado de la pagina 
window.addEventListener('DOMContentLoaded', async()=>{
    const data =await loadCards()
    cards = data
    renderCard(cards) 
})
//Llamar a la api y traer los datos 
const loadCards = async()=>{
    const response = await fetch(URL_PRODUCTOS) 
    return await response.json() 
}


//Funcion para los filtros de busqueda 
input.addEventListener('keyup', ()=>{
    const newCard = cards.filter(card => card.Referencia.toLowerCase().includes(input.value.toLowerCase()))
    renderCard(newCard) 
})
 

//Creacion de las cards dinamicas 

const createCards = cards => cards.map (card =>
    
    ` <div id= "product" class="dad-card"> 
    <div class="card" style="width: 18rem; height: 24rem;" data-id="${card.ID}" data-price="${card.Precio_Mayorista}" data-referencia="${card.Referencia}" data-imagen="${card.Imagen_publica.url}"> 
        <div class="card-body"> 
            <img src="${card.Imagen_publica.url}" class="card-img-top" alt="...">  
            <h5 class="card-title" id="title">${card.Referencia}</h5>   
            <p  class="card-text">${card.Caracteristicas} </p>  
            <h6>$${new Intl.NumberFormat('es-CO').format(card.Precio_Mayorista)}</h6> 
            <div class="container-botones">
                <button class="sumar"> Agregar </button>                                
            </div> 
        </div>                                          
    </div> 
    </div>  `).join(' ') 

    
//Renderizacion de las cards
const renderCard = (cards) =>{
    const itemCard = createCards(cards)
    dad.innerHTML = itemCard
}




//filtros por categoria 

//Obtener botones
const btnAll = document.querySelector('#todo')
const btnAud = document.querySelector('#audifonos')
const btnPowerb = document.querySelector('#powerbank')
const btnCargador = document.querySelector('#cargador')
const btnCables = document.querySelector('#cables')
const btnBocina = document.querySelector('#bocina') 


btnAll.addEventListener('click', ()=>{
    const value = btnAll.value
    console.log(value)
    const filtro = cards.filter(btn => btn) 
    console.log(filtro) 
})

btnAud.addEventListener('click', ()=>{
    const value = btnAud.value 
    console.log(value)
    const filtro = cards.filter(btn => btn.Referencia.toLowerCase().includes(btnAud.value.toLocaleLowerCase()))
    console.log(filtro) 
})

btnPowerb.addEventListener('click', ()=>{ 
    const value = btnPowerb.value 
    console.log(value)
    const filtro = cards.filter(btn => btn.Referencia.toLowerCase().includes(btnPowerb.value.toLowerCase()))  
    console.log(filtro)
})

btnCargador.addEventListener('click', ()=>{
    const value = btnCargador.value 
    console.log(value)
    const filtro = cards.filter(btn => btn.Referencia.toLocaleLowerCase().includes(btnCargador.value.toLocaleLowerCase()))
    console.log(filtro) 
})

btnCables.addEventListener('click', ()=>{
    const value = btnCables.value 
    console.log(value)
    const filtro = cards.filter(btn => btn.Referencia.toLocaleLowerCase().includes(btnCables.value.toLocaleLowerCase()))
    console.log(filtro) 
})

btnBocina.addEventListener('click', ()=>{
    const value = btnBocina.value 
    console.log(value)
    const filtro = cards.filter(btn => btn.Referencia.toLocaleLowerCase().includes(btnBocina.value.toLocaleLowerCase()))
    console.log(filtro)
}) 