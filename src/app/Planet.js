/* eslint-disable no-unused-vars,max-len */
import { Container, Graphics } from 'pixi.js';
import ParticleTrail from 'app/ParticleTrail';
import Geom from 'utils/Geom';
import MathUtils from 'utils/MathUtils';
import Data from 'app/Data';
import PlanetariumObject from 'app/PlanetariumObject';

export default class Planet extends PlanetariumObject {
  constructor(data, orbitalPosition, index, sunPosition, container) {
    super(data, orbitalPosition, index, sunPosition);
    this.createShadow();
    this.moons = [];

    if (data.rings) {
      this.createRings(data.rings);
    }

    this.enableTrail = false;
    if (this.enableTrail) {
      this.trail = new ParticleTrail(this.radius, container);
    }
  }

  createRings(rings) {
    for (let i = 0; i < rings.length; i++) {
      console.log('rings.radius ', rings[i].radius);
      const circle = new Graphics();
      circle.lineStyle(rings[i].width, 0xe8e7e2, 0.2);
      circle.drawCircle(0, 0, rings[i].radius);
      circle.endFill();
      this.display.addChild(circle);
    }
  }

  update() {
    super.update();
    if (this.moons.length > 0) {
      for (let i = 0; i < this.moons.length; i++) {
        this.moons[i].update();
      }
    }
    if (this.enableTrail) {
      this.trail.update(this.display.x, this.display.y);
    }
  }
}
