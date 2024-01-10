//Escuchar evento del boton 
const boton = document.querySelector('.btn-registro') 

//Variable de la url de la api 

const url = 'https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Clientes'

let datos = []

boton.addEventListener('click', ()=>{

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
        Celular: valorCelular, 
        Correo: valorCorreo, 
        Departamento: valorDepartamento,
        Municipio: idMunicipio,
        Direccion: valorDireccion, 
        Regimen: juri, 
        Estado: "Activo", 
        Cupo: "0",
    }
    console.log(fechaNacimiento) 
    
    const personaNatural ={
        method: 'POST', 
        headers : {
            'Content-Type' : 'application/json', 
        }, 
        
        body: JSON.stringify(objetoJSON),
    }; 
    
    if(natural.checked){
        console.log(objetoJSON)
    }
    else{
        console.log(objetoJSON2)
    }
    const personaJuridica ={
        method : 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        }, 

        body: JSON.stringify(objetoJSON2) 
    }

    if(natural.checked){ 
        fetch(url, personaNatural)
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta', data)
        })
        .catch(error => {
            console.error('Fallo en la solicitud', error)
        })
    }
    else{
        fetch(url, personaJuridica)
        .then(response => response.json()) 
        .then(data => {
            datos = data 
            console.log('Respuesta', data)
        })

        .catch(error => {
            console.error('Fallo en la solicitud', error)
        })
    }
 


    //Operador ternario para mandar el JSON correspondiente al regimen 

    //Libreria para mostrar una alerta 
    Swal.fire({
        icon: "error", 
        title: "LISTO",
        text: "Ya estas en nuestra base de datos",
        footer: '<a href="/HTML/catalogo.html">Regresar al pedido</a>'
    });
    
})


