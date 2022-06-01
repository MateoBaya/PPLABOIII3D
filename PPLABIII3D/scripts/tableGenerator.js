export function TableGenerator(array)
{
    const table = document.createElement("table");

    table.appendChild(HeaderGenerator(array[0]));

    table.appendChild(BodyGenerator(array));

    return table;
}

function HeaderGenerator(headerValues)
{
    const thead = document.createElement("thead"),
    tr = document.createElement("tr");

    Object.keys(headerValues).forEach(value => 
            {
                if(value!=="id")
                {
                    const text = document.createTextNode(value);
                    const thNode = document.createElement("th");
                    thNode.appendChild(text);
                    tr.appendChild(thNode);
                }
            }
        )
    thead.appendChild(tr);
    return thead;
}

function BodyGenerator(arrayBody)
{
    const tbody = document.createElement("tbody");
    arrayBody.forEach((element,index) => 
        {
            const tr = document.createElement("tr");
            tr.classList.add(index%2?"numeroImpar":"numeroPar");
            for(let value in element)
            {
                if(value!="id")
                {
                    const text = document.createTextNode(element[value]);
                    const tdNode = document.createElement("td");
                    tdNode.appendChild(text);
                    tr.appendChild(tdNode);
                }
                else if(value === "id")
                {
                    tr.setAttribute('data-id',element[value]);
                }
            }
            /*
            Object.values(element).forEach(value =>
                {
                    const text = document.createTextNode(value);
                    const tdNode = document.createElement("td");
                    tdNode.appendChild(text);
                    tr.appendChild(tdNode);
                }
            )
            */
            tbody.appendChild(tr);
        }
    );
    return tbody;
}