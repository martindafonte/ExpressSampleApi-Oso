// Importamos los paquetes
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

// Creamos la app express
var router = new express.Router();

// Configuramos la app
router.use(morgan('dev')); // log requests a la console

// Se configura body parsers
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());



// MODELO DE DATOS
var osos = [{
    nombre: "Pardo",
    cantidad: 450000
}, {
    nombre: "Panda",
    cantidad: 10000
}, {
    nombre: "Greasly",
    cantidad: 125000
}, {
    nombre: "Circo",
    cantidad: 5000
}];

// RUTAS DE LA API
// =============================================================================

// Router
var router = express.Router();

// middleware para todas las request de un router
router.use(function (req, res, next) {
    console.log('Invocación a url: ' + req.url);
    next();
});

// GET http://localhost:8080/api
router.get('/', function (req, res) {
    res.json({
        message: 'Primer invocación de nuestra API'
    });
});




// Rutas bajo /osos
// ----------------------------------------------------
router.route('/osos')

    // crear un oso (POST http://localhost:8080/api/osos)
    .post(function (req, res) {
        console.log('Se recibieron los parámetros:', req.body);
        if (req.body.nombre == null || req.body.cantidad == null) {
            res.status(422).send("Se debe incluir un nombre y cantidad para crear un oso");
        }
        var oso = {
            nombre: req.body.nombre,
            cantidad: req.body.cantidad
        };

        osos.push(oso);
        res.json({
            mensaje: 'Oso agregado!'
        });
    })

    // lista los osos (GET http://localhost:8080/api/osos)
    .get(function (req, res) {
        res.json(osos);
    });

// rutas del tipo /osos/:oso_id
// ----------------------------------------------------
router.route('/osos/:oso_id')

    // devuelve un oso en particular
    .get(function (req, res) {
        var oso = osos[+(req.params.oso_id)];
        if (oso === null || oso === undefined)
            res.status(404).send({
                mensaje: "No existe el oso con id: " + req.params.oso_id
            });
        res.json(oso);
    })

    // actualizar el oso con este id
    .put(function (req, res) {
        var oso = osos[+(req.params.oso_id)];
        if (oso === null || oso === undefined) {
            res.status(404).send({
                message: "No existe el oso con id: " + req.params.oso_id
            });
        }
        oso.nombre = req.body.nombre || oso.nombre;
        oso.cantidad = req.body.cantidad || oso.cantidad;
        res.json({
            message: 'Oso actualizado!'
        });
    });



module.exports = {
    router: router
};