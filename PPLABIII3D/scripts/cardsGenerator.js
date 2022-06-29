export function CardsGenerator(array)
{
    const section = document.createElement("section");
    array.forEach((element,index)=>{
        section.setAttribute("class","cards");
        section.appendChild(cardGenerator(element));
    });
    return section;

}
function cardGenerator(element)
{
    const figure = document.createElement("figure");
    for (let value in element)
    {
        if(value!="id")
        {
            //console.log(figure);
            //console.log(element[value]);
            figure.setAttribute("class","card");
            let text = document.createTextNode(element[value]);
            const p = document.createElement("p");
            switch(value)
            {
                case "titulo":
                    p.setAttribute("style","font-size:1.5rem; font-weight:bold");
                    break;
                case "precio":
                    text.textContent = "$"+text.textContent;
                    p.setAttribute("style","color:olive");
                    break;
                case "km":
                    text.textContent = text.textContent+" km";
                    p.setAttribute("style","align-self:center");
                    const imageKm = document.createElement("img");
                    imageKm.setAttribute("src","./assets/km.ico");
                    imageKm.setAttribute("alt","kmImg");
                    p.appendChild(imageKm);

                    break;
                case "transaccion":
                    text.textContent = "Transaccion: "+text.textContent;
                    break;
                case "potencia":
                    text.textContent = "Potencia: "+text.textContent;
                    p.setAttribute("style","align-self:center");
                    const imagePotencia = document.createElement("img");
                    imagePotencia.setAttribute("src","./assets/potencia.ico");
                    imagePotencia.setAttribute("alt","potenciaImg");
                    p.appendChild(imagePotencia);
                    
                    break;
                case "puertas":
                    text.textContent = text.textContent+" puertas";
                    p.setAttribute("style","align-self:center");
                    const imagePuertas = document.createElement("img");
                    imagePuertas.setAttribute("src","./assets/puertas.ico");
                    imagePuertas.setAttribute("alt","puertasImg");
                    p.appendChild(imagePuertas);
                    
                    break;
            }
            p.appendChild(text);
            figure.appendChild(p);
        }
    }
    return figure;
}