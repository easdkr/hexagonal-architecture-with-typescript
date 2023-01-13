import { Predicate } from '../../utils/types.js';
import { RouterId } from './router.id.js';
import { RouterType } from './router.type.js';

export class Router {
  public constructor(private readonly _routerType: RouterType, private readonly _routerId: RouterId) {}

  public static filterRouterByType(routerType: RouterType): Predicate<Router> {
    return routerType === RouterType.CORE ? this.isCore : this.isEdge;
  }
  public static isCore: Predicate<Router> = (r) => r.getRouterType() === RouterType.CORE;

  public static isEdge: Predicate<Router> = (r) => r.getRouterType() === RouterType.EDGE;

  public static retrieveRouter(routers: Router[], predicate: Predicate<Router>): Router[] {
    return routers.filter(predicate);
  }

  public getRouterType(): RouterType {
    return this._routerType;
  }
}
