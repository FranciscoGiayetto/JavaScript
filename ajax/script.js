document.addEventListener('DOMContentLoaded', function () {
    const listaProductos = document.getElementById('listaProductos');
    const detallesProductoDiv = document.getElementById('detallesProducto');
  
    function cargarProductos() {
      const ajax = new XMLHttpRequest();
      const url = 'server.json';
      ajax.open('GET', url);
  
      ajax.onload = function () {
        if (ajax.status === 200) {
          const productos = JSON.parse(ajax.responseText);
  
          // Limpiar la lista de productos
          listaProductos.innerHTML = '';
  
          // Crear tarjetas de Bootstrap para cada producto
          productos.forEach(producto => {
            const card = document.createElement('div');
            card.classList.add('card');
  
            const imagen = document.createElement('img');
            imagen.src = './imagenes/' + producto.id + '.jpeg'; // Ajusta la ruta según tus necesidades
            console.log(producto.id);
            imagen.classList.add('card-img-top');
  
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
  
            const nombre = document.createElement('h5');
            nombre.classList.add('card-title');
            nombre.textContent = producto.nombre;
  
            cardBody.appendChild(nombre);
  
            card.appendChild(imagen);
            card.appendChild(cardBody);
  
            card.addEventListener('click', function () {
              // Pasar directamente los detalles del producto
              mostrarDetalles(producto);
            });
  
            listaProductos.appendChild(card);
          });
        } else {
          console.error('Error al cargar los datos del servidor');
        }
      };
  
      ajax.send();
    }
  
    // Cargar productos al cargar la página
    cargarProductos();
  
    function mostrarDetalles(producto) {
      // Mostrar los detalles del producto seleccionado
      detallesProductoDiv.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
      `;
    }
  });
  