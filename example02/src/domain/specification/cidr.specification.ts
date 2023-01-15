import { AbstractSpecification } from '../../utils/specification/abstract.specification.js';

export class CIDRSpecification extends AbstractSpecification<number> {
  public static readonly MINIMUM_ALLOWED_CIRD = 8;

  isSatisfiedBy(cidr: number): boolean {
    return Number.isInteger(cidr) && cidr > CIDRSpecification.MINIMUM_ALLOWED_CIRD;
  }
}
