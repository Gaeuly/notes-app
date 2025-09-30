class AppBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        app-bar {
          display: block;
          width: 100%;
          background-color: var(--primary-color);
          color: var(--on-primary-color);
          padding: 16px;
          text-align: center;
          font-size: 1.5rem;
          font-weight: 600;
          box-shadow: 0 2px 4px var(--shadow-color);
        }
      </style>
      <h1>Notes App</h1>
    `;
  }
}
customElements.define('app-bar', AppBar);