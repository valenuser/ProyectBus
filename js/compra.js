
const verificacionFormulario = (fechaIda,fechaVuelta,fechaHoy,idaCheck,vueltaCheck,salida,llegada,inicio,compra,pasajeros)=>{
    //obtener fecha del dia elegido
    let fechaDestino = fechaIda.value
    let fechaDestinoArr = fechaDestino.split("-")
    let fechaFinal = new Date(fechaDestinoArr[0],fechaDestinoArr[1],fechaDestinoArr[2]);
    
    
    let fechaDestinoVuelta = fechaIda.value
    let fechaDestinoArrVuelta = fechaDestinoVuelta.split("-")
    let fechaFinalVuelta = new Date(fechaDestinoArrVuelta[0],fechaDestinoArr[1],fechaDestinoArr[2]);
    
    
    if(idaCheck.checked){
        fechaIda.style.border ='1px solid black'
        fechaVuelta.style.border ='1px solid black'
    
        if(salida.value == llegada.value || fechaIda.value == '' || pasajeros.value == ''){
            return false
        }else{
    
            if(fechaFinal >= fechaHoy){
                return 'ida'
    
            }else{
                return false
            }
        }
    
    }else if(vueltaCheck.checked){
        fechaIda.style.border ='1px solid black'
        fechaVuelta.style.border ='1px solid black'
    
        if(salida.value == llegada.value || fechaIda.value == '' ||  fechaVuelta.value == '' || pasajeros.value == ''){
            return false
        }else{
            if(fechaFinal < fechaHoy){
                fechaIda.style.border ='1px solid red'
                fechaVuelta.style.border ='1px solid red'
                return false
            }else if(fechaIda.value > fechaVuelta.value){
                fechaIda.style.border ='1px solid red'
                fechaVuelta.style.border ='1px solid red'
                return false

            }else if(fechaFinalVuelta < fechaHoy){
                fechaIda.style.border ='1px solid red'
                fechaVuelta.style.border ='1px solid red'
                return false
            }else{
                return 'vuelta'
            }
        }
    }else{
        return false
    }

}




const asientos = document.getElementById('asientos')

const busesAsientos = document.getElementById('busesAsientos')


const asientosSeleccionados = document.getElementById('asientosSeleccionados')

let asientosview = true

asientos.addEventListener('click',()=>{
    if(asientosview){
        asientosview = false
        busesAsientos.style.display = 'flex'
    }else{
        asientosview = true
        busesAsientos.style.display = 'none'
    }
})



//despliegue de bus 

let asientosElegidos = []




const verAsientos = ()=>{

    asientosSeleccionados.textContent = ' '

    let asientosText = asientosElegidos.join('-')

    asientosSeleccionados.textContent = asientosText
}


const guardarAsiento = (asiento) =>{

    if(document.getElementById(asiento.id).style.color == 'red'){
        document.getElementById(asiento.id).style.color = 'black'
        asientosElegidos = asientosElegidos.filter(out => out !== asiento.id)
        

        verAsientos()

    }else{
        document.getElementById(asiento.id).style.color = 'red'
        asientosElegidos.push(asiento.id)
        
        verAsientos()

    }
}



//radio button maletas

const maletaPequeña = document.getElementById('maletaPequeña')
const maletaMediana = document.getElementById('maletaMediana')
const maletaGrande = document.getElementById('maletaGrande')

maletaPequeña.addEventListener('click',()=>{

    console.log(datosViaje[datosViaje.length-1].precioFinal);

    const nuevoPrecio = datosViaje[datosViaje.length-1].precioFinal + (Number(datosViaje[0].pasajeros) * 10)

    precioFinal.textContent = '$ '+nuevoPrecio
})
maletaMediana.addEventListener('click',()=>{
    const nuevoPrecio = datosViaje[datosViaje.length-1].precioFinal + (Number(datosViaje[0].pasajeros) * 20)

    precioFinal.textContent = '$ '+nuevoPrecio
})


maletaGrande.addEventListener('click',()=>{
    const nuevoPrecio = datosViaje[datosViaje.length-1].precioFinal + (Number(datosViaje[0].pasajeros) * 30)

    precioFinal.textContent = '$ '+nuevoPrecio
})



//resumen boton

const resumenButton = document.getElementById('resumenButton')

const nombrePasajero = document.getElementById('nombrePasajero')
const apellidoPasajero = document.getElementById('apellidoPasajero')
const numeroPasajero = document.getElementById('numeroPasajero')
const correoPasajero = document.getElementById('correoPasajero')

const FalloPago = document.getElementById('FalloPago')


const infoPasajero = document.getElementById('infoPasajero')
const infoAsiento = document.getElementById('infoAsiento')
const infoContactos = document.getElementById('InfoContactos')


