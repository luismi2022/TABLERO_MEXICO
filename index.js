require('dotenv').config();

const express = require('express');
const axios = require('axios');
const { Pool } = require('pg');
//const moment = require('moment'); asd

const PORT = process.env.PORT || 3001;

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

const pool = new Pool({
  connectionString: process.env.PGDATABASE_URL,
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});


async function getDataAndInsert(table, url, columns) {
  try {
    const response = await axios.get(url);
    const jsonData = response.data;

    for (const row of jsonData.data) {
      try {
        const insertQuery = {
          text: `INSERT INTO ${table} (${columns.join(', ')}) 
                 VALUES (${columns.map((_, index) => `$${index + 1}`).join(', ')}) 
                 ON CONFLICT (${columns[0]}) DO UPDATE 
                 SET ${columns.slice(1).map((column, index) => `${column} = $${index + 2}`).join(', ')}`,
          values: columns.map(column => row[column]),
        };

        const result = await pool.query(insertQuery);
        if (result.rowCount > 0) {
          console.log(`Registro insertado o actualizado en tabla ${table}:`, result.rowCount);
        }
      } catch (error) {
        console.error(`Error al insertar o actualizar el registro en tabla ${table}:`, error);
      }
    }
  } catch (error) {
    console.error(`Error al obtener el JSON de ${url}:`, error);
  }
}

async function fetchDataAndInsert() {
  await getDataAndInsert('itinera', 'https://script.google.com/macros/s/AKfycbz2mZMxx7snOIC0B2m0CJz2wvvs6wivOjp9fIwNuV820cQX_CkToyy-52msSt0v5JSChg/exec', ['vuelo', 'aer', 'orig', 'v_arr', 'ato', 'v_dep', 'sta', 'stdd', 'dest', 'cod_ae']);
  await getDataAndInsert('aduan', 'https://script.google.com/macros/s/AKfycbxbs2b_Etjcy1uVQf4u0Kbh7nMmSSrlh4RyCe02Ocv8LETdn3w6ef-KyP3b7LcWhV7_2g/exec', ['vuelo', 'pea_ini', 'pri_bag', 'ul_bag', 'cie', 'obs', 'res_adu']);
  await getDataAndInsert('evacab', 'https://script.google.com/macros/s/AKfycbyn3zmc-X9T8rJkJ1xi1puEahSUh2ZkMxGVUOMjTC9ds6smu48ghMleJdP8bt0FaxP6/exec', ['vuelo', 'ho_ini', 'ho_fin', 'obs', 'res_evacab', 'cal_pun', 'cal_pre', 'cal_act', 'cal_mat', 'cal_res', 'tip_lim', 'obs_cli', 'coo', 'toi', 'gal', 'asp', 'cab_pax', 'ata_pre']);
  await getDataAndInsert('oficiales', 'https://script.google.com/macros/s/AKfycbxBGZBe-1RQSm7bDywQRrVu6pfUoK39FtpV1kZ68ZSv6BosmcmC-DSefGYQlhXUWgnK/exec', ['vuelo', 'aerolinea', 'oficial', 'status', 'pea_ini', 'ata', 'inicio','fin', 'obs', 'sta', 'std_1']);
}

fetchDataAndInsert();
setInterval(fetchDataAndInsert, 60000);

// Resto del código...

app.get('/', async (req, res) => {
  try {
    const query = `
    SELECT i.cod_ae, i.aer, i.orig, i.v_arr, i.ato, i.v_dep, 
      i.sta, i.stdd, i.dest, a.pea_ini AS pea_a,
      a.pri_bag, a.ul_bag, a.cie, a.obs AS obs_a, a.res_adu, e.ho_ini, 
      e.ho_fin, e.obs AS obs_e, e.res_evacab, e.cal_pun, e.cal_pre,
      e.cal_act, e.cal_mat, e.cal_res, e.tip_lim, e.obs_cli,
      e.coo, e.toi, e.gal, e.asp, e.cab_pax, e.ata_pre, o.aerolinea, 
      o.oficial, o.status, o.pea_ini AS pea_o, o.ata, o.inicio,
      o.fin, o.obs AS obs_o, o.std_1
      FROM itinera i
      LEFT JOIN aduan a ON a.vuelo = i.vuelo
      LEFT JOIN evacab e ON i.vuelo = e.vuelo
      LEFT JOIN oficiales o ON i.vuelo = o.vuelo
      WHERE
      i.sta >= NOW() - INTERVAL '12 hours'
      AND i.sta <= NOW() + INTERVAL '12 hours'
      ORDER BY i.sta ASC
      `;
    const result = await pool.query(query);
    const rows = result.rows;

    res.render('index', { data: rows });
  } catch (error) {
    console.error('NO SALE PS:', error);
    res.status(500).send('NO SALE PS 2');
  }
});

app.get('/data', async (req, res) => {
  try {
    const query = `
    SELECT i.cod_ae, i.aer, i.orig, i.v_arr, i.ato, i.v_dep, 
      i.sta, i.stdd, i.dest, a.pea_ini AS pea_a,
      a.pri_bag, a.ul_bag, a.cie, a.obs AS obs_a, a.res_adu, e.ho_ini, 
      e.ho_fin, e.obs AS obs_e, e.res_evacab, e.cal_pun, e.cal_pre,
      e.cal_act, e.cal_mat, e.cal_res, e.tip_lim, e.obs_cli,
      e.coo, e.toi, e.gal, e.asp, e.cab_pax, e.ata_pre, o.aerolinea, 
      o.oficial, o.status, o.pea_ini AS pea_o, o.ata, o.inicio,
      o.fin, o.obs AS obs_o, o.std_1
      FROM itinera i
      LEFT JOIN aduan a ON a.vuelo = i.vuelo
      LEFT JOIN evacab e ON i.vuelo = e.vuelo
      LEFT JOIN oficiales o ON i.vuelo = o.vuelo
      WHERE
      i.sta >= NOW() - INTERVAL '12 hours'
      AND i.sta <= NOW() + INTERVAL '12 hours'
      ORDER BY i.sta ASC
      `;
    const result = await pool.query(query);
    const rows = result.rows;

    res.json({ data: rows });
  } catch (error) {
    console.error('NO SALE PS 3:', error);
    res.status(500).send('NO SALE PS 4');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
