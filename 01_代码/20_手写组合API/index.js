
function createGetter(shallow = false) {
    return function get(target, key) {
        const result = Reflect.get(target, key)
        console.log ('数据获取拦截', result)

        if (shallow) {
            return result
        }        
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return result && typeof result === 'object' ? reactive(result) : result
    }
}

function createSetter() {
    return function get(target, key, value) {
        const result = Reflect.set(target, key, value)
        console.log ('数据更改拦截', result)
        return result
    }
}

function createDeleteProperty() {
    return function get(target, key) {
        const result = Reflect.deleteProperty(target, key)
        console.log ('数据删除拦截')
        return result
    }
}

const shallowGet = createGetter(true)
const get = createGetter()
const set = createSetter()
const deleteProperty = createDeleteProperty()

const shallowReactiveHandler = {
    get: shallowGet,
    set,
    deleteProperty
}

const reactiveHandler = {
    get,
    set,
    deleteProperty
}

const readonlyHandler = {
    get,
    set(target, key) {
        console.warn(
            `Set operation on key "${String(key)}" failed: target is readonly.`,
            target
        )
        return true
    },
    deleteProperty(target, key) {
        console.warn(
            `Delete operation on key "${String(key)}" failed: target is readonly.`,
            target
        )
        return true
    }
}

const shallowReadonlyHandler = {
    get: shallowGet,
}

/**
 * 自定义shallowReactive
 */
function shallowReactive(obj) {
    if (obj && typeof obj === 'object') {
        return new Proxy(obj, shallowReactiveHandler)
    }
}

const reactiveMap = new WeakMap()

/**
 * 自定义 reactive
 */
function reactive(obj) {
    if (obj && typeof obj === 'object') {
        const existingProxy = reactiveMap.get(obj)
        if (existingProxy) {
            return existingProxy
        }
        const proxy = new Proxy(obj, reactiveHandler)
        reactiveMap.set(obj, proxy)
        return proxy
    }
}

/**
 * 自定义shallowReadonly
 */
function shallowReadonly(obj) {
    if (obj && typeof obj === 'object') {
        return new Proxy(obj, shallowReadonlyHandler)
    }
}

/**
 * 自定义 readonly
 */
function readonly(obj) {
    if (obj && typeof obj === 'object') {
        return new Proxy(obj, readonlyHandler)
    }
}

/**
 * 自定义shallowRef函数
 */
function shallowRef(target) {
    return {
        _value: target,
        get value() {
            console.log('劫持到了读取数据')
            return this._value
        },
        set value(val) {
            console.log('劫持到了修改数据，准备更新界面', val)
            this._value = val
        }
    }
}

/**
 * 自定义ref函数
 */
function ref(target) {
    const _rawValue = target && typeof target === 'object' ? reactive(target) : target
    return {
        _value: _rawValue,
        get value() {
            console.log('劫持到了读取数据')
            return this._value
        },
        set value(val) {
            console.log('劫持到了修改数据，准备更新界面', val)
            this._value = val
        }
    }
}

const user = shallowReactive({
    name: '李明',
    age: 20,
    car: {
        name: '奔驰'
    }
})

const userInfo = reactive({
    name: '李明',
    age: 20,
    car: {
        name: '奔驰'
    }
})

// shallowReactive
console.log (user.name)

user.car.name = '宝马'

console.log (user)

delete user.car.name

// reactive
console.log (userInfo.car.name )


userInfo.car.name += '1'

delete userInfo.car.name

console.log (userInfo)

console.log ('------------shallowReadonly----------------------')

const user3 = shallowReadonly({
    name: '李明',
    age: 20,
    car: {
        name: '奔驰'
    }
})

user3.car.name = ''

console.log ('------------readonly----------------------')

const user4 = readonly({
    name: '李明',
    age: 20,
    car: {
        name: '奔驰'
    }
})

user4.name

console.log ('-------------------shallowRef---------------------------')

const user5 = shallowRef({
    name: '李明',
    age: 20,
    car: {
        name: '奔驰'
    }
})
console.log(user5.value.name)

const user6 = shallowRef('李明')

user6.value = '王五'


console.log ('-------------------ref---------------------------')

const user7 = ref({
    name: '李明',
    age: 20,
    car: {
        name: '奔驰'
    }
})
console.log(user7.value.name)

user7.value.car.name = '李明'


const user8 = ref('李明')
console.log(user8.value)

user8.value = '中国'