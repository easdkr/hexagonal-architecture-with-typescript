import { PrismaClient } from '@prisma/client';
import { RouterNetworkOutputPort } from 'src/application/port/output/router-network.output-port';
import { Router } from 'src/domain/entity/router';
import { RouterId } from 'src/domain/vo/router.id';
import { RouterPrismaMapper } from 'src/framework/adapter/output/prisma/mappers/router-prisma.mapper';
import { prisma } from 'src/framework/adapter/output/prisma/prisma';

class RouterNetworkPrismaAdapter implements RouterNetworkOutputPort {
  constructor(private readonly _prisma: PrismaClient) {}

  async fetchRouterById(routerId: RouterId): Promise<Router> {
    const routerData = await this._prisma.routerData.findFirst({
      where: {
        id: routerId.toString(),
      },
      include: {
        networkSwitch: {
          include: {
            networks: {
              include: {
                ip: true,
              },
            },
            ip: true,
          },
        },
      },
    });
    return RouterPrismaMapper.toDomain(routerData);
  }

  async persistRouter(router: Router): Promise<boolean> {
    const routerData = RouterPrismaMapper.toPrisma(router);
    await this._prisma.routerData.create({
      data: routerData,
    });

    return true;
  }
}

export const routerNetworkPrismaAdapter = new RouterNetworkPrismaAdapter(prisma);
