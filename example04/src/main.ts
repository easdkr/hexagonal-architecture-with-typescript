import { createInterface } from 'readline/promises';
import { RouterNetworkInputPort } from 'src/application/port/input/router-network.input-port';
import { RouterNetworkCLIAdapter } from 'src/framework/adapter/input/stdin/router-network.cli.adapter';
import { routerNetworkFileAdapter } from 'src/framework/adapter/output/router-network.file.adapter';

async function main(): Promise<void> {
  const usecase = new RouterNetworkInputPort(routerNetworkFileAdapter);
  const routerNetworkCliAdapter = new RouterNetworkCLIAdapter(usecase);
  await routerNetworkCliAdapter.processRequest(createInterface({ input: process.stdin, output: process.stdout }));
}

main();
