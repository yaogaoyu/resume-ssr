import test1 from './test.api';
import test2 from './test2.api';

const apiModules = [test1, test2];
const apiMapping = {};

apiModules.forEach((apiModule) => {
    Object.assign(apiMapping, apiModule);
});

export default apiMapping;
