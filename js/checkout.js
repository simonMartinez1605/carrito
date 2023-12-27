//Js del checkout 

//Abrir y cerrar el chechkout 

const btnAbrir = document.querySelector('.pagar')
const containerCheckout = document.querySelector('.dad-checkout')
const btnCerrar = document.querySelector('.boton-cerrar')


btnAbrir.addEventListener('click', ()=>{
    containerCheckout.classList.toggle('hidden-checkout')
    //console.log('hola') 
}); 

btnCerrar.addEventListener('click', ()=>{
    containerCheckout.classList.toggle('hidden-checkout') 
}); 


//API para el reporte de los clientes  

URL_API_Reporte_Clientes = "https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Clientes_Report" 


//Variable para almacenar info de la api 
let chechkout = [] 

//constantes para agregar al checkout cuando ya se tiene un registro del cliente 
const inputCedula = document.querySelector('.cedula')
const Nombre = document.querySelector('.nombre')
const Apellido = document.querySelector('.apellido')
const Tipo_documento = document.querySelector('.tipo-doc')
const Celular = document.querySelector('.celular')
const Correo = document.querySelector('.correo')


//Funcion para buscar el documento en la api
const check = ()=>{
    chechkout.forEach(i =>{
        console.log(i)
        inputCedula.addEventListener('keyup', (e) =>{
            let num = e.target.value
            //console.log(num) 
            if(i.Documento == num){
                const nombre = i.Nombre
                const apellido = i.Primer_Apellido
                const correo = i.Correo
                const celular = i.Celular
                const tipo_documento = i.tipo1 

                Nombre.innerText = `${nombre}`
                Apellido.innerText = `${apellido}`
                Tipo_documento.innerText = `${tipo_documento}`
                Celular.innerText = `${celular}`
                Correo.innerText = `${correo}`

            }
            
        });     
    });
}; 


//Llamado a la api
const initCheckout = ()=>{
    fetch(URL_API_Reporte_Clientes)
    .then(response => response.json())
    .then(data =>{
        chechkout = data; 
        //Funcion para utilizar la api 
        check(); 
    }) 
    .catch(error =>console.log(error)) 
}; 

initCheckout();