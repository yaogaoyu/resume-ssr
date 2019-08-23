/*
 * 定义Reducer注册中心
 */


export default class ReducerRegister {
    reducers = {};

    /*
     * 注册Rester
     */
    registe(name, reducer) {
        this.reducers[name] = reducer;
    }

    /**
     * 单例
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new ReducerRegister();
        }
        return this.instance;
    }
}
