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
let DetalleTotal = [] 

let Total = 0 

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

//Declaraciones para los valores totales 
let IvaTotal = 0
let SubTOTAL = 0 

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

        //Declaracion para el total de la factura 
        let Iva = 0

        DetalleTotal = total 

        Total = Total += total 

        Iva = Total * 0.19 

        IvaTotal = Math.ceil(Iva) 

        SubTOTAL = Total - IvaTotal 

        console.log(IvaTotal)

        //id de cada producto
        const  id = product.product_id

        //cambio  de precio (str) a (int)

        const precioProduct = product.price *1 

        let new_products = { 
            Productos: id,
            Precio: precioProduct,
            Total : DetalleTotal, 
            Cantidad : product.quantity, 
            Subtotal: subTotal,
            IVA_total: ivaTotal,  
            Iva: ivaTotal
        }

        products.push(new_products); 


    
        //Declaracion a detalle de todo el objeto de productos 
        Detalle = products  

    }) 
    if(chechkout.length == 1){
        const jsonCliente =  { 
            Fecha : fechaHoy, 
            Clientes: ID,
            Detalle: Detalle, 
            Estado: "Pendiente", 
            Total: Total,
            IVA_total: IvaTotal,
            Subtotal : SubTOTAL 
        } 
        
        const envioCkeckout = {
            method : 'POST', 
            headers : {
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify(jsonCliente) 
        }

        console.log(jsonCliente) 
        
        fetch(url, envioCkeckout)
        .then(response => response.json())
        .then(data =>{
            console.log('Respuesta', data)
            Swal.fire({ 
                icon: "success",
                title: "Excelente",
                text: "Tu pedido fue recibido", 
            });

            const reiniciar = (()=>{
                location.reload();
            })  

            setTimeout(()=>{
                reiniciar() 
            }, 4000)

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