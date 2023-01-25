import express from 'express';

class WebApp {
  private _app: express.Application;

  constructor(private readonly _port: number) {
    this._app = express();
  }

  public start(): void {
    this._app.listen(this._port, () => {
      console.log(`Service listening on ${this._port}`);
    });
  }
}

export class WebAppFactory {
  static create(port = 3000): WebApp {
    const app = new WebApp(port);

    return app;
  }
}
