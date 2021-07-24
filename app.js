const express = require('express');
const app = express();
const port = 8000
const cors = require('cors');
const controller = require('./src/Controller/Controller');

var corsOptions = {
    origin: "http://localhost:8000"
}

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', controller.showCelular);

app.post('/create', controller.createCelular);

app.get('/:id', controller.findOneCelular);

app.put('/update/:id', controller.updateCelular);

app.delete("/delete/:id", controller.deleteCelular);

app.listen(port, () => {
    console.log(`Server is running: http://localhost:${port}`);
});