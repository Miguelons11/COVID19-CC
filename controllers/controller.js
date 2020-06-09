/*const mongoose = require('mongoose');
const modelo = mongoose.model('Model');
const modelosummary = mongoose.model('ModelSummary');
const modelometadata = mongoose.model('ModelMetaData');

const moment = require('moment');
const sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
  };
  


  const readOne = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    modelo
    .find({_id: req.params.locationid})
    .exec((err, location) => {
      console.log(location);
      if (location.length == 0) {
        return res
          .status(404)
          .json({
            "message": "country not found" });
          } else if (err) {
            return res
                .status(404)
                .json(err);
          }
      res
        .status(200)
        .json(location);
    });
  };

  const readCountryConfirmed = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    modelosummary
    .find({country: req.params.country})
    .exec((err, location) => {
      if (location.length == 0) {
        return res
          .status(404)
          .json({
            "message": "country not found" });
          }
      res
        .status(200)
        .json({"confirmed" : location[location.length-1].confirmed});        

    });
  };

  const readCountryDeath = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    modelosummary
    .find({country: req.params.country})
    .exec((err, location) => {
      if (location.length == 0) {
        return res
          .status(404)
          .json({
            "message": "Country not found" });
          } else if (err) {
            return res
                .status(404)
                .json(err);
          }
      res
        .status(200)
        .json({"deaths" : location[location.length-1].deaths});        

    });
  };

  const readCountryRecovered = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    modelosummary
    .find({country: req.params.country})
    .exec((err, location) => {
      if (!location) {
        return res
          .status(404)
          .json({
            "message": "Country not found" });
          } else if (err) {
            return res
                .status(404)
                .json(err);
          }
      res
        .status(200)
        .json({"recovered" : location[location.length-1].recovered});        

    });
  };

  const readCountry = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    modelosummary
    .find({country: req.params.country})
    .exec((err, location) => {
      if (!location) {
        return res
          .status(404)
          .json({
            "message": "Country not found" });
          } else if (err) {
            return res
                .status(404)
                .json(err);
          }
      res
        .status(200)
        .json(location);        

    });
  };

  const readSummaryCountry = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    modelosummary
    .find({country: req.params.country})
    .exec((err, location) => {
      if (!location) {
        return res
          .status(404)
          .json({
            "message": "location not found" });
          } else if (err) {
            return res
                .status(404)
                .json(err);
          }
      res
        .status(200)
        .json(location);
    });
  };

  

  const readGlobalDeaths = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    modelometadata
      .find({})
      .exec((err, metadata) => {
        if (!metadata) {
          return res
            .status(404)
            .json({
              "message": "No hay datos"
            });
        } else if (err) {
          return res
            .status(404)
            .json(err);
        }
        console.log(metadata[0].last_date);
        modelosummary.
        find({
            date: metadata[0].last_date
          })
          .exec((err, summary) => {
            if (!summary) {
              return res
                .status(404)
                .json({
                  "message": "location not found"
                });
            } else if (err) {
              return res
                .status(404)
                .json(err);
            }
            var muertos = summary.reduce(function(suma,elemento){
              return suma + elemento.deaths;
            },0);
            res
              .status(200)
              .json({"deaths" : muertos});
  
          });
      });
  };

  const readGlobalConfirmed = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    modelometadata
      .find({})
      .exec((err, metadata) => {
        if (!metadata) {
          return res
            .status(404)
            .json({
              "message": "No hay datos"
            });
        } else if (err) {
          return res
            .status(404)
            .json(err);
        }
        console.log(metadata[0].last_date);
        modelosummary.
        find({
            date: metadata[0].last_date
          })
          .exec((err, summary) => {
            if (!summary) {
              return res
                .status(404)
                .json({
                  "message": "location not found"
                });
            } else if (err) {
              return res
                .status(404)
                .json(err);
            }
            var infectados = summary.reduce(function(suma,elemento){
              return suma + elemento.confirmed;
            },0);
            res
              .status(200)
              .json({"confirmed" : infectados});
  
          });
      });
  };


  const readGlobalRecovered = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    modelometadata
      .find({})
      .exec((err, metadata) => {
        if (!metadata) {
          return res
            .status(404)
            .json({
              "message": "No hay datos"
            });
        } else if (err) {
          return res
            .status(404)
            .json(err);
        }
        console.log(metadata[0].last_date);
        modelosummary.
        find({
            date: metadata[0].last_date
          })
          .exec((err, summary) => {
            if (!summary) {
              return res
                .status(404)
                .json({
                  "message": "location not found"
                });
            } else if (err) {
              return res
                .status(404)
                .json(err);
            }
            var recuperados = summary.reduce(function(suma,elemento){
              return suma + elemento.recovered;
            },0);
            res
              .status(200)
              .json({"recovered" : recuperados});
  
          });
      });
  };

  const readGlobalSummary = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    modelometadata
      .find({})
      .exec((err, metadata) => {
        if (!metadata) {
          return res
            .status(404)
            .json({
              "message": "No hay datos"
            });
        } else if (err) {
          return res
            .status(404)
            .json(err);
        }
        console.log(metadata[0].last_date);
        modelosummary.
        find({
            date: metadata[0].last_date
          })
          .exec((err, summary) => {
            if (!summary) {
              return res
                .status(404)
                .json({
                  "message": "location not found"
                });
            } else if (err) {
              return res
                .status(404)
                .json(err);
            }
            res
              .status(200)
              .json(summary);
  
          });
      });
  };*/

