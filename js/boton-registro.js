//Escuchar evento del boton 
const boton = document.querySelector('.btn-registro') 

//Variable de la url de la api 

const url = 'https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Clientes'

let datos = []

let habilitar = false  

//Funcion para crear un nuevo cliente 
const cedulaNoRegistrada = ()=>{ 
    
//Declaracion de variables para obtener el valor de cada input
const valorNombre = document.querySelector('#nombre').value
const valorApellido = document.querySelector('#apellido').value
const valorTipoCedula = document.querySelector('#tipo-doc').value
const valorCedula = document.querySelector('#cedula').value
const valorCelular = document.querySelector('#celular').value
const valorCorreo = document.querySelector('#correo').value
const valorDepartamento = document.querySelector('#departamento').value
const valorMunicipio = document.querySelector('#municipio').value
const valorDireccion = document.querySelector('#direccion').value
const fechaNacimiento = document.querySelector('#fecha_nacimiento').value 
const natu = natural.value 
const juri = juridica.value  
 
//Formatos JSON para enviar el post a la base de datos
    
//JSON para regimen de persona natural
const objetoJSON = {
    // Added_User: addedUser,
    Nombre: valorNombre, 
    Primer_Apellido: valorApellido,  
    Tipo1: valorTipoCedula, 
    Documento: valorCedula, 
    Celular: valorCelular *1, 
    Correo: valorCorreo,  
    Retenedor: "No", 
    Fecha_de_Nacimiento: fechaNacimiento, 
    Acepta_que_la_factura_sea_enviada_por_medios_electr_nicos : "Si",
    Departamento1: idDepartamento, 
    Municipio: idMunicipio, 
    Regimen: natu, 
    Estado: "Activo",
    Cupo: 0, 
    Tipo: "Detal", 
    Dias: 0, 
    location : {
        country2: "Colombia ", 
        address_line_12: valorDireccion, 
        state_province2: valorDepartamento, 
        district_city2: valorMunicipio, 
        postal_Code2: "05001" 
    }
    
} 
//JSON para regimen de persona juridica
const objetoJSON2 = {
    // Added_User: addedUser, 
    Nombre: valorNombre, 
    Primer_Apellido: valorApellido,  
    Tipo1: valorTipoCedula, 
    Documento: valorCedula, 
    Celular: valorCelular *1, 
    Correo: valorCorreo,  
    Retenedor: "No", 
    Fecha_de_Nacimiento: fechaNacimiento, 
    Acepta_que_la_factura_sea_enviada_por_medios_electr_nicos : "Si",
    Departamento1: idDepartamento, 
    Municipio: idMunicipio, 
    Regimen: juri, 
    Estado: "Activo",
    Cupo: 0, 
    Tipo: "Detal", 
    Dias: 0, 
    location : {
        country2: "Colombia ", 
        address_line_12: valorDireccion, 
        state_province2: valorDepartamento, 
        district_city2: valorMunicipio, 
        postal_Code2: "05001" 
    }
    
}
 
const personaNatural ={
     method: 'POST', 
     headers : {
         'Content-Type' : 'application/json', 
     }, 
     
     body: JSON.stringify(objetoJSON),
}; 
 
const personaJuridica ={
    method : 'POST', 
    headers: {
        'Content-Type': 'application/json' 
    }, 

    body: JSON.stringify(objetoJSON2),
}; 
if(natural.checked){ 
    try{
        fetch(url, personaNatural)
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta', data)
        })
        .catch(error => {
            console.error('Fallo en la solicitud', error)
        })
        console.log(objetoJSON)
    }
    catch(error){
        console.error('Error', error) 
    }
}

if(juridica.checked){
    try{
        fetch(url, personaJuridica)
        .then(response => response.json()) 
        .then(data => {
            datos = data 
            console.log('Respuesta', data)
        })
    
        .catch(error => {
            console.error('Fallo en la solicitud', error)
        })
        console.log(objetoJSON2)

    }catch(error){
        console.error('error', error) 
    }
 }

}

//Evento para enviar el post 
boton.addEventListener('click', ()=>{ 

    URL_API_Reporte_Clientes = `https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Clientes_Report?max=1000&where=Documento=="${Documento}"` 
   
    //console.log(await fetch(URL_API_Reporte_Clientes).json())  

    const validacionCedula = ()=>{
    fetch(URL_API_Reporte_Clientes)
    .then(response => response.json())
    .then(data =>{

        if (data['status'] === 400) {
            cedulaNoRegistrada() 
        }else{
            cedulaRegistrada()
        }
    })
    
    .catch(error =>{
        console.error('Fallo en la peticion', error) 
    })

    }
    validacionCedula() 
})

//Funcion cuando ya se esta registrado en la base de datos de clientes 
const cedulaRegistrada = ()=>{
    Swal.fire({
        icon: "error", 
        title: "Error",
        text: "Ya estas en nuestra base de datos",
        footer: '<a href="/HTML/catalogo.html">Regresar al pedido</a>'
    });
}

//Capturar el valor de la cedula para realizar la busqueda en la api de clientes 
let Documento = []

cedula.addEventListener('keyup', ((e)=>{ 
    const cedula = e.target.value
    Documento = cedula
})) 


//Funcion para traer el id del municipio dependiendo del departamento 

let idMunicipio = []

let idDepartamento =[] 


const recorrido = ()=>{
    mun.forEach(municipio =>{

        idMunicipio = municipio.ID 

        idDepartamento = municipio.ID

    }) 
}
//Funcion para traer los municipios 
municipio.addEventListener('keyup', (e)=>{
    const municipio = e.target.value


    URL_REPORT_MUNICIPIOS = URL_API_Reporte_Clientes = `https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Municipio1?where=Municipio.contains("${municipio}")` 

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