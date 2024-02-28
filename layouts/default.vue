<script setup lang="ts"></script>

<template>
  <div class="container">
    <header>
      <nav class="nav">
        <NuxtLink to="/">
          Home
        </NuxtLink>
        <NuxtLink to="/characters">
          My Characters
        </NuxtLink>
      </nav>
    </header>

    <slot />

    <footer class="mt-1200 text-center">
      made with love by Any% Studios &copy; {{ new Date().getFullYear() }}
    </footer>
  </div>
</template>

<style lang="scss">
.nav {
  display: flex;
  gap: var(--space-0200);
  margin: var(--space-0300) 0;
}
</style>
