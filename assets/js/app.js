/*
    Visto en clase:

$("form").on("submit", (event) => {
    event.preventDefault();
    var dataSerializeArray = $("form").serializeArray();
    var dataSerialize = $("form").serialize();
    console.log(dataSerializeArray);
    console.log(dataSerialize);
});

$("#chkAccept").click(() => {
    if ($("#chkAccept").is(":checked")) {
        console.log("Términos y condiciones aceptados");
    } else {
        console.log("Términos y condiciones no aceptados");
    }
});*/


/* Práctica: Mostrar mensaje */

// Ocultamos sección de mensajes
$("#mensajes").hide();

// Ocultamos las notificaciones
$("#notificacionError").hide();
$("#notificacionMsjEnviado").hide();


// Botones para habilitar cada sección
$("#btnContacto").click(() => {
    $("#mensajes").fadeOut("fast");
    $("#wrapper").removeClass("justify-baseline");
    setTimeout(() => {
        $("#wrapper").addClass("justify-center");
        $("#cajaFormulario").fadeIn();
    }, 500);
});

$("#btnMensajes").click(() => {
    $("#cajaFormulario").fadeOut("fast");
    $("#wrapper").removeClass("justify-center");
    setTimeout(() => {
        $("#wrapper").addClass("justify-baseline");
        $("#mensajes").fadeIn();
    }, 500);
});

// Envío del mensaje
$("form").on("submit", (event) => {
    event.preventDefault();
    if ($("#chkAccept").is(":checked")) {
        var data = $("form").serializeArray();
        console.log(data);
        $("#notificacionMsjEnviado").fadeIn();
        setTimeout(() => {
            $("#notificacionMsjEnviado").fadeOut();
        }, 2000);

        // Hacemos referencia al div de mensajes
        var cajaMensajes = document.getElementById("cajaMensajes");

        // Creamos elementos de la tarjeta del mensaje
        var div = document.createElement("div");
        var nombre = document.createElement("p");
        var apellido = document.createElement("p");
        var email = document.createElement("p");
        var telefono = document.createElement("p");
        var departamento = document.createElement("p");
        var mensaje = document.createElement("p");

        // Agregamos la información
        nombre.innerHTML = "Nombre: " + data[0].value;
        apellido.innerHTML = "Apellido: " + data[1].value;
        email.innerHTML = "Email: " + data[2].value;
        telefono.innerHTML = "Teléfono: " + data[3].value;
        departamento.innerHTML = "Departamento dirigido: " + data[4].value;
        mensaje.innerHTML = "Mensaje: " + data[5].value;

        // Juntamos la tarjeta
        div.appendChild(nombre);
        div.appendChild(apellido);
        div.appendChild(email);
        div.appendChild(telefono);
        div.appendChild(departamento);
        div.appendChild(mensaje);

        // Agregamos clases
        div.classList.add("cajaMensaje");

        // Definimos borde para la caja dependiendo del departamento
        if (data[4].value == "Cobros") {
            div.classList.add("bordeCobros");
        } else if (data[4].value == "RH") {
            div.classList.add("bordeRH");
        } else if (data[4].value == "Servicio al cliente") {
            div.classList.add("bordeServicioAlCliente");
        }

        // Juntamos la tarjeta a la sección de mensajes
        cajaMensajes.appendChild(div);


        // Botones de filtrado

        $("#btnCobros").click(() => {
            $(".bordeCobros").show();
            $(".bordeRH").hide();
            $(".bordeServicioAlCliente").hide();
        });

        $("#btnRH").click(() => {
            $(".bordeCobros").hide();
            $(".bordeRH").show();
            $(".bordeServicioAlCliente").hide();
        });

        $("#btnService").click(() => {
            $(".bordeCobros").hide();
            $(".bordeRH").hide();
            $(".bordeServicioAlCliente").show();
        });

        $("#btnAll").click(() => {
            $(".bordeCobros").show();
            $(".bordeRH").show();
            $(".bordeServicioAlCliente").show();
        });

    } else {
        $("#notificacionError").fadeIn();
        setTimeout(() => {
            $("#notificacionError").fadeOut();
        }, 2000);
    }
});
// Verificamos si se aceptaron los términos y condiciones