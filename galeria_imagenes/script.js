document.addEventListener('DOMContentLoaded', function () {
    var carouselInner = document.getElementById('carousel-inner');
    var imageCounter = 0;

    document.getElementById('add-image-form').addEventListener('submit', function (event) {
        event.preventDefault();

        var fileInput = document.getElementById('image-file');
        var titleInput = document.getElementById('image-title');

        if (!fileInput.files || fileInput.files.length === 0) {
            alert('Por favor, selecciona una imagen.');
            return;
        }

        var newImage = document.createElement('div');
        newImage.classList.add('image-container');

        var image = document.createElement('img');
        image.src = URL.createObjectURL(fileInput.files[0]);
        newImage.appendChild(image);

        var imageInfo = document.createElement('div');
        imageInfo.classList.add('image-info');
        imageInfo.textContent = titleInput.value;
        newImage.appendChild(imageInfo);

        carouselInner.appendChild(newImage);

        // Ajustar la posición del carrusel para mostrar la nueva imagen
        carouselInner.style.transform = 'translateX(' + (-400 * imageCounter) + 'px)';
        imageCounter++;

        fileInput.value = '';
        titleInput.value = '';
    });

    // Agregar eventos a los botones de navegación
    document.getElementById('prev-btn').addEventListener('click', function () {
        if (imageCounter > 0) {
            imageCounter--;
            carouselInner.style.transform = 'translateX(' + (-400 * imageCounter) + 'px)';
        }
    });

    document.getElementById('next-btn').addEventListener('click', function () {
        if (imageCounter < carouselInner.children.length - 1) {
            imageCounter++;
            carouselInner.style.transform = 'translateX(' + (-400 * imageCounter) + 'px)';
        }
    });
});
