//Variables para obtener el input 

const nombre = document.querySelector("[name = Nombre]")
const apelllido = document.querySelector("[name = Apellido]")
const tipoCedula = document.querySelector("[name = Tipo-Documento]")
const cedula = document.querySelector("[name = Cedula]")
const celular = document.querySelector(".celular") 
const correo = document.querySelector("[name = Correo]")
const departamento = document.querySelector("[name = Departamento]")
const municipio = document.querySelector("#municipio")
const direccion = document.querySelector("#direccion") 
const natural = document.querySelector('.natural') 
const juridica = document.querySelector('.juridica') 

const tipoPersona = document.querySelector('.tipo-persona') 


let mun =[]

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

//Llamado de la api municipios 



//Funcion para traer el id del municipio dependiendo del departamento 

let idMunicipio = []

let idDepartamento =[] 

let addedUser = []

const recorrido = ()=>{
    mun.forEach(e =>{

        console.log(e)

        const dep = document.querySelector('#departamento').value.toLowerCase() 

        //console.log(dep)

        if(dep == e.Departamento){
            
            const objetoMun ={
                Municipio: e.Municipio, 
                ID: e.ID, 
                zc_display_value: e.Municipio, 
            }

            idMunicipio = objetoMun 
            // console.log(idMunicipio) 
        }

        const obejetoDep = {
            Departamento :e.Departamento, 
            ID : e.ID, 
            zc_display_value: e.Departamento, 
        }

        idDepartamento = obejetoDep 

        // const user = e.Added_User 

        // addedUser = user  

    }) 
}
//Funcion para traer los municipios 
municipio.addEventListener('keyup', (e)=>{
    const municipio = e.target.value 


    URL_REPORT_MUNICIPIOS =     URL_API_Reporte_Clientes = `https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Municipio1?where=Municipio.contains("${municipio}")` 

    const busquedaMunicipios = ()=>{
        fetch(URL_REPORT_MUNICIPIOS)
        .then(response => response.json())
        .then(data => {
            mun = data; 
            //console.log(data)

            recorrido()
        })
        .catch(error =>{
            console.error(error) 
        })
    }
    busquedaMunicipios(); 

}) 