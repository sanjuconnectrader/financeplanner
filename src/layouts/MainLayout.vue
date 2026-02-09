<template>
  <q-layout view="lHh Lpr lFf">

    <!-- Sidebar -->
    <SidebarNav v-model="leftDrawerOpen" />

    <!-- Top Navbar -->
    <TopNavbar
      title="Clients"
      @toggleLeft="leftDrawerOpen = !leftDrawerOpen"
    />

    <!-- Page Content -->
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from "vue";

import SidebarNav from "components/navigation/SidebarNav.vue";
import TopNavbar from "components/navigation/TopNavbar.vue";

const leftDrawerOpen = ref(true);
</script>
