import { RouterViewOutputPort } from '../../../application/port/output/router-view.output-port.js';
import { Router } from '../../../domain/router/router.js';
import { readFile } from 'fs/promises';
import { RouterType } from '../../../domain/router/router.type.js';
import { RouterId } from '../../../domain/router/router.id.js';

class RouterViewFileAdapter implements RouterViewOutputPort {
  async fetchRouters(): Promise<Router[]> {
    return await this.readFileAsString();
  }

  async readFileAsString(): Promise<Router[]> {
    const lineToRouter = (line: string): Router => {
      const [id, type] = line.split(';');
      return new Router(RouterType[type], RouterId.of(id));
    };

    const routers = await readFile('routers.txt', { encoding: 'utf-8' }).toString().split('\n').map(lineToRouter);
    return routers;
  }
}

export const routerViewFileAdapter = new RouterViewFileAdapter();
