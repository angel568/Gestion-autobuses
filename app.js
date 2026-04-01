// 1. Inicializar leyendo de LocalStorage (si existe) o crear arreglo vacío
let buses = JSON.parse(localStorage.getItem('busesBdd')) || [];
let modoEdicion = false;
let idEdicion = null;

// Referencias a los elementos del DOM
const form = document.getElementById('busForm');
const tableBody = document.getElementById('busTableBody');
const placaInput = document.getElementById('placa');
const marcaInput = document.getElementById('marca');
const capacidadInput = document.getElementById('capacidad');
const submitBtn = document.getElementById('submitBtn');

// 2. Renderizar la tabla automáticamente al cargar la página
document.addEventListener('DOMContentLoaded', renderTable);

// ---------------------------
// Lógica de CREAR y ACTUALIZAR
// ---------------------------
form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    // Validación de espacios en blanco (El hotfix que aplicamos)
    const placaLimpia = placaInput.value.trim();
    if (placaLimpia === '') {
        alert('Error: La placa no puede estar vacía o contener solo espacios.');
        return; 
    }
    
    if (modoEdicion) {
        // ACTUALIZAR (Update)
        const index = buses.findIndex(bus => bus.id === idEdicion);
        if (index !== -1) {
            buses[index].placa = placaLimpia;
            buses[index].marca = marcaInput.value.trim();
            buses[index].capacidad = capacidadInput.value;
        }
        // Restaurar el estado del formulario
        modoEdicion = false;
        idEdicion = null;
        submitBtn.textContent = 'Guardar Registro';
    } else {
        // CREAR (Create)
        const nuevoAutobus = {
            id: Date.now().toString(), 
            placa: placaLimpia,
            marca: marcaInput.value.trim(),
            capacidad: capacidadInput.value
        };
        buses.push(nuevoAutobus);
    }

    // Guardar en LocalStorage, limpiar y actualizar vista
    guardarEnLocalStorage();
    form.reset();
    renderTable();
});

// ---------------------------
// Lógica de LEER (Read)
// ---------------------------
function renderTable() {
    tableBody.innerHTML = '';
    
    buses.forEach(bus => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${bus.placa}</td>
            <td>${bus.marca}</td>
            <td>${bus.capacidad}</td>
            <td>
                <button class="btn-edit" type="button" onclick="editarAutobus('${bus.id}')">Editar</button>
                <button class="btn-delete" type="button" onclick="eliminarAutobus('${bus.id}')">Eliminar</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// ---------------------------
// Lógica de ACTUALIZAR (Preparar formulario)
// ---------------------------
window.editarAutobus = function(id) {
    const bus = buses.find(b => b.id === id);
    if (bus) {
        // Cargar los datos en el formulario
        placaInput.value = bus.placa;
        marcaInput.value = bus.marca;
        capacidadInput.value = bus.capacidad;
        
        // Cambiar el estado de la aplicación
        modoEdicion = true;
        idEdicion = id;
        submitBtn.textContent = 'Actualizar Autobús';
    }
}

// ---------------------------
// Lógica de ELIMINAR (Delete)
// ---------------------------
window.eliminarAutobus = function(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este autobús del sistema?')) {
        // Filtrar el arreglo para excluir el ID seleccionado
        buses = buses.filter(bus => bus.id !== id);
        guardarEnLocalStorage();
        renderTable();
    }
}

// ---------------------------
// Función Helper para Persistencia
// ---------------------------
function guardarEnLocalStorage() {
    localStorage.setItem('busesBdd', JSON.stringify(buses));
}