class StickPad extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get styles() {
    return /* css */ `
      :host {
        --size: 45px;
      }

      .container {
        width: var(--size);
        height: var(--size);
        border-radius: 50%;
        border: 2px solid #000;
        box-shadow: 0 0 5px #000c;
        background: linear-gradient(#4f4d4c, #161615);
        transition: box-shadow .1s linear;

        &:active {
            box-shadow: 0 0 5px #000c, inset 0 0 20px #000a;
        }
        
        * {
          pointer-events: none;
        }
      }

      .center {
        display: grid;
        place-items: center;
      }

      .inner {
        --size: 75%;

        width: var(--size);
        height: var(--size);
        border: 1px inset #555;
        border-radius: 50%;
        background: #424348;
        box-shadow:
          0 -1px 2px #0004 inset,
          0 1px 2px #fff4 inset,
          0 -2px 2px #fff3,
          0 -2px 6px #0009 inset;
        position: relative;
      }

      .gap {
        background: #131210;
        width: 2px;
        height: 5px;
        position: absolute;
      }

      .gap:nth-child(1) {
        top: -5px;
        background: linear-gradient(to top, #444, #111);
      }

      .gap:nth-child(2),
      .gap:nth-child(3) {
        width: 5px;
        height: 2px;
      }

      .gap:nth-child(2) { left: -5px; }
      .gap:nth-child(3) { right: -5px; }

      .gap:nth-child(4) {
        bottom: -5px;
        background: #111;
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
      if (currentAttribute === 'left') {
        this.dispatchEvent(new CustomEvent('to-left', options));
      }
      if (currentAttribute === 'right') {
        this.dispatchEvent(new CustomEvent('to-right', options));
      }
    });
  }

  connectedCallback() {
    this.render();
    this.addEvents();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
    <style>${StickPad.styles}</style>
    <div class="container center">
      <div class="inner center">
        <div class="gap"></div>
        <div class="gap"></div>
        <div class="gap"></div>
        <div class="gap"></div>
      </div>
    </div>`;
  }
}

customElements.define('stick-pad', StickPad);
