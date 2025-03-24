import { isObject } from "@vue/shared";

const reactiveMap = new WeakMap();
enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
}
const mutableHandler: ProxyHandler<any> = {
  get(target, key, recivier) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true;
    }
  },
  set(target, key, value, recivier) {
    return true;
  },
};
export function reactive(target) {
  return createReactiveObject(target);
}

function createReactiveObject(target) {
  if (!isObject(target)) {
    return;
  }
  //触发get 被代理过了，直接返回
  if (target[ReactiveFlags.IS_REACTIVE]) {
    return target;
  }
  const existReactive = reactiveMap.get(target);
  if (existReactive) {
    return existReactive;
  }
  let proxy = new Proxy(target, mutableHandler);
  reactiveMap.set(target, proxy);
  return proxy;
}
