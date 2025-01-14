const express = require('express');
const app = express();

const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://carlosdiazgirol.github.io/dashboard/';

// la librería axios funciona de la misma forma que el fetch
// nos traemos el html de la página con axios y accedemos a partes
// concretas de la misma con cheerio.
// lo que vamos a hacer es recorrer el DOC, y eso lo guardamos en la variable $
app.get('/', (req, res) => {
    axios.get(url).then((response) => {
        if(response.status === 200) {
            const html = response.data; //console.log(html);

            const $ = cheerio.load(html);

            const pageTitle = $('title').text(); // console.log(pageTitle);
            
            const links = [];
            const imgs = [];

            $('a').each((index, element) => {
                const link = $(element).attr('href');
                links.push(link);
            })
            // console.log(links);

            $('img').each((index, element) => {
                const img = $(element).attr('src');
                imgs.push(img);
            })

            res.send(`
                <h1>${pageTitle}</h1>
                <h2>Enlaces</h2>
                <ul>
                    ${links.map(link => `<li><a href= "${url}${link}">${link}</li>`).join('')};
                </ul>
                <h2>Imágenes</h2>
                <ul>
                    ${imgs.map(img => `<li><a href= "${url}${img}">${img}</li>`).join('')};
                </ul>
                `);
        }
    }) 
})

app.listen(3000, () => {
    console.log('Express está escuchando en el puerto http://localhost:3000');
})