class BodyText extends HTMLElement {
  connectedCallback() {
    const text = this.getAttribute("text").replace(/\n/g, "<br>"); // Mengganti \n dengan <br>
    this.innerHTML = `<p>${text}</p>`;
  }
}

customElements.define("body-text", BodyText);
