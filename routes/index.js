/*const express = require('express');
const router = express.Router();
const controlador = require('../controllers/controller');

// Locations 
router.get('/covid/:locationid', controlador.readOne);
router.get('/covid/country/:country', controlador.readCountry);
router.get('/covid/confirmed/:country', controlador.readCountryConfirmed);
router.get('/covid/recovered/:country', controlador.readCountryRecovered);
router.get('/covid/death/:country', controlador.readCountryDeath);
router.get('/covid/summary/:country', controlador.readSummaryCountry);
router.get('/covidsummary/summaryGlobal', controlador.readGlobalSummary);
router.get('/covid/global/deaths', controlador.readGlobalDeaths);
router.get('/covid/global/recovered', controlador.readGlobalRecovered);
router.get('/covid/global/confirmed', controlador.readGlobalConfirmed);

module.exports = router;*/

const express = require('express');
const router = express.Router();
const controlador = require('../controllers/controller');
const {BigQuery} = require('@google-cloud/bigquery');

//Función para conectarse a la base de datos y ejecutar la consulta
/*var executeProcedure = function(res, query){            
    conn.connect().then(function(){
        var request = new sql.Request(conn);
        request.execute(query, (err, result) => {
          // ... error checks
          if(err){
            res.status(404).json(err);
          }else{ 
            console.log(result);
            if(result.recordset.length == 0){
              res.status(404).json({"message" : "No hay resultados"});
            }else{
              res.status(200).json(result.recordsets); // first recordset from result.recordsets
            }
          }
      });
    })
    .catch(function(err){
        console.log(err);
    });
};*/



//GET API

app.get("/covid/:locationid",rutasProtegidas, function(){

    executeProcedure(res,query,params);
  });



app.get("/covid/country/:country",function(){
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
  


app.get("/covid/confirmed/:country", function(){
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



app.get("/covid/recovered/:country", rutasProtegidas,function(){
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



app.get("/covid/death/:country",rutasProtegidas, function(){
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



app.get("/covid/summary/:country",rutasProtegidas, function(){
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



app.get("/covidsummary/summaryGlobal",rutasProtegidas, function(){
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



app.get("/covid/global/deaths",rutasProtegidas, function(){
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



app.get("/covid/global/recovered",rutasProtegidas, function(){
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

app.get("/covid/global/confirmed",rutasProtegidas, function(){
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


