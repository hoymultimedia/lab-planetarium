import Signal from 'mini-signals';

import robotoFnt from 'assets/bmpfonts/roboto.fnt';
import robotoPng from 'assets/bmpfonts/roboto.png';
import robotoFnt2x from 'assets/bmpfonts/roboto@2x.fnt';
import robotoPng2x from 'assets/bmpfonts/roboto@2x.png';
import sheetPng from 'assets/sheets/sheet.png';
import sheet from 'assets/sheets/sheet.json';
import sheet2xPng from 'assets/sheets/sheet@2x.png';
import sheet2x from 'assets/sheets/sheet@2x.json';

export default class Resources {
  constructor(application) {
    this.onLoaded = new Signal();

    const app = application;
    app.loader.concurrency = 1;
    if (window.devicePixelRatio === 2) {
      app.loader.add(robotoPng2x);
      app.loader.add(robotoFnt2x);
      app.loader.add(sheet2xPng);
      app.loader.add(sheet2x);
    } else {
      app.loader.add(robotoPng);
      app.loader.add(robotoFnt);
      app.loader.add(sheetPng);
      app.loader.add(sheet);
    }
    app.loader.load(() => {
      this.onLoaded.dispatch();
    });
  }
}
