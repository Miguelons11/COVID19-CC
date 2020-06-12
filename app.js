const createError = require('http-errors');
const express = require('express');
const path = require('path');
//const cookieParser = require('cookie-parser');
const logger = require('morgan');
//const favicon = require('serve-favicon');
const cors = require('cors');

//require('./models/db');


//const apiRouter = require('./routes/index');

var app = express();
app.use(express.static('public'));
//app.use("/",apiRouter)

app.use(cors());
app.options('*', cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//configurando el servidor
var server = app.listen(process.env.PORT || 4000, function () {
  var port = server.address().port;
  console.log("aplicación corriendo en el puerto", port);
});



const { BigQuery } = require('@google-cloud/bigquery');




//GET API

app.get("/covid/:locationid", async function (req, res) {

  console.log(req.params.locationid);
});



app.get("/covid/country/:country", async function (req, res) {
  const bigqueryClient = new BigQuery();
  res.header('Access-Control-Allow-Origin', '*');
  // The SQL query to run
  const sqlQuery = `SELECT SUM (confirmed) AS confirmed, SUM (deaths) AS deaths, country_region AS country, date, 46754783 as population, SUM (recovered) AS recovered
        FROM \`bigquery-public-data.covid19_jhu_csse.summary\`
        WHERE
            country_region = "Spain"
            AND date <= DATE_SUB(CURRENT_DATE("-06"), INTERVAL 1 DAY)
            GROUP BY country, date
            ORDER BY date ASC;`


  console.log(sqlQuery);
  const options = {
    query: sqlQuery,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
  };

  // Run the query
  const [rows] = await bigqueryClient.query(options);

  //console.log('Casos:');
  //rows.forEach(row => console.log(row));
  console.log(rows);

  res.status(200).json(rows);
});



app.get("/covid/confirmed/:country", async function (req, res) {
  const bigqueryClient = new BigQuery();
  res.header('Access-Control-Allow-Origin', '*');
  // The SQL query to run
  const sqlQuery = `SELECT
        SUM (confirmed) AS confirmed
      FROM \`bigquery-public-data.covid19_jhu_csse.summary\`
      WHERE
        country_region = "Spain"
        and date =  DATE_SUB(CURRENT_DATE("-06"), INTERVAL 1 DAY);`

  const options = {
    query: sqlQuery,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
  };

  // Run the query
  const [rows] = await bigqueryClient.query(options);

  //console.log('Casos:');
  //rows.forEach(row => console.log(row));
  res.status(200).json(rows);
});



app.get("/covid/recovered/:country", async function (req, res) {
  // Create a client
  const bigqueryClient = new BigQuery();
  res.header('Access-Control-Allow-Origin', '*');
  // The SQL query to run
  const sqlQuery = `SELECT
    SUM (recovered) AS recovered
  FROM \`bigquery-public-data.covid19_jhu_csse.summary\`
  WHERE
    country_region = "Spain"
    and date =  DATE_SUB(CURRENT_DATE("-06"), INTERVAL 1 DAY);`

  const options = {
    query: sqlQuery,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
  };

  // Run the query
  const [rows] = await bigqueryClient.query(options);

  //console.log('Casos:');
  //rows.forEach(row => console.log(row));
  res.status(200).json(rows);
});



app.get("/covid/death/:country", async function (req, res) {
  // Create a client
  const bigqueryClient = new BigQuery();
  res.header('Access-Control-Allow-Origin', '*');
  // The SQL query to run
  const sqlQuery = `SELECT
      SUM (deaths) AS deaths
    FROM \`bigquery-public-data.covid19_jhu_csse.summary\`
    WHERE
      country_region = "Spain"
      and date =  DATE_SUB(CURRENT_DATE("-06"), INTERVAL 1 DAY);`

  const options = {
    query: sqlQuery,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
  };

  // Run the query
  const [rows] = await bigqueryClient.query(options);

  //console.log('Casos:');
  //rows.forEach(row => console.log(row));
  res.status(200).json(rows);
});



app.get("/covid/summary/:country", async function (req, res) {
  // Create a client
  const bigqueryClient = new BigQuery();
  res.header('Access-Control-Allow-Origin', '*');
  // The SQL query to run
  const sqlQuery = `SELECT SUM (confirmed) AS confirmed, SUM (deaths) AS deaths, country_region AS country, date, 46754783 as population, SUM (recovered) AS recovered
        FROM \`bigquery-public-data.covid19_jhu_csse.summary\`
        WHERE
            country_region = "Spain"
            AND date <= DATE_SUB(CURRENT_DATE("-06"), INTERVAL 1 DAY)
            GROUP BY country, date
            ORDER BY date ASC;`

  const options = {
    query: sqlQuery,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
  };

  // Run the query
  const [rows] = await bigqueryClient.query(options);

  //console.log('Casos:');
  //rows.forEach(row => console.log(row));
  res.status(200).json(rows);
});



app.get("/covidsummary/summaryGlobal", async function (req, res) {
  // Create a client
  const bigqueryClient = new BigQuery();
  res.header('Access-Control-Allow-Origin', '*');
  // The SQL query to run
  const sqlQuery = `SELECT SUM (jh.deaths) AS deaths, jh.country_region as country, jh.date as date, cn.alpha_2_code as country_iso2s
  FROM \`bigquery-public-data.covid19_jhu_csse.summary\` jh
  LEFT JOIN \`bigquery-public-data.utility_us.country_code_iso\` cn ON cn.country_name = jh.country_region
  WHERE
      date =  DATE_SUB(CURRENT_DATE("-06"), INTERVAL 1 DAY)
      GROUP BY country, date, country_iso2s;`

  const options = {
    query: sqlQuery,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
  };

  // Run the query
  const [rows] = await bigqueryClient.query(options);

  //console.log('Casos:');
  //rows.forEach(row => console.log(row));
  res.status(200).json(rows);
});



app.get("/covid/global/deaths", async function (req, res) {
  // Create a client
  const bigqueryClient = new BigQuery();
  res.header('Access-Control-Allow-Origin', '*');
  // The SQL query to run
  const sqlQuery = `SELECT SUM (deaths) AS deaths
        FROM \`bigquery-public-data.covid19_jhu_csse.summary\`
        WHERE
        date =  DATE_SUB(CURRENT_DATE("-06"), INTERVAL 1 DAY);`

  const options = {
    query: sqlQuery,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
  };

  // Run the query
  const [rows] = await bigqueryClient.query(options);

  //console.log('Casos:');
  //rows.forEach(row => console.log(row));
  res.status(200).json(rows);
});



app.get("/covid/global/recovered", async function (req, res) {
  // Create a client
  const bigqueryClient = new BigQuery();
  res.header('Access-Control-Allow-Origin', '*');
  // The SQL query to run
  const sqlQuery = `SELECT SUM (recovered) AS recovered
        FROM \`bigquery-public-data.covid19_jhu_csse.summary\`
        WHERE
        date =  DATE_SUB(CURRENT_DATE("-06"), INTERVAL 1 DAY);`

  const options = {
    query: sqlQuery,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
  };

  // Run the query
  const [rows] = await bigqueryClient.query(options);

  //console.log('Casos:');
  //rows.forEach(row => console.log(row));
  res.status(200).json(rows);
});

app.get("/covid/global/confirmed", async function (req, res) {
  // Create a client
  const bigqueryClient = new BigQuery();
  res.header('Access-Control-Allow-Origin', '*');
  // The SQL query to run
  const sqlQuery = `SELECT SUM (confirmed) AS confirmed
        FROM \`bigquery-public-data.covid19_jhu_csse.summary\`
        WHERE
        date =  DATE_SUB(CURRENT_DATE("-06"), INTERVAL 1 DAY);`

  const options = {
    query: sqlQuery,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
  };

  // Run the query
  const [rows] = await bigqueryClient.query(options);

  //console.log('Casos:');
  //rows.forEach(row => console.log(row));
  res.status(200).json(rows);
});


