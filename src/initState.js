import {observer} from  "./observer/index"
export function initState(vm){
    let opts = vm.$options
    if(opts){
        console.log(opts)
        if(opts.data){
            initData(vm)
        }
    }
}

function initData(vm){
    let data =vm.$options.data
    data = vm._data = typeof data === "function"?data.call(this):data
    observer(data)
}