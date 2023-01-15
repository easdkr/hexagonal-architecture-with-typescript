import { readFile } from 'fs/promises';
import { join, resolve } from 'path';
import { RouterViewOutputPort } from '../../../application/router/port/output/router-view.output-port.js';
import { Router } from '../../../domain/entity/router.js';
import { RouterId } from '../../../domain/vo/router.id.js';
import { RouterType } from '../../../domain/vo/router.type.js';

class RouterViewFileAdapter implements RouterViewOutputPort {
  async fetchRouters(): Promise<Router[]> {
    return await this.readFileAsString();
  }

  async readFileAsString(): Promise<Router[]> {
    const lineToRouter = (line: string): Router => {
      const [id, type] = line.split(';');
      return new Router(RouterType[type], RouterId.withId(id));
    };

    const routers = (await readFile(join(resolve(), 'resource/routers.txt'), { encoding: 'utf-8' }))
      .toString()
      .split('\n')
      .map(lineToRouter);

    return routers;
  }
}

export const routerViewFileAdapter = new RouterViewFileAdapter();
