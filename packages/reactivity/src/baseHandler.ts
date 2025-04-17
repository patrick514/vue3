import { activeEffect } from "./effect";
import { track } from "./reactiveEffect";

export enum ReactiveFlags {
    IS_REACTIVE = "__v_isReactive",
}
export const mutableHandler: ProxyHandler<any> = {
    get(target, key, recivier) {
        if (key === ReactiveFlags.IS_REACTIVE) {
            return true;
        }

        // console.log(activeEffect, key);
        track(target, key); // 收集这个对象上的这个属性，和effect关联在一起
        return Reflect.get(target, key, recivier);
    },
    set(target, key, value, recivier) {
        return Reflect.set(target, key, value, recivier);
    },
};
