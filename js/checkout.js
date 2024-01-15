//Variable para almacenar info de la api 
let chechkout = [] 

//Para almacenar la fecha actual
let fechaHoy = []
const obtenerFecha = ()=>{
    const fecha = new Date(); 
    const dia = String(fecha.getDate()).padStart(2, '0'); 
    const mes = String(fecha.getMonth() + 1).padStart(2 , '0'); 
    const anio = fecha.getFullYear(); 
    return `${anio}-${mes}-${dia}` 
}

fechaHoy = obtenerFecha() 

//Constantes para agregar al checkout cuando ya se tiene un registro del cliente 
const Nombre = document.querySelector('.nombre')
const Apellido = document.querySelector('.apellido')
const Tipo_documento = document.querySelector('.tipo-doc')
const Celular = document.querySelector('.celular')
const Correo = document.querySelector('.correo') 
const Departamento = document.querySelector('.departamento')
const Municipio = document.querySelector('.municipio')
const Direccion = document.querySelector('.direccion')

let ID = []
let subTotal = []
let ivaTotal = [] 
let Detalle = []
let Total = [] 

let cedulaCheckout = []
let products = []

//Funcion para mostrar en el checkout 
const check = ()=>{
    if(chechkout.length === 1){
        chechkout.forEach(i =>{
            //Direccion del cliente 
            Direccion.innerText = `${i.Direccion}` 
            
            ID = i.ID 

            //Cedula 
            cedulaCheckout = i.Documento  

            //Guardar info de cada valor  

            url = "https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Pedidos_1hora" 
        });  
    }
    else{
        Direccion.innerText = ` `

        const btnGuadarCheckout = document.querySelector('.form-submit')

        btnGuadarCheckout.addEventListener('click', ()=>{
            Swal.fire({ 
                icon: "error", 
                title: "Lo sentimos...",
                text: "No estas en nuestra base de datos",
                footer: '<a href="/HTML/registro.html">Registrate</a>' 
            }); 
        }); 

       //console.log(chechkout.length)
    }
}; 


//Constante para almacenar la info del input 
const inputCedula = document.querySelector('.cedula')

let Doc= []

//Se agrego un evento a la constante 

inputCedula.addEventListener('keyup', (e)=>{
    //variable para obtener el valor 
    const cedula = e.target.value
    
    Doc = cedula 
    
    //console.log(Doc)  
    //API con parametro de busqueda en cedula 
    URL_API_Reporte_Clientes = `https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Clientes_Report?max=1000&where=Documento=="${cedula}"`   

    //Funcion para traer la info 
    const initCheckout = ()=>{
        fetch(URL_API_Reporte_Clientes)
        .then(response => response.json())
        .then(data =>{
            chechkout = data; 
            //console.log(data)  
            
            //Funcion para mostrar en el checkout
            check(); 

        }) 
        .catch(error =>console.log(error))
        
    };     
    initCheckout(); 
}); 

//Condicion cuando no traiga info de la API 


const btnGuadarCheckout = document.querySelector('.form-submit')


btnGuadarCheckout.addEventListener('click', ()=>{
    carts.forEach(product =>{

        //console.log(product) 
        
        //Iva de cada producto 
        const iva = product.price *0.19 
        
        const ivatotal = iva * product.quantity
        
        ivaTotal = Math.floor(ivatotal) 
        
        //Subtotal de los productos 
        const subtotal = product.price - ivatotal
        
        subTotal  = Math.ceil(subtotal)

        const total =  product.price * product.quantity

        Total = total  

        //id de cada producto
        const  id = product.product_id

        //cambio  de precio (str) a (int)

        const precioProduct = product.price *1 

        let new_products = { 
            Productos: id,
            Precio: precioProduct,
            Total : Total, 
            Cantidad : product.quantity, 
            Subtotal: subTotal,
            IVA_total: ivaTotal,  
            Iva: ivaTotal
        }

        products.push(new_products); 


    
        //Declaracion a detalle de todo el objeto de productos 
        Detalle = products 

        console.log(Detalle) 

    }) 
    if(chechkout.length == 1){
        const jsonCliente =  { 
            Fecha : fechaHoy, 
            Clientes: ID,
            Detalle: Detalle, 
            Estado: "Pendiente", 
            Total: price,  
            IVA_total: ivaTotal,
            Subtotal :subTotal 
        } 
        
        const envioCkeckout = {
            method : 'POST', 
            headers : {
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify(jsonCliente) 
        }
        
        fetch(url, envioCkeckout)
        .then(response => response.json())
        .then(data =>{
            console.log('Respuesta', data)
            Swal.fire({ 
                icon: "success",
                title: "Excelente",
                text: "Tu pedido fue recibido", 
            });

            console.log(carts)  

            // const reiniciar = (()=>{
            //     location.reload();
            //     console.log('hecho') 
            // }) 

            // btnGuadarCheckout.addEventListener('click', reiniciar())  


        })  
    }else{
        Swal.fire({ 
            icon: "error", 
            title: "Lo sentimos...",
            text: "No estas en nuestra base de datos",
            footer: '<a href="/HTML/registro.html">Registrate</a>' 
        }); 
    }
    
})