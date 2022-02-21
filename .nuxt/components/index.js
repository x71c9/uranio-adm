export { default as AtomNav } from '../../src/nuxt/components/AtomNav.vue'
export { default as Empty } from '../../src/nuxt/components/Empty.vue'
export { default as Error } from '../../src/nuxt/components/Error.vue'
export { default as Property } from '../../src/nuxt/components/Property.vue'
export { default as Raw } from '../../src/nuxt/components/Raw.vue'
export { default as Uploader } from '../../src/nuxt/components/Uploader.vue'
export { default as FormAtom } from '../../src/nuxt/components/Form/Atom.vue'
export { default as PropertyATOM } from '../../src/nuxt/components/Property/ATOM.vue'
export { default as PropertyATOMARRAY } from '../../src/nuxt/components/Property/ATOMARRAY.vue'
export { default as PropertyBINARY } from '../../src/nuxt/components/Property/BINARY.vue'
export { default as PropertyDAY } from '../../src/nuxt/components/Property/DAY.vue'
export { default as PropertyEMAIL } from '../../src/nuxt/components/Property/EMAIL.vue'
export { default as PropertyENCRYPTED } from '../../src/nuxt/components/Property/ENCRYPTED.vue'
export { default as PropertyENUM } from '../../src/nuxt/components/Property/ENUM.vue'
export { default as PropertyFLOAT } from '../../src/nuxt/components/Property/FLOAT.vue'
export { default as PropertyHIDDEN } from '../../src/nuxt/components/Property/HIDDEN.vue'
export { default as PropertyINTEGER } from '../../src/nuxt/components/Property/INTEGER.vue'
export { default as PropertyLONGTEXT } from '../../src/nuxt/components/Property/LONGTEXT.vue'
export { default as PropertyReadOnly } from '../../src/nuxt/components/Property/ReadOnly.vue'
export { default as PropertySET } from '../../src/nuxt/components/Property/SET.vue'
export { default as PropertyTEXT } from '../../src/nuxt/components/Property/TEXT.vue'
export { default as PropertyTIME } from '../../src/nuxt/components/Property/TIME.vue'
export { default as ModalAtom } from '../../src/nuxt/components/Modal/Atom.vue'
export { default as UIAllBodyHeader } from '../../src/nuxt/components/UI/AllBodyHeader/AllBodyHeader.vue'
export { default as UIArrayInspector } from '../../src/nuxt/components/UI/ArrayInspector/ArrayInspector.vue'
export { default as UIAllTable } from '../../src/nuxt/components/UI/AllTable/AllTable.vue'
export { default as UIButton } from '../../src/nuxt/components/UI/Button/Button.vue'
export { default as UICheckbox } from '../../src/nuxt/components/UI/Checkbox/Checkbox.vue'
export { default as UIGroup } from '../../src/nuxt/components/UI/Group/Group.vue'
export { default as UINotification } from '../../src/nuxt/components/UI/Notification/Notification.vue'
export { default as UIObjectInspector } from '../../src/nuxt/components/UI/ObjectInspector/ObjectInspector.vue'
export { default as UIPagination } from '../../src/nuxt/components/UI/Pagination/Pagination.vue'
export { default as UIRadioButton } from '../../src/nuxt/components/UI/RadioButton/RadioButton.vue'
export { default as UIRadioGroup } from '../../src/nuxt/components/UI/RadioGroup/RadioGroup.vue'
export { default as UISectionHeader } from '../../src/nuxt/components/UI/Section/Header.vue'
export { default as UISectionSideBar } from '../../src/nuxt/components/UI/Section/SideBar.vue'
export { default as UISectionSideBarBody } from '../../src/nuxt/components/UI/Section/SideBarBody.vue'
export { default as UISectionSideBarFooter } from '../../src/nuxt/components/UI/Section/SideBarFooter.vue'
export { default as UISectionSideBarHeader } from '../../src/nuxt/components/UI/Section/SideBarHeader.vue'
export { default as UISideBarEntry } from '../../src/nuxt/components/UI/SideBarEntry/SideBarEntry.vue'
export { default as UISideBarLabel } from '../../src/nuxt/components/UI/SideBarLabel/SideBarLabel.vue'

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
