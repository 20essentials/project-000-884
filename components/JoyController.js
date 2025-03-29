import "./JoyConLeft.js";
import "./JoyConRight.js";

class JoyController extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --round-size: 50px;

        position: relative;
        display: grid;
      }

      :host(.right) {
        justify-items: right;
      }

      :host(.left) {
        justify-items: left;
      }

      .container {
        width: 100%;
        height: 100%;
        background: var(--color);
      }

      /* Right JoyCon */
      :host(.right) .container {
        --color: #de5e53;

        border-radius:
          var(--small-round-size)
          var(--round-size)
          var(--round-size)
          var(--small-round-size);

        box-shadow:
          -6px -8px 5px #0006 inset,
          0 6px 3px #fff6 inset;
      }

      /* Left JoyCon */
      :host(.left) .container {
        --color: #67b9de;

        border-radius:
          var(--round-size)
          var(--small-round-size)
          var(--small-round-size)
          var(--round-size);

        box-shadow:
          6px -8px 5px #0006 inset,
          0 6px 3px #fff6 inset;
      }

      .trigger {
        width: 80%;
        height: 17%;
        background: #000;
        position: absolute;
        z-index: -1;
      }

      :host(.right) .trigger {
        transform: translate(2px, -5px);
        border-radius: 4px var(--round-size) 0 0;
        border: 2px solid #222;
        background: radial-gradient(circle, #3a4547, #1c1a25);
        transition: transform 0.25s;
      }

      :host(.right) .trigger:active {
        transform: translate(2px, -1px);
      }

      :host(.left) .trigger {
        transform: translate(-2px, -5px);
        border-radius: var(--round-size) 4px 0 0;
        border: 2px solid #222;
        background: radial-gradient(circle, #3a4547, #1c1a25);
        transition: transform 0.25s;
      }

      :host(.left) .trigger:active {
        transform: translate(-2px, -1px);
      }
    `;
  }

  connectedCallback() {
    this.render();
    this.addContent();
  }

  addContent() {
    const container = this.shadowRoot.querySelector(".container");
    const isLeft = this.classList.contains("left");

    const component = isLeft ? "<joy-con-left></joy-con-left>" : "<joy-con-right></joy-con-right>";
    container.insertAdjacentHTML("afterbegin", component);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${JoyController.styles}</style>
    <div class="trigger"></div>
    <div class="container">
    </div>`;
  }
}

customElements.define("joy-controller", JoyController);
