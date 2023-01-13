import { Router } from '../../../domain/router/router.js';

export interface RouterViewOutputPort {
  fetchRouters(): Promise<Router[]>;
}
