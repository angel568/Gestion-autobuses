// Arreglo temporal para almacenar los autobuses en memoria
let buses = [];

// Referencias a los elementos del DOM
const form = document.getElementById('busForm');
const tableBody = document.getElementById('busTableBody');
const placaInput = document.getElementById('placa');
const marcaInput = document.getElementById('marca');
const capacidadInput = document.getElementById('capacidad');

// ---------------------------
// 1. Lógica de CREAR (Create)
// ---------------------------
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario
    
    // Crear el objeto con los datos del formulario
    const nuevoAutobus = {
        id: Date.now().toString(), // Generamos un ID único temporal
        placa: placaInput.value.trim(),
        marca: marcaInput.value.trim(),
        capacidad: capacidadInput.value
    };

    // Agregar al arreglo principal
    buses.push(nuevoAutobus);
    
    // Limpiar el formulario
    form.reset();
    
    // Actualizar la tabla visualmente
    renderTable();
});

// ---------------------------
// 2. Lógica de LEER (Read)
// ---------------------------
function renderTable() {
    // Limpiar el contenido actual de la tabla
    tableBody.innerHTML = '';
    
    // Recorrer el arreglo y crear una fila por cada autobús
    buses.forEach(bus => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${bus.placa}</td>
            <td>${bus.marca}</td>
            <td>${bus.capacidad}</td>
            <td>
                <button class="btn-edit" type="button" onclick="alert('Función de editar próximamente')">Editar</button>
                <button class="btn-delete" type="button" onclick="alert('Función de eliminar próximamente')">Eliminar</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}