const person = {
    name: "jw",
    get aliasName() {
        return this.name + "handsome";
    },
};
/**
 * 不用reflect this是指向原始对象即person的，而不是代理对象，所以this.name的getter不会生效
 * 所以用reflect 传递 代理对象的this
 */
let proxyPerson = new Proxy(person, {
    //   target
    // 目标对象。

    // property
    // 被获取的属性名。

    // receiver
    // Proxy 或者继承 Proxy 的对象
    get(target, key, recevier) {
        // recevier 是代理对象
        console.log(recevier);
        // return target[key];
        //它会正确传递 receiver 作为 getter 中的 this 值
        // 这样在访问 this.name 时也会触发代理的 get 陷阱
        return Reflect.get(target, key, recevier); // (recevier[key]);
        // // person.name 不会触发get
    },
});

console.log(proxyPerson.aliasName);
