//Variable para almacenar info de la api 
let chechkout = [] 

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
    if(chechkout.length == 1){
        chechkout.forEach(i =>{
            //console.log(i)
            

            //Constantes para guardar y mostrar la info de la API
            const nombre = i.Nombre
            const nombre2 = i.Segundo_Nombre
            const apellido = i.Primer_Apellido
            const apellido2 = i.Segundo_Apellido
            const correo = i.Correo
            const celular = i.Celular
            const tipo_documento = i.Tipo1
            const departamento = i.Departamento1.Departamento
            const municipio = i.Municipio.Municipio
            const direccion = i.Direccion
            
            //constante para solo guardar info 
            const IdDepartamento = i.Departamento1.ID
            const estado = i.Estado
            const regimen = i.Regimen 

            //console.log(idDepartamento,estado,regimen)

            Nombre.innerText = `${nombre} ${nombre2}` 
            Apellido.innerText = `${apellido} ${apellido2}` 
            Tipo_documento.innerText = `${tipo_documento}`
            Celular.innerText = `${celular}`
            Correo.innerText = `${correo}` 
            Departamento.innerText = `${departamento}`
            Municipio.innerText = `${municipio}`
            Direccion.innerText = `${direccion}` 



            const opciones ={
                method: 'POST', 
                headers:{
                    'content-Type': 'application/json', 
                }, 
                // body: JSON.stringify({
                //     Nombre : nombre, 
                //     Segundo_Nombre: nombre2,
                //     Apellido : apellido, 
                //     Segundo_Apellido : apellido2,
                //     Correo : correo, 
                //     Celular: celular, 
                //     Tipo_documento: tipo_documento,  
                //     IdDepartamento: IdDepartamento, 
                //     Estado: estado, 
                //     Regimen: regimen,
                // })
            
            }; 

            //Variable para el llamado del evento
            const btnGuadarCheckout = document.querySelector('.form-submit')


            //Boton para guardar info 
            btnGuadarCheckout.addEventListener('click', ()=>{
                fetch(URL_API_Reporte_Clientes, opciones)
                .then(response =>{
                    if(!response.ok){
                        throw new Error('Error en la solicitud')
                    }
                    return response.json(); 
                })
                .then(data =>{
                    console.log('Respuesta', data); 
                })
                .catch(error => {
                    console.log(error); 
                })
                Swal.fire({
                    icon: "error",
                    title: "Lo sentimos...",
                    text: "No estas en nuestra base de datos :(",
                    footer: '<a href="/carrito/HTML/registro.html">REGISTRATE :)</a>' 
                });
            }); 
            
            console.log(opciones) 

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
            console.log(data)
            
            //Funcion para mostrar en el checkout
            check(); 

        }) 
        .catch(error =>console.log(error)) 
        
    };     
    initCheckout(); 
}); 
