const contenido1 = document.getElementById("contenido1");
const contenido2 = document.getElementById("contenido2");
const contenido3 = document.getElementById("contenido3");
const contenido4 = document.getElementById("contenido4");
const contenido5 = document.getElementById("contenido5");
const fulImgBox = document.getElementById("fulImgBox");
const form_update = document.getElementById("form_update")

fulImg = document.getElementById("fulImg");

function mostrar1(){
    contenido1.style.display = 'flex'
    contenido2.style.display = 'none'
    contenido3.style.display = 'none'
    contenido4.style.display = 'none'
    contenido5.style.display = 'none'
    btn1.style.color = '#D6AA87'
    btn2.style.color = 'white'
    btn3.style.color = 'white'
    btn4.style.color = 'white'
    btn5.style.color = 'white'
};

function mostrar2(){
    contenido1.style.display = 'none'
    contenido2.style.display = 'grid'
    contenido3.style.display = 'none'
    contenido4.style.display = 'none'
    contenido5.style.display = 'none'
    btn1.style.color = 'white'
    btn2.style.color = '#D6AA87'
    btn3.style.color = 'white'
    btn4.style.color = 'white'
    btn5.style.color = 'white'
};

function mostrar3(){
    contenido1.style.display = 'none'
    contenido2.style.display = 'none'
    contenido3.style.display = 'flex'
    contenido4.style.display = 'none'
    contenido5.style.display = 'none'
    btn1.style.color = 'white'
    btn2.style.color = 'white'
    btn3.style.color = '#D6AA87'
    btn4.style.color = 'white'
    btn5.style.color = 'white'
};

function mostrar4(){
    contenido1.style.display = 'none'
    contenido2.style.display = 'none'
    contenido3.style.display = 'none'
    contenido4.style.display = 'flex'
    contenido5.style.display = 'none'
    btn1.style.color = 'white'
    btn2.style.color = 'white'
    btn3.style.color = 'white'
    btn4.style.color = '#D6AA87'
    btn5.style.color = 'white'
};

function mostrar5(){
    contenido1.style.display = 'none'
    contenido2.style.display = 'none'
    contenido3.style.display = 'none'
    contenido4.style.display = 'none'
    contenido5.style.display = 'flex'
    btn1.style.color = 'white'
    btn2.style.color = 'white'
    btn3.style.color = 'white'
    btn4.style.color = 'white'
    btn5.style.color = '#D6AA87'
};

function openImg(reference) {
    fulImgBox.style.display = "flex"
    fulImg.src = reference
};
function closeImg () {
    fulImgBox.style.display = "none"
};

function openFormUpdate() {
    form_update.style.display = "flex"
};
function closeFormUpdate () {
    form_update.style.display = "none"
};

const formulario_reg = document.getElementById('formulario');
const formulario_log = document.getElementById('formulario-login')
const inputs = document.querySelectorAll('#formulario input');

const user = 'Usuario_2024';
const pwd = '2024';
const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/,
    nombre: /^[a-zA-ZÀ-ÿ\s]{4,50}$/,
    apellido: /^[a-zA-ZÀ-ÿ\s]{4,50}$/,
    pwd: /^.{4,16}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
};
const campos = {
    usuario: false,
    nombre: false,
    apellido: false,
    pwd: false,
    correo: false
}


const validar_formulario = (e) => {
    switch (e.target.name) {
        case "usuario":
            validar_campos(expresiones.usuario, e.target, 'usuario');
            campo_vacio(e.target, 'usuario');
        break;
        case "nombre":
            validar_campos(expresiones.nombre, e.target, 'nombre');
            campo_vacio(e.target, 'nombre');
        break;
        case "apellido":
            validar_campos(expresiones.apellido, e.target, 'apellido');
            campo_vacio(e.target, 'apellido');
        break;
        case "pwd":
            validar_campos(expresiones.pwd, e.target, 'pwd');
            validar_pwd2();
            campo_vacio(e.target, 'pwd');
        break;
        case "pwd2":
            validar_pwd2();
            campo_vacio(e.target, 'pwd2');
        break;
        case "correo":
            validar_campos(expresiones.correo, e.target, 'correo');
            campo_vacio(e.target, 'correo');
        break;
    };
};

