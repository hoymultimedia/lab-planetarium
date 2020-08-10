/* eslint-disable no-tabs */
import MathUtils from 'utils/MathUtils';
import Signal from 'mini-signals';

/*
Earth
Diameter: 12742
Orbital period: 365

Moon
Diameter: 1738.1 / 0.2725

IO
Diameter: 3643.2 / 0.285
Orbital period: 1.769 / 0.0048

Europa
Diameter: 3121.6  / 0.245
Distance: 671,100 km
Orbital period: 3.55 / 0.0097

Ganymede
Diameter: 5262.4  / 0.412
Distance: 1,070,400
Orbital period: 7.154 / 0.0196

Titan
Diameter : 5550 / 0.412
Orbital period 15.95 / 0.0436

*/
const objects = [
  {
    name: 'mercury',
    diameter: 0.383,
    color: 0xff637c,
    orbitalDistance: 0.387,
    orbitalPeriod: 0.241,
  },
  {
    name: 'venus',
    diameter: 0.949,
    color: 0xbf4fad,
    orbitalDistance: 0.723,
    orbitalPeriod: 0.615,
  },
  {
    name: 'earth',
    diameter: 1,
    color: 0x0b95b9,
    orbitalDistance: 1,
    orbitalPeriod: 1,
    moons: [
      {
        name: 'moon',
        diameter: 0.2724,
        color: 0xa3a3a3,
        orbitalDistance: 20,
        orbitalPeriod: 0.0748,
      },
    ],
  },
  {
    name: 'mars',
    diameter: 0.532,
    color: 0xfc2a06,
    orbitalDistance: 1.52,
    orbitalPeriod: 1.88,
  },
  {},
  {
    name: 'jupiter',
    diameter: 11.21 / 8,
    color: 0xff5e03,
    orbitalDistance: 5.2,
    orbitalPeriod: 11.9,
    moons: [
      {
        name: 'IO',
        diameter: 0.285,
        color: 0xa3a3a3,
        orbitalDistance: 12,
        orbitalPeriod: 0.0048,
      },
      {
        name: 'Europa',
        diameter: 0.245,
        color: 0xa3a3a3,
        orbitalDistance: 16,
        orbitalPeriod: 0.0097,
      },
      {
        name: 'Ganymede',
        diameter: 0.412,
        color: 0xa3a3a3,
        orbitalDistance: 16,
        orbitalPeriod: 0.0196,
      },
    ],
  },
  {
    name: 'saturn',
    diameter: 9.45 / 8,
    color: 0xffac03,
    orbitalDistance: 9.58,
    orbitalPeriod: 29.4,
    moons: [
      {
        name: 'Titan',
        diameter: 0.412,
        color: 0xa3a3a3,
        orbitalDistance: 16,
        orbitalPeriod: 0.0436,
      },
    ],
    rings: [
      { radius: 12, width: 4 },
      { radius: 11, width: 2 },
    ],
  },
  {
    name: 'uranus',
    diameter: 4.01 / 8,
    color: 0xa3aa02,
    orbitalDistance: 19.2,
    orbitalPeriod: 83.7,
  },
  {
    name: 'neptune',
    diameter: 3.88 / 8,
    color: 0x05b694,
    orbitalDistance: 19.2,
    orbitalPeriod: 163.7,
  },
];

const onSpeedUpdate = new Signal();
let _orbitSpeed = 0.001;
const gap = 28;

function getObjectDiameter(diameter) {
  return MathUtils.map(diameter, 0, 12, 0, 150);
}

function getOrbitalRadius(distanceIndex) {
  return gap * distanceIndex + gap;
  // return MathUtils.map(orbitalDistance, 0, 5, 0, 500);
}

function getOrbitalSpeed(orbitalPeriod) {
  return _orbitSpeed / orbitalPeriod;
}

function orbitalGap() {
  return gap;
}

export default {
  onSpeedUpdate,
  get orbitSpeed() {
    return _orbitSpeed;
  },
  set orbitSpeed(value) {
    _orbitSpeed = MathUtils.map(value, 0, 1, 0.001, 0.02);
    onSpeedUpdate.dispatch();
  },
  orbitalGap,
  objects,
  getObjectDiameter,
  getOrbitalRadius,
  getOrbitalSpeed,
};
