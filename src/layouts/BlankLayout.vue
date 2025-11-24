<template>
  <div class="top-0 left-0 right-0 fixed z-50 h-12 bg-primary flex">
    <router-link
      class="p-2 text-white flex-1"
      :class="{ 'font-semibold': $route.name === $routeNames.posts }"
      :to="{ name: $routeNames.posts }"
    >
      Posts
    </router-link>

    <router-link
      class="p-2 text-white flex-1"
      :class="{ 'font-semibold': $route.name === $routeNames.users }"
      :to="{ name: $routeNames.users }"
    >
      Users
    </router-link>

    <router-link
      class="p-2 text-white flex-1"
      :class="{ 'font-semibold': $route.name === $routeNames.tags }"
      :to="{ name: $routeNames.tags }"
    >
      Tags
    </router-link>
  </div>
  <router-view class="pt-14" />
</template>
