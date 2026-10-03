<script setup>
import { ref } from "vue";

const view = ref("public");
</script>

<template>
  <div class="app">
    <header class="nav">
      <strong>Appardas</strong>
      <nav>
        <button :class="{ active: view === 'public' }" @click="view = 'public'">
          Public
        </button>
        <button
          :class="{ active: view === 'internal' }"
          @click="view = 'internal'"
        >
          Internal
        </button>
      </nav>
    </header>

    <main v-if="view === 'public'" class="view">
      <h1>Public landing page</h1>
      <p>Company, products, and team — visible to everyone.</p>
    </main>

    <main v-else class="view">
      <h1>Internal dashboard</h1>
      <p>Administrative and employee view.</p>
    </main>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    sans-serif;
  color: #101828;
  background: #f6f8fc;
}

.app {
  min-height: 100vh;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: #fff;
  border-bottom: 1px solid #e4e7ec;
}

.nav nav {
  display: flex;
  gap: 8px;
}

.nav button {
  padding: 8px 16px;
  border: 1px solid #e4e7ec;
  border-radius: 999px;
  background: #fff;
  font: inherit;
  cursor: pointer;
}

.nav button.active {
  background: #4f46e5;
  border-color: #4f46e5;
  color: #fff;
}

.view {
  max-width: 720px;
  margin: 0 auto;
  padding: 64px 24px;
}
</style>
