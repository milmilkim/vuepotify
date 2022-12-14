import { getAccessorFromStore } from 'typed-vuex'

import { createStore } from '/Users/sorikim/project/type-nuxt-project/.nuxt/store'

const storeAccessor = getAccessorFromStore(createStore())

export default async ({ store }, inject) => {
  inject('accessor', storeAccessor(store))
}
