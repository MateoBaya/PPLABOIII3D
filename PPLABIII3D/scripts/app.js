import { TableGenerator } from "./tableGenerator.js";
import Auto from "./auto.js";
const table = document.querySelector(".table-container");
const autosBackup = localStorage.getItem("autos")?JSON.parse(localStorage.getItem("autos")):[];
let autos = autosBackup;
const formAuto = document.querySelector(".form-auto");
const btnEliminar = document.getElementById("btnEliminar");
const btnCancelar = document.getElementById("btnCancelar");
const img = document.getElementById("logo");
const body = document.querySelector("body");
const container=document.querySelector(".container");
body.removeChild(container);
actualizarTabla(autos);
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
    actualizarTabla(autos);
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
    actualizarTabla(autos);
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

const navAnuncios = document.getElementById("anuncios");
// NAV ANUNCIOS
navAnuncios.addEventListener("click",(e)=>{
    body.appendChild(container);
    actualizarTabla(autos);
    body.setAttribute("background-image","none");
});

// LOGO
img.addEventListener("click",(e)=>{
    body.removeChild(container);
    body.setAttribute("background-image","url('../assets/cars.jpg')");

})
;

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
            }, 1000);
            deleteSpinner(container);
        }
        catch(e)
        {
            console.log("No tiene datos en LocalStorage");
        }
    }
}
async function deleteSpinner(container)
{
    if(body.contains(container))
    {
        setTimeout(() => {
            container.removeChild(document.getElementById("divSpinner"));
        }, 1000);
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