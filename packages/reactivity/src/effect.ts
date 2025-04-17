export function effect(fn, options?) {
    //创建响应式effec 数据变化后 effect可以重新执行
    const _effect = new ReactiveEffect(fn, () => {
        _effect.run();
    });

    //默认执行一次
    _effect.run();

    return _effect;
}

export let activeEffect;
class ReactiveEffect {
    public active = true; // 创建的effect是响应式的
    constructor(public fn, public scheduler) {}

    run() {
        if (!this.active) {
            return this.fn();
        }
        let lastEffect = activeEffect;

        //当effect执行完后，要将activeEffect清除
        try {
            //给proxy 用于收集effect的依赖
            activeEffect = this;
            return this.fn();
        } finally {
            // console.log(lastEffect)
            activeEffect = lastEffect;
        }
    }
}
