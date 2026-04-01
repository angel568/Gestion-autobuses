// 1. Inicializar leyendo de LocalStorage (si existe) o crear arreglo vacío
let buses = JSON.parse(localStorage.getItem('busesBdd')) || [];

// Referencias a los elementos del DOM
const form = document.getElementById('busForm');
const tableBody = document.getElementById('busTableBody');
const placaInput = document.getElementById('placa');
const marcaInput = document.getElementById('marca');
const capacidadInput = document.getElementById('capacidad');

// 2. Renderizar la tabla automáticamente al cargar la página
document.addEventListener('DOMContentLoaded', renderTable);

// ---------------------------
// Lógica de CREAR (Create)
// ---------------------------
form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const nuevoAutobus = {
        id: Date.now().toString(), 
        placa: placaInput.value.trim(),
        marca: marcaInput.value.trim(),
        capacidad: capacidadInput.value
    };

    buses.push(nuevoAutobus);
    
    // 3. Guardar en LocalStorage después de agregar
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
                <button class="btn-edit" type="button" onclick="alert('Función de editar pendiente')">Editar</button>
                <button class="btn-delete" type="button" onclick="alert('Función de eliminar pendiente')">Eliminar</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// ---------------------------
// Función Helper para Persistencia
// ---------------------------
function guardarEnLocalStorage() {
    // Convertimos el arreglo a string (JSON) para poder guardarlo
    localStorage.setItem('busesBdd', JSON.stringify(buses));
}