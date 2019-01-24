// Importamos los paquetes
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var guid = require('guid');

// Creamos la app express
var app = express();

// Configuramos la app
//app.use(morgan('dev')); // log requests a la console

// Se configura body parsers
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



// MODELO DE DATOS
var osos = [{
    nombre: "Pardo",
    cantidad: 450000,
    id: guid.raw()
}, {
    nombre: "Panda",
    cantidad: 10000,
    id: guid.raw()
}, {
    nombre: "Greasly",
    cantidad: 125000,
    id: guid.raw()
}, {
    nombre: "Circo",
    cantidad: 5000,
    id: guid.raw()
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
        var oso = {
            nombre: req.body.nombre,
            cantidad: req.body.cantidad,
            id: guid.raw()
        };

        osos.push(oso);
        res.json({
            mensaje: 'Oso agregado!',
            data: oso
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
        var oso = osos.filter(x => x.id == req.params.oso_id);
        if (oso === null || oso === undefined || oso === [])
            res.status(404).send({
                mensaje: "No existe el oso con id: " + req.params.oso_id
            });
        res.json(oso[0]);
    })

    // actualizar el oso con este id
    .put(function (req, res) {
        var oso = osos.filter(x => x.id == req.params.oso_id);
        if (oso === null || oso === undefined || oso === []) {
            res.status(404).send({
                message: "No existe el oso con id: " + req.params.oso_id
            });
        }
        oso = oso[0];
        oso.nombre = req.body.nombre || oso.nombre;
        oso.cantidad = req.body.cantidad || oso.cantidad;
        res.json({
            message: 'Oso actualizado!',
            data: oso
        });
    })
    .delete(function (req, res) {
        var oso = osos.filter(x => x.id == req.params.oso_id);
        if (oso !== null && oso !== undefined && oso !== []) {
            oso = oso[0];
            var index = osos.indexOf(oso);
            if (index > -1) {
                osos.splice(index, 1);
            }
        }
        res.send({
            message: "El oso fue eliminado"
        });
    });


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

module.exports = {
    app: app
};