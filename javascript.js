// ===========================
// REPRODUCCIÓN DEL VIDEO
// ===========================
const video = document.getElementById('videoSlide');
const modal = document.getElementById('mediaModal');
const carousel = document.getElementById('carouselMedia');

// Detener y reiniciar el video cuando se cierra el modal
modal.addEventListener('hidden.bs.modal', () => {
  video.pause();
  video.currentTime = 0;
});

// Detener el video al cambiar de slide
carousel.addEventListener('slide.bs.carousel', () => {
  video.pause();
  video.currentTime = 0;
});

// Reproducir el video si el slide activo lo contiene
carousel.addEventListener('slid.bs.carousel', (e) => {
  const activeItem = e.relatedTarget;
  if (activeItem && activeItem.querySelector('video')) {
    video.play();
  }
});

// ===========================
// COMENTARIOS
// ===========================

let selectedImageSrc = "img/Form/ojo.jpeg"; // Imagen por defecto

// SELECCIONAR IMAGEN
function selectImage(imgElement) {
  selectedImageSrc = imgElement.src;
  document.getElementById('mainImage').src = selectedImageSrc;

  const modalSeleccion = bootstrap.Modal.getInstance(document.getElementById('seleccionarImagenModal'));
  if (modalSeleccion) modalSeleccion.hide();

  // Mostrar el modal de comentar solo al seleccionar imagen
  const modalComentario = new bootstrap.Modal(document.getElementById('comentarioModal'));
  modalComentario.show();
}

// Instancias de modales y formulario
const formulario = document.getElementById('formulario');
const comentarioModalElement = document.getElementById('comentarioModal');
const graciasModalElement = document.getElementById('graciasModal');

const comentarioModal = new bootstrap.Modal(comentarioModalElement);
const graciasModal = new bootstrap.Modal(graciasModalElement);
const btnVolver = document.getElementById('btnVolver');

// SUBMIT DEL FORMULARIO
formulario.addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = formulario.querySelector('[name="nombre"]').value.trim();
  const opinion = formulario.querySelector('[name="opinion"]').value.trim();

  if (!nombre || !opinion) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const comentarios = document.querySelectorAll('.accordion-item');

  if (comentarios.length >= 3) {
    comentarios[2].querySelector('.accordion-body').innerText =
      comentarios[1].querySelector('.accordion-body').innerText;
    comentarios[2].querySelector('strong').innerText =
      comentarios[1].querySelector('strong').innerText;
    comentarios[2].querySelector('img').src =
      comentarios[1].querySelector('img').src;

    comentarios[1].querySelector('.accordion-body').innerText =
      comentarios[0].querySelector('.accordion-body').innerText;
    comentarios[1].querySelector('strong').innerText =
      comentarios[0].querySelector('strong').innerText;
    comentarios[1].querySelector('img').src =
      comentarios[0].querySelector('img').src;
  }

  // Insertar nuevo comentario
  comentarios[0].querySelector('.accordion-body').innerText = opinion;
  comentarios[0].querySelector('strong').innerText = nombre;
  comentarios[0].querySelector('img').src = selectedImageSrc;

  // Mostrar modal de agradecimiento y cerrar el de comentario
  comentarioModal.hide();
  graciasModal.show();
});

// BOTÓN VOLVER
btnVolver.addEventListener('click', () => {
  // Ocultar modal de agradecimiento
  graciasModal.hide();

  // Limpiar formulario
  formulario.reset();

  // Restaurar imagen por defecto
  selectedImageSrc = "img/Form/ojo.jpeg";
  document.getElementById('mainImage').src = selectedImageSrc;

  // Asegurar que el modal de comentario no se reabra accidentalmente
  const modalComentarioInstance = bootstrap.Modal.getInstance(comentarioModalElement);
  if (modalComentarioInstance) {
    modalComentarioInstance.hide();
  }
});

