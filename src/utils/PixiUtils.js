/**
 * Created by pandan on 2017-04-29.
 */
export default class PixiUtils {
  static getPixel(pixels, width, x, y) {
    const index = y * (width * 4) + x * 4;
    return [
      pixels[index],
      pixels[index + 1],
      pixels[index + 2],
      pixels[index + 3],
    ];
  }

  /*
  getPixels(sprite) {
    const canvas = document.createElement('canvas');
    canvas.width = sprite.width;
    canvas.height = sprite.height;
    const context = canvas.getContext('2d', { alpha: true });
    context.drawImage(
      sprite.texture.baseTexture.resource.source,
      0,
      0,
      sprite.width,
      sprite.height
    );
    return context.getImageData(0, 0, sprite.width, sprite.height).data;
  }
  */
}
