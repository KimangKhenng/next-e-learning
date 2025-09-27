<template>
    <header class="sticky top-4 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full">
        <nav class="relative max-w-[66rem] w-full bg-white/90 backdrop-blur-md dark:bg-gray-900/90 border border-gray-200/50 dark:border-gray-700/50 rounded-[8px] py-3 ps-5 pe-2 md:flex md:items-center md:justify-between md:py-0 mx-2 lg:mx-auto shadow-lg transition-colors duration-300"
            aria-label="Global">
            <div class="flex items-center justify-between">
                <!-- Logo -->
                <NuxtLink class="flex-none text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
                    to="/">
                    <img class="h-10 rounded-md p-1" src="~/assets/img/tfd_logo.jpeg" alt="TFD Logo" />
                </NuxtLink>
                <!-- End Logo -->

                <!-- Mobile Toggle Button -->
                <div class="md:hidden">
                    <button @click="toggleMobileMenu" type="button"
                        class="size-8 flex justify-center items-center text-sm font-semibold rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white disabled:opacity-50 disabled:pointer-events-none transition-colors duration-300"
                        aria-label="Toggle navigation">
                        <svg v-if="!isMobileMenuOpen" class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="3" x2="21" y1="6" y2="6" />
                            <line x1="3" x2="21" y1="12" y2="12" />
                            <line x1="3" x2="21" y1="18" y2="18" />
                        </svg>
                        <svg v-else class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Desktop Navigation -->
            <div class="hidden md:block">
                <div class="flex flex-row items-center justify-end gap-x-7 ps-7">
                    <UNavigationMenu :items="navigationItems" color="neutral" variant="pill" :ui="{
                        link: 'text-base font-medium'
                    }" />

                    <div class="flex items-center gap-x-3">
                        <div class="flex space-x-1">
                            <ShadowButton v-if="status == 'unauthenticated'" icon="i-lucide-log-in" text="login"
                                color="bg-tfd" @on-click="openLogin" />
                            <ShadowButton v-if="status == 'unauthenticated'" icon="i-lucide-user-round-plus"
                                text="sign_up" color="bg-green-600" />
                            <ShadowButton v-if="status == 'authenticated'" icon="i-lucide-log-out" text="logout"
                                color="bg-red-600" @on-click="signOut" />
                        </div>
                        <DarkModeToggle />
                        <!-- <p> You are currently {{ status }}.</p>
                        <p>{{ data?.username }}</p> -->
                        <div class="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                            <button @click="setLocale('en')" :class="[
                                'flex items-center space-x-1 px-2 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors',
                                locale === 'en'
                                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600'
                            ]">
                                <NuxtImg src="/images/flags/uk.png" alt="English" width="20" height="14"
                                    :provider="config.app.buildId === 'dev' ? 'ipx' : 'cloudflare'" />
                                <span class="hidden sm:inline">{{ $t('english') }}</span>
                            </button>
                            <button @click="setLocale('km')" :class="[
                                'flex items-center space-x-1 px-2 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors',
                                locale === 'km'
                                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600'
                            ]">
                                <NuxtImg src="/images/flags/kh.png" alt="Khmer" width="20" height="14"
                                    :provider="config.app.buildId === 'dev' ? 'ipx' : 'cloudflare'" />
                                <span class="hidden sm:inline">{{ $t('khmer') }}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile Navigation -->
            <div v-show="isMobileMenuOpen"
                class="md:hidden overflow-hidden transition-all duration-300 basis-full grow mt-5">
                <div class="flex flex-col gap-y-4">
                    <UNavigationMenu :items="navigationItems" orientation="vertical" color="neutral" variant="pill" :ui="{
                        link: 'text-base font-medium'
                    }" />

                    <div class="flex flex-col gap-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div class="flex space-x-1">
                            <ShadowButton v-if="status.unauthenticated" icon="i-lucide-log-in" text="login"
                                color="bg-tfd" />
                            <ShadowButton v-if="status.unauthenticated" icon="i-lucide-user-round-plus" text="sign_up"
                                color="bg-green-600" />
                            <DarkModeToggle />
                            <p> You are currently {{ status }}.</p>
                            <p>{{ data?.username }}</p>
                        </div>
                        <div class="flex items-center justify-between">

                            <div class="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                                <button @click="setLocale('en')" :class="[
                                    'flex items-center space-x-1 px-2 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors',
                                    locale === 'en'
                                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600'
                                ]">
                                    <NuxtImg src="/images/flags/uk.png" alt="English" width="20" height="14"
                                        :provider="config.app.buildId === 'dev' ? 'ipx' : 'cloudflare'" />
                                    <span class="hidden sm:inline">{{ $t('english') }}</span>
                                </button>
                                <button @click="setLocale('km')" :class="[
                                    'flex items-center space-x-1 px-2 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors',
                                    locale === 'km'
                                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600'
                                ]">
                                    <NuxtImg src="/images/flags/kh.png" alt="Khmer" width="20" height="14"
                                        :provider="config.app.buildId === 'dev' ? 'ipx' : 'cloudflare'" />
                                    <span class="hidden sm:inline">{{ $t('khmer') }}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
const {
    status,
    data,
    lastRefreshedAt,
    token,
    refreshToken,
    getSession,
    signUp,
    signIn,
    signOut,
    refresh
} = useAuth()

import type { NavigationMenuItem } from '@nuxt/ui'

import { Login } from '#components'
const overlay = useOverlay()
const loginModal = overlay.create(Login)

async function openLogin() {
    const instance = loginModal.open({})
}

const { locale, setLocale } = useI18n()
const config = useRuntimeConfig()
const route = useRoute()

// Mobile menu state
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Close mobile menu on route change
watch(() => route.path, () => {
    isMobileMenuOpen.value = false
})

const navigationItems = computed<NavigationMenuItem[]>(() => [
    {
        label: $t('home'),
        to: '/',
        active: route.path === '/'
    },
    {
        label: $t('course'),
        to: '/courses',
        active: route.path.startsWith('/courses')
    },
    {
        label: $t('articles'),
        to: '/articles',
        active: route.path.startsWith('/articles')
    }
])
</script>