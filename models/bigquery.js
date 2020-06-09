
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
  console.log(rows);
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
    console.log(rows);
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
  console.log(rows);
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
  console.log(rows);
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
  console.log(rows);
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
  console.log(rows);
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
  console.log(rows);
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
  console.log(rows);
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
  console.log(rows);
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
  console.log(rows);
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
