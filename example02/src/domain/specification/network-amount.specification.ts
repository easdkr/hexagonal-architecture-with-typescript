import { AbstractSpecification } from '../../utils/specification/abstract.specification.js';
import { Router } from '../entity/router.js';

export class NetworkAmountSpecification extends AbstractSpecification<Router> {
  public static readonly MAXIMUM_ALLOWED_NETWORKS = 0;

  isSatisfiedBy(router: Router): boolean {
    return router.retrieveNetworks().length <= NetworkAmountSpecification.MAXIMUM_ALLOWED_NETWORKS;
  }
}
