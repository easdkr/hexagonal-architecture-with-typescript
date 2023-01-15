import { RouterType } from './domain/vo/router.type.js';
import { RouterViewCliAdapter } from './framework/adapter/input/router-view.cli.adapter.js';

const cli = new RouterViewCliAdapter();
// const routers = await cli.obtainRelatedRouters(RouterType.EDGE);
// console.log(routers);

cli.obtainRelatedRouters(RouterType.EDGE).then((v) => console.log(v.toString()));
