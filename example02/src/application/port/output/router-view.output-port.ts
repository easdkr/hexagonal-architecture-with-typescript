import { Router } from '../../../domain/entity/router.js';

export interface RouterViewOutputPort {
  fetchRouters(): Promise<Router[]>;
}
