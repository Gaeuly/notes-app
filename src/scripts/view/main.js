import '../components/AppBar.js';
import '../components/NoteForm.js';
import '../components/NoteList.js';
import NotesAPI from '../data/NotesAPI.js';
import Swal from 'sweetalert2';

const main = () => {
  const noteForm = document.querySelector('note-form');
  const noteList = document.querySelector('note-list');
  const api = new NotesAPI();

  const showLoading = () => {
    noteList.innerHTML = '<div class="loader"></div>';
  };

  const renderError = (message) => {
    noteList.innerHTML = `<p class="placeholder">Error: ${message}</p>`;
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `Terjadi kesalahan: ${message}`,
    });
  };

  const renderNotes = async () => {
    showLoading();
    try {
      const notes = await api.getNotes();
      if (notes.length === 0) {
        noteList.innerHTML = '<p class="placeholder">Tidak ada catatan untuk ditampilkan.</p>';
      } else {
        noteList.notes = notes;
      }
    } catch (error) {
      renderError(error.message);
    }
  };

  const addNoteHandler = async (event) => {
    try {
      await api.createNote(event.detail);
      await renderNotes(); // Muat ulang semua catatan
      Swal.fire({
        icon: 'success',
        title: 'Sukses!',
        text: 'Catatan berhasil ditambahkan.',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: `Gagal menambahkan catatan: ${error.message}`,
      });
    }
  };

  const deleteNoteHandler = async (event) => {
    try {
      await api.deleteNote(event.detail.noteId);
      await renderNotes(); // Muat ulang semua catatan
      Swal.fire({
        icon: 'success',
        title: 'Dihapus!',
        text: 'Catatan berhasil dihapus.',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: `Gagal menghapus catatan: ${error.message}`,
      });
    }
  };

  noteForm.addEventListener('note-added', addNoteHandler);
  // Menggunakan event delegation untuk listener tombol hapus
  noteList.addEventListener('note-deleted', deleteNoteHandler);

  // Render pertama kali saat halaman dimuat
  renderNotes();
};

document.addEventListener('DOMContentLoaded', main);