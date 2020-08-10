/* eslint-disable no-unused-vars */
import { Container, Graphics } from 'pixi.js';
import MathUtils from 'utils/MathUtils';
import Moon from './Moon';
import Planet from './Planet';
import Asteroid from './Asteroid';
import Data from './Data';

export default class Planetarium {
  constructor() {
    this.width = 600;
    this.height = 600;
    this.display = new Container();
    this.display.interactiveChildren = false;
    this.display.interactive = false;
    this.display.buttonMode = false;

    this.createBackground();
    this.createPlanets();
    this.createAsteroids();
  }

  createBackground() {
    const centerPos = {
      x: this.width / 2,
      y: this.height / 2,
    };

    this.bg = new Graphics();
    this.bg.beginFill(0x22353b);
    this.bg.drawRect(0, 0, this.width, this.height);
    this.bg.endFill();

    this.bg.beginFill(0xffd52c);
    this.bg.drawCircle(centerPos.x, centerPos.y, 18);
    this.bg.endFill();

    for (let i = 0; i < Data.objects.length; i++) {
      const orbitalRadius = Data.getOrbitalRadius(i);
      this.bg.lineStyle(1, 0xe8e7e2, 0.05);
      this.bg.beginFill(0xe8e7e2, 0.025);
      this.bg.drawCircle(this.width / 2, this.height / 2, orbitalRadius);
    }
    this.display.addChild(this.bg);
    // this.particleContainer = new Container();
    // this.display.addChild(this.particleContainer);
  }

  createPlanets() {
    this.planets = [];
    const centerPos = {
      x: this.width / 2,
      y: this.height / 2,
    };
    for (let i = 0; i < Data.objects.length; i++) {
      const data = Data.objects[i];
      const planet = new Planet(
        data,
        centerPos,
        i,
        centerPos,
        this.particleContainer
      );
      this.display.addChild(planet.display);
      this.planets.push(planet);
      if (data.moons) {
        for (let j = 0; j < data.moons.length; j++) {
          const moon = new Moon(data.moons[j], planet, j, centerPos);
          planet.moons.push(moon);
          this.display.addChild(moon.display);
        }
      }
    }
  }

  createAsteroids() {
    const centerPos = {
      x: this.width / 2,
      y: this.height / 2,
    };
    for (let j = 0; j < 200; j++) {
      const orbit = Data.orbitalGap() * 5;
      const data = {
        diameter: MathUtils.getRandomNumber(0.1, 0.3),
        color: 0x666666,
        orbitalDistance: MathUtils.getRandomNumber(orbit - 7, orbit + 7),
        orbitalPeriod: MathUtils.getRandomNumber(0.01, 2.5),
      };
      const asteroid = new Asteroid(data, centerPos, j, centerPos);
      asteroid.radians = MathUtils.degreesToRadians(
        MathUtils.getRandomNumber(0, 365)
      );
      this.planets.push(asteroid);
      this.display.addChild(asteroid.display);
    }
  }

  update() {
    if (this.planets) {
      for (let i = 0; i < this.planets.length; i++) {
        this.planets[i].update();
      }
    }
  }
}
