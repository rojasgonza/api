const mongoose = require ('mongoose');
const routes = require("./routes");
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config({path: 'variables.env'})
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
});
 
// crear el servidor
const app = express();

// habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// importar cors permite que un cliente se conecte a otro servidor
//definir dominios para recibir peticiones


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', proccess.env.FRONTEND_URL);
 
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
 
    // Pass to next layer of middleware
    next();
 });






// const whitelist = [process.env.FRONTEND_URL];
// const corsOptions = {
//     origin: (origin, callback) => {
//         console.log(origin)
//         const existe = whitelist.some( dominio => dominio === origin);
//         if(existe){
//             callback(null, true)
//         }else{
//             callback(new Error('No permitido por cors'))
//         }
//     }
// }
// app.use(cors(corsOptions));

//habilitar cors

// Rutas de la app
app.use('/', routes());

// carpeta publica

// puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;
app.listen(port, host, ()=>{
    console.log('el servidor esta funcionando');
});