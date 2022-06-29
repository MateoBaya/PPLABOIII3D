import { TableGenerator } from "./tableGenerator.js";
import { CardsGenerator } from "./cardsGenerator.js";
import Auto from "./auto.js";
const table = document.querySelector(".table-container");
const autosBackup = localStorage.getItem("autos")?JSON.parse(localStorage.getItem("autos")):[];
let autos = autosBackup;
const formAuto = document.querySelector(".form-auto");
const btnEliminar = document.getElementById("btnEliminar");
const btnCancelar = document.getElementById("btnCancelar");
const logo = document.getElementById("logo");
const body = document.querySelector("body");
const container=document.querySelector(".container");
const footer = document.querySelector("footer");
const navAnuncios = document.getElementById("anuncios");
const headerNav = document.getElementById("headerNav");
const footerNav = document.getElementById("footerNav");
const homeDiv = document.querySelector(".homeDiv");
const cardsContainer=document.querySelector(".cardsContainer");
footerNav.setAttribute("style","background-color: aqua");
body.removeChild(container);
actualizarCards(autos);
//actualizarTabla(autos);
//console.log(autos);
home();
// SUBMIT CAMBIADO
formAuto.addEventListener("submit",(e)=>{
    e.preventDefault();
    
    if(btnEliminar.hidden && btnCancelar.hidden)
    {

        try
        {
            const auto = new Auto(Date.now(),formAuto.titulo.value,formAuto.precio.value,
            formAuto.descripcion.value,formAuto.transaccion.value,formAuto.puertas.value,
            formAuto.km.value,formAuto.potencia.value);
            if(autos!=null)
            {
                autos.push(auto);
            }
            else
            {
                autos = new Array(auto);
            }
        }
        catch(e)
        {
            console.log(e);
        }
    }
    else
    {
        modifyRow(searchRow(formAuto.id.value),[formAuto.titulo.value,formAuto.precio.value,formAuto.descripcion.value,
            formAuto.transaccion.value,formAuto.puertas.value,formAuto.km.value,formAuto.potencia.value]);
        saveToLocalStorage();
    }
    localStorage.setItem("autos",JSON.stringify(autos));
    formAuto.titulo.value="";
    formAuto.precio.value="";
    formAuto.descripcion.value="";
    formAuto.transaccion.value="";
    formAuto.id.value="";
    formAuto.puertas.value="";
    formAuto.km.value="";
    formAuto.potencia.value="";
    actualizarTabla(filtrado());
});

function modifyRow(row,values)
{
    if(row!=null)
    {

        const firstValue = row.firstElementChild;
        let value = firstValue;
        for(let i=0;i<values.length;i++)
        {
            if(value!=null)
            {
                value.textContent=values[i];
                value = value.nextElementSibling;
            }
        }
    }
}

function saveToLocalStorage()
{
    const autosLeidos = JSON.parse(JSON.stringify(readAllRows()));
    localStorage.setItem("autos",JSON.stringify(autosLeidos));
    autos = localStorage.getItem("autos")?JSON.parse(localStorage.getItem("autos")):[];
}

// CLICK EN TBODY
window.addEventListener("click",(e)=>{
    if(e.target.matches("tr td")){
        const row = e.target.parentElement;
        const array = readRow(row);
        formAuto.id.value=array[0];
        formAuto.titulo.value=array[1];
        formAuto.precio.value=array[2];
        formAuto.descripcion.value=array[3];
        formAuto.transaccion.value=array[4];
        formAuto.puertas.value=array[5];
        formAuto.km.value=array[6];
        formAuto.potencia.value=array[7];
        btnEliminar.hidden=false;
        btnCancelar.hidden=false;
    }

});

