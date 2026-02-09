<template>
  <q-header elevated class="bg-white text-dark fp-topbar">
    <q-toolbar class="q-px-md">
      <q-btn
        flat dense round icon="menu"
        class="q-mr-sm lt-md"
        @click="$emit('toggleLeft')"
      />

      <q-toolbar-title class="text-weight-bold fp-title">
        {{ title }}
      </q-toolbar-title>

      <q-space />

      <q-btn flat round icon="notifications" class="q-mr-sm">
        <q-badge color="red" floating transparent>1</q-badge>
      </q-btn>

      <q-btn flat no-caps class="fp-user">
        <q-avatar size="32px" class="q-mr-sm">
          <img src="https://i.pravatar.cc/100?img=12" alt="User" />
        </q-avatar>
        <span class="text-weight-medium">John Smith</span>
        <q-icon name="expand_more" class="q-ml-xs" />
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup>
defineProps({ title: { type: String, default: "Clients" } });
defineEmits(["toggleLeft"]);
</script>

<style scoped>
.fp-topbar {
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}
.fp-title {
  font-size: 22px;
}
.fp-user {
  padding-left: 8px;
  padding-right: 8px;
}
</style>
