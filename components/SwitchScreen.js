import './Game.js'

class SwitchScreen extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get styles() {
    return /* css */ `
      :host {
        --screen-size: 92%;
        --width: 450px;
      }

      :host(.off) .screen {
        background: linear-gradient(to right, #161616, #1e1e1e);
      }

      .container {
        height: 100%;
        background: linear-gradient(
          to top,
          #232428 3%,
          #333436 4% 96%,
          #555555 98%,
          #333436 99.5%
        );
        border-radius: var(--small-round-size);

        -webkit-mask-image:
          radial-gradient(ellipse 50% 100% at 100% 0, transparent 5%, #000 5.5%),
          radial-gradient(ellipse 50% 100% at 0 0, transparent 5%, #000 5.5%);
        -webkit-mask-composite: source-in;
        /* Future support */
        mask-image:
          radial-gradient(ellipse 50% 100% at 100% 0, transparent 5%, #000 5.5%),
          radial-gradient(ellipse 50% 100% at 0 0, transparent 5%, #000 5.5%);
        mask-composite: add;
      }

      .center {
        display: grid;
        place-items: center;
      }

      .crystal {
        width: calc(var(--screen-size) * 1.02);
        height: calc(var(--screen-size) * 0.98);
        border-top: 2px solid #222;
        border-bottom: 2px solid #484848;
        background: #000;
        border-radius: 6px;
      }

      .screen {
        background: linear-gradient(#111, #151515);
        width: calc(var(--screen-size) * 0.88);
        height: calc(var(--screen-size) * 0.9);
        overflow: hidden;
      }

      .volume-container {
        width: 40px;
        height: 15px;
        border-bottom: 1px solid #000;
        position: absolute;
        transform: translate(65px, -15px);
        z-index: -1;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-items: end;
      }

      :is(.volume-down, .volume-up) {
        background: #000;
        height: 1px;
      }

      logo-switch {
        position: absolute;
        z-index: 5;
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
    <style>${SwitchScreen.styles}</style>
    <div class="power button"></div>
    <div class="volume-container button">
      <div class="volume-up"></div>
      <div class="volume-divider"></div>
      <div class="volume-down"></div>
    </div>
    <div class="container center">
      <div class="crystal center">
        <div class="screen">
          <game-screen></game-screen>
        </div>
      </div>
    </div>`;
  }
}

customElements.define('switch-screen', SwitchScreen);
