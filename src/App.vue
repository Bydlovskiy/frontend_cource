<template>
  <ElConfigProvider
    :locale="{
      name: locale,
      el: messages[locale]?.el as TElementPlus['TranslatePair']
    }"
  >
    <router-view />
    <Modals />
  </ElConfigProvider>
</template>

<script lang="ts" setup>
const { messages, locale } = useI18n()
</script>
