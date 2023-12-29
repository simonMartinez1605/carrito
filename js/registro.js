//Boton para ingreso a la base de datos 
window.addEventListener('load', ()=>{
    const form = document.querySelector('.formulario')
    const nombre = document.querySelector('.nombre')
    const apellido = document.querySelector('.apellido')
    const email = document.querySelector('.correo')
    const tipo_documento = document.querySelector('.tipo-doc')
    const cedula = document.querySelector('.cedula')
    const departamento = document.querySelector('.departamento')
    const municipio = document.querySelector('.municipio')
    const direccion = document.querySelector('.direccion')


    form.addEventListener('submit', (e)=>{
        e.preventDefault()

        validaCampos()
    })

    const validaFalla = (input, msje) =>{
        const formControl = input.parentElement
        const aviso = formControl.querySelector('p')
        aviso.innerText = msje

        formControl.className = 'form-control falla' 
    }

    const validaOK = (input) =>{
        const formControl = input.parentElement
        formControl.className = 'form-control ok'
    }

    const validaEmail = (email)=>{
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

    const validaCampos = ()=>{
        //captura los valores de los campos

        const valorNombre = nombre.value.trim()
        const valorApellido = apellido.value.trim()
        const valorEmail = email.value.trim() 
        const valorTipoDocumento = tipo_documento.value.trim()
        const valorCedula = cedula.value.trim()
        const valorDepartamento = departamento.value.trim()
        const valorMunicipio = municipio.value.trim()
        const valorDireccion = direccion.value.trim();

        console.log(valorMunicipio); 
        //Validar campos 
        (!valorNombre) ? validaFalla(nombre, 'campo vacio') : validaOK(nombre)

        (!valorApellido) ? validaFalla(apellido, 'campo vacio') : validaOK(apellido); 

        if(!valorEmail){
            validaFalla(email, 'campo vacio')
        }
        else if(!validaEmail(valorEmail)){
            validaEmail(email, 'El e-mail no es valido')
        }
        else{
            validaOK(email)
        }

        (!valorTipoDocumento) ? validaFalla(tipo_documento, 'campo vacio') : validaOK(tipo_documento)

        (!valorCedula) ? validaFalla(cedula, 'campo vacio') : validaOK(cedula)

        (!valorDepartamento) ? validaFalla(departamento, 'campo vacio') : validaOK(departamento) 

        (!valorMunicipio) ? validaFalla(municipio, 'campo vacio') : validaOK(municipio)

        (!valorDireccion) ? validaFalla(direccion, 'campo vacio') : validaOK(direccion)
       
    }
    

})
// const boton = document.querySelector('.form-submit') 

// boton.addEventListener('click', ()=>{
// Swal.fire({
//     icon: "success",
//     title: "LISTO",
//     text: "Ya estas registrado en nuestra base de datos",
//     footer: '<a href="/carrito/HTML/catalogo.html">Sigue comprando</a>'
// });