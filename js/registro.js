//Variables para obtener el input 

const nombre = document.querySelector("[name = Nombre]")
const apelllido = document.querySelector("[name = Apellido]")
const tipoCedula = document.querySelector("[name = Tipo-Documento]")
const cedula = document.querySelector("[name = Cedula]")
const celular = document.querySelector(".celular") 
const correo = document.querySelector("[name = Correo]")
const departamento = document.querySelector("[name = Departamento]")
const municipio = document.querySelector("[name = Municipio]")
const direccion = document.querySelector("[name = Direccion]") 

//Funcion para validar campo vacio
const errors = (message, field, isError = true) =>{
    if(isError){
        field.classList.add("invalid"); 
        field.nextElementSibling.classList.add('error'); 
        field.nextElementSibling.innerText = message; 
    }
    else{
        field.classList.remove("invalid"); 
        field.nextElementSibling.classList.remove('error'); 
        field.nextElementSibling.innerText = ""; 
    }
}


//Funcion para validar campo vacio
const validacion = (message, e) =>{
    const valor = e.target.value; 
    const field = e.target; 
   if(valor.trim().length === 0){ 
    errors(message,field)
   }
   else{
    errors("", field, false) 
   }
}


//Fucion para validar campo de correo
const validacionEmail = (e) =>{
    const field = e.target 
    const value = e.target.value 
    const regex = new RegExp(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/); 

    value.trim().length > 5 && !regex.test(value)
    ?errors("Ingresa un correo valido", field)

    :errors("", field, false)
}


//Validacion de telefono

const validacionNumero = (e)=>{
    const field = e.target 
    const valor = e.target.value 
    const regex = new RegExp (/^(?:\+57|0057|57)?([1-9][0-9]{9})$/); 

    valor.trim().length > 10 && !regex.test(valor)
    ?errors("Ingresa un numero valido", field)
    
    :errors("",field, false)

}

//Funcion para validar cedula 

const validacionCedula = (e) =>{

    const field = e.target 
    const value = e.target.value 
    const regex = new RegExp (/^[1-9]{1}[0-9]{0,2}(?:\.[0-9]{3}){0,2}\.[0-9]{3}-[0-9kK]$/); 

    value.trim().length > 10 && !regex.test(value)
    ?errors("Ingresa una cedula valida", field)
    :errors("", field, false)

    cedula.addEventListener('input', validacionCedula)
}

//Validacion de campo vacio
nombre.addEventListener('blur', (e) => validacion('Ingresa tu Nombre',e))
apelllido.addEventListener('blur', (e) => validacion('Ingresa tu Apellido',e))
tipoCedula.addEventListener('blur', (e) => validacion('Ingresa tu Tipo de Cedula',e))
cedula.addEventListener('input', (e) => validacion('Ingresa tu Cedula',e))
celular.addEventListener('input', (e) => validacion('Ingresa tu Celular',e))
correo.addEventListener('input', (e) => validacion('Ingresa tu Correo',e))
departamento.addEventListener('blur', (e) => validacion('Ingresa tu Departamento',e))
municipio.addEventListener('blur', (e) => validacion('Ingresa tu Municipio',e))
direccion.addEventListener('blur', (e) => validacion('Ingresa tu Direccion',e))


//Validacion de correo 

correo.addEventListener('input', validacionEmail) 

//Validacion de telefono 

celular.addEventListener('input', validacionNumero) 

//Validacion de cedula  

cedula.addEventListener('input', validacionCedula) 


//Variables para guardar los valores

const Nombre = nombre.validacion 
const Apellido = apelllido.value 
const Tipo_Documento = tipoCedula.value 
const Cedula = cedula.value 
const Celular = validacionNumero.valor  
const Correo = correo.value 
const Departamento = departamento.value 
const Municipio = municipio.value 
const Direccion = direccion.value


//Objeto para mandar la solicitud  post 

const objetoJSON = {
    Celular: Celular, 
    Correo : Correo ,
    Nombre : Nombre, 
    Primer_Apellido: Apellido , 
    Tipo1: Tipo_Documento, 
    Documento: Cedula,
    Municipio:Municipio, 
    Direccion : Direccion, 
} 


//boton de registro 
 
const btnRegistro = document.querySelector('.btn-registro')

btnRegistro.addEventListener('click', ()=>{ 
    console.log(nombre.value) 
    console.log(apelllido.value)
    console.log(tipoCedula.value) 
    console.log(cedula.value)
    console.log(celular.value)
    console.log(correo.value)
    console.log(direccion.value)

    console.log(objetoJSON)

})