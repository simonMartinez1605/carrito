//Filtros de busqueda


//La busqueda por medio de input 

const inputBuscar = document.getElementById('buscar')

const cards = document.getElementsByTagName('h5')

const dad = document.getElementsByClassName('dad-card') 

inputBuscar.addEventListener('keyup', (e) =>{
    let text = e.target.value
    //console.log(text) 

    let search = new RegExp (text, "i") 
    for(let i= 0; i<cards.length ; i++){  
        let valor = cards[i] 
        let container = dad[i]  
        //console.log(container) 
        if (search.test(valor.innerText)){
            valor.classList.remove('cards')  
            container.classList.remove('dads')
            
        }
        else{
            valor.classList.add('cards')   
            container.classList.add('dads')
        }
    } 
}); 
