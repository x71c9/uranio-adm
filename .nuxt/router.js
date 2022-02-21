import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _43ade1c5 = () => interopDefault(import('../src/nuxt/pages/About.vue' /* webpackChunkName: "pages/About" */))
const _123958d8 = () => interopDefault(import('../src/nuxt/pages/Contact.vue' /* webpackChunkName: "pages/Contact" */))
const _fdba712e = () => interopDefault(import('../src/nuxt/pages/Custom.vue' /* webpackChunkName: "pages/Custom" */))
const _5273c18e = () => interopDefault(import('../src/nuxt/pages/urn-admin/index.vue' /* webpackChunkName: "pages/urn-admin/index" */))
const _46c76583 = () => interopDefault(import('../src/nuxt/pages/urn-admin/medias.vue' /* webpackChunkName: "pages/urn-admin/medias" */))
const _246117cc = () => interopDefault(import('../src/nuxt/pages/urn-admin/shared.ts' /* webpackChunkName: "pages/urn-admin/shared" */))
const _50bd2046 = () => interopDefault(import('../src/nuxt/pages/urn-admin/_slug.vue' /* webpackChunkName: "pages/urn-admin/_slug" */))
const _17f0cf06 = () => interopDefault(import('../src/nuxt/pages/urn-admin/_atom/new.vue' /* webpackChunkName: "pages/urn-admin/_atom/new" */))
const _41219027 = () => interopDefault(import('../src/nuxt/pages/urn-admin/_atom/_slug.vue' /* webpackChunkName: "pages/urn-admin/_atom/_slug" */))
const _2818c6ac = () => interopDefault(import('../src/nuxt/pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'urn-active-link',
  linkExactActiveClass: 'urn-exact-active-link',
  scrollBehavior,

  routes: [{
    path: "/About",
    component: _43ade1c5,
    pathToRegexpOptions: {"strict":true},
    name: "About"
  }, {
    path: "/Contact",
    component: _123958d8,
    pathToRegexpOptions: {"strict":true},
    name: "Contact"
  }, {
    path: "/Custom",
    component: _fdba712e,
    pathToRegexpOptions: {"strict":true},
    name: "Custom"
  }, {
    path: "/urn-admin",
    component: _5273c18e,
    pathToRegexpOptions: {"strict":true},
    name: "urn-admin"
  }, {
    path: "/urn-admin/medias",
    component: _46c76583,
    pathToRegexpOptions: {"strict":true},
    name: "urn-admin-medias"
  }, {
    path: "/urn-admin/shared",
    component: _246117cc,
    pathToRegexpOptions: {"strict":true},
    name: "urn-admin-shared"
  }, {
    path: "/urn-admin/:slug?",
    component: _50bd2046,
    pathToRegexpOptions: {"strict":true},
    name: "urn-admin-slug"
  }, {
    path: "/urn-admin/:atom?/new",
    component: _17f0cf06,
    pathToRegexpOptions: {"strict":true},
    name: "urn-admin-atom-new"
  }, {
    path: "/urn-admin/:atom?/:slug",
    component: _41219027,
    pathToRegexpOptions: {"strict":true},
    name: "urn-admin-atom-slug"
  }, {
    path: "/",
    component: _2818c6ac,
    pathToRegexpOptions: {"strict":true},
    name: "index"
  }],

  parseQuery: function(q) {
      return require('qs').parse(q);
    },
  stringifyQuery: function(q) {
      const r = require('qs').stringify(q);
      return r ? '?' + r : '';
    },
  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
