import PlanetariumObject from 'app/PlanetariumObject';

export default class Moon extends PlanetariumObject {
  constructor(data, orbitalObject, index, sunPosition) {
    super(data, orbitalObject.display.position, index, sunPosition);
    this.orbitalRadius = data.orbitalDistance;
  }

  update() {
    super.update();
  }
}
