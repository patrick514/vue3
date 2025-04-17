import { isObject } from "@vue/shared";
import { mutableHandler, ReactiveFlags } from "./baseHandler";

//记录reactive 键值对为 目标对象 ： 代理
const reactiveMap = new WeakMap();




function createReactiveObject(target) {
    if (!isObject(target)) {
        return;
    }
    //触发get 被代理过了，直接返回
    if (target[ReactiveFlags.IS_REACTIVE]) {
        return target;
    }
    //有缓存
    const existReactive = reactiveMap.get(target);
    if (existReactive) {
        return existReactive;
    }
    let proxy = new Proxy(target, mutableHandler);
    reactiveMap.set(target, proxy);
    return proxy;
}

export function reactive(target) {
    return createReactiveObject(target);
}
