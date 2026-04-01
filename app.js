let modoEdicion = false;
let idEdicion = null;

const form = document.getElementById('busForm');
const tableBody = document.getElementById('busTableBody');
const placaInput = document.getElementById('placa');
const marcaInput = document.getElementById('marca');
const capacidadInput = document.getElementById('capacidad');
const submitBtn = document.getElementById('submitBtn');

const API_URL = 'http://localhost:3000/api/autobuses';

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', fetchAutobuses);

// ---------------------------
// LEER: Obtener datos de MySQL
// ---------------------------
async function fetchAutobuses() {
    try {
        const response = await fetch(API_URL);
        const buses = await response.json();
        renderTable(buses);
    } catch (error) {
        console.error('Error al cargar datos:', error);
    }
}

// ---------------------------
// CREAR y ACTUALIZAR
// ---------------------------
form.addEventListener('submit', async function(event) {
    event.preventDefault(); 
    
    const placaLimpia = placaInput.value.trim();
    if (placaLimpia === '') {
        alert('Error: La placa no puede estar vacía.');
        return; 
    }

    const busData = {
        placa: placaLimpia,
        marca: marcaInput.value.trim(),
        capacidad: capacidadInput.value
    };
    
    try {
        if (modoEdicion) {
            // Petición PUT para actualizar
            await fetch(`${API_URL}/${idEdicion}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(busData)
            });
            modoEdicion = false;
            idEdicion = null;
            submitBtn.textContent = 'Guardar Registro';
        } else {
            // Petición POST para crear
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(busData)
            });
        }

        form.reset();
        fetchAutobuses(); // Recargar tabla desde MySQL
    } catch (error) {
        console.error('Error al guardar:', error);
    }
});

// ---------------------------
// RENDERIZAR TABLA
// ---------------------------
function renderTable(buses) {
    tableBody.innerHTML = '';
    
    buses.forEach(bus => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${bus.placa}</td>
            <td>${bus.marca}</td>
            <td>${bus.capacidad}</td>
            <td>
                <button class="btn-edit" type="button" onclick="editarAutobus('${bus.id}', '${bus.placa}', '${bus.marca}', '${bus.capacidad}')">Editar</button>
                <button class="btn-delete" type="button" onclick="eliminarAutobus('${bus.id}')">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// ---------------------------
// PREPARAR EDICIÓN
// ---------------------------
window.editarAutobus = function(id, placa, marca, capacidad) {
    placaInput.value = placa;
    marcaInput.value = marca;
    capacidadInput.value = capacidad;
    
    modoEdicion = true;
    idEdicion = id;
    submitBtn.textContent = 'Actualizar Autobús';
}

// ---------------------------
// ELIMINAR en MySQL
// ---------------------------
window.eliminarAutobus = async function(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este autobús de la base de datos?')) {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            fetchAutobuses(); // Recargar tabla
        } catch (error) {
            console.error('Error al eliminar:', error);
        }
    }
}