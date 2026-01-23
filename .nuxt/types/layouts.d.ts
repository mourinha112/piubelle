import _default from "C:/Users/Mourinha/Desktop/piubelle/layouts/default.vue";
import painel from "C:/Users/Mourinha/Desktop/piubelle/layouts/painel.vue";
import type { ComputedRef, MaybeRef } from 'vue'
declare module 'nuxt/app' {
  interface NuxtLayouts {
    'default': InstanceType<typeof _default>['$props'],
    'painel': InstanceType<typeof painel>['$props'],
}
  export type LayoutKey = keyof NuxtLayouts extends never ? string : keyof NuxtLayouts
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}