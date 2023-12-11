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

const printProducts = (products, container) => {
    container.innerHTML = ''; 

    products.forEach(product =>{
        container.innerHTML += `
        <div class="card" style="width: 18rem; height: 20rem; "> 
        <img src="${product.Image}" class="card-img-top" alt="...">
        <div class="card-body"> 
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

