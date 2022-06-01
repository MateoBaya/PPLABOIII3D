export function OrderedListGenerator(array)
{
    if(Array.isArray(array))
    {
        const orderedList = document.createElement("ol");
        orderedList.setAttribute("type","I");
        orderedList.setAttribute("id","orderedList");
        array.forEach(element => 
            {
                let texto = document.createTextNode(element);
                let liNode = document.createElement("li");
                liNode.appendChild(texto);
                orderedList.appendChild(liNode);
            });
        return orderedList;
    }
}