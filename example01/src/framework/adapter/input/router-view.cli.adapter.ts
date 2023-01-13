import { RouterViewInputPort } from '../../../application/port/input/router-view.input-port.js';
import { RouterViewUsecase } from '../../../application/usecase/router-view.usecase.js';
import { Router } from '../../../domain/router/router.js';
import { RouterType } from '../../../domain/router/router.type.js';
import { routerViewFileAdapter } from '../output/router-view.file.adapter.js';

export class RouterViewCliAdapter {
  private _routerViewUseCase: RouterViewUsecase;

  public constructor() {
    this._setAdapters();
  }

  public async obtainRelatedRouters(type: RouterType): Promise<Router[]> {
    return await this._routerViewUseCase.getRouters(Router.filterRouterByType(type));
  }

  private _setAdapters(): void {
    this._routerViewUseCase = new RouterViewInputPort(routerViewFileAdapter);
  }
}