// Import the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');

async function readCountry() {
// Queries a public Shakespeare dataset.

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
  params: {corpus: 'romeoandjuliet', min_word_count: 250},
  };

  // Run the query
  const [rows] = await bigqueryClient.query(options);

  //console.log('Casos:');
  //rows.forEach(row => console.log(row));
  return rows;
}




async function readOne() {
  // Queries a public Shakespeare dataset.
  
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
    params: {corpus: 'romeoandjuliet', min_word_count: 250},
    };
  
    // Run the query
    const [rows] = await bigqueryClient.query(options);
  
    //console.log('Casos:');
    //rows.forEach(row => console.log(row));
    return rows;
  }




async function readCountryConfirmed() {
// Queries a public Shakespeare dataset.

  // Create a client
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
  params: {corpus: 'romeoandjuliet', min_word_count: 250},
  };

  // Run the query
  const [rows] = await bigqueryClient.query(options);

  //console.log('Casos:');
  //rows.forEach(row => console.log(row));
  return rows;
}




async function readCountryDeath() {
// Queries a public Shakespeare dataset.

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
  params: {corpus: 'romeoandjuliet', min_word_count: 250},
  };

  // Run the query
  const [rows] = await bigqueryClient.query(options);

  //console.log('Casos:');
  //rows.forEach(row => console.log(row));
  return rows;
}




async function readCountryRecovered() {
// Queries a public Shakespeare dataset.

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
  params: {corpus: 'romeoandjuliet', min_word_count: 250},
  };

  // Run the query
  const [rows] = await bigqueryClient.query(options);

  //console.log('Casos:');
  //rows.forEach(row => console.log(row));
  return rows;
}




async function readSummaryCountry() {
// Queries a public Shakespeare dataset.

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
  params: {corpus: 'romeoandjuliet', min_word_count: 250},
  };

  // Run the query
  const [rows] = await bigqueryClient.query(options);

  //console.log('Casos:');
  //rows.forEach(row => console.log(row));
  return rows;
}


async function readGlobalSummary() {
// Queries a public Shakespeare dataset.

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
  params: {corpus: 'romeoandjuliet', min_word_count: 250},
  };

  // Run the query
  const [rows] = await bigqueryClient.query(options);

  //console.log('Casos:');
  //rows.forEach(row => console.log(row));
  return rows;
}


async function readGlobalConfirmed() {
// Queries a public Shakespeare dataset.

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
  params: {corpus: 'romeoandjuliet', min_word_count: 250},
  };

  // Run the query
  const [rows] = await bigqueryClient.query(options);

  //console.log('Casos:');
  //rows.forEach(row => console.log(row));
  return rows;
}



async function readGlobalDeaths() {
// Queries a public Shakespeare dataset.

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
  params: {corpus: 'romeoandjuliet', min_word_count: 250},
  };

  // Run the query
  const [rows] = await bigqueryClient.query(options);

  //console.log('Casos:');
  //rows.forEach(row => console.log(row));
  return rows;
}



async function readGlobalRecovered() {
// Queries a public Shakespeare dataset.

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
  params: {corpus: 'romeoandjuliet', min_word_count: 250},
  };

  // Run the query
  const [rows] = await bigqueryClient.query(options);

  //console.log('Casos:');
  //rows.forEach(row => console.log(row));
  return rows;
}

module.exports = {
  readOne,
  readCountry,
  readCountryConfirmed,
  readCountryDeath,
  readCountryRecovered,
  readSummaryCountry,
  readGlobalSummary,
  readGlobalConfirmed,
  readGlobalDeaths,
  readGlobalRecovered
};