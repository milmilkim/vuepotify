export { default as ItemList } from '../../components/ItemList.vue'
export { default as ItemSearch } from '../../components/ItemSearch.vue'
export { default as MyModal } from '../../components/MyModal.vue'
export { default as MyPlaylist } from '../../components/MyPlaylist.vue'
export { default as MyProfile } from '../../components/MyProfile.vue'
export { default as NuxtLogo } from '../../components/NuxtLogo.vue'
export { default as PlaylistItem } from '../../components/PlaylistItem.vue'
export { default as Tutorial } from '../../components/Tutorial.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
