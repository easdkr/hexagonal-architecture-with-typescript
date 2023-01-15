import { Router } from '../../domain/entity/router.js';
import { Predicate } from '../../utils/types.js';

export interface RouterViewUsecase {
  getRouters(filter: Predicate<Router>): Promise<Router[]>;
}
