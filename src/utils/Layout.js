/* eslint-disable no-param-reassign */
/**
 * Created by pandan on 14/10/16.
 */
export default class Layout {
  static horizontalAlign(display, percentage, maxWidth, round = true) {
    display.x = (maxWidth - display.width) * percentage;
    if (round) {
      display.x = Math.round(display.x);
    }
  }

  static verticalAlign(display, percentage, maxHeight, round = true) {
    display.y = (maxHeight - display.height) * percentage;
    if (round) {
      display.y = Math.round(display.y);
    }
  }

  static align(display, hAlign, vAlign, hMax, vMax, round = true) {
    display.x = (hMax - display.width) * hAlign;
    display.y = (vMax - display.height) * vAlign;
    if (round) {
      display.x = Math.round(display.x);
      display.y = Math.round(display.y);
    }
  }

  static intersects(rectA, rectB) {
    if (
      rectA.width <= 0 ||
      rectA.height <= 0 ||
      rectB.width <= 0 ||
      rectB.height <= 0
    ) {
      return false;
    }
    return !(
      rectA.right < rectB.x ||
      rectA.bottom < rectB.y ||
      rectA.x > rectB.right ||
      rectA.y > rectB.bottom
    );
  }

  static alignToChild(
    display,
    displayAlignX,
    displayAlignY,
    reference,
    round = true
  ) {
    display.x = reference.x + (reference.width - display.width) * displayAlignX;
    display.y =
      reference.y + (reference.height - display.height) * displayAlignY;
    if (round) {
      display.x = Math.round(display.x);
      display.y = Math.round(display.y);
    }
  }
}
