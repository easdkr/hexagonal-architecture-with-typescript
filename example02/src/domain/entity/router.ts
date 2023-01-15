import { Predicate } from '../../utils/types.js';
import { Switch } from './switch.js';
import { IP } from '../vo/ip.js';
import { Network } from '../vo/network.js';
import { RouterId } from '../vo/router.id.js';
import { RouterType } from '../vo/router.type.js';

export class Router {
  private _networkSwitch: Switch;
  public constructor(private readonly _routerType: RouterType, private readonly _routerId: RouterId) {}

  public static filterRouterByType(routerType: RouterType): Predicate<Router> {
    return routerType === RouterType.CORE ? this.isCore : this.isEdge;
  }

  public static isCore: Predicate<Router> = (r) => r.getRouterType() === RouterType.CORE;

  public static isEdge: Predicate<Router> = (r) => r.getRouterType() === RouterType.EDGE;

  public addNetworkToSwitch(network: Network): void {
    this._networkSwitch = this._networkSwitch.addNetwork(network);
  }

  public createNetwork(address: IP, name: string, cidr: number): Network {
    return new Network(address, name, cidr);
  }

  public retrieveNetworks(): Network[] {
    return this._networkSwitch.getNetworks();
  }
  public getRouterType(): RouterType {
    return this._routerType;
  }

  public toString(): string {
    return `
      Router { 
        type: ${RouterType[this._routerType]}, 
        id: ${this._routerId.toString()}
      }
    `;
  }
}
