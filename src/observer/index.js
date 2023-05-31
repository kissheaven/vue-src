import {ArrayMethods} from './arr'
export function observer(data){
    if(typeof data !="object" || data  == null){
        return data
    }else{
        return new Observer(data)
    }
}

class Observer{
    constructor(data){
        Object.defineProperty(data,"__ob__",{
            enumerable:false,
            value:this
        })
        if(Array.isArray(data)){
            data.__proto__= ArrayMethods
            this.observerArray(data)
        }else{
            this.walk(data)
        }
        
    }
    walk(data){
        let keys = Object.keys(data)
        for(let i =0;i<keys.length;i++){
            let key = keys[i]
            let value = data[key]
            defineReactive(data,key,value)
        }
    }
    observerArray(data){
        for(let i =0;i<data.length;i++){
            observer(data[i])
        }
    }

}

function defineReactive(data,key,value){
    observer(value)
    Object.defineProperty(data,key,{
        get(){
            return value
        },
        set(newValue){
            observer(newValue)
            console.log(newValue)
            value = newValue
        }
    })
}