const validar_campos = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-incorrecto');
        document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-correcto');
        document.querySelector(`#grupo_${campo} .formulario_input-error`).classList.remove('formulario_input-error-activo');
        campos[campo] = true;
    } else{
        document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-incorrecto');
        document.querySelector(`#grupo_${campo} .formulario_input-error`).classList.add('formulario_input-error-activo');
        campos[campo] = false;
    }
}

const validar_pwd2 = () => {
    const input_pwd1 = document.getElementById('pwd');
    const input_pwd2 = document.getElementById('pwd2');
    if(input_pwd1.value !== '' && input_pwd2.value !== '') {
        if(input_pwd1.value !== input_pwd2.value) {
            document.getElementById(`grupo_pwd2`).classList.add('formulario_grupo-incorrecto');
            document.getElementById(`grupo_pwd2`).classList.remove('formulario_grupo-correcto');
            document.querySelector(`#grupo_pwd2 .formulario_input-error`).classList.add('formulario_input-error-activo');
            campos['pwd'] = false;
        }  else {
            document.getElementById(`grupo_pwd2`).classList.remove('formulario_grupo-incorrecto');
            document.getElementById(`grupo_pwd2`).classList.add('formulario_grupo-correcto');
            document.querySelector(`#grupo_pwd2 .formulario_input-error`).classList.remove('formulario_input-error-activo');
            campos['pwd'] = true;
        }
    }
    
}

const campo_vacio = (input, campo) => {
    if(input.value == '') {
        document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-incorrecto');
        document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-correcto');
        document.querySelector(`#grupo_${campo} .formulario_input-error`).classList.remove('formulario_input-error-activo');
    }

}

inputs.forEach((input) => {
    input.addEventListener('keyup', validar_formulario);
    input.addEventListener('blur', validar_formulario);
});

// formulario_reg.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const terminos = document.getElementById('terminos')

//     if(campos.usuario && campos.nombre && campos.apellido && campos.pwd && campos.correo && terminos.checked) {
//         formulario_reg.reset();
//         document.getElementById('mensaje_check').classList.add('formulario_registro-check-activo');
//         setTimeout(() => {
//             document.getElementById('mensaje_check').classList.remove('formulario_registro-check-activo');
//         }, 4000);
//         document.querySelectorAll('.formulario_grupo-correcto').forEach((estilo) => {
//             estilo.classList.remove('formulario_grupo-correcto');
//         })
//         setTimeout(() => {
//             location.reload()
//         }, 2000);
//     } else {
//         document.getElementById('mensaje_error').classList.add('formulario_registro-error-activo');
//         setTimeout(() => {
//             document.getElementById('mensaje_error').classList.remove('formulario_registro-error-activo');
//         }, 4000)
//     }
// });

// formulario_log.addEventListener('submit', (e) => {
//     e.preventDefault();
//     if(document.getElementById('user_log').value == user && document.getElementById('pwd_log').value == pwd) {
//         window.alert('Bienvenido');
//         formulario_log.reset();
//     } else {
//         document.getElementById('mensaje_log-error').classList.add('formulario_login-error-activo');
//         setTimeout(() => {
//             document.getElementById('mensaje_log-error').classList.remove('formulario_login-error-activo');
//         }, 4000);
//     }
// })

