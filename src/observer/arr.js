let oldArrayProtoMethods = Array.prototype

export let ArrayMethods = Object.create(oldArrayProtoMethods)

let methods = [
    'push',
    'pop',
    'unshift',
    'shift',
    'splice'
]

methods.forEach(item=>{
    ArrayMethods[item] = function(...arg){
        console.log("操作数组了")
        let result = oldArrayProtoMethods[item].apply(this,arg)
        let inserted
        switch (item) {
            case 'push':
            case 'unshift':
                inserted = arg
                break;
            case 'splice':
                inserted = arg.splice(2)
            default:
                break;
        }
        if(inserted){
            this.__ob__.observerArray(inserted)
        }
        return result
    }
})