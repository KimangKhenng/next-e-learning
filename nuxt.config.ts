// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { date } from "yup";

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@sidebase/nuxt-auth'
  ],
  auth: {
    // originEnvKey: process.env.API_URL || 'http://localhost:80',
    baseURL: 'http://localhost:3000/api/auth',
    // originEnvKey: 'AUTH_ORIGIN',
    // provider: {
    //   type: 'local',
    //   endpoints: {
    //     signIn: { path: '/v1/auth/login', method: 'post' },
    //     signOut: { path: '/v1/auth/logout', method: 'get' },
    //     signUp: { path: '/v1/auth/register', method: 'post' },
    //     getSession: { path: '/v1/auth/me', method: 'get' },
    //   },
    //   token: {
    //     signInResponseTokenPointer: '/accessToken',
    //     type: 'Bearer',
    //     headerName: 'Authorization',
    //     maxAgeInSeconds: 1800,
    //     sameSiteAttribute: 'strict',
    //     // cookieDomain: 'sidebase.io',
    //     // secureCookieAttribute: false,
    //     // httpOnlyCookieAttribute: false,
    //   },
    //   refresh: {
    //     isEnabled: true,
    //     endpoint: { path: '/v1/auth/refresh', method: 'get' },
    //     refreshOnlyToken: true,
    //     token: {
    //       signInResponseRefreshTokenPointer: '/refreshToken',
    //       refreshResponseTokenPointer: '/refreshToken',
    //       refreshRequestTokenPointer: '/refreshToken',
    //       cookieName: 'auth.token',
    //       maxAgeInSeconds: 1800,
    //       sameSiteAttribute: 'strict',
    //       // secureCookieAttribute: false,
    //       // cookieDomain: 'sidebase.io',
    //       // httpOnlyCookieAttribute: false,
    //     }
    //   },
    //   session: {
    //     dataType: {
    //       id: 'string | number',
    //       firstname: 'string',
    //       lastname: 'string',
    //       createdDate: 'string',
    //       updatedDate: 'string',
    //       deletedDate: 'string | null',
    //       username: 'string',
    //       email: 'string',
    //       dateOfBirth: 'string | null',
    //       status: 'string',
    //       registrationType: 'string',
    //       role: ['string'],
    //     },
    //   },
    // }
    provider: {
      type: 'authjs',
    }
  },
  runtimeConfig: {
    authSecret: process.env.NUXT_AUTH_SECRET,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    facebookClientSecret: process.env.FACEBOOK_APP_SECRET || '',
    public: {
      apiBase: process.env.API_URL || 'http://localhost:80',
      googleClientId: process.env.GOOGLE_CLIENT_ID || '',
      googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL || '',
      facebookAppId: process.env.FACEBOOK_APP_ID || '',
      facebookCallbackUrl: process.env.FACEBOOK_CALLBACK_URL || '',
      githubClientId: process.env.GITHUB_CLIENT_ID || '',
      githubCallbackUrl: process.env.GITHUB_CALLBACK_URL || '',
    }
  },
  css: ['~/assets/css/tailwind.css'],
  colorMode: {
    preference: 'system',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'km',
    langDir: 'locales/',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'km', name: 'Khmer', file: 'km.json' }
    ]
  },
  googleFonts: {
    families: {
      "Roboto": true,
      "Source Sans Pro": true,
      'Kantumruy Pro': true,
      'Playfair Display': true
    }
  }
})
