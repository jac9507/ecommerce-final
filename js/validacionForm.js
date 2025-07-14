document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('#contact-form');

    const mostrarError = (input, mensaje) => {
        const divPadre = input.parentNode;
        const errorText = divPadre.querySelector('.error-text');
        divPadre.classList.add('error');
        errorText.innerText = mensaje;
    };

    const eliminarError = input => {
        const divPadre = input.parentNode;
        const errorText = divPadre.querySelector('.error-text');
        divPadre.classList.remove('error');
        errorText.innerText = '';
    };

    formulario.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('change', () => {
            if (input.value.trim() !== '') {
                eliminarError(input);
            }
        });
    });

    const validarCampo = (campoId, mensaje) => {
        const campo = document.getElementById(campoId);
        const value = campo.value.trim();

        if (value === '') {
            mostrarError(campo, mensaje);
            return false;
        } else {
            eliminarError(campo);
            return true;
        }
    };

    const isEmail = email => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validarEmail = (campoId, mensaje) => {
        const campo = document.getElementById(campoId);
        const email = campo.value.trim();

        if (email === '') {
            mostrarError(campo, 'El correo electrónico es obligatorio');
            return false;
        } else if (!isEmail(email)) {
            mostrarError(campo, mensaje);
            return false;
        } else {
            eliminarError(campo);
            return true;
        }
    };

    const validarFormulario = () => {
        let validado = true;
        validado = validarCampo('nombre', 'El nombre es obligatorio') && validado;
        validado = validarEmail('email', 'El formato del correo no es válido') && validado;
        validado = validarCampo('mensaje', 'El mensaje no puede estar vacío') && validado;
        return validado;
    };

    formulario.addEventListener('submit', event => {
        if (!validarFormulario()) {
            event.preventDefault();
            console.log("❌ El formulario no es válido");
        } else {
            console.log("✅ Formulario validado correctamente");
            // El formulario se envía normalmente porque estás usando Formspree
            // No evitamos el submit si todo es válido
        }
    });
});