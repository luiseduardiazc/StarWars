const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");


const { starWarsFilms } = require("./services")

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/static', express.static('public'));

app.get('/', async (req, res) => {
    console.log('Processing Data .....')
    starWarsFilms('https://swapi.dev/api/films/').then((films)=> {
        console.log(JSON.stringify(films))
    })
    res.status(200).send('Processing Data ... please check your Node.js Console in a few minutes')
})

const PORT = 3000
app.set("port", PORT);

app.listen(app.get("port"), () => {
    console.log(`Server Runing http://localhost:${PORT}`);
});