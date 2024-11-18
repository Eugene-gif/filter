<script setup>
  import { ref } from "vue";

  const iconTheme = ref("pi pi-moon");

  if (document.documentElement.classList.contains("dark-theme")) {
    iconTheme.value = "pi pi-sun";
  }

  function toggleDarkMode() {
    document.documentElement.classList.toggle("dark-theme");

    if (document.documentElement.classList.contains("dark-theme")) {
      iconTheme.value = "pi pi-sun";
    } else {
      iconTheme.value = "pi pi-moon";
    }
  }
</script>

<template>
  <header class="header">
    <div class="header-wrapper">
      <h2>Тестовое для Rocket Science</h2>
      <Button
        size="small"
        severity="success"
        :icon="iconTheme"
        @click="toggleDarkMode()"
      />
    </div>
  </header>
</template>

<style lang="css" scoped>
  .header {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 2;
    background-color: var(--l-content-background);
    box-shadow: 0px 0px 1px 0px;
    padding: 15px 0;

    /* @media (width < 768px) {} */
  }

  .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;

    @media (width < 768px) {
      padding: 0 15px;
    }
  }

  .header-logo {
    max-width: 50px;
    margin-right: 10px;
  }
</style>
