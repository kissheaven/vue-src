(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

    function observer(data){
        if(typeof data !="object" || data  == null){
            return data
        }else {
            return new Observer(data)
        }
    }

    class Observer{
        constructor(data){
            this.walk(data);
        }
        walk(data){
            let keys = Object.keys(data);
            for(let i =0;i<keys.length;i++){
                let key = keys[i];
                let value = data[key];
                defineReactive(data,key,value);
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