resumenButton.addEventListener('click',()=>{

    let pasajeroVerify = true
    let asientoVerify = true
    let contactoVerify = true


    if(nombrePasajero.value == '' || apellidoPasajero.value == '' && asientosElegidos.length < Number(datosViaje[0].pasajeros) ||asientosElegidos.length > Number(datosViaje[0].pasajeros) && numeroPasajero.value == '' || correoPasajero.value == ''){

        pasajeroVerify = false

        asientoVerify = false

        contactoVerify = false

    }else if(nombrePasajero.value == '' || apellidoPasajero.value == '' ){
        
        pasajeroVerify = false
        
    }else if(asientosElegidos.length < Number(datosViaje[0].pasajeros) ||asientosElegidos.length > Number(datosViaje[0].pasajeros)){
        
        asientoVerify = false
        
    }else if(numeroPasajero.value = '' || correoPasajero.value == ''){
        
        contactoVerify = false
        
    }

    if( pasajeroVerify == false && asientoVerify == false && contactoVerify == false){

        // infoPasajero.style.border = '3px solid red'
        // infoAsiento.style.border = '3px solid red'
        // infoContactos.style.border = '3px solid red'
        FalloPago.style.display = 'flex'
        setTimeout(()=>{
            FalloPago.style.display = 'none'
        },5000)
    }else if(pasajeroVerify == false && asientoVerify == false){

        // infoPasajero.style.border = '3px solid red'
        // infoAsiento.style.border = '3px solid red'
        // infoContactos.style.border = '1px solid black'

        FalloPago.style.display = 'flex'
        setTimeout(()=>{
            FalloPago.style.display = 'none'
        },5000)
    }else if(asientoVerify == false && contactoVerify == false){

        // infoPasajero.style.border = '1px solid black'
        // infoAsiento.style.border = '3px solid red'
        // infoContactos.style.border = '3px solid red'
        FalloPago.style.display = 'flex'
        setTimeout(()=>{
            FalloPago.style.display = 'none'
        },5000)
    }else if( pasajeroVerify == false  && contactoVerify == false){

        // infoPasajero.style.border = '3px solid red'
        // infoAsiento.style.border = '1px solid black'
        // infoContactos.style.border = '3px solid red'
        FalloPago.style.display = 'flex'
        setTimeout(()=>{
            FalloPago.style.display = 'none'
        },5000)
    }else if(pasajeroVerify == false){
        // infoPasajero.style.border = '3px solid red'
        // infoAsiento.style.border = '1px solid black'
        // infoContactos.style.border = '1px solid black'
        FalloPago.style.display = 'flex'
        setTimeout(()=>{
            FalloPago.style.display = 'none'
        },5000)
    }else if(asientoVerify == false){
        // infoPasajero.style.border = '1px solid black'
        // infoAsiento.style.border = '3px solid red'
        // infoContactos.style.border = '1px solid black'
        FalloPago.style.display = 'flex'
        setTimeout(()=>{
            FalloPago.style.display = 'none'
        },5000)
    }else if(contactoVerify == false){
        // infoPasajero.style.border = '1px solid black'
        // infoAsiento.style.border = '1px solid black'
        // infoContactos.style.border = '3px solid red'
        FalloPago.style.display = 'flex'
        setTimeout(()=>{
            FalloPago.style.display = 'none'
        },5000)
    }else{

        navegadorPagina.style.display = 'none'
        datosPasajero.style.display = 'none'
        cardPay.style.display = 'flex'
    }
})


//botones formulario tarjeta


const nombreTarjeta = document.getElementById('nombreTarjeta')
const numeroTarjeta = document.getElementById('numeroTarjeta')
const mesCaducidad = document.getElementById('mesCaducidad')
const añoCaducidad = document.getElementById('añoCaducidad')
const numeroSecretoTarjeta = document.getElementById('numeroSecretoTarjeta')
const paisTarjeta = document.getElementById('paisTarjeta')
const cardFinal = document.getElementById('cardFinal')


const finPago = document.getElementById('finPago')
const busLoad = document.getElementById('busLoad')

const search = document.getElementById('search')


const volverCardButton = document.getElementById('volverCardButton')
const confirmarCardButton = document.getElementById('confirmarCardButton')
const FalloTarjeta = document.getElementById('FalloTarjeta')

volverCardButton.addEventListener('click',()=>{
    navegadorPagina.style.display = 'flex'
    navegadorPagina.style.flexDirection = 'column'
    datosPasajero.style.display = 'flex'
    cardPay.style.display = 'none'
})



confirmarCardButton.addEventListener('click',()=>{

    if(nombreTarjeta.value == '' || numeroTarjeta.value == '' ||numeroTarjeta.value.length > 16 || numeroTarjeta.value.length < 16 ||  mesCaducidad.value == '' || mesCaducidad.value < 1 || mesCaducidad.value > 12 || añoCaducidad.value == '' ||
    añoCaducidad.value < 23 || numeroSecretoTarjeta.value == '' || numeroSecretoTarjeta.value.length != 3 || paisTarjeta.value == ''){
        FalloTarjeta.style.display = 'flex'
        setTimeout(()=>{
            FalloTarjeta.style.display = 'none'
        },5000)
    }else{
        finPago.style.display = 'flex'
        cardPay.style.display = 'none'

        setTimeout(()=>{
            busLoad.style.display = 'none'
            navegadorPagina.style.display = 'flex'
            navegadorPagina.style.flexDirection = 'column'
            search.style.display = 'none'
            cardFinal.style.display = 'flex'
        },5000)
    }
})


const cerrarCompra = document.getElementById('cerrarCompra')

cerrarCompra.addEventListener('click',()=>{
    location.reload()
})