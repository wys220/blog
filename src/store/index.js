import Vuex from 'vuex'
import getters from './getters'

const files = import.meta.globEager('./modules/*.js')
const modules = Object.keys(files).reduce((pre, i) => {
    let name = i.replace(/\.|\/|modules|js/g, '')
    pre[name] = files[i].default
    return pre
}, {})

const store = new Vuex.Store({
    modules,
    getters
})

export default store
