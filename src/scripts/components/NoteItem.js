class NoteItem extends HTMLElement {
  set note(note) {
    this._note = note;
    this.render();
  }

  render() {
    const formattedDate = new Date(this._note.createdAt).toLocaleDateString('id-ID', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    this.innerHTML = `
      <style>
        :host {
          display: flex; /* Menggunakan flexbox untuk layout internal */
          flex-direction: column;
          background: var(--surface-color);
          border-radius: 8px;
          box-shadow: 0 2px 8px var(--shadow-color);
          overflow: hidden;
          transition: transform 0.2s;
          height: 100%; /* Memastikan tinggi item sama */
        }
        :host(:hover) { transform: translateY(-5px); }
        .note-content { padding: 20px; flex-grow: 1; } /* Konten akan mengisi ruang */
        h3 { margin-bottom: 8px; color: var(--primary-variant); }
        p { white-space: pre-wrap; word-wrap: break-word; }
        .note-footer { padding: 10px 20px; font-size: 0.8rem; color: #666; border-top: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
        .delete-button { background: none; border: 1px solid var(--error-color); color: var(--error-color); padding: 5px 10px; border-radius: 4px; cursor: pointer; }
      </style>
      <div class="note-content">
        <h3>${this._note.title}</h3>
        <p>${this._note.body}</p>
      </div>
      <div class="note-footer">
        <p>${formattedDate}</p>
        <button class="delete-button">Hapus</button>
      </div>
    `;

    this.querySelector('.delete-button').addEventListener('click', (event) => {
      event.stopPropagation(); // Mencegah event lain terpicu
      this.dispatchEvent(new CustomEvent('note-deleted', {
        detail: { noteId: this._note.id },
        bubbles: true,
        composed: true
      }));
    });
  }
}
customElements.define('note-item', NoteItem);