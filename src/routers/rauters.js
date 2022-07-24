const express = require('express');
const routers = express.Router();
const investimentosRoutes = require('../controllers/investimentosController');
const ativosRoutes = require('../controllers/ativosController');
const contaRoutes = require('../controllers/contaController')
const errorMiddleware = require('../middlewares/errorMiddleware');

routers.use('/investimentos', investimentosRoutes);
routers.use('/ativos', ativosRoutes);
routers.use('/conta', contaRoutes);

routers.use(errorMiddleware);
module.exports = routers; 