//Variables
let amigos = [];

//Funciones

//Limpia el input.
function limpiar(){
    document.getElementById('amigo').value = '';
}

//Normaliza los nombres (elimina tildes y convierte a minúsculas).
function normalizarNombre(nombre) {
    return nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

//Verifica si el nombre ya fue ingresado.
function esNombreDuplicado(nombre) {
    const nombreNormalizado = normalizarNombre(nombre);
    return amigos.some(amigo => normalizarNombre(amigo) === nombreNormalizado);
}

//Agrega un amigo a la lista.
function agregarAmigo() {
    const inputAmigo = document.getElementById('amigo')
    const nombreAmigo = inputAmigo.value.trim();

    if(nombreAmigo === ''){
        alert('Debe ingresar un nombre.')
        return;
    }
//Valida que el nombre solo contenga letras y espacios.
    if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(nombreAmigo)) {
        alert('El nombre solamente puede contener letras y espacios. No puede utilizar números y/o símbolos');
        limpiar();
        return;
    }

    //Valida que el nombre no esté duplicado.
    if (esNombreDuplicado(nombreAmigo)) {
        alert('No se permiten nombres duplicados')
        limpiar();
        return;
    }
    
    amigos.push(nombreAmigo);
    actualizarAmigos();
    limpiar();    
}

//Actualiza la lista de amigos.
function actualizarAmigos(){
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = '';

    for(let i = 0; i < amigos.length; i++){
        const item = document.createElement('li');
        item.textContent = amigos[i];
        listaAmigos.appendChild(item);
    }
}

//Sortea un amigo secreto.
function sortearAmigo() {
    const resultado = document.getElementById('resultado');
    if (amigos.length <= 1) {
        resultado.innerHTML = 'No hay suficientes amigos para sortear.'
        return;
    }    

    let index = Math.floor(Math.random() * amigos.length);
    const amigoSorteado = amigos[index];
    
    resultado.innerHTML = `Amigo secreto: ${amigoSorteado}`;
    actualizarAmigos();    
}    

//Reinicia el sorteo.
function reiniciarSorteo(){
    amigos = [];
    const resultado = document.getElementById('resultado');
    actualizarAmigos();

    if (resultado){
        resultado.innerHTML = '';
    }
} 
document.getElementById('reiniciarSorteo').onclick = reiniciarSorteo;

