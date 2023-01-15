import { AbstractSpecification } from './abstract.specification.js';
import { Specification } from './specification.js';

export class AndSpecification<T> extends AbstractSpecification<T> {
  constructor(private readonly _spec1: Specification<T>, private readonly _spec2: Specification<T>) {
    super();
  }

  public isSatisfiedBy(t: T): boolean {
    return this._spec1.isSatisfiedBy(t) && this._spec2.isSatisfiedBy(t);
  }
}
