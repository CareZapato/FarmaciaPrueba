const axios = require('axios');

// only test filter
exports.getLocalsByRegion = async (req, res) => {
	const locals = await axios
		.get('https://farmanet.minsal.cl/maps/index.php/ws/getLocalesRegion', {
			params: {
				id_region: req.params.id_region
			}
		})
		.then((data) => {
			return data.data;
		})
		.catch((error) => {
			return { message: 'error' };
		});

	const filteredData = locals.filter((local) => local.local_id === '534');
	res.json(filteredData);
};

// Function to get Locals to apply filters
// Type: POST
// Body params:
// * fk_region: number id of the region. This param can't be null
// * fk_comuna: commune id that the local is. Can be null
// * local_nombre_ name of the local. Can be null
exports.getLocalsByFilter = async (req, res) => {
	const { fk_comuna, local_nombre, fk_region } = req.body;

	// consume service by WS
	const locales = await axios
		.get('https://farmanet.minsal.cl/maps/index.php/ws/getLocalesRegion', {
			params: {
				id_region: fk_region
			}
		})
		.then((data) => {
			return data.data;
		})
		.catch((error) => {
			return { message: 'error' };
		});

	//add filters from json body to apply on dto service return
	const filteredData = locales.filter((local) => {
		if (fk_comuna != null && local_nombre != null) {
			return local.fk_comuna === fk_comuna && local.local_nombre === local_nombre;
		} else {
			if (fk_comuna != null) {
				return local.fk_comuna === fk_comuna;
			}
			if (local_nombre != null) {
				return local.local_nombre === local_nombre;
			}
			if (fk_comuna == null && local_nombre == null) {
				return true;
			}
		}
	});

	const values = filteredData;
	var response = [];
	console.log('total items: ', values.length);
	for (var i = 0; i < values.length; i++) {
		// dto to fill json response list that fields required
		var jsondto = {
			nombre: values[i].local_nombre,
			direccion: values[i].local_direccion,
			telefono: values[i].local_telefono,
			latitud: values[i].local_lat,
			longitud: values[i].local_lng
		};
		// push dto to list
		response.push(jsondto);
	}
	// return locals dto list
	console.log('send json');
	res.json(response);
};
