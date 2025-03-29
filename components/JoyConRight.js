import './StickPad.js';
import './ActionButton.js';

class JoyConRight extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get styles() {
    return /* css */ `
      :host {

      }

      .container {
        margin-top: 0.5em;
        margin-left: 0.25em;
        width: 85%;
        display: grid;
        gap: 6px;
        grid-template-rows: 25px 70px 70px 30px;
      }

      .plus {
        font-family: "Highway Gothic";
        font-size: 2rem;
        color: #424447;
        filter:
          drop-shadow(1px 0px 0 #000)
          drop-shadow(0 1px 0 #000)
          drop-shadow(0 0 0 #000);
      }

      .location {

      }

      .buttons-container {
        display: grid;
        margin-left: 0.7em;
        grid-template-columns: repeat(3, 22px);
        grid-template-rows: repeat(3, 22px);
        grid-template-areas:
          ". x ."
          "y . a"
          ". b .";
      }

      .buttons-container action-button:nth-child(1) { grid-area: x }
      .buttons-container action-button:nth-child(2) { grid-area: y }
      .buttons-container action-button:nth-child(3) { grid-area: a }
      .buttons-container action-button:nth-child(4) { grid-area: b }

      .stick-container {
        display: grid;
        place-items: center;
      }

      .home-container {
        margin-left: 1em;
      }

      .home-container .circle-button {
        --size: 16px;

        border-radius: 50%;
        width: var(--size);
        height: var(--size);
        background: #363a3c;
        display: grid;
        place-items: center;
        border: 3px solid #8a878f;
        box-shadow: 0 0 0 1px #444;
      }

      .home-container svg {
        transform: scale(0.85);
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
    <style>${JoyConRight.styles}</style>
    <div class="container">
      <div class="location">
        <div class="plus">+</div>
      </div>
      <div class="buttons-container">
        <action-button text="X"></action-button>
        <action-button text="Y"></action-button>
        <action-button text="A"></action-button>
        <action-button text="B"></action-button>
      </div>
      <div class="stick-container">
        <stick-pad text="right"></stick-pad>
      </div>
      <div class="home-container">
        <div class="circle-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5Z"/></svg>
        </div>
      </div>
    </div>`;
  }
}

customElements.define('joy-con-right', JoyConRight);
