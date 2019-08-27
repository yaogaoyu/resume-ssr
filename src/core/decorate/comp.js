/**
 * 标识组件的高阶函数, 自动帮组件注册reducer
 */

import ReducerRegister from 'core/redux/ReducerRegister';
import ParameterShouldNotNullException from 'core/exception/ParameterShouldNotNullException';
import ParameterNotMatchException from 'core/exception/ParameterNotMatchException';

/*
 * @param name 组件名(从props中取数据的名称)
 * @param reducer 组件对应的reducer
 */
export default (name, reducer) => {
    if (!name) throw new ParameterShouldNotNullException('@comp中组件名不能为空');
    if (!reducer) throw new ParameterShouldNotNullException('@comp中reducer不能为空');
    if (typeof reducer !== 'function' || !(reducer instanceof Object)) {
        throw new ParameterNotMatchException('@comp中reducer类型不匹配');
    }
    return (comp) => {
        comp.namespace = name;
        ReducerRegister.getInstance().registe(name, reducer);
    };
};
