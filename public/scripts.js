var aerolineaTiempos = {
  '6403': [2, 5], // iberia
  '6405': [2, 5], // iberia
  '6409': [2, 5], // iberia
  '255': [2, 5], // emirates
  '175': [2, 5], // aireuropa ELIMINAR
  '359': [2, 5], // UA 
  '412': [2, 5], // UA
  '429': [2, 5], // UA
  '821': [2, 5], // UA
  '1024': [2, 5], // UA
  '1028': [2, 5], // UA
  '1060': [2, 5], // UA
  '1063': [2, 5], // UA
  '1065': [2, 5], // UA
  '1088': [2, 5], // UA
  '1090': [2, 5], // UA
  '1271': [2, 5], // UA
  '1547': [2, 5], // UA
  '1566': [2, 5], // UA
  '2251': [2, 5] // UA
};
//asd
var aerolineaTiempos2 = {
  '6403': [20, 25], // iberia
  '6405': [20, 25], // iberia
  '6409': [20, 25], // iberia
  '255': [20, 25], // emirates
  '175': [20, 25], // aireuropa ELIMINAR
  '359': [20, 25], // UA 
  '412': [20, 25], // UA
  '429': [20, 25], // UA
  '821': [20, 25], // UA
  '1024': [20, 25], // UA
  '1028': [20, 25], // UA
  '1060': [20, 25], // UA
  '1063': [20, 25], // UA
  '1065': [20, 25], // UA
  '1088': [20, 25], // UA
  '1090': [20, 25], // UA
  '1271': [20, 25], // UA
  '1547': [20, 25], // UA
  '1566': [20, 25], // UA
  '2251': [20, 25] // UA
};

function updateButtonColor(buttonElement, startTime, endTime, arrivalFlight) {
  const now = new Date();
  const start = new Date(now);
  start.setHours(parseInt(startTime.split(':')[0]));
  start.setMinutes(parseInt(startTime.split(':')[1]));

  const end = new Date(now);
  end.setHours(parseInt(endTime.split(':')[0]));
  end.setMinutes(parseInt(endTime.split(':')[1]));

  // Calculamos la diferencia en minutos entre endTime y startTime
  const timeDifferenceMinutes = (end - start) / (1000 * 60);

  // Comparamos la diferencia de tiempo para asignar el color adecuado
  if (timeDifferenceMinutes <= aerolineaTiempos[arrivalFlight][0]) {
    buttonElement.classList.remove('yellow-btn', 'red-btn');
    buttonElement.classList.add('green-btn');
  } else if (timeDifferenceMinutes <= aerolineaTiempos[arrivalFlight][1]) {
    buttonElement.classList.remove('green-btn', 'red-btn');
    buttonElement.classList.add('yellow-btn');
  } else {
    buttonElement.classList.remove('green-btn', 'yellow-btn');
    buttonElement.classList.add('red-btn');
  }
}

function updateButtonColor2(buttonElement, startTime, endTime, arrivalFlight) {
  const now = new Date();
  const start = new Date(now);
  start.setHours(parseInt(startTime.split(':')[0]));
  start.setMinutes(parseInt(startTime.split(':')[1]));

  const end = new Date(now);
  end.setHours(parseInt(endTime.split(':')[0]));
  end.setMinutes(parseInt(endTime.split(':')[1]));

  // Calculamos la diferencia en minutos entre endTime y startTime
  const timeDifferenceMinutes = (end - start) / (1000 * 60);

  // Comparamos la diferencia de tiempo para asignar el color adecuado
  if (timeDifferenceMinutes <= aerolineaTiempos2[arrivalFlight][0]) {
    buttonElement.classList.remove('yellow-btn', 'red-btn');
    buttonElement.classList.add('green-btn');
  } else if (timeDifferenceMinutes <= aerolineaTiempos2[arrivalFlight][1]) {
    buttonElement.classList.remove('green-btn', 'red-btn');
    buttonElement.classList.add('yellow-btn');
  } else {
    buttonElement.classList.remove('green-btn', 'yellow-btn');
    buttonElement.classList.add('red-btn');
  }
}

var currentRow = {};

function formatDate(dateString) {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const date = new Date(dateString);
  if (isNaN(date)) {
    return '';
  }
  //const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  //const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${day} ${month} ${hours}:${minutes}`;
}

function formatTime1(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) {
    return '';
  }
  //const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function formatTime(timeString) {
  const timeParts = timeString.split(':'); // Dividimos la cadena en partes (horas, minutos, segundos)
  if (timeParts.length >= 2) {
    const hours = timeParts[0];
    const minutes = timeParts[1];
    const seconds = timeParts[2] || '00';
    return `${hours}:${minutes}`;
  } else {
    return 'malisimo';
  }
}


var hiddenStates = [];

