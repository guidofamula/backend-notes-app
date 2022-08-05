// Memuat kode untuk membuat, mengonfigurasi, dan menjalankan server HTTP menggunakan HAPI

// Todo 17 = Import noteRoute
const routes = require('./noteRoutes');

// Todo 1 = panggil module framework hapi
const Hapi = require('@hapi/hapi');

// Todo 2 = membuat fungsi init secara async.
const init = async () => {
	// Todo 3 = Membuat variabel setUpServer dengan memanggil instance Hapi.server
	const setUpServer = Hapi.server({

		// Todo 4 = Memasukan object berupa key dan value
		port: 5000,
		host: 'localhost',
		// Todo 20 = menambahkan CORS (Cross origin resource sharing), agar protokol, host dan number dianggap memiliki origin yang sama
		routes: {
			cors: {
				origin: ['*'],
			},
		},
	});

	// Todo 19 = menambahkan configuration noteRoutes (routes)
	setUpServer.route(routes);


	// Todo 5 = menginisiasi await pada variabel setUpServer terhadap method start()
	await setUpServer.start();
	console.log(`Server berjalan normal pada ${setUpServer.info.uri}`);


};


// Todo 6 = Menjalankan fungsi init dengan argument menyesuaikan keadaan async
init();
