// packages/reactivity/src/effect.ts
function effect() {
}

// packages/shared/src/index.ts
function isObject(value) {
  return typeof value === "object" && value !== null;
}

// packages/reactivity/src/reactive.ts
var reactiveMap = /* @__PURE__ */ new WeakMap();
var mutableHandler = {
  get(target, key, recivier) {
    if (key === "__v_isReactive" /* IS_REACTIVE */) {
      return true;
    }
  },
  set(target, key, value, recivier) {
    return true;
  }
};
function reactive(target) {
  return createReactiveObject(target);
}
function createReactiveObject(target) {
  if (!isObject(target)) {
    return;
  }
  if (target["__v_isReactive" /* IS_REACTIVE */]) {
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
export {
  effect,
  reactive
};
//# sourceMappingURL=reactivity.js.map
