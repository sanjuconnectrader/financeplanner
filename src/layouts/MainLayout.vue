<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Sidebar -->
    <SidebarNav v-model="leftDrawerOpen" />

    <!-- Top Navbar -->
    <TopNavbar
      title="Clients"
      @toggleLeft="toggleLeftDrawer"
    />

    <!-- Page Content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, watchEffect, watch } from "vue";
import { useQuasar } from "quasar";

import SidebarNav from "components/navigation/SidebarNav.vue";
import TopNavbar from "components/navigation/TopNavbar.vue";

const $q = useQuasar();

/**
 * ✅ Desktop: open by default
 * ✅ Mobile: closed by default
 */
const leftDrawerOpen = ref(false);

// Runs immediately on first render + when screen size changes
watchEffect(() => {
  leftDrawerOpen.value = !$q.screen.lt.sm;
});

// If it becomes mobile, force close (prevents resize issue)
watch(
  () => $q.screen.lt.sm,
  (isMobile) => {
    if (isMobile) leftDrawerOpen.value = false;
  }
);

// Toggle handler from TopNavbar
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
