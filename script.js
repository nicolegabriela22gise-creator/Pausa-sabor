/*=========================================================
        Emprendimiento Pausa y Sabor
        SCRIPT PRINCIPAL
==========================================================*/

/*=========================================================
            VARIABLES GLOBALES
==========================================================*/

let carrito = [];

const listaCarrito = document.getElementById("listaCarrito");

const total = document.getElementById("total");

const contador = document.getElementById("contador");


/*=========================================================
        AGREGAR PRODUCTOS AL CARRITO
==========================================================*/

function agregarCarrito(nombre, precio){

    // Buscar si el producto ya existe

    let producto = carrito.find(item => item.nombre === nombre);

    if(producto){

        producto.cantidad++;

    }else{

        carrito.push({

            nombre:nombre,

            precio:precio,

            cantidad:1

        });

    }

    actualizarCarrito();

}


/*=========================================================
        ACTUALIZAR CARRITO
==========================================================*/

function actualizarCarrito(){

    listaCarrito.innerHTML = "";

    if(carrito.length === 0){

        listaCarrito.innerHTML =

        `<p class="vacio">

        Tu carrito está vacío.

        </p>`;

        contador.textContent = 0;

        total.textContent = "$0.00";

        return;

    }

    let totalCompra = 0;

    let cantidadProductos = 0;

    carrito.forEach((producto,index)=>{

        totalCompra += producto.precio * producto.cantidad;

        cantidadProductos += producto.cantidad;

        listaCarrito.innerHTML +=

        `

        <div class="item-carrito">

            <div class="info-producto">

                <h4>

                    ${producto.nombre}

                </h4>

                <p>

                    $${producto.precio.toFixed(2)}

                </p>

            </div>

            <div class="controles">

                <button

                class="menos"

                onclick="disminuirCantidad(${index})">

                -

                </button>

                <strong>

                    ${producto.cantidad}

                </strong>

                <button

                class="mas"

                onclick="aumentarCantidad(${index})">

                +

                </button>

                <button

                class="eliminar"

                onclick="eliminarProducto(${index})">

                <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        </div>

        `;

    });

    contador.textContent = cantidadProductos;

    total.textContent =

    "$" + totalCompra.toFixed(2);

}

/*=========================================================
        AUMENTAR CANTIDAD DE PRODUCTO
==========================================================*/

function aumentarCantidad(index){

    carrito[index].cantidad++;

    guardarCarrito();

    actualizarCarrito();

}



/*=========================================================
        DISMINUIR CANTIDAD DE PRODUCTO
==========================================================*/

function disminuirCantidad(index){


    if(carrito[index].cantidad > 1){


        carrito[index].cantidad--;


    }else{


        eliminarProducto(index);


        return;


    }


    guardarCarrito();

    actualizarCarrito();


}



/*=========================================================
        ELIMINAR PRODUCTO DEL CARRITO
==========================================================*/

function eliminarProducto(index){


    carrito.splice(index,1);


    guardarCarrito();

    actualizarCarrito();


}



/*=========================================================
        VACIAR TODO EL CARRITO
==========================================================*/

function vaciarCarrito(){


    carrito = [];


    guardarCarrito();

    actualizarCarrito();


}



/*=========================================================
        GUARDAR CARRITO EN EL NAVEGADOR
==========================================================*/

function guardarCarrito(){


    localStorage.setItem(

        "carritoCafeCamp",

        JSON.stringify(carrito)

    );


}



/*=========================================================
        RECUPERAR CARRITO AL ABRIR LA PÁGINA
==========================================================*/

function cargarCarrito(){


    let carritoGuardado = 

    localStorage.getItem("carritoCafeCamp");


    if(carritoGuardado){


        carrito = JSON.parse(carritoGuardado);


    }


    actualizarCarrito();


}



/*=========================================================
        CARGAR CARRITO AUTOMÁTICAMENTE
==========================================================*/

document.addEventListener(

"DOMContentLoaded",

()=>{


    cargarCarrito();


}

);

/*=========================================================
        CONFIGURACIÓN WHATSAPP
==========================================================*/


// Cambiar este número por el WhatsApp real del emprendimiento
// Formato Ecuador: 593 + número celular
// Ejemplo: 593987654321

const numeroWhatsApp = "593968381162";



/*=========================================================
        BUSCADOR DE PRODUCTOS
==========================================================*/


const buscador = document.getElementById("buscar");


if(buscador){


    buscador.addEventListener("keyup",()=>{


        let texto = buscador.value.toLowerCase();


        let productos = document.querySelectorAll(".producto");


        productos.forEach(producto=>{


            let nombre = producto

            .querySelector("h3")

            .textContent

            .toLowerCase();



            if(nombre.includes(texto)){


                producto.style.display="block";


            }else{


                producto.style.display="none";


            }


        });


    });


}




/*=========================================================
        ENVIAR PEDIDO A WHATSAPP
==========================================================*/


function enviarWhatsApp(){


    // Validar que existan productos

    if(carrito.length===0){


        alert(

        "Debe agregar productos al carrito antes de enviar el pedido."

        );


        return;


    }



    // Obtener datos del formulario


    let cliente = document

    .getElementById("cliente")

    .value.trim();



    let curso = document

    .getElementById("curso")

    .value.trim();



    let telefono = document

    .getElementById("telefono")

    .value.trim();



    let observaciones = document

    .getElementById("observaciones")

    .value.trim();




    // Validación


    if(cliente===""){


        alert("Ingrese el nombre del cliente.");


        return;


    }



    if(curso===""){


        alert("Ingrese el curso.");


        return;


    }



    if(telefono===""){


        alert("Ingrese el número celular.");


        return;


    }




    // Confirmación


    let confirmar = confirm(

    "¿Desea enviar este pedido por WhatsApp?"

    );



    if(!confirmar){


        return;


    }





    // Crear mensaje


    let mensaje = 

    "☕ *PAUSA Y SABOR - PEDIDO NUEVO*%0A%0A";



    mensaje += 

    "👤 Cliente: "

    + cliente +

    "%0A";



    mensaje += 

    "🏫 Curso: "

    + curso +

    "%0A";



    mensaje += 

    "📱 Teléfono: "

    + telefono +

    "%0A";



    mensaje += 

    "📝 Observaciones: "

    + observaciones +

    "%0A%0A";



    mensaje +=

    "====================%0A";



    mensaje +=

    "🛒 *DETALLE DEL PEDIDO*%0A";



    mensaje +=

    "====================%0A%0A";




    let totalPedido = 0;




    carrito.forEach(producto=>{


        let subtotal = 

        producto.precio *

        producto.cantidad;



        totalPedido += subtotal;



        mensaje +=

        "☕ "

        + producto.nombre

        + "%0A";



        mensaje +=

        "Cantidad: "

        + producto.cantidad

        + "%0A";



        mensaje +=

        "Precio: $"

        + producto.precio.toFixed(2)

        + "%0A";



        mensaje +=

        "Subtotal: $"

        + subtotal.toFixed(2)

        + "%0A%0A";



    });





    mensaje +=

    "💰 *TOTAL: $"

    + totalPedido.toFixed(2)

    + "*%0A%0A";



    mensaje +=

    "Gracias por preferir Pausa y Sabor ☕";





    // Crear enlace WhatsApp


    let url =

    "https://wa.me/"

    + numeroWhatsApp

    + "?text="

    + mensaje;




    // Abrir WhatsApp


    window.open(url,"_blank");





    // Limpiar después del pedido


    carrito=[];


    guardarCarrito();


    actualizarCarrito();



}