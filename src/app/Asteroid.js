import PlanetariumObject from './PlanetariumObject';

export default class Asteroid extends PlanetariumObject {
  constructor(data, orbitalPosition, index, sunPosition) {
    super(data, orbitalPosition, index, sunPosition);
    this.orbitalRadius = data.orbitalDistance;
  }

  update() {
    super.update();
  }
}