// BOTON ELIMINAR CLICK
btnEliminar.addEventListener("click",(e)=>{
    let row = searchRow(formAuto.id.value);
    row.parentElement.removeChild(row);
    saveToLocalStorage();
    actualizarTabla(filtrado());
    formAuto.titulo.value="";
    formAuto.precio.value="";
    formAuto.descripcion.value="";
    formAuto.transaccion.value="";
    formAuto.id.value="";
    formAuto.puertas.value="";
    formAuto.km.value="";
    formAuto.potencia.value="";
});

// BOTON CANCELAR CLICK
btnCancelar.addEventListener("click",(e)=>{
    formAuto.titulo.value="";
    formAuto.precio.value="";
    formAuto.descripcion.value="";
    formAuto.transaccion.value="";
    formAuto.id.value="";
    formAuto.puertas.value="";
    formAuto.km.value="";
    formAuto.potencia.value="";
    btnEliminar.hidden=true;
    btnCancelar.hidden=true;

});

// NAV ANUNCIOS
navAnuncios.addEventListener("click",(e)=>{
    exitHome();
    body.appendChild(container);
    actualizarTabla(filtrado());
    body.setAttribute("background-image","none");

});

// LOGO
logo.addEventListener("click",(e)=>{
    if(body.contains(container))
    {
        body.removeChild(container);
    }
    home();
})
;

window.addEventListener("resize",(e)=>{
    const html = document.querySelector("html");
    const cards =  document.querySelector(".cards");
    if(body.contains(homeDiv))
    {
        if(window.matchMedia("(min-width: 768px)").matches)
        {
            html.setAttribute("style","background-image: url(./assets/cars.jpg); background-size: cover; background-repeat: no-repeat");
            cards.setAttribute("style","flex-direction:row");
        }
        else
        {
            html.setAttribute("style","background-image: url(./assets/carsVertical.jpg); background-size: cover; background-repeat: no-repeat");
            cards.setAttribute("style","flex-direction:column");
        }
    }
});

// RECREA LA TABLA CON LOS CONTENIDOS EN LISTA
function actualizarTabla(lista)
{
    if(body.contains(container))
    {
        document.getElementById("btnEliminar").hidden=true;
        document.getElementById("btnCancelar").hidden=true;
        const container = document.querySelector('.table-container');
        while(container.children.length>0){
            container.removeChild(container.firstElementChild);
        }
        try
        {
            container.appendChild(createSpinner());
            let generacionTabla = setTimeout(() => {
                container.appendChild(TableGenerator(lista));
            }, 3000);
            deleteSpinner(container);
        }
        catch(e)
        {
            console.log("No tiene datos en LocalStorage");
        }
    }
}

function actualizarCards(lista)
{
    if(homeDiv.contains(cardsContainer))
    {
        while(cardsContainer.children.length>0)
        {
            cardsContainer.removeChild(cardsContainer.firstElementChild);
        }
        try
        {
            cardsContainer.appendChild(CardsGenerator(lista));
        }
        catch(e)
        {
            console.log("No tiene datos en LocalStorage");
        }
    }
}

// CAMBIA FONDO A AUTOS
function home()
{
    const html = document.querySelector("html");
    footer.hidden=true;
    if(window.matchMedia("(min-width: 768px)").matches)
    {
        html.setAttribute("style","background-image: url(./assets/cars.jpg); background-size: inherit; background-repeat: no-repeat");
    }
    else
    {
        html.setAttribute("style","background-image: url(./assets/carsVertical.jpg); background-size: cover; background-repeat: no-repeat");
    }
    headerNav.setAttribute("style","background-color: transparent");
    if(!body.contains(homeDiv))
    {
        body.appendChild(homeDiv);
        homeDiv.appendChild(cardsContainer);
        actualizarCards(autos);
    }
}

function exitHome()
{
    const html = document.querySelector("html");
    html.setAttribute("style","background-image: none");
    footer.hidden=false;
    headerNav.setAttribute("style","background-color: aqua");
    if(body.contains(homeDiv))
    {
        body.removeChild(homeDiv);
    }

}

