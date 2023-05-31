(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

    let oldArrayProtoMethods = Array.prototype;

    let ArrayMethods = Object.create(oldArrayProtoMethods);

    let methods = [
        'push',
        'pop',
        'unshift',
        'shift',
        'splice'
    ];

    methods.forEach(item=>{
        ArrayMethods[item] = function(...arg){
            console.log("操作数组了");
            let result = oldArrayProtoMethods[item].apply(this,arg);
            let inserted;
            switch (item) {
                case 'push':
                case 'unshift':
                    inserted = arg;
                    break;
                case 'splice':
                    inserted = arg.splice(2);
            }
            if(inserted){
                this.__ob__.observerArray(inserted);
            }
            return result
        };
    });

    function observer(data){
        if(typeof data !="object" || data  == null){
            return data
        }else {
            return new Observer(data)
        }
    }

    class Observer{
        constructor(data){
            Object.defineProperty(data,"__ob__",{
                enumerable:false,
                value:this
            });
            if(Array.isArray(data)){
                data.__proto__= ArrayMethods;
                this.observerArray(data);
            }else {
                this.walk(data);
            }
            
        }
        walk(data){
            let keys = Object.keys(data);
            for(let i =0;i<keys.length;i++){
                let key = keys[i];
                let value = data[key];
                defineReactive(data,key,value);
            }
        }
        observerArray(data){
            for(let i =0;i<data.length;i++){
                observer(data[i]);
            }
        }

    }

    function defineReactive(data,key,value){
        observer(value);
        Object.defineProperty(data,key,{
            get(){
                return value
            },
            set(newValue){
                observer(newValue);
                console.log(newValue);
                value = newValue;
            }
        });
    }

    function initState(vm){
        let opts = vm.$options;
        if(opts){
            console.log(opts);
            if(opts.data){
                initData(vm);
            }
        }
    }

    function initData(vm){
        let data =vm.$options.data;
        data = vm._data = typeof data === "function"?data.call(this):data;
        observer(data);
    }

    function initMixin(Vue){
        Vue.prototype._init = function(options){
            console.log(options);
            let vm = this;
            vm.$options = options;
            initState(vm);
        };
    }

    function Vue (options) {
      this._init(options);

    }

    initMixin(Vue);

    return Vue;

}));
//# sourceMappingURL=vue.js.map
