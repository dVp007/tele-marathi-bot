/**
 * Module is used to Scrap news from 'https://www.lokmat.com/latestnews/page/4/'
 */
const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://www.lokmat.com/latestnews/page/4/'

axios.get(url)
    .then(response=>{
        const content = cheerio.load(response.data)
        
        console.log();
    })
    .catch( error =>{
        console.log(error)
    })