const LOGOS = {
    ISI: 'images/Logo ISI simple.png',
    CSM: 'images/Logo CSM sello.png',
    MIC: 'images/logo mic.jpg'
};

function changeLogo() {
    const empresa = document.getElementById('empresa_options').value;
    const logoContainer = document.getElementById('logo-container');
    logoContainer.innerHTML = '';

    if (LOGOS[empresa]) {
        logoContainer.innerHTML = `<img src="${LOGOS[empresa]}" alt="Logo ${empresa}">`;
    } else {
        Object.values(LOGOS).forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Logo ${src.split('/').pop()}`;
            logoContainer.appendChild(img);
        });
    }
}

function calcularTotal() {
    const dynamicTable = document.getElementById('dynamicTable');
    let subtotal = 0;

    // Calcular el subtotal de la tabla principal
    Array.from(dynamicTable.rows).forEach((row, index) => {
        if (index > 0) { // Skipping the header row
            const cantidad = row.cells[0].querySelector('input').value;
            const cu = row.cells[3].querySelector('input').value;
            const costoCell = row.cells[4].querySelector('input');

            const costo = parseFloat(cantidad) * parseFloat(cu);
            costoCell.value = isNaN(costo) ? 0 : costo;
            subtotal += isNaN(costo) ? 0 : costo;
        }
    });

    // Calcular el subtotal de las tablas complementarias
    const additionalTables = document.getElementById('tableContainer').querySelectorAll('table');
    additionalTables.forEach(table => {
        Array.from(table.rows).forEach((row, index) => {
            if (index > 0) { // Skipping the header row
                const cantidad = row.cells[0].querySelector('input').value;
                const cu = row.cells[3].querySelector('input').value;
                const costoCell = row.cells[4].querySelector('input');

                const costo = parseFloat(cantidad) * parseFloat(cu);
                costoCell.value = isNaN(costo) ? 0 : costo;
                subtotal += isNaN(costo) ? 0 : costo;
            }
        });
    });

    document.getElementById('subtotal').value = subtotal.toFixed(2);
    document.getElementById('monto').value = subtotal.toFixed(2);
    const iva = subtotal * 0.16;
    document.getElementById('iva').value = iva.toFixed(2);
    document.getElementById('total').value = (subtotal + iva).toFixed(2);
}

// Función para agregar una fila a la tabla 'dynamicTable'
function addRow(tableID) {
    let table = document.getElementById(tableID);
    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);

    // Insertar celdas en la nueva fila
    let cell1 = row.insertCell(0);
    let element1 = document.createElement("input");
    element1.type = "text";
    element1.name = "cantidad";
    element1.onchange = function() { calcularTotal(this); };
    cell1.appendChild(element1);

    let cell2 = row.insertCell(1);
    let element2 = document.createElement("input");
    element2.type = "text";
    element2.name = "um";
    cell2.appendChild(element2);

    let cell3 = row.insertCell(2);
    let element3 = document.createElement("input");
    element3.type = "text";
    element3.name = "descripcion";
    cell3.appendChild(element3);

    let cell4 = row.insertCell(3);
    let element4 = document.createElement("input");
    element4.type = "text";
    element4.name = "cu";
    element4.onchange = function() { calcularTotal(this); };
    cell4.appendChild(element4);

    let cell5 = row.insertCell(4);
    let element5 = document.createElement("input");
    element5.type = "text";
    element5.name = "costo";
    element5.readOnly = true;
    cell5.appendChild(element5);
}

// Función para calcular el total en la tabla especificada
function calcularCosto(element) {
    let table = element.closest('table');
    let rows = table.rows;
    for (let i = 1; i < rows.length; i++) {
        let cantidad = rows[i].cells[0].childNodes[0].value;
        let cu = rows[i].cells[3].childNodes[0].value;
        let costo = rows[i].cells[4].childNodes[0];
        if (cantidad && cu) {
            costo.value = cantidad * cu;  // Asegúrate de manejar la conversión a números adecuadamente
        }
    }
}

// Función para agregar una nueva fila a una tabla específica
function addRowToSpecificTable(table) {
    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);

    // Insertar celdas en la nueva fila
    let cell1 = row.insertCell(0);
    let element1 = document.createElement("input");
    element1.type = "text";
    element1.name = "cantidad";
    element1.onchange = function() { calcularTotal(this); };
    cell1.appendChild(element1);

    let cell2 = row.insertCell(1);
    let element2 = document.createElement("input");
    element2.type = "text";
    element2.name = "um";
    cell2.appendChild(element2);

    let cell3 = row.insertCell(2);
    let element3 = document.createElement("input");
    element3.type = "text";
    element3.name = "descripcion";
    cell3.appendChild(element3);

    let cell4 = row.insertCell(3);
    let element4 = document.createElement("input");
    element4.type = "text";
    element4.name = "cu";
    element4.onchange = function() { calcularTotal(this); };
    cell4.appendChild(element4);

    let cell5 = row.insertCell(4);
    let element5 = document.createElement("input");
    element5.type = "text";
    element5.name = "costo";
    element5.readOnly = true;
    cell5.appendChild(element5);
}

// Función para agregar una nueva tabla al contenedor especificado
function addTable() {
    let container = document.getElementById('tableContainer');
    let div = document.createElement('div');
    div.classList.add('dynamicTableContainer');
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.alignItems = "center";
    div.style.marginTop = "10px";
    div.innerHTML = `
        <table border="1" class="dynamicTable">
            <tr>
                <th>Cantidad</th>
                <th>UM</th>
                <th>Descripción</th>
                <th>C.U.</th>
                <th>Costo</th>
            </tr>
            <tr>
                <td><input type="text" name="cantidad" onchange="calcularTotal(this)"/></td>
                <td><input type="text" name="um" /></td> 
                <td><input type="text" name="descripcion" /></td>
                <td><input type="text" name="cu" onchange="calcularTotal(this)"/></td> 
                <td><input type="text" name="costo" readonly/></td> 
            </tr>
        </table>
        <div class="button-container" style="align-self: flex-start;">
            <button class="add" type="button" onclick="addRowToSpecificTable(this.parentElement.previousElementSibling)">+</button>
            <button class="remove" type="button" onclick="removeRowFromSpecificTable(this.parentElement.previousElementSibling)">-</button>
        </div>
    `;
    container.appendChild(div);
}

// Función para quitar la última fila de la tabla 'dynamicTable'
function removeRow(tableID) {
    let table = document.getElementById(tableID);
    let rowCount = table.rows.length;
    // No eliminar la fila de encabezado
    if (rowCount > 2) {
        table.deleteRow(rowCount - 1);
    }
}

// Función para quitar la última fila de la tabla específica
function removeRowFromSpecificTable(table) {
    let rowCount = table.rows.length;
    // No eliminar la fila de encabezado
    if (rowCount > 2) {
        table.deleteRow(rowCount - 1);
    }
}

// Función para quitar la última tabla agregada
function removeTable() {
    let containers = document.querySelectorAll('div.dynamicTableContainer');
    if (containers.length > 0) {
        let lastContainer = containers[containers.length - 1];
        lastContainer.remove();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const url = 'https://script.google.com/macros/s/AKfycbxtmQt8O_g7auWw4P2Ay2Xy-KrmwMasp38cbkPOyP7lR2LRIusOZOp0AMbJvOxAkvtu/exec';

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Datos obtenidos:', data);
        const select1 = document.getElementById('selectorHoja1');
        const select2 = document.getElementById('selectorHoja2');

        // Verificar que los elementos select se obtienen correctamente
        console.log('select1:', select1);
        console.log('select2:', select2);

        if (data['BD PERSONAL OP.']) {
            console.log('Datos de Hoja1:', data['BD PERSONAL OP.']);
            data['BD PERSONAL OP.'].forEach(row => {
                const option = document.createElement('option');
                option.text = row.join(' - ');
                select1.add(option);
                console.log('Añadida opción a select1:', option);
            });
        } else {
            console.warn('No se encontraron datos para Hoja1');
        }

        if (data['BD CLIENTES']) {
            console.log('Datos de Hoja2:', data['BD CLIENTES']);
            data['BD CLIENTES'].forEach(row => {
                const option = document.createElement('option');
                option.text = row.join(' - ');
                select2.add(option);
                console.log('Añadida opción a select2:', option);
            });
        } else {
            console.warn('No se encontraron datos para Hoja2');
        }
    })
    .catch(error => {
        console.error('Hubo un problema con la operación fetch:', error);
    });
});

function limpiarFormulario() {
    document.querySelector('form[name="google-sheet"]').reset();
    let dynamicTables = document.querySelectorAll('div.dynamicTableContainer');
    dynamicTables.forEach(function(div) {
        div.remove();
    });
    let mainTableRows = document.querySelectorAll('#dynamicTable tr');
    mainTableRows.forEach(function(row, index) {
        if (index > 0) {  // No eliminar la fila de encabezado
            row.remove();
        }
    });
    // Añadir una fila en la tabla principal si se eliminó todo
    addRow('dynamicTable');
}

function generateFolio() {
    var folio = Math.random().toString(36).substring(2, 8).toUpperCase();
    document.getElementById('folioInput').value = folio;
}

function toggleSections() {
    var preCotizacion = document.getElementById("preCotizacion").checked;
    var cotizacion = document.getElementById("cotizacion").checked;
    var titulo = document.getElementById("tipoCotizacionTitulo");
    var preCotizacion = document.getElementById('preCotizacion').checked;
    var folioSection = document.getElementById('folio-section');
    const folioButton = document.getElementById('folioButton');
    var gastosSection = document.getElementById('gastos-section');
    var dynamicTableContainer = document.getElementById('dynamicTableContainer');
    var buttonContainer = document.getElementById('buttonContainer');
    var finalTableContainer = document.getElementById('finalTableContainer');

    if (preCotizacion) {
        titulo.textContent = "Pre Cotización";
        folioSection.style.display = 'flex';
        folioButton.style.display = 'flex';
        gastosSection.style.display = 'none';
        dynamicTableContainer.style.display = 'none';
        buttonContainer.style.display = 'none';
        finalTableContainer.style.display = 'none';
    } else {
        titulo.textContent = "Cotización";
        folioSection.style.display = 'flex';
        folioButton.style.display = 'none';
        gastosSection.style.display = 'flex';
        dynamicTableContainer.style.display = 'flex';
        buttonContainer.style.display = 'flex';
        finalTableContainer.style.display = 'flex';
    }
}

window.onload = toggleSections;

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('cotizacion').checked = true;
    toggleSections(); // Llama a la función cuando la página se carga
});

document.addEventListener('DOMContentLoaded', function() {
    const url = 'https://script.google.com/macros/s/AKfycbxtmQt8O_g7auWw4P2Ay2Xy-KrmwMasp38cbkPOyP7lR2LRIusOZOp0AMbJvOxAkvtu/exec';

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Datos obtenidos:', data);
        const select1 = document.getElementById('selectorHoja1');
        const select2 = document.getElementById('selectorHoja2');

        // Verificar que los elementos select se obtienen correctamente
        console.log('select1:', select1);
        console.log('select2:', select2);

        if (data['BD PERSONAL OP.']) {
            console.log('Datos de Hoja1:', data['BD PERSONAL OP.']);
            data['BD PERSONAL OP.'].forEach(row => {
                const option = document.createElement('option');
                option.text = row.join(' - ');
                select1.add(option);
                console.log('Añadida opción a select1:', option);
            });
        } else {
            console.warn('No se encontraron datos para Hoja1');
        }

        if (data['BD CLIENTES']) {
            console.log('Datos de Hoja2:', data['BD CLIENTES']);
            data['BD CLIENTES'].forEach(row => {
                const option = document.createElement('option');
                option.text = row.join(' - ');
                select2.add(option);
                console.log('Añadida opción a select2:', option);
            });
        } else {
            console.warn('No se encontraron datos para Hoja2');
        }
    })
    .catch(error => {
        console.error('Hubo un problema con la operación fetch:', error);
    });
});