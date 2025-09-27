<template>
    <IntroValue />
    <Client />
    <Testimonial />
    <PlatformInfo />
    <Approach />
    <ReachUs />
</template>
<script setup lang="ts">
definePageMeta({
    auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/' }
})
</script>