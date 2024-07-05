const express = require("express");
const case_files = express.Router();
const {getAllCountries} = require("../queries/countries")
const {addCaseFile} = require("../queries/caseFiles")
const URL = import.meta.env.VITE_BASE_URL
const key = import.meta.env.VITE_API_KEY

function getFormattedDate(){
    const currentDate = new Date()
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
    const day = currentDate.getDate();

    // Function to ensure two digits for month and day
    const formatTwoDigits = (num) => (num < 10 ? '0' + num : num);

    const formattedDate = `${year}-${formatTwoDigits(month)}-${formatTwoDigits(day)}`   
}

const currentDate = getFormattedDate()

// http://localhost:3003/api/case_files
case_files.post("/", async (req, res) => {
    const allCountries = await getAllCountries();
    if (!allCountries[0]) {
        res.status(500).json({ error: "Error fetching countries" })
    } 
    const allNewCaseFiles = []
    for(let country of allCountries){
        const { id, code, name } = country
        // fetch
        // `${URL}?source-country=${code}&date=2024-05-29`
        const response = await fetch(`${URL}?source-country=${code}&date=${currentDate}`, {
            method: 'GET',
            headers: {
                'x-api-key': key
            }
        })
        if (!response[0]) {
            res.status(500).json({ error: "Error fetching articles by country code" })
        } 
        const articlesWithCountryId = response.map((article) => ({...article, countries_id: id}))
        const newCaseFiles = await articlesWithCountryId.json();
        if(newCaseFiles[0]){
            allNewCaseFiles.concat(newCaseFiles)
        } else {
            res.status(500).json({ error: "No articles found for country code and date" })
        }
    }

    for(let newFile of allNewCaseFiles){
        
        const addedCaseFile = await addCaseFile({
            countries_id: newFile.countries_id,
            article_content: newFile.text,
            article_title: newFile.title, 
            publish_date: newFile.publish_date,
        })
        if (!addedCaseFile.id) {
          res.status(500).json({ error: "Error fetching user stats" });
        }
    }

  });

//   Table case_files {
//     id SERIAL [primary key]
//     countries_id INTEGER
//     article_content VARCHAR(800)
//     article_title VARCHAR(100)
//     publish_date DATE

//   }
    
  
module.exports = case_files;