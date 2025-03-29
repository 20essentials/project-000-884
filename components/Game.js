class GameScreen extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get styles() {
    return /* css */ `
      .scene {
          background: url(assets/scene.avif);
          width: 100%;
          height: 100%;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }

        .ryu {
          --x: 0px;
          --y: 50px;
          width: 435px;
          height: 273px;
          margin: auto;
          zoom: 0.4;
          position: relative;
          background: url(assets/ryu-sprite-demo.webp);
          animation: move 2s steps(46) infinite;
          transform: translate(var(--x), var(--y)) scale(1.5);
          top: 0;
          transition: top 0.1s ease;
        }

        .ryu.left {
          transform: translate(var(--x), var(--y)) scale(1.5) scaleX(1);
        }

        .ryu.right {
          transform: translate(var(--x), var(--y)) scale(1.5) scaleX(-1);
        }

        .ryu.up {
          top: calc(var(--y) * -1);
          top: -70px;
        }

        @keyframes move {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 -12282px;
          }
        }
    `;
  }

  addEvent() {
    const $ = el => this.shadowRoot.querySelector(el);
    const ryu = $('.ryu');
    let x = 0;

    document.addEventListener('keydown', ({ key }) => {
      if (key === 'ArrowLeft' || key === 'a' || key === 'A') {
        x -= 20;
        ryu.classList.add('left');
        ryu.classList.remove('right');
      }
      if (key === 'ArrowRight' || key === 'd' || key === 'D') {
        x += 20;
        ryu.classList.add('right');
        ryu.classList.remove('left');
      }
      if (key === ' ' || key === 'ArrowUp' || key === 'w' || key === 'w') {
        ryu.classList.remove('right');
        ryu.classList.remove('left');
        ryu.classList.add('up');
        ryu.addEventListener('transitionend', () => {
          ryu.classList.remove('up');
        });
      }
      ryu.style.setProperty('--x', `${x}px`);
    });

    document.addEventListener('to-up', e => {
      ryu.classList.remove('right');
      ryu.classList.remove('left');
      ryu.classList.add('up');
      ryu.addEventListener('transitionend', () => {
        ryu.classList.remove('up');
      });
    });

    document.addEventListener('to-right', e => {
      x += 20;
      ryu.classList.add('right');
      ryu.classList.remove('left');
      ryu.style.setProperty('--x', `${x}px`);
    });

    document.addEventListener('to-left', e => {
      x -= 20;
      ryu.classList.add('left');
      ryu.classList.remove('right');
      ryu.style.setProperty('--x', `${x}px`);
    });
  }

  connectedCallback() {
    this.render();
    this.addEvent();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
      <style>${GameScreen.styles}</style>
      <div class="scene">
        <div class="ryu"></div>
      </div>
    `;
  }
}

customElements.define('game-screen', GameScreen);
