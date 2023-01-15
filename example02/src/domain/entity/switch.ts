import { IP } from '../vo/ip.js';
import { Network } from '../vo/network.js';
import { SwitchId } from '../vo/switch.id.js';
import { SwitchType } from '../vo/switch.type.js';

export class Switch {
  public constructor(private _type: SwitchType, private _id: SwitchId, private _networks: Network[], private _address: IP) {}

  public addNetwork(network: Network): Switch {
    const networks = [...this._networks, network];
    return new Switch(this._type, this._id, networks, this._address);
  }

  public getNetworks(): Network[] {
    const copied = [...this._networks];
    return copied;
  }
}
