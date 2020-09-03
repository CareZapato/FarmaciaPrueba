module.exports = (app) => {
	const drugstores = require('../controllers/drugstore.controller.js');

	var router = require('express').Router();

	// Get Locales by Region
	router.get('/:id_region', drugstores.getLocalsByRegion);

	// Get Comunas by Regiones
	//router.get('/getCommune', drugstores.getCommuneByRegion);

	router.post('/getLocalsByFilter', drugstores.getLocalsByFilter);

	app.use('/api/drugstores', router);
};
