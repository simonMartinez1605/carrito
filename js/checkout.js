//Variable para almacenar info de la api 
let chechkout = [] 

//Constantes para agregar al checkout cuando ya se tiene un registro del cliente 
const Nombre = document.querySelector('.nombre')
const Apellido = document.querySelector('.apellido')
const Tipo_documento = document.querySelector('.tipo-doc')
const Celular = document.querySelector('.celular')
const Correo = document.querySelector('.correo') 

//Funcion para mostrar en el checkout 
const check = ()=>{
    if(chechkout.length == 1){
        chechkout.forEach(i =>{
            //console.log(i) 
            
            const nombre = i.Nombre
            const nombre2 = i.Segundo_Nombre
            const apellido = i.Primer_Apellido
            const apellido2 = i.Segundo_Apellido
            const correo = i.Correo
            const celular = i.Celular
            const tipo_documento = i.Tipo1
        
            Nombre.innerText = `${nombre} ${nombre2}` 
            Apellido.innerText = `${apellido} ${apellido2}` 
            Tipo_documento.innerText = `${tipo_documento}`
            Celular.innerText = `${celular}`
            Correo.innerText = `${correo}` 
        });  
    }
    //Condicion cuando no traiga info de la API 
    else{
        Nombre.innerText = ` ` 
        Apellido.innerText = ` `
        Tipo_documento.innerText = ``
        Celular.innerText = ` `
        Correo.innerText = ` `
    }
}; 

//Constante para almacenar la info del input 
const inputCedula = document.querySelector('.cedula')

//Se agrego un evento a la constante 

inputCedula.addEventListener('keyup', (e)=>{
    //variable para obtener el valor 
    var num = e.target.value 
    //console.log(num)

    //variable para colocar y buscar en la api 
    const cedula = num
    
    //API con parametro de busqueda en cedula 
    URL_API_Reporte_Clientes = `https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Clientes_Report?max=1000&where=Documento=="${cedula}"`

    //Funcion para traer la info 
    const initCheckout = ()=>{
        fetch(URL_API_Reporte_Clientes)
        .then(response => response.json())
        .then(data =>{
            chechkout = data; 
            //console.log(typeof chechkout)
            
            //Funcion para mostrar en el checkout
            check(); 
 
        }) 
        .catch(error =>console.log(error)) 
        
    };     
    initCheckout(); 
}); 