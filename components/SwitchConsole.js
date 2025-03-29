import "./JoyController.js";
import "./SwitchScreen.js";

class SwitchConsole extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --joycon-width: 100px;
        --small-round-size: 6px;
        --width: 665px;
        --height: 275px;
      }

      .container {
        display: grid;
        grid-template-columns: var(--joycon-width) 1fr var(--joycon-width);
        width: var(--width);
        height: var(--height);
        filter: drop-shadow(6px 6px 8px #0006);
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${SwitchConsole.styles}</style>
    <div class="container">
      <joy-controller class="left"></joy-controller>
      <switch-screen></switch-screen>
      <joy-controller class="right"></joy-controller>
    </div>`;
  }
}

customElements.define("switch-console", SwitchConsole);
