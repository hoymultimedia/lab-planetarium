import { Graphics, Texture } from 'pixi.js';
import MathUtils from 'utils/MathUtils';
import * as pixiParticles from 'pixi-particles';

export default class ParticleTrail {
  constructor(radius, container) {
    const emitterGraphic = new Graphics();
    emitterGraphic.beginFill(0xa68a80, radius);

    const emitterTexture = Texture.from('circle.png');
    const maxScale = MathUtils.map(radius * 2, 0, 100, 0, 0.9);

    this.elapsed = Date.now();

    this.emitter = new pixiParticles.Emitter(container, [emitterTexture], {
      alpha: {
        start: 0.1,
        end: 0.05,
      },
      scale: {
        start: maxScale,
        end: 0.05,
        minimumScaleMultiplier: 1,
      },
      color: {
        start: '#0xe8e7e2',
        end: '#0xe8e7e2',
      },
      speed: {
        start: 0,
        end: 0,
        minimumSpeedMultiplier: 1,
      },
      acceleration: {
        x: 0,
        y: 0,
      },
      maxSpeed: 0,
      startRotation: {
        min: 0,
        max: 0,
      },
      noRotation: true,
      rotationSpeed: {
        min: 0,
        max: 0,
      },
      lifetime: {
        min: 0.5,
        max: 0.5,
      },
      blendMode: 'normal',
      frequency: 0.01,
      emitterLifetime: -1,
      maxParticles: 100,
      pos: {
        x: 0,
        y: 0,
      },
      addAtBack: false,
      spawnType: 'point',
    });
  }

  update(x, y) {
    const now = Date.now();
    this.emitter.updateSpawnPos(x, y);
    this.emitter.update((now - this.elapsed) * 0.001);
    this.elapsed = now;
  }
}
