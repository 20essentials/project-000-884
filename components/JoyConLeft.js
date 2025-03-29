import "./StickPad.js";
import "./ActionButton.js";

class JoyConLeft extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        display: grid;
        justify-content: end;
      }

      .container {
        margin-top: 0.5em;
        margin-right: 0.7em;
        width: 85%;
        display: grid;
        gap: 6px;
        grid-template-rows: 25px 70px 70px 30px;
      }

      .location {
        justify-self: end;
      }

      .minus {
        font-family: "Highway Gothic";
        font-size: 2rem;
        color: #424447;
        filter:
          drop-shadow(1px 0px 0 #000)
          drop-shadow(0 1px 0 #000)
          drop-shadow(0 0 0 #000);
        transform: scaleX(0.5);
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

      .record-container {
        justify-self: end;
      }

      .record-button {
        --size: 20px;

        width: var(--size);
        height: var(--size);
        border-radius: 3px;
        background: #3c363a;
        border: 1px solid #201f1f;

        display: grid;
        place-items: center;
      }

      .record-button .circle {
        --size: 62%;

        background: #27272b;
        border: 1px solid #1a1a1a;
        border-radius: 50%;
        width: var(--size);
        height: var(--size);
        box-shadow: 0 1px 1px #fff4;
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${JoyConLeft.styles}</style>
    <div class="container">
      <div class="location">
        <div class="minus">—</div>
      </div>
      <div class="stick-container">
        <stick-pad text="left"></stick-pad>
      </div>
      <div class="buttons-container">
        <action-button class="dark up" text="▲"></action-button>
        <action-button class="dark left" text="◄"></action-button>
        <action-button class="dark right" text="►"></action-button>
        <action-button class="dark down" text="▼"></action-button>
      </div>
      <div class="record-container">
        <div class="record-button">
          <div class="circle"></div>
        </div>
      </div>
    </div>`;
  }
}

customElements.define("joy-con-left", JoyConLeft);
