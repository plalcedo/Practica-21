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
$("#notificacion").hide();

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

// Variables de verificación

var nameCorrect = false;
var lastNameCorrect = false;
var emailCorrect = false;
var phoneCorrect = false;

$("form").on("submit", (event) => {
    event.preventDefault();

    // Validación del Check Box
    if ($("#chkAccept").is(":checked")) {

        // Validación de campos
        if (nameCorrect == true && lastNameCorrect == true && emailCorrect == true && phoneCorrect == true) {

            // Validación mensaje
            if ($("#msg").val().length > 0) {
                var data = $("form").serializeArray();
                console.log(data);

                // Validación de departamento
                if (data[4].value == "0") {
                    $("#notificacion").text("¡Debes elegir un departamento!");
                    $("#notificacion").fadeIn();
                    setTimeout(() => {
                        $("#notificacion").fadeOut();
                    }, 2000);
                } else {
                    $("#notificacion").text("¡Mensaje enviado!");
                    $("#notificacion").fadeIn();
                    setTimeout(() => {
                        $("#notificacion").fadeOut();
                    }, 2000);

                    // Hacemos referencia al div de mensajes
                    var cajaMensajes = document.getElementById("cajaMensajes");

                    // Creamos elementos de la tarjeta del mensaje
                    var divPadre = document.createElement("div");
                    var divHijo = document.createElement("div");
                    var nombre = document.createElement("p");
                    var apellido = document.createElement("p");
                    var email = document.createElement("p");
                    var telefono = document.createElement("p");
                    var departamento = document.createElement("p");
                    var mensaje = document.createElement("p");
                    var i = document.createElement("i");

                    // Agregamos la información
                    nombre.innerHTML = "Nombre: " + data[0].value;
                    apellido.innerHTML = "Apellido: " + data[1].value;
                    email.innerHTML = "Email: " + data[2].value;
                    telefono.innerHTML = "Teléfono: " + data[3].value;
                    departamento.innerHTML = "Departamento dirigido: " + data[4].value;
                    mensaje.innerHTML = "Mensaje: " + data[5].value;


                    // Juntamos la tarjeta
                    divHijo.appendChild(nombre);
                    divHijo.appendChild(apellido);
                    divHijo.appendChild(email);
                    divHijo.appendChild(telefono);
                    divHijo.appendChild(departamento);
                    divHijo.appendChild(mensaje);
                    divPadre.appendChild(i);

                    divPadre.appendChild(divHijo);

                    // Agregamos clases
                    divPadre.classList.add("cajaMensaje");
                    divHijo.classList.add("infoMensaje");

                    // Definimos borde para la caja dependiendo del departamento
                    if (data[4].value == "Cobros") {
                        divPadre.classList.add("bordeCobros");
                        i.classList.add("fas");
                        i.classList.add("fa-trash");
                        i.classList.add("btnTrashCobros");
                    } else if (data[4].value == "RH") {
                        divPadre.classList.add("bordeRH");
                        i.classList.add("fas");
                        i.classList.add("fa-trash");
                        i.classList.add("btnTrashRH");
                    } else if (data[4].value == "Servicio al cliente") {
                        i.classList.add("fas");
                        i.classList.add("fa-trash");
                        i.classList.add("btnTrashService");
                        divPadre.classList.add("bordeServicioAlCliente");
                    }

                    // Juntamos la tarjeta a la sección de mensajes
                    cajaMensajes.appendChild(divPadre);

                }

            } else {
                $("#notificacion").text("¡El mensaje no puede estar vacío!");
                $("#notificacion").fadeIn();
                setTimeout(() => {
                    $("#notificacion").fadeOut();
                }, 2000);
            }


        } else {
            $("#notificacion").text("¡Revisa los campos!");
            $("#notificacion").fadeIn();
            setTimeout(() => {
                $("#notificacion").fadeOut();
            }, 2000);
        }

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

        // Botones eliminar mensaje
        $(".btnTrashCobros").click(() => {
            console.log("Prueba");
        });

    } else {
        $("#notificacion").text("¡Debes aceptar los términos y condiciones!");
        $("#notificacion").fadeIn();
        setTimeout(() => {
            $("#notificacion").fadeOut();
        }, 2000);
    }
});


// Ocultamos información
$("#nameInfoText").hide();
$("#lastNameInfoText").hide();
$("#emailInfoText").hide();
$("#phoneInfoText").hide();


// Validaciones de campos

$("#name").blur(() => {
    var estado = checkName();
    console.log(estado);
    if (estado) {
        $("#nameInfoText").hide();
        $("#name").removeClass("border-invalid");
        $("#name").addClass("border-valid");
        nameCorrect = true;
    } else {
        $("#name").removeClass("border-valid");
        $("#name").addClass("border-invalid");
        $("#nameInfoText").show();
        nameCorrect = false;
    }
});

$("#lastName").blur(() => {
    var estado = checkLastName();
    console.log(estado);
    if (estado) {
        $("#lastNameInfoText").hide();
        $("#lastName").removeClass("border-invalid");
        $("#lastName").addClass("border-valid");
        lastNameCorrect = true;
    } else {
        $("#lastName").removeClass("border-valid");
        $("#lastName").addClass("border-invalid");
        $("#lastNameInfoText").show();
        lastNameCorrect = false;
    }
});

$("#email").blur(() => {
    var estado = checkEmail();
    console.log(estado);
    if (estado) {
        $("#emailInfoText").hide();
        $("#email").removeClass("border-invalid");
        $("#email").addClass("border-valid");
        emailCorrect = true;
    } else {
        $("#email").removeClass("border-valid");
        $("#email").addClass("border-invalid");
        $("#emailInfoText").show();
        emailCorrect = false;
    }
});

$("#phone").blur(() => {
    var estado = checkPhone();
    console.log(estado);
    if (estado) {
        $("#phoneInfoText").hide();
        $("#phone").removeClass("border-invalid");
        $("#phone").addClass("border-valid");
        phoneCorrect = true;
    } else {
        $("#phone").removeClass("border-valid");
        $("#phone").addClass("border-invalid");
        $("#phoneInfoText").show();
        phoneCorrect = false;
    }
});


function checkName() {
    var pattern = /^[a-zA-Z ]*$/;
    var inputName = $("#name").val();
    var estado = true;

    if (pattern.test(inputName) && inputName !== "") {
        console.log("Nombre válido");
        estado = true;
    } else {
        console.log("Nombre inválido");
        estado = false;
    }

    return estado;
}

function checkLastName() {
    var pattern = /^[a-zA-Z ]*$/;
    var inputLastName = $("#lastName").val();
    var estado = true;

    if (pattern.test(inputLastName) && inputLastName !== "") {
        console.log("Apellido válido");
        estado = true;
    } else {
        console.log("Apellido inválido");
        estado = false;
    }

    return estado;
}

function checkEmail() {
    var pattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
    var inputEmail = $("#email").val();
    var estado = true;

    if (pattern.test(inputEmail) && inputEmail !== "") {
        console.log("Email válido");
        estado = true;
    } else {
        console.log("Email inválido");
        estado = false;
    }

    return estado;
}

function checkPhone() {
    var pattern = /^[0-9]*$/;
    var inputPhone = $("#phone").val();
    var estado = true;

    if (pattern.test(inputPhone) && inputPhone !== "") {
        console.log("Teléfono válido");
        estado = true;
    } else {
        console.log("Teléfono inválido");
        estado = false;
    }

    return estado;
}