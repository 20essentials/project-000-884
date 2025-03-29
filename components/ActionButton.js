class ActionButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get styles() {
    return /* css */ `
      :host {
        --size: 20px;
      }

      .container {
        --dark-color: #150b0a;
        --light-color: #878794;
        --base-color: #3d4144;

        width: var(--size);
        height: var(--size);
        background:
          radial-gradient(var(--base-color) 55%, transparent 60%),
          linear-gradient(140deg, var(--light-color) 20%, var(--dark-color) 70%);
        box-shadow:
          0 2px 3px #0002 inset,
          0 0 1px 1px #000;
        border-radius: 50%;
        display: grid;
        place-items: center;
        transition: backgrounds .3s ease-in-out;

        * {
          pointer-events: none;
        }

        &:active {
          box-shadow: inset 0 0 10px #000a;
        }
      }

      .text {
        font-family: "Highway Gothic";
        text-shadow: 1px 1px 0 #000;
        font-size: 14px;
        color: #ddd;
      }

      :host(.dark) .text {
        color: #292a2e;
        font-size: 12px;
        text-shadow: 0 1px 0 #111;
      }
    `;
  }

  addEvents() {
    const $ = el => this.shadowRoot.querySelector(el);
    const currentAttribute = this.getAttribute('text');
    const options = {
      bubbles: true,
      composed: true
    };
    $('.container').addEventListener('click', e => {
      if (currentAttribute === '▲' || currentAttribute === 'X') {
        this.dispatchEvent(new CustomEvent('to-up', options));
      }
      if (currentAttribute === '►' || currentAttribute === 'A') {
        this.dispatchEvent(new CustomEvent('to-right', options));
      }
      if (currentAttribute === '◄' || currentAttribute === 'Y') {
        this.dispatchEvent(new CustomEvent('to-left', options));
      }
    });
  }

  connectedCallback() {
    this.text = this.getAttribute('text') || '?';
    this.render();
    this.addEvents();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
    <style>${ActionButton.styles}</style>
    <div class="container">
      <div class="text">${this.text}</div>
    </div>`;
  }
}

customElements.define('action-button', ActionButton);
