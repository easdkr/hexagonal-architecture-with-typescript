import { Router } from '../../../domain/entity/router.js';
import { RouterSearch } from '../../../domain/service/router.search.js';
import { Predicate } from '../../../utils/types.js';
import { RouterViewUsecase } from '../../usecase/router-view.usecase.js';
import { RouterViewOutputPort } from '../output/router-view.output-port.js';

export class RouterViewInputPort implements RouterViewUsecase {
  public constructor(private readonly routerViewOutputPort: RouterViewOutputPort) {}

  async getRouters(filter: Predicate<Router>): Promise<Router[]> {
    const routers = await this.routerViewOutputPort.fetchRouters();

    return RouterSearch.retrieveRouter(routers, filter);
  }
}
