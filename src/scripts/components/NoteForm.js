class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          max-width: 600px;
          margin: 0 auto 2rem auto;
          background: var(--surface-color);
          padding: 24px;
          border-radius: 8px;
          box-shadow: 0 2px 8px var(--shadow-color);
        }
        form { display: flex; flex-direction: column; gap: 16px; }
        h2 { margin-bottom: 1rem; text-align: center; color: var(--primary-variant); }
        input, textarea { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 4px; font-family: inherit; font-size: 1rem; }
        textarea { resize: vertical; min-height: 100px; }
        button { padding: 12px 20px; background-color: var(--primary-color); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem; }
        .validation-message { color: var(--error-color); font-size: 0.8rem; margin-top: -10px; display: none; }
      </style>
      <form id="noteForm" novalidate>
        <h2>Buat Catatan Baru</h2>
        <input type="text" id="noteTitle" placeholder="Judul..." required>
        <p id="titleValidation" class="validation-message">Judul tidak boleh kosong.</p>
        <textarea id="noteBody" placeholder="Isi catatan..." required></textarea>
        <p id="bodyValidation" class="validation-message">Isi catatan tidak boleh kosong.</p>
        <button type="submit">Tambahkan</button>
      </form>
    `;
  }

  connectedCallback() {
    const form = this.shadowRoot.querySelector('#noteForm');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const titleInput = this.shadowRoot.querySelector('#noteTitle');
      const bodyInput = this.shadowRoot.querySelector('#noteBody');
      if (this.validateInput(titleInput, bodyInput)) {
        this.dispatchEvent(new CustomEvent('note-added', {
          detail: { title: titleInput.value, body: bodyInput.value },
          bubbles: true,
          composed: true
        }));
        form.reset();
      }
    });
  }

  validateInput(titleInput, bodyInput) {
    const titleValidation = this.shadowRoot.querySelector('#titleValidation');
    const bodyValidation = this.shadowRoot.querySelector('#bodyValidation');
    let isValid = true;
    if (titleInput.value.trim() === '') {
      titleValidation.style.display = 'block';
      isValid = false;
    } else {
      titleValidation.style.display = 'none';
    }
    if (bodyInput.value.trim() === '') {
      bodyValidation.style.display = 'block';
      isValid = false;
    } else {
      bodyValidation.style.display = 'none';
    }
    return isValid;
  }
}
customElements.define('note-form', NoteForm);