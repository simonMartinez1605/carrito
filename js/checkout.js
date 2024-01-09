//Variable para almacenar info de la api 
let chechkout = [] 


let fechaHoy = []
const obtenerFecha = ()=>{
    const fecha = new Date(); 
    const dia = String(fecha.getDate()).padStart(2, '0'); 
    const mes = String(fecha.getMonth() + 1).padStart(2 , '0'); 
    const anio = fecha.getFullYear(); 
    return `${dia}/${mes}/${anio}`
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


//Funcion para mostrar en el checkout 
const check = ()=>{
    if(chechkout.length === 1){
        chechkout.forEach(i =>{
            //console.log(i) 

            //Mostrar la info del checkout de forma automatica

            // Nombre.innerText = `${i.Nombre} ${i.Segundo_Nombre}` 
            // Apellido.innerText = `${i.Primer_Apellido} ${i.Segundo_Apellido}`
            // Tipo_documento.innerText = `${i.Tipo1}`
            // Celular.innerText = `${i.Celular}`
            // Correo.innerText = `${i.Correo}` 
            // Departamento.innerText = `${i.Departamento1.Departamento}`
            // Municipio.innerText = `${i.Municipio.Municipio}` 
            Direccion.innerText = `${i.Direccion}` 

            //Variable para el llamado del evento
            const btnGuadarCheckout = document.querySelector('.form-submit')


            let ivaTotal = [] 
            let Detalle = []

            carts.forEach(product =>{

                

                iva = product.price *0.19 
                
                const products = {
                    Productos : product.product,
                    Precio : product.price ,
                    Cantidad : product.quantity,
                    Iva : iva.toFixed(0)
                }

                Detalle = products 
            })

            //Boton para guardar info 
            btnGuadarCheckout.addEventListener('click', ()=>{
                Swal.fire({ 
                    icon: "success",
                    title: "Excelente",
                    text: "Tu pedido fue recibido", 
                }); 

                const jsonCliente =  {
                    Fecha : fechaHoy, 
                    Cliente: chechkout, 
                    Detalle: Detalle, 
                    Total: precio, 
                    Estado: "Pendiente", 
                } 

                console.log(jsonCliente) 
            }); 

            
            //console.log(opciones)

        });  
    }
    //Condicion cuando no traiga info de la API 
    else{
        Nombre.innerText = ` `  
        Apellido.innerText = ` `
        Tipo_documento.innerText = ``
        Celular.innerText = ` `
        Correo.innerText = ` `
        Departamento.innerText = ` `
        Municipio.innerText = ` `
        Direccion.innerText = ` `

        const btnGuadarCheckout = document.querySelector('.form-submit')

        btnGuadarCheckout.addEventListener('click', ()=>{
            Swal.fire({ 
                icon: "error", 
                title: "Lo sentimos...",
                text: "No estas en nuestra base de datos",
                footer: '<a href="/HTML/registro.html">Registrate</a> ' 
            });
            console.log('funciona') 
        }); 

    }
}; 


//Constante para almacenar la info del input 
const inputCedula = document.querySelector('.cedula')

//Se agrego un evento a la constante 

inputCedula.addEventListener('keyup', (e)=>{
    //variable para obtener el valor 
    const cedula = e.target.value
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
