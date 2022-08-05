// Memuat kode konfigurasi routing server seperti menentukan path, method dan handler yang digunakan

// Todo 7 = Membuat variabel routes sebagai array object

// Todo 17 = Import fungsi addNoteHandler
// Todo 23 = melakukan import getAllNotesHandler
const { addNoteHandler, getAllNotesHandler } = require('./noteHandler');

const routes = [
{
	method: 'POST',
	path: '/notes',
	// Isi fungsi kosong dulu, karena handler dibuat pada file terpisah
	// Todo 16 = tambahkan fungsi handler, dari file noteHandler.js
	handler: addNoteHandler ,
},
// Todo 21 = menambahkan konfigurasi route untuk R.R GET agar data yang di isi client dapat tampil di web
{
	method: 'GET',
	path: '/notes',
	// Todo 24 = masukkan fungsi dari handler untuk menampilkan data client ke dalam website tampilan
	handler: getAllNotesHandler,
},
// Todo 25 = menambahkan method dan path agar menampilkan catatan/data client lebih spesifik kedalam web.
{
	method: 'GET',
	path: '/notes/{id}',
	handler: () => {},
},

];


module.exports = routes;