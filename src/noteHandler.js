// Memuat seluruh fungsi-fungsi handler yang digunakan pada berkas routes
const { nanoid } = require('nanoid');
const notes = require('./notes');

// Todo 9 = Membuat fungsi addNoteHandler untuk membuat handler pada route
const addNoteHandler = (request, h) => {
	// Todo 10 = Inisiasi data title, tags dan body agar diisi pada client, lalu disimpan dalam bentuk JSON melalui body request menggunakan properti request.payload
	const { title, tags, body} = request.payload;

	// Todo 11 = memanggil method nanoid yang didpaat dari library/node_modules yg sudah di install untuk mengenerate id
	const id = nanoid(16);

	// Todo 12 = Membuat variabel createdAt dan updateAt untuk nantinya properti tersebut dapat menambahkan catatan terbaru
	const createdAt = new Date().toISOString();
	const updateAt = createdAt;

	// Todo 12 = Mengelompokkan nilai-nilai untuk dipersiapkan masukkan/push kedalam array notes.
	const newNote = {
		title, tags, body, id, createdAt, updateAt
	};

	// Todo 13 = Memanggil variabel newnote yg sudah dikolompokkan menjadi satu paket untuk dikirim ke array notes
	notes.push(newNote);

	// Todo 14 = Memastikan newNote sudah masuk ke array notes, dengan variabel berikut, memanfaatkan metohd filter.
	const isSuccess = notes.filter((note) => note.id === id).length > 0;

	// Todo 15 = membuat perkondisian isSucces untuk menentukan response yang diberikan server, jika isSucces bernilai true makan response berhasil
	if (isSuccess) {
		const response = h.response({
			status: 'success',
			message: 'catatan berhasil ditambahkan',
			data: {
				noteId: id,
			},
		});
		response.code(201);
		return response;
	}

	const response = h.response({
		status: 'fail',
		message: 'catatan gagal ditambahkan',
	});
	response.code(500);
	return response;

};

// Todo 22 = Membuat fungsi getAllNotesHandler untuk menampilkan data yang sudah client isi ke dalam web
const getAllNotesHandler = () => ({
	status: 'success',
	data: {
		notes,
	},
});

// Todo 26 = Membuat handler untuk route notes{id}
const getNoteByIdHandler = (request, h) => {
	// Todo 27 = didalam fungsi ini harus mengembalikan objek catatan secara spesifik berdasarkan id yg digunakan oleh path parameter
	const { id } = request.params;

	// Todo 28 = setelah mendapatkan nilai id, dapatkan pula objek note dari id tersebut
	const note = notes.filter((n) => n.id === id)[0];

	// Todo 29 = Memastikan objek tidak bernilai undefined, bila undefined kembalikan dengan response gagal
	if (note !== undefined) {
		return {
			status: 'succes',
			data: {
				note,
			},
		};
	}

	const response = h.response({
		status: 'fail',
		message: 'catatan tidak ditemukan',
	});
	response.code(404);
	return response;
};

// Todo 33 = Menambahkan fungsi editNoteByIdHandler sebagai handler untuk konfigurasi PUT pada noteServer.js
const editNoteByIdHandler = (request, h) => {
	// Todo 34 = Fungsi yang diterapkan harus sesuai dengan id yang digunakan pada client/route parameter, oleh sebab itu harus menangkap nilai" id tersebut.
	const { id } = request.params;

	// Todo 35 = Perintah menangkap data notes terbaru setelah user client menyelesaikan edit.
	const { title, tags, body } = request.payload;

	// Todo 36 = Perintah untuk menangkap nilai dari properti terbaru updateAt.
	const updateAt = new Date().toISOString();

	// Todo 37 = Perintah untuk mendapatkan index array pada objek catatan sesuai id yang ditentukan user
	const index = notes.findIndex((note) => note.id === id);

	// Todo 38 = Semua data object, id serta index array sudah ditangkap, terus dilakukan perkondisian if/else
	if (index !== -1) {
		notes[index] = {
			// Todo 39 = Melakukan spread array untuk mencocokkan index array dan mempertahankan nilai notes[index], jika ditemukan/sesuai maka index sesuai untuk dilakukan edit/ditambahkan menjadi catatan baru
			...notes[index],
			title,
			tags,
			body,
			updateAt,
		};

		const response = h.response({
			status: 'success',
			message: 'catatan berhasil diperbarui'
		});
		response.code(200);
		return response;
	}

	const response = h.response({
		status: 'fail',
		message: 'gagal memperbarui catatan, id tidak ditemukan',
	});
	response.code(404);
	return response;
};

// Todo 42 = Membuat fungsi untuk fitur delete yang akan di hubungkan pada konfigurasi route DELETE
const deleteNoteByIdHandler = (request, h) => {
	// Todo 43 = Mendapatkan nilai id yang dikirim melalui parameter request
	const { id } = request.params;
	// Todo 44 = menyesuaikan id dengan objek catatan terupdate
	const index = notes.findIndex((note) => note.id === id);
	// Todo 45 = membuat perintah untuk memastikan nilai index tidak -1, lalu gunakan method array splice() untuk menghapus data.
	if (index !== -1) {
		notes.splice(index, 1);
		const response = h.response({
			status: 'success',
			message: 'catatan berhasil dihapus',
		});
		response.code(200);
		return response;
	}

	const response = h.response({
		status: 'fail',
		message: 'catatan gagal dihapus, Id tidak ditemukan',
	});
	response.code(404);
	return response;
};

module.exports = { 
	addNoteHandler,
	getAllNotesHandler,
	getNoteByIdHandler,
	editNoteByIdHandler,
	deleteNoteByIdHandler,
};