var localidadesPorProvincia = {
    "Buenos Aires": ["CABA", "La Plata", "Mar del Plata", "Bahía Blanca", "Tandil", "Olavarría"],
    "Catamarca": ["San Fernando del Valle de Catamarca", "Andalgalá", "Belén", "Santa María", "Tinogasta"],
    "Chaco": ["Resistencia", "Barranqueras", "Sáenz Peña", "Villa Ángela", "Charata"],
    "Chubut": ["Rawson", "Comodoro Rivadavia", "Trelew", "Puerto Madryn", "Esquel"],
    "Córdoba": ["Córdoba", "Villa Carlos Paz", "Río Cuarto", "Villa María", "San Francisco"],
    "Corrientes": ["Corrientes", "Goya", "Mercedes", "Paso de los Libres", "Curuzú Cuatiá"],
    "Entre Ríos": ["Paraná", "Concordia", "Gualeguaychú", "Colón", "Villaguay"],
    "Formosa": ["Formosa", "Clorinda", "Pirané", "El Colorado", "Ibarreta"],
    "Jujuy": ["San Salvador de Jujuy", "Palpalá", "Libertador General San Martín", "Perico", "El Carmen"],
    "La Pampa": ["Santa Rosa", "General Pico", "Toay", "Realicó", "Macachín"],
    "La Rioja": ["La Rioja", "Chilecito", "Aimogasta", "Chamical", "Chepes"],
    "Mendoza": ["Mendoza", "San Rafael", "Godoy Cruz", "Luján de Cuyo", "Maipú"],
    "Misiones": ["Posadas", "Puerto Iguazú", "Eldorado", "Oberá", "Apóstoles", "San Javier"],
    "Neuquén": ["Neuquén", "Cutral Có", "Plottier", "Zapala", "San Martín de los Andes"],
    "Río Negro": ["Viedma", "San Carlos de Bariloche", "General Roca", "Cipolletti", "Villa Regina"],
    "Salta": ["Salta", "San Ramón de la Nueva Orán", "Tartagal", "General Güemes", "Metán"],
    "San Juan": ["San Juan", "Rivadavia", "Chimbas", "Santa Lucía", "Pocito"],
    "San Luis": ["San Luis", "Villa Mercedes", "Merlo", "La Punta", "Justo Daract"],
    "Santa Cruz": ["Río Gallegos", "Puerto Deseado", "Caleta Olivia", "Pico Truncado", "El Calafate"],
    "Santa Fe": ["Santa Fe", "Rosario", "Venado Tuerto", "Reconquista", "Rafaela"],
    "Santiago del Estero": ["Santiago del Estero", "La Banda", "Termas de Río Hondo", "Añatuya", "Quimilí"],
    "Tierra del Fuego": ["Ushuaia", "Río Grande", "Tolhuin", "Puerto Almanza", "Cerro Sombrero"],
    "Tucumán": ["San Miguel de Tucumán", "Yerba Buena", "Tafí Viejo", "Banda del Río Salí", "Concepción"]
};

// Obtener elementos del formulario y eventos
var provinceSelect = document.getElementById('province');
var citySelect = document.getElementById('city');

provinceSelect.addEventListener('change', function() {
    var selectedProvince = provinceSelect.value;
    var cities = localidadesPorProvincia[selectedProvince] || [];

    // Limpiar y actualizar la lista de localidades
    citySelect.innerHTML = '<option value="">Selecciona una localidad</option>';
    cities.forEach(function(city) {
        var option = document.createElement('option');
        option.textContent = city;
        option.value = city;
        citySelect.appendChild(option);
    });
});


document.getElementById('user_log').src

function confirmarEnvio(event) {
    var confirmacion = confirm("¿Estás seguro de que deseas eliminar tu perfil?");
    if (!confirmacion) {
        event.preventDefault();
    }
}

function eliminarFoto(event) {
    var confirmacion = confirm("¿Estás seguro de que deseas borrar su foto de perfil?");
    if (!confirmacion) {
        event.preventDefault();
    }
}

function closeMessage() {
    const flashMessages = document.getElementById('flash-message')
    flashMessages.style.display = "none"
}

function closeImg () {
    fulImgBox.style.display = "none"
};


function verPwd () {
    const passwordInput = document.getElementById('pwd');
    const toggleIcon = document.getElementById('togglePassword');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
};

function verPwd2 () {
    const passwordInput = document.getElementById('pwd2');
    const toggleIcon = document.getElementById('togglePassword2');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
};

function cambiarFoto() {
    document.getElementById('photoForm').submit();
}