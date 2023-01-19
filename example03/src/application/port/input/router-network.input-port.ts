import { RouterNetworkOutputPort } from 'src/application/port/output/router-network.output-port';
import { RouterNetworkUseCase } from 'src/application/usecase/router-network.usecase';
import { Router } from 'src/domain/entity/router';
import { NetworkOperation } from 'src/domain/service/network.operation';
import { Network } from 'src/domain/vo/network';
import { RouterId } from 'src/domain/vo/router.id';

export class RouterNetworkInputPort implements RouterNetworkUseCase {
  public constructor(private readonly _routerNetworkOutputPort: RouterNetworkOutputPort) {}

  async addNetworkToRouter(routerId: RouterId, network: Network): Promise<Router> {
    const router = await this.fetchRouter(routerId);
    return await this.createNetwork(router, network);
  }

  private async fetchRouter(routerId: RouterId): Promise<Router> {
    return await this._routerNetworkOutputPort.fetchRouterById(routerId);
  }

  private async createNetwork(router: Router, network: Network): Promise<Router> {
    const newRouter = NetworkOperation.createNewNetwork(router, network);

    return (await this.persistNetwork(router)) ? newRouter : router;
  }

  private async persistNetwork(router: Router): Promise<boolean> {
    return await this._routerNetworkOutputPort.persistRouter(router);
  }
}
