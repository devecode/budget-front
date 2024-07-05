// src/directives/permission.js
import { nextTick } from 'vue'
import { useUserStore } from 'stores/user'

export default {
  async beforeMount(el, binding) {
    await nextTick()
    const { value } = binding
    const userStore = useUserStore()

    if (Array.isArray(value) && value.length > 0) {
      const permissionRoles = value.map(Number)

      const hasPermission = permissionRoles.includes(userStore.user?.role_id)

      if (!hasPermission) {
        el.style.display = 'none'
      }
    } else {
      throw new Error(`need roles! Like v-permission="['1','2']"`)
    }
  },
}