function updateTable(data) {
  var tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';

  data.forEach(function (row, index) {
    var newRow = document.createElement('tr');
    newRow.innerHTML = `
      <!-- <td>
        <button class="btn btn-primary rounded-circle small-btn" onclick="toggleData(${index})">
            <i class="fa-solid fa-plane"></i>
        </button>
      </td> -->
      <td>${(row.cod_ae && row.v_arr && row.v_dep) ? `${row.cod_ae} ${row.v_arr}<br>${row.cod_ae} ${row.v_dep}` : (row.cod_ae || '-')}</td>
      <!-- <td class="text-center align-middle">${row.pea_o || ''}</td> -->
      <td class="text-center align-middle">${(row.orig && row.dest) ? `${row.orig}<br>${row.dest}` : row.orig || ''}</td>
      <td class="text-center align-middle">${row.tip_lim || ''}</td>
      <td class="text-center align-middle">${row.sta ? `${formatDate(row.sta)}<br>${formatDate(row.stdd)}` : ''}</td>
      <!-- <td class="text-center align-middle">${row.eta ? `${formatDate(row.eta)}${row.etd ? '<br>' + formatDate(row.etd) : '-'}` : '-'}</td> -->
      <td class="text-center align-middle">${row.ata ? `${formatDate(row.ata)}` : ''}</td>

      <td class="cell-with-button">
        ${row.ho_ini? (
          `${formatTime(row.ho_ini)} <br> ${row.ho_fin !== null ? formatTime(row.ho_fin) : ''}` +
          `<button class="btn small-btn ho-ini-button" onclick="mostrarModalPersonalizado(${index})">
          <i class="fa-solid fa-pump-soap"></i>
          </button>`
        ) : (
          '-'
        )}
      </td>


      <td class="cell-with-button">
        <!-- Verificamos si v_arr es diferente de 1364 y ho_ini no está vacío -->
        ${row.pri_bag ?  (
          // Si ambas condiciones se cumplen, mostramos el contenido con el botón
          `${row.pri_bag} <br> ${row.ul_bag !== null ? row.ul_bag : ''}` +
          `<button class="btn small-btn ho-ini-bag" id="button-${index}" onclick="mostrarModalPersonalizado2(${index})">
          <i class="fa-solid fa-cart-flatbed-suitcase"></i>
          </button>`
        ) : (
          // Si es false no llenará nada
          '-'
        )}
      </td>`;

    var hoIniButton = newRow.querySelector('.ho-ini-button');
    if (hoIniButton) {
      updateButtonColor(hoIniButton, row.ho_ini, row.ho_fin, row.v_arr);
    }

    var hoIniBag = newRow.querySelector('.ho-ini-bag');
    if (hoIniBag) {
      updateButtonColor2(hoIniBag, row.pri_bag, row.ul_bag, row.v_arr);
    }
    
     tableBody.appendChild(newRow);

    /*var hiddenDataRow = document.createElement('tr');
    hiddenDataRow.className = 'hidden-data';
    hiddenDataRow.style.display = 'none';
    hiddenDataRow.innerHTML = 
      `<td><strong>RESPONSABLE CAB.</strong></td>
      <td colspan="3">${row.res || ''}</td>
      <td><strong>EQUIPO CAB.</strong></td>`;
    tableBody.appendChild(hiddenDataRow);*/

    /*hiddenDataRow = document.createElement('tr');
    hiddenDataRow.className = 'hidden-data';
    hiddenDataRow.style.display = 'none';
    hiddenDataRow.innerHTML =
      `<td><strong>RESPONSABLE ADU.</strong></td>
      <td colspan="3">${row.res_a || ''}</td>
      <td><strong>CIERRE ADU. </strong></td>
      <td colspan="5">${row.cie || ''}</td>`;*/
    //tableBody.appendChild(hiddenDataRow);

    hiddenStates.push(false, false);
  });
}

function toggleData(index) {
  var start = index * 2;
  var end = start + 1;

  for (var i = 0; i < hiddenStates.length; i++) {
    hiddenStates[i] = i >= start && i <= end ? !hiddenStates[i] : false;
    document.querySelectorAll('.hidden-data')[i].style.display = hiddenStates[i] ? 'table-row' : 'none';
  }
}

function getData() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/data', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var responseData = JSON.parse(xhr.responseText);
      data = responseData.data;
      updateTable(data);
    }
  };
  xhr.send();
}

function abrirModal() {
  var modal = document.getElementById('miModal');
  modal.style.display = 'flex';
}

function cerrarModal() {
  var modal = document.getElementById('miModal');
  modal.style.display = 'none';
}

function mostrarModalPersonalizado(index) {
  abrirModal();
  if (!data[index]) {

    return;
  }

  currentRow = data[index];
  var modalContent = document.querySelector('.modal-content');
  modalContent.innerHTML = `
    <div class="model-content">
      <h4>Datos Generales de Cabina</h4>
      <p><b>RESPONSABLE:</b></p>
      <p>${currentRow.res_evacab || 'qwe'}</p>
      <p><b>COCKPIT:</b></p>
      <p>${currentRow.coo || ''}</p>
      <p><b>TOILETS:</b></p>
      <p>${currentRow.toi || ''}</p>
      <p><b>GALLEYS:</b></p>
      <p>${currentRow.gal || ''}</p>
      <p><b>ASPIRADO:</b></p>
      <p>${currentRow.asp || ''}</p>
      <p><b>CABINA PAX:</b></p>
      <p>${currentRow.cab_pax || ''}</p>
      <p><b>OBSERVACIONES DEL CIENTE:</b></p>
      <p>${currentRow.obs_cli || ''}</p>
      <p><b>OBSERVACIONES:</b></p>
      <p>${currentRow.obs_e || ''}</p>  
    </div>
    <button class="btn btn-secondary" onclick="cerrarModal()">Cerrar</button>
  `;
}

function mostrarModalPersonalizado2(index) {
  abrirModal();
  if (!data[index]) {
    return;
  }

  currentRow = data[index];
  var modalContent = document.querySelector('.modal-content');
  modalContent.innerHTML = `
    <div class="model-content">
      <h4>Datos Generales de Cabina</h4>
      <p><b>RESPONSABLE:</b></p>
      <p>${currentRow.res_adu || ''}</p>
      <p><b>CIERRE:</b></p>
      <p>${currentRow.cie || ''}</p>
      <p><b>OBSERVACIONES:</b></p>
      <p>${currentRow.obs_a || ''}</p>
    </div>
    <button class="btn btn-secondary" onclick="cerrarModal()">Cerrar</button>
  `;
}


getData();
setInterval(getData, 60000);
