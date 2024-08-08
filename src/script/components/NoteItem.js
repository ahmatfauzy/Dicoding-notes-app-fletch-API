class NoteItem extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title");
    const body = this.getAttribute("body");
    const flag = document.getElementById("flag").value;

    this.innerHTML = `
      <div class="note">
        <h2>${title}</h2>
        <body-text text="${body}"></body-text>
        <button class="remove-btn" title="Delete"><i class="fas fa-trash-alt"></i></button>
        ${flag ? '<button class="archive-btn" title="Archive"><i class="fas fa-box"></i></button>' : '<button class="unarchive-btn" title="Unarchive"><i class="fas fa-box-open"></i></button>'}
      </div>
    `;
  }
}

customElements.define("note-item", NoteItem);
