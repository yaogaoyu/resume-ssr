/**
 * 使用webpack api 加载api目录下的接口配置
 */

// import { ApiMapping } from 'core/api';

const context = require.context('../api', false, /\.api.js$/);
const mappings = {};
context.keys().forEach((file) => {
    const mapping = context(file);
    // ApiMapping.addMapping(mapping);
    Object.assign(mappings, mapping.default);
});

export default mappings;
