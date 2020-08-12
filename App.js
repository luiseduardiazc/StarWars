const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");


const { starWarsData } = require("./services")

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/static', express.static('public'));

app.get('/', async (req, res) => {
    const data = await starWarsData()
    console.log(data)
    res.status(200).json(data)
})

const PORT = 3000
app.set("port", PORT);

app.listen(app.get("port"), () => {
    console.log(`Server Runing http://localhost:${PORT}`);
});