async function deleteSpinner(container)
{
    const divSpinner = document.getElementById("divSpinner");
    if(body.contains(container))
    {
        setTimeout(() => {
            if(container.contains(divSpinner))
            {
                container.removeChild(divSpinner);
            }
        }, 3000);
    }

}

function createSpinner()
{
    const div = document.createElement("div");
    div.setAttribute("id","divSpinner");
    let spinner = document.createElement("img");
    spinner.setAttribute("src","./assets/spinner.gif");
    spinner.setAttribute("alt","Cargando tabla");
    div.appendChild(spinner);
    return div;
}

// CONVIERTE ARRAY A AUTO
function arrayToAuto(array)
{
    return new Auto(array[0],array[1],array[2],array[3],array[4],array[5],array[6],array[7])
}

// DEVUELVE ARRAY DE LOS CONTENIDOS DE ARRAY
function readRow(row)
{
    const firstValue = row.firstElementChild;
    let value = firstValue;
    let array = new Array();
    if(row.dataset!=null && row.dataset.id!=null)
    {
        array.push(row.dataset.id);        
    }
    while(value!=null)
    {
        array.push(value.textContent);
        value = value.nextElementSibling;
    }
    return array;
}

// BUSCA UN ROW SEGUN SU ID
function searchRow(id)
{
    const tbody = document.querySelector('tbody');
    const firstRow = tbody.firstElementChild;
    let row = firstRow;
    let idSearch=-1;
    while(row != null)
    {
        idSearch = row.dataset.id;
        if(id==idSearch)
        {
            return row;
        }
        row = row.nextElementSibling;
    }
}

// CREA UN ARRAY DE TODAS LAS FILAS DE TBODY
function readAllRows()
{
    const tbody = document.querySelector('tbody');
    const firstRow = tbody.firstElementChild;
    let row = firstRow;
    let array = new Array();
    while(row != null)
    {
        array.push(arrayToAuto(readRow(row)));
        row = row.nextElementSibling;
    }
    return array;
}

function filtrado()
{
    const filter = document.getElementById("filter");
    const promedio = document.getElementById("promedio");
    const titulo=document.getElementById("tituloC");
    const precio=document.getElementById("precioC");
    const descripcion=document.getElementById("descripcionC");
    const transaccion=document.getElementById("transaccionC");
    const puertas=document.getElementById("puertasC");
    const km=document.getElementById("kmC");
    const potencia=document.getElementById("potenciaC");
    const array = [titulo,precio,descripcion,transaccion,puertas,km,potencia];
    let tablaFiltrada;
    let arrayfilters = new Array();
    array.forEach(element => {
        if(element.checked)
        {
            arrayfilters.push(element.value);
        }
    });
    
    if(filter.value!="todos")
    {
        tablaFiltrada=filtrarTabla(filtrarAutos(autos,filter.value),arrayfilters);
        console.log(tablaFiltrada);
        if(tablaFiltrada.length>0)
        {
            promedio.value=promediarPrecioAutos(tablaFiltrada);
        }
    }
    else
    {
        tablaFiltrada=filtrarTabla(autos,arrayfilters);
        promedio.value="";
    }

    return tablaFiltrada;
}

function filtrarTabla(lista,filterElements)
{
    const tablaFiltrada = lista.map(function(element){
        let obj = {};
        filterElements.forEach((filter,i) => {
            obj[filterElements[i]]=element[filter];
        });
        return obj;
        console.log(array);
    });
    return tablaFiltrada;
}

function filtrarAutos(lista,transaccion)
{
    if(transaccion!="todos")
    {
        const listaFiltrada = autos.filter(function(element){
            return element["transaccion"]==transaccion;
        });
        return listaFiltrada;
    }
    else
    {
        return null;
    }
}

function promediarPrecioAutos(lista)
{
    const listaPrecios = lista.map(function(element){
        return parseInt(element["precio"]);
    });
    const average = listaPrecios.reduce(function(sum,value){
        return sum+value;
    })/listaPrecios.length;
    return average;
}