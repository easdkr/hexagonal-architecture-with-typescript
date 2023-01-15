import { AbstractSpecification } from '../../utils/specification/abstract.specification.js';
import { Router } from '../entity/router.js';
import { RouterType } from '../vo/router.type.js';

export class RouterTypeSpecification extends AbstractSpecification<Router> {
  isSatisfiedBy(router: Router): boolean {
    return router.getRouterType() === RouterType.EDGE || router.getRouterType() === RouterType.CORE;
  }
}
