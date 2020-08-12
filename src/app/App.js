import { Application } from 'pixi.js';
import Stats from 'stats.js';
import Layout from 'utils/Layout';
import appStore from './appStore';
import Resources from './Resources';
import Slider from './Slider';
import Planetarium from './Planetarium';

export default class App {
  init(htmlElement) {
    this.width = htmlElement.clientWidth;
    this.height = htmlElement.clientHeight;
    this.htmlElement = htmlElement;

    window.addEventListener('resize', this.onResize);
    this.setupApp();
    // this.setupStats();
    this.setupLoading();
  }

  setupApp() {
    this.app = new Application({
      width: this.width,
      height: this.height,
      antialias: true,
      autoDensity: true,
      resolution: window.devicePixelRatio,
      transparent: false,
      backgroundColor: 0x22353b,
    });
    appStore.width = this.width;
    appStore.height = this.height;
    appStore.app = this.app;
    this.htmlElement.appendChild(this.app.view);
  }

  setupStats() {
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
  }

  setupLoading() {
    const resources = new Resources(this.app);
    resources.onLoaded.add(() => {
      this.start();
    });
  }

  start() {
    this.planetarium = new Planetarium();
    this.app.stage.addChild(this.planetarium.display);

    this.slider = new Slider();
    this.app.stage.addChild(this.slider.display);

    this.updateLayout();

    this.app.ticker.add(() => {
      this.update();
    });
  }

  update() {
    // this.stats.begin();

    // update stuff
    if (this.planetarium) {
      this.planetarium.update();
    }

    // this.stats.end();
  }

  updateLayout() {
    if (this.planetarium) {
      Layout.align(
        this.planetarium.display,
        0.5,
        0.5,
        appStore.width,
        appStore.height
      );
      Layout.align(
        this.slider.display,
        0.5,
        0.94,
        appStore.width,
        appStore.height
      );
    }
  }

  onResize = () => {
    const parent = this.app.view.parentNode;
    if (this.app) {
      this.app.renderer.resize(parent.clientWidth, parent.clientHeight);
    }
    this.updateLayout();
  };
}
