import { activeEffect } from "./effect";

/**
 * 为每个属性 收集他对应的effect依赖 如age 依赖于那几个effect
 * @param target
 * @param key
 */
export function track(target, key) {
    // activeEffect 有这个属性 说明这个key是在effect中访问的，没有说明在effect之外访问的不用进行收集
    if (activeEffect) {
        console.log(key, activeEffect);
    } else {
        console.log("no");
    }
}
