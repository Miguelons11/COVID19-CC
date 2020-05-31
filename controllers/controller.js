const mongoose = require('mongoose');
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
  };


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