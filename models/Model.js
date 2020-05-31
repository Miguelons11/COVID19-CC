const mongoose = require('mongoose');

const model = new mongoose.Schema({
    uid: String,
    country_iso2: String,
    country_iso3 : String,
    country_code : Number,
    state : String,
    country : String,
    combined_name : String,
    population : Number,
    loc : {
        type: String,
        coordinates: [Number]
    },
    date : Date,
    confirmed : Number,
    deaths : Number,
    recovered : Number
});


const modelMetadata = new mongoose.Schema({
    _id: String,
    countries: [String],
    states : [String],
    states_us : [String],
    counties : [String],
    iso3s : [String],
    uids : [Number],
    population : Number,
    first_date : Date,
    last_date : Date
});
mongoose.model('Model', model,"global");
mongoose.model('ModelSummary', model,"countries_summary");
mongoose.model('ModelMetaData', modelMetadata,"metadata");
