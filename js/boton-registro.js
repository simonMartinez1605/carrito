//Escuchar evento del boton 
const boton = document.querySelector('.btn-registro') 

//Variable de la url de la api 

const url = 'https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Clientes_Report'

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
    const natu = natural.value 
    const juri = juridica.value  

    //Formatos JSON para enviar el post a la base de datos

    //JSON para regimen de persona natural
    const objetoJSON = {
        Nombre: valorNombre, 
        Primer_Apellido: valorApellido, 
        Tipo1: valorTipoCedula, 
        Documento: valorCedula, 
        Celular: valorCelular, 
        Correo: valorCorreo,  
        Departamento: valorDepartamento,
        Municipio: valorMunicipio,
        Direccion: valorDireccion, 
        Regimen: natu, 
        Estado: "Activo", 
    } 

    //JSON para regimen de persona juridica
    const objetoJSON2 = {
        Nombre: valorNombre, 
        Primer_Apellido: valorApellido, 
        Tipo1: valorTipoCedula, 
        Documento: valorCedula, 
        Celular: valorCelular, 
        Correo: valorCorreo, 
        Departamento: valorDepartamento,
        Municipio: valorMunicipio,
        Direccion: valorDireccion, 
        Regimen: juri, 
        Estado: "Activo", 
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

        dody: JSON.stringify(objetoJSON2) 
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
            console.log('Respuesta', data)
        })

        .catch(error => {
            console.error('Fallo en la solicitud', error)
        })
    }
 


    //Operador ternario para mandar el JSON correspondiente al regimen 
    natural.checked?console.log(objetoJSON)
    :console.log(objetoJSON2)  

    //Libreria para mostrar una alerta 
    Swal.fire({
        icon: "success", 
        title: "LISTO",
        text: "Ya estas en nuestra base de datos",
        footer: '<a href="/carrito/HTML/catalogo.html">Regresa al pedido</a>' 
      });
})


