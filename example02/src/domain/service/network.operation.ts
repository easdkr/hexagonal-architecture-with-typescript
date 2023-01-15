import { Router } from '../entity/router.js';
import { CIDRSpecification } from '../specification/cidr.specification.js';
import { NetworkAmountSpecification } from '../specification/network-amount.specification.js';
import { NetworkAvailabilitySpecification } from '../specification/network-availability.specification.js';
import { RouterTypeSpecification } from '../specification/router-type.specification.js';
import { IP } from '../vo/ip.js';
/**
 * 새로운 네트워크 객체를 생성하고 해당 객체를 라우터에 연결된 스위치에 추가
 */
export class NetworkOperation {
  public createNewNetwork(router: Router, address: IP, name: string, cidr: number): void {
    const availabilitySpec = new NetworkAvailabilitySpecification(address, name, cidr);
    const cidrSpec = new CIDRSpecification();
    const routerTypeSpec = new RouterTypeSpecification();
    const amountSpec = new NetworkAmountSpecification();

    if (!cidrSpec.isSatisfiedBy(cidr)) throw new Error(`CIDR is below ${CIDRSpecification.MINIMUM_ALLOWED_CIRD}`);

    if (!availabilitySpec.isSatisfiedBy(router)) throw new Error('Address already exist');

    if (amountSpec.and(routerTypeSpec).isSatisfiedBy(router)) {
      const network = router.createNetwork(address, name, cidr);
      router.addNetworkToSwitch(network);
    }
  }
}
