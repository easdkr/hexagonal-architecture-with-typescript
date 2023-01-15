import { Predicate } from '../../utils/types.js';
import { Router } from '../entity/router.js';

export class RouterSearch {
  public static retrieveRouter(routers: Router[], predicate: Predicate<Router>): Router[] {
    return routers.filter(predicate);
  }
}
