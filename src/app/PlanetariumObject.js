/* eslint-disable no-unused-vars,max-len */
import { Container, Graphics } from 'pixi.js';
import Geom from 'utils/Geom';
import MathUtils from 'utils/MathUtils';
import Data from './Data';

export default class PlanetariumObject {
  constructor(data, orbitalPosition, index, sunPosition) {
    this.display = new Container();

    this.sunPosition = sunPosition;
    this.orbitalPosition = orbitalPosition;
    this.diameter = Data.getObjectDiameter(data.diameter);
    this.radius = this.diameter / 2;
    this.orbitalRadius = Data.getOrbitalRadius(index);
    this.speed = data.orbitalPeriod;
    this.radians = 0;
    this.orbitSpeed = Data.getOrbitalSpeed(data.orbitalPeriod);

    this.createGraphics(data);

    Data.onSpeedUpdate.add(() => {
      this.orbitSpeed = Data.getOrbitalSpeed(data.orbitalPeriod);
    });
  }

  createGraphics(data) {
    const circle = new Graphics();
    circle.beginFill(data.color, 1);
    circle.drawCircle(0, 0, this.radius);
    circle.endFill();
    this.display.addChild(circle);
  }

  createShadow() {
    this.halfCircle = new Graphics();
    this.halfCircle.lineStyle(1);
    this.halfCircle.beginFill(0x000000);
    this.halfCircle.arc(0, 0, this.radius, 0, Math.PI); // cx, cy, radius, startAngle, endAngle
    this.halfCircle.alpha = 0.2;
    this.display.addChild(this.halfCircle);
  }

  getPosition() {
    const pos = {
      x: this.orbitalPosition.x + this.orbitalRadius * Math.sin(this.radians),
      y: this.orbitalPosition.y + this.orbitalRadius * Math.cos(this.radians),
    };
    return pos;
  }

  update() {
    this.radians += this.orbitSpeed;

    const pos = this.getPosition();

    if (this.halfCircle) {
      const angle = Geom.angleBetween(pos, this.sunPosition);
      this.halfCircle.rotation = angle + MathUtils.degreesToRadians(90);
    }

    this.display.x = pos.x;
    this.display.y = pos.y;
  }
}
