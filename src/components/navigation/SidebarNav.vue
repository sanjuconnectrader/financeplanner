<template>
  <q-drawer
    v-model="modelValue"
    show-if-above
    bordered
    :width="260"
    class="SidebarNav"
  >
    <!-- TOP LOGO AREA -->
    <div class="SidebarNav__brand">
      <div class="SidebarNav__logoWrap">
        <q-icon name="insights" class="SidebarNav__logoIcon" />
      </div>
    </div>

    <!-- MENU -->
    <div class="SidebarNav__menu">
      <q-item
        v-for="item in menu"
        :key="item.to"
        clickable
        v-ripple
        :to="item.to"
        class="SidebarNav__item"
        active-class="SidebarNav__item--active"
        exact
      >
        <q-item-section avatar class="SidebarNav__avatar">
          <q-icon :name="item.icon" class="SidebarNav__icon" />
        </q-item-section>

        <q-item-section class="SidebarNav__labelWrap">
          <q-item-label class="SidebarNav__label">{{ item.label }}</q-item-label>
        </q-item-section>
      </q-item>

      <!-- separators like screenshot -->
      <div class="SidebarNav__seps">
        <div v-for="n in 9" :key="n" class="SidebarNav__sep" />
      </div>
    </div>

    <q-space />

    <!-- bottom padding -->
    <div class="SidebarNav__bottomSpace" />
  </q-drawer>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: { type: Boolean, default: true },
});
const emit = defineEmits(["update:modelValue"]);

const modelValue = computed({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
});

// NOTE: screenshot has "Clients" twice. Keep exactly.
const menu = [
  { label: "Dashboard", icon: "space_dashboard", to: "/dashboard" },
  { label: "Clients", icon: "badge", to: "/clients" },
  { label: "Clients", icon: "person", to: "/clients-2" },
  { label: "Plans", icon: "task_alt", to: "/plans" },
  { label: "Tasks", icon: "assignment", to: "/tasks" },
  { label: "Documents", icon: "description", to: "/documents" },
  { label: "Messages", icon: "mail", to: "/messages" },
  { label: "Reports", icon: "bar_chart", to: "/reports" },
  { label: "Settings", icon: "settings", to: "/settings" },
];
</script>

<style scoped>
/* ===== Root ===== */
.SidebarNav {
  background: linear-gradient(180deg, #2b67c9 0%, #1f4f9a 38%, #173c75 70%, #12315f 100%);
  color: #fff;
}

/* remove default white border look */
.SidebarNav :deep(.q-drawer__content) {
  padding: 0;
}

/* ===== Brand (top icon) ===== */
.SidebarNav__brand {
  padding: 22px 0 12px;
  display: grid;
  place-items: center;
}

.SidebarNav__logoWrap {
  width: 54px;
  height: 54px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.14);
  display: grid;
  place-items: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.18);
}

.SidebarNav__logoIcon {
  font-size: 30px;

}

/* ===== Menu ===== */
.SidebarNav__menu {
  padding: 10px 14px 0;
}

/* each row */
.SidebarNav__item {
  border-radius: 10px;
  height: 48px;
  margin: 8px 0;
  padding: 0 14px;

  position: relative;
}

/* icon box */
.SidebarNav__avatar {
  min-width: 40px;
  padding-right: 10px;
}

.SidebarNav__icon {
  font-size: 20px;

}

/* label */
.SidebarNav__label {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.2px;
}

/* hover like screenshot (soft) */
.SidebarNav__item:hover {
  background: rgba(255, 255, 255, 0.10);
}


</style>
