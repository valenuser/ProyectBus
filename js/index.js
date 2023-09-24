// import {verificacionFormulario} from './compra.js'


const buscar = document.getElementById('buscar')
const logo = document.getElementById('logoImagen')


//botones de ida y vuelta

const idaCheck = document.getElementById('idaCheck')
const vueltaCheck = document.getElementById('vueltaCheck')

//ida y vuelta objetos formulario
const idaBox = document.getElementById('idaBox')
const vueltaBox = document.getElementById('vueltaBox')

//sections
const navegadorPagina = document.getElementById('navegadorPagina')
const inicio = document.getElementById('inicio')
const compra = document.getElementById('compra')
const datosPasajero = document.getElementById('datosPasajero')
const cardPay = document.getElementById('cardPay')

//error formulario

const popUpFallo = document.getElementById('pop-upFallo')

//boton continuar

//objetos formulario viaje
const salida = document.getElementById('salida')
const llegada = document.getElementById('llegada')
const fechaIda = document.getElementById('fechaIda')
const fechaVuelta = document.getElementById('fechaVuelta')
const pasajeros = document.getElementById('pasajeros')




//generador de tarjetas de compra
const disponibles = document.getElementById('disponibles')
const salidaInfo = document.getElementById('salidaInfo')
const llegadaInfo = document.getElementById('llegadaInfo')
const fechaElegida = document.getElementById('fechaElegida')

const precios = [
    {
        id:1,
        salida:'8:45',
        duracion:'7:10',
        llegada:'15:00',
        precio:54
    },
    {
        id:2,
        salida:'9:30',
        duracion:'7:10',
        llegada:'16:15',
        precio:45
    },
    {
        id:3,
        salida:'10:45',
        duracion:'7:10',
        llegada:'17:30',
        precio: 45
    },
    {
        id:4,
        salida:'11:15',
        duracion:'7:10',
        llegada:'18:00',
        precio:50
    },
    {
        id:5,
        salida:'12:20',
        duracion:'7:10',
        llegada:'19:45',
        precio:52
    },
    {
        id:6,
        salida:'13:15',
        duracion:'7:10',
        llegada:'20:20',
        precio:55
    },
    {
        id:7,
        salida:'14:50',
        duracion:'7:10',
        llegada:'22:00',
        precio:54
    },
    {
        id:8,
        salida:'16:00',
        duracion:'7:10',
        llegada:'23:15',
        precio:48
    }
]

const datosViaje = []

const datosCompra = []

let compraVuelta = true



const compraDatos =(datos,precios)=>{
    disponibles.innerHTML = ''

    if(compraVuelta){
        salidaInfo.textContent = datos.salida
        llegadaInfo.textContent = datos.llegada
        fechaElegida.textContent = datos.ida
        precios.forEach(precio=>{
                
            const {salida, llegada, ida, vuelta, pasajeros} = datos
        
            const div = document.createElement('div')
        
            div.id = 'card'

            div.className = 'animate__animated animate__flipInX'
        
            div.innerHTML = `
                <div id="cardhorarios">
                    <p>${salida}</p>
                    <p>${precio.salida}</p>
                </div>
            <div id="linea"></div>
            <div id="cardhorarios">
                <p>Greyhound</p>
                <p>${precio.duracion}</p>
            </div>
            <div id="linea"></div>
            <div id="cardhorarios">
                <p>${llegada}</p>
                <p>${precio.llegada}</p>
            </div>
            <div id="precio">
                <p>${precio.precio}$/persona</p>
                <input type="button" value="Continuar"  onclick="validarCompra(${precio.id})">
            </div>
            `
            
            disponibles.append(div)
        })
    }else{
        salidaInfo.textContent = datos.llegada
        llegadaInfo.textContent = datos.salida
        fechaElegida.textContent = datos.vuelta
        precios.forEach(precio=>{
                
            const {salida, llegada, ida, vuelta, pasajeros} = datos
        
            const div = document.createElement('div')
        
            div.id = 'card'

            div.className = 'animate__animated animate__flipInX'
        
            div.innerHTML = `
                <div id="cardhorarios">
                    <p>${salida}</p>
                    <p>${precio.salida}</p>
                </div>
            <div id="linea"></div>
            <div id="cardhorarios">
                <p>Greyhound</p>
                <p>${precio.duracion}</p>
            </div>
            <div id="linea"></div>
            <div id="cardhorarios">
                <p>${llegada}</p>
                <p>${precio.llegada}</p>
            </div>
            <div id="precio">
                <p>${precio.precio}$/persona</p>
                <input type="button" value="Continuar"  onclick="validarCompra(${precio.id})">
            </div>
            `
            
            disponibles.append(div)
        })
    }
}


