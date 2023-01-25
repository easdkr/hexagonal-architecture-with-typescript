import { Router } from 'src/domain/entity/router';
import { RouterId } from 'src/domain/vo/router.id';

export interface RouterNetworkOutputPort {
  fetchRouterById(routerId: RouterId): Router;
  persistRouter(router: Router): boolean;
}
