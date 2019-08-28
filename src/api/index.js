import test1 from './test.api';

const apiModules = [test1];
const apiMapping = {};

apiModules.forEach((apiModule) => {
    Object.assign(apiMapping, apiModule);
});

export default apiMapping;
