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
var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("aplicación corriendo en el puerto", port);
  });
  


  const {BigQuery} = require('@google-cloud/bigquery');
  

  
  
  //GET API
  
  app.get("/covid/:locationid",async function(req , res){
  
    console.log(req.params.locationid);
  });
  
  
  
  app.get("/covid/country/:country",async function(req , res){
      const bigqueryClient = new BigQuery();
  
    // The SQL query to run
    const sqlQuery = `SELECT SUM (confirmed) AS confirmed, SUM (deaths) AS deaths, country_region AS country, date, 46754783 as population, SUM (recovered) AS recovered
        FROM \`bigquery-public-data.covid19_jhu_csse.summary\`
        WHERE
            country_region = "Spain"
            AND date <= CURRENT_DATE()
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
    return rows;
    });
    
  
  
  app.get("/covid/confirmed/:country", async function(){
      const bigqueryClient = new BigQuery();
  
    // The SQL query to run
    const sqlQuery = `SELECT SUM (confirmed) AS confirmed, country_region AS country, date, 46754783 as population
        FROM \`bigquery-public-data.covid19_jhu_csse.summary\`
        WHERE
            country_region = "Spain"
            AND date <= CURRENT_DATE()
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
    return rows;
  });
  
  
  
  app.get("/covid/recovered/:country", async function(){
      // Create a client
    const bigqueryClient = new BigQuery();
  
    // The SQL query to run
    const sqlQuery = `country_region AS country, date, 46754783 as population, SUM (recovered) AS recovered
        FROM \`bigquery-public-data.covid19_jhu_csse.summary\`
        WHERE
            country_region = "Spain"
            AND date <= CURRENT_DATE()
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
    return rows;
  });
  
  
  
  app.get("/covid/death/:country", async function(){
      // Create a client
      const bigqueryClient = new BigQuery();
  
      // The SQL query to run
      const sqlQuery = `SUM (deaths) AS deaths, country_region AS country, date, 46754783 as population
          FROM \`bigquery-public-data.covid19_jhu_csse.summary\`
          WHERE
              country_region = "Spain"
              AND date <= CURRENT_DATE()
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
      return rows;
  });
  
  
  
  app.get("/covid/summary/:country", async function(){
      // Create a client
    const bigqueryClient = new BigQuery();
  
    // The SQL query to run
    const sqlQuery = `SELECT SUM (confirmed) AS confirmed, SUM (deaths) AS deaths, country_region AS country, date, 46754783 as population, SUM (recovered) AS recovered
        FROM \`bigquery-public-data.covid19_jhu_csse.summary\`
        WHERE
            country_region = "Spain"
            AND date <= CURRENT_DATE()
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
    return rows;
  });
  
  
  
  app.get("/covidsummary/summaryGlobal",async function(){
      // Create a client
    const bigqueryClient = new BigQuery();
  
    // The SQL query to run
    const sqlQuery = `SELECT SUM (confirmed) AS confirmed, SUM (deaths) AS deaths, country_region AS country, date, SUM (recovered) AS recovered, 
        FROM \`bigquery-public-data.covid19_jhu_csse.summary\`
        WHERE
            date =  DATE_SUB(CURRENT_DATE, INTERVAL 1 DAY)
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
    return rows;
  });
  
  
  
  app.get("/covid/global/deaths",async function(){
      // Create a client
    const bigqueryClient = new BigQuery();
  
    // The SQL query to run
    const sqlQuery = `SUM (deaths) AS deaths
        FROM \`bigquery-public-data.covid19_jhu_csse.summary\`
        WHERE
            date <= CURRENT_DATE();`
  
    const options = {
    query: sqlQuery,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
    };
  
    // Run the query
    const [rows] = await bigqueryClient.query(options);
  
    //console.log('Casos:');
    //rows.forEach(row => console.log(row));
    return rows;
  });
  
  
  
  app.get("/covid/global/recovered",async function(){
      // Create a client
    const bigqueryClient = new BigQuery();
  
    // The SQL query to run
    const sqlQuery = `SUM (recovered) AS recovered
        FROM \`bigquery-public-data.covid19_jhu_csse.summary\`
        WHERE
            date <= CURRENT_DATE();`
  
    const options = {
    query: sqlQuery,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
    };
  
    // Run the query
    const [rows] = await bigqueryClient.query(options);
  
    //console.log('Casos:');
    //rows.forEach(row => console.log(row));
    return rows;
  });
  
  app.get("/covid/global/confirmed",async function(){
      // Create a client
    const bigqueryClient = new BigQuery();
  
    // The SQL query to run
    const sqlQuery = `SELECT SUM (confirmed) AS confirmed
        FROM \`bigquery-public-data.covid19_jhu_csse.summary\`
        WHERE
            date <= CURRENT_DATE();`
  
    const options = {
    query: sqlQuery,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
    };
  
    // Run the query
    const [rows] = await bigqueryClient.query(options);
  
    //console.log('Casos:');
    //rows.forEach(row => console.log(row));
    return rows;
    console.log(rows);
  });
  
  
