class AppBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <h1><span style="color: #19BAEB">My</span>Notes</h1>
        <button id="add-note-btn">+ Add new</button>
      </header>
    `;
  }
}

customElements.define("app-bar", AppBar);
