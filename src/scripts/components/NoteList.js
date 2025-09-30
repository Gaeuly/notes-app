import './NoteItem.js';

class NoteList extends HTMLElement {
  set notes(notes) {
    this._notes = notes;
    this.render();
  }

  render() {
    this.innerHTML = `
      <style>
        :host {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        .placeholder {
          text-align: center;
          color: #888;
          grid-column: 1 / -1;
        }
      </style>
    `;

    if (this._notes.length > 0) {
      this._notes.forEach(note => {
        const noteItem = document.createElement('note-item');
        noteItem.note = note;
        this.appendChild(noteItem);
      });
    } else {
      this.innerHTML += `<p class="placeholder">Tidak ada catatan untuk ditampilkan.</p>`;
    }
  }
}
customElements.define('note-list', NoteList);