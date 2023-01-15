import { AndSpecification } from './and.specification.js';
import { Specification } from './specification.js';

export abstract class AbstractSpecification<T> implements Specification<T> {
  abstract isSatisfiedBy(t: T): boolean;

  and(specification: Specification<T>): Specification<T> {
    return new AndSpecification<T>(this, specification);
  }
}
