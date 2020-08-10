import { Graphics, Container } from 'pixi.js';
import MathUtils from 'utils/MathUtils';
import Data from 'app/Data';
import { Back, TweenMax } from 'gsap';

export default class Slider {
  constructor() {
    this.display = new Container();

    this.width = 400;
    this.center = this.width / 2;

    const trackGraphic = new Graphics();
    trackGraphic.beginFill(0xe8e7e2, 0.05);
    trackGraphic.drawRect(0, 0, this.width, 1);
    trackGraphic.drawRect(0, -5, 1, 10);
    trackGraphic.drawRect(this.width, -5, 1, 10);
    trackGraphic.endFill();
    this.display.addChild(trackGraphic);

    this.knob = new Graphics();
    this.knob.beginFill(0xe8e7e2, 1);
    this.knob.alpha = 0.1;
    this.knob.drawCircle(0, 0, 10);
    this.knob.endFill();
    this.knob.x = this.center;
    this.display.addChild(this.knob);

    this.knob.interactive = true;
    this.knob.buttonMode = true;
    this.knob.on('pointerdown', this.onDown);
    this.knob.on('pointerup', this.onUp);
    this.knob.on('pointerupoutside', this.onUp);
    this.knob.on('pointermove', this.onMove);
  }

  onMove = (event) => {
    if (this.dragging) {
      const pos = event.data.getLocalPosition(this.display);
      const x = MathUtils.clamp(pos.x, 0, 400);
      const s = MathUtils.map(x, 0, this.width, -1, 1);

      Data.orbitSpeed = s;
      this.knob.x = x;
    }
  };

  onDown = () => {
    this.dragging = true;
    TweenMax.to(this.knob, 0.2, { alpha: 0.5 });
  };

  onUp = () => {
    this.dragging = false;
    TweenMax.to(this.knob, 0.25, {
      x: this.center,
      alpha: 0.1,
      ease: Back.easeOut,
    });
    Data.orbitSpeed = 0;
  };
}