const precioFinal = document.getElementById('precioFinal')

//validar compra 
const validarCompra = (referencia) =>{

    if(compraVuelta){
        if(idaCheck.checked){

            datosViaje.push(precios[referencia-1])


            const precioInicial = datosViaje[1].precio * Number(datosViaje[0].pasajeros)

            precioFinal.textContent = '$ '+precioInicial

            datosViaje.push({precioFinal:precioInicial})

            compra.style.display = 'none'
            datosPasajero.style.display = 'flex'
        }else if(vueltaCheck.checked){
    
            compraVuelta = false
    
            datosViaje.push(precios[referencia-1])

            console.log(datosViaje);
    
            const preciosVuelta = precios.filter(precio => precio.id != referencia)

            const datos = {
                salida:salida.value,
                llegada:llegada.value,
                ida:fechaIda.value,
                vuelta:fechaVuelta.value,
                pasajeros:pasajeros.value
            }

            
            compraDatos(datos,preciosVuelta)
        }
    }else{

        compraVuelta = true

        datosViaje.push(precios[referencia-1])

        const precioInicial = (datosViaje[1].precio * Number(datosViaje[0].pasajeros))+(datosViaje[2].precio * Number(datosViaje[0].pasajeros))

        precioFinal.textContent = '$ '+precioInicial

        datosViaje.push({precioFinal:precioInicial})

        compra.style.display = 'none'
        datosPasajero.style.display = 'flex'
    }

    }


idaCheck.addEventListener('click',()=> {
    idaBox.style.display = 'flex'
    vueltaBox.style.display = 'none'
})

vueltaCheck.addEventListener('click',()=> {
    vueltaBox.style.display = 'flex'
})

const asientosIzquierda = document.getElementById('asientosIzquierda')
const asientosDerecha = document.getElementById('asientosDerecha')
const asientosFinal = document.getElementById('asientosFinal')

logo.addEventListener('click',()=>{
    location.reload()
})


//obtener fecha del dia actual
let a = new Date().toLocaleDateString()
let arrFecha=a.split("/");

let fechaHoy = new Date(arrFecha[2],arrFecha[1],arrFecha[0]);


buscar.addEventListener('click',()=>{

    if(verificacionFormulario(fechaIda,fechaVuelta,fechaHoy,idaCheck,vueltaCheck,salida,llegada,inicio,compra,pasajeros) == 'ida'){

        fechaIda.style.border ='1px solid black'

        const datos = {
            salida:salida.value,
            llegada:llegada.value,
            ida:fechaIda.value,
            vuelta:fechaVuelta.value,
            pasajeros:pasajeros.value
        }

        datosViaje.push(datos)

        compraDatos(datos,precios)


        inicio.style.display = 'none'
        compra.style.display = 'flex'

    }else if(verificacionFormulario(fechaIda,fechaVuelta,fechaHoy,idaCheck,vueltaCheck,salida,llegada,inicio,compra,pasajeros) == 'vuelta'){

        const datos = {
            salida:salida.value,
            llegada:llegada.value,
            ida:fechaIda.value,
            vuelta:fechaVuelta.value,
            pasajeros:pasajeros.value
        }

        datosViaje.push(datos)

        compraDatos(datos,precios)

        fechaIda.style.border ='1px solid black'
        fechaVuelta.style.border ='1px solid black'
        inicio.style.display = 'none'
        compra.style.display = 'flex'
    }else{
        popUpFallo.style.display = 'flex'
        setTimeout(()=>{
            popUpFallo.style.display = 'none'
        },5000)
        fechaIda.style.border ='1px solid red'
        fechaVuelta.style.border ='1px solid red'
    }


})