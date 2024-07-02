const express = require('express')
const countries = express.Router()

const {getAllCountries, getCaseFilesByCountry} = require("../queries/countries")

//INDEX http://localhost:3003/api/countries
countries.get('/', async (req,res) => {
    const allCountries = await getAllCountries();

    if(allCountries[0]){
        res.status(200).json(allCountries);
    } else {
        res.status(500).json({ error: "Error fetching Countries"})
    }
});


//CASE FILES INDEX http://localhost:3003/api/countries/1/case_files
countries.get('/:countries_id/case_files', async (req,res) => {
    const { countries_id } = req.params
    const allCaseFilesByCountry = await getCaseFilesByCountry(countries_id);

    if(allCaseFilesByCountry[0]){
        res.status(200).json(allCaseFilesByCountry);
    } else {
        res.status(500).json({ error: "Error fetching case files"})
    }
});

module.exports = countries