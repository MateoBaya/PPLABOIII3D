class Auto{
    constructor(id,titulo,precio,descripcion,transaccion,puertas,km,potencia){
        this.Id = id;
        this.Titulo = titulo;
        this.Precio = precio;
        this.Descripcion = descripcion;
        this.Transaccion = transaccion;
        this.puertas = puertas;
        this.km = km;
        this.potencia = potencia;
    }

    set Id(value)
    {
        if((value!=null && value!=undefined && value!=="")&&typeof parseInt(value,10) === "number" && value>0)
        {
            this.id=value;
        }
        else
        {
            throw ("Id incorrecto");
        }
    }
    set Titulo(value)
    {
        if((value!=null && value!=undefined&& value!=="")&&typeof value === "string" && value.length<40)
        {
            this.titulo=value;
        }
        else
        {
            throw ("Mas de 40 caracteres");
        }
    }
    set Precio(value)
    {
        if((value!=null && value!=undefined&& value!=="")&&typeof parseInt(value,10) === "number" && value > 0)
        {
            this.precio = value;
        }
        else
        {
            throw ("NaN");
        }
    }
    set Descripcion(value)
    {
        if((value!=null && value!=undefined&& value!=="")&&typeof value === "string")
        {
            this.descripcion=value;
        }
        else
        {
            throw ("descripcion vacio o incorrecto");
        }
    }
    set Transaccion(value)
    {
        if((value!=null && value!=undefined&& value!=="")&&typeof value === "string" && (value == "venta" || value == "alquiler"))
        {
            this.transaccion = value;
        }
        else
        {
            throw ("Transaccion incorrecta o vacio");
        }
    }


}

export default Auto;