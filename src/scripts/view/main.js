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

  const renderNotes = async () => {
    showLoading();
    try {
      const notes = await api.getNotes();
      noteList.notes = notes;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Gagal memuat catatan: ${error.message}`,
      });
      noteList.innerHTML = '';
    }
  };

  const addNoteHandler = async (event) => {
    try {
      await api.createNote(event.detail);
      renderNotes();
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
      renderNotes();
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
  noteList.addEventListener('note-deleted', deleteNoteHandler);

  // Render pertama kali
  renderNotes();
};

document.addEventListener('DOMContentLoaded', main);