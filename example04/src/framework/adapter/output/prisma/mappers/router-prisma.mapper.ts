import { IPData, Prisma, ProtocolData, RouterTypeData, SwitchTypeData } from '@prisma/client';
import { Router } from 'src/domain/entity/router';
import { Switch } from 'src/domain/entity/switch';
import { IP } from 'src/domain/vo/ip';
import { Network } from 'src/domain/vo/network';
import { Protocol } from 'src/domain/vo/protocol';
import { RouterId } from 'src/domain/vo/router.id';
import { RouterType } from 'src/domain/vo/router.type';
import { SwitchId } from 'src/domain/vo/switch.id';
import { SwitchType } from 'src/domain/vo/switch.type';
import { NetworkDataType, RouterDataType } from 'src/framework/adapter/output/prisma/types/index';

export class RouterPrismaMapper {
  public static toDomain(routerData: RouterDataType): Router {
    const routerType = RouterType[routerData.type];
    const routerId = RouterId.withId(routerData.id);
    const switchId = SwitchId.withId(routerData.networkSwitch.id);
    const switchType = SwitchType[routerData.networkSwitch.type];
    const ip = IP.fromAddress(routerData.networkSwitch.ip.address);
    const networks = RouterPrismaMapper._getNetworksFromData(routerData.networkSwitch.networks);

    const networkSwitch = new Switch(switchType, switchId, networks, ip);
    return new Router(routerType, routerId, networkSwitch);
  }

  public static toPrisma(router: Router): Prisma.RouterDataCreateInput {
    const routerDataType = RouterTypeData[RouterType[router.type]];
    const routerDataId = router.routerId.toString();
    const switchDataId = router.networkSwitch.id;
    const switchTypeData = SwitchTypeData[SwitchType[router.networkSwitch.type]];
    const ipData: IPData = {
      address: router.networkSwitch.address.address,
      protocol: ProtocolData[Protocol[router.networkSwitch.address.protocol]],
    };

    const networkDataList = this._getNetworksFromDomain(router.networkSwitch.getNetworks());

    return {
      id: routerDataId,
      type: routerDataType,
      networkSwitch: {
        create: {
          id: switchDataId.toString(),
          type: switchTypeData,
          ip: {
            create: ipData,
          },
          networks: {
            create: networkDataList,
          },
        },
      },
    };
  }

  private static _getNetworksFromData(networkData: NetworkDataType[]): Network[] {
    return networkData.map(({ ip: { address }, name, cidr }) => new Network(IP.fromAddress(address), name, cidr));
  }

  private static _getNetworksFromDomain(networks: Network[]): Prisma.NetworkDataCreateWithoutSwitchInput[] {
    return networks.map<Prisma.NetworkDataCreateWithoutSwitchInput>(({ cidr, address: { address, protocol }, name }) => ({
      cidr,
      name,
      ip: {
        create: {
          address,
          protocol: ProtocolData[Protocol[protocol]],
        },
      },
    }));
  }
}
