<template>
  <q-drawer
    v-model="drawerModel"
    show-if-above
    bordered
    :width="260"
    class="SidebarNav"
    :behavior="$q.screen.lt.sm ? 'mobile' : 'desktop'"
  >
    <!-- TOP LOGO AREA -->
    <div class="SidebarNav__brand">
      <div class="SidebarNav__logoWrap">
        <q-icon name="insights" class="SidebarNav__logoIcon" />
      </div>

      <!-- Close button (mobile only) -->
      <q-btn
        v-if="$q.screen.lt.sm"
        flat
        dense
        round
        icon="close"
        class="SidebarNav__closeBtn"
        @click="drawerModel = false"
        aria-label="Close sidebar"
      />
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
        @click="onNavClick"
      >
        <q-item-section avatar class="SidebarNav__avatar">
          <q-icon :name="item.icon" class="SidebarNav__icon" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="SidebarNav__label">{{ item.label }}</q-item-label>
        </q-item-section>
      </q-item>

      <!-- separators like screenshot -->
      <div class="SidebarNav__seps">
        <div v-for="n in 9" :key="n" class="SidebarNav__sep" />
      </div>
    </div>

    <q-space />

    <div class="SidebarNav__bottomSpace" />
  </q-drawer>
</template>

<script setup>
import { computed, watch } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const props = defineProps({
  modelValue: { type: Boolean, default: false }, // ✅ closed by default
});
const emit = defineEmits(["update:modelValue"]);

const drawerModel = computed({
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

/**
 * ✅ Mobile UX:
 * When user taps a menu item, close drawer.
 */
const onNavClick = () => {
  if ($q.screen.lt.sm) drawerModel.value = false;
};

/**
 * ✅ Safety:
 * If screen becomes mobile, force close.
 * (Prevents any auto-open state leaking into mobile)
 */
watch(
  () => $q.screen.lt.sm,
  (isMobile) => {
    if (isMobile) drawerModel.value = false;
  }
);
</script>

<style scoped>
/* ===== Root ===== */
.SidebarNav {
  background: #ffffff;
  color: #111;
}

/* remove default padding */
.SidebarNav :deep(.q-drawer__content) {
  padding: 0;
}

/* ===== Brand (top icon) ===== */
.SidebarNav__brand {
  padding: 22px 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.SidebarNav__logoWrap {
  width: 54px;
  height: 54px;
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.06);
  display: grid;
  place-items: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.10);
}

.SidebarNav__logoIcon {
  font-size: 30px;
  color: #111;
}

/* Close button for mobile */
.SidebarNav__closeBtn {
  position: absolute;
  top: 10px;
  right: 16px;
  color: #111;
  font-size: 20px;
  opacity: 0.8;
}

.SidebarNav__closeBtn:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.06);
}

/* ===== Menu ===== */
.SidebarNav__menu {
  padding: 10px 14px 0;
}

.SidebarNav__item {
  border-radius: 10px;
  height: 48px;
  margin: 8px 0;
  padding: 0 14px;
}

.SidebarNav__avatar {
  min-width: 40px;
  padding-right: 10px;
}

.SidebarNav__icon {
  font-size: 20px;
  color: #111;
}

.SidebarNav__label {
  font-size: 16px;
  font-weight: 700;
  color: #111;
  letter-spacing: 0.2px;
}

.SidebarNav__item:hover {
  background: rgba(0, 0, 0, 0.05);
}

/* active */
.SidebarNav__item--active {
  background: rgba(0, 0, 0, 0.08);
}

/* separators */
.SidebarNav__seps {
  margin-top: 12px;
  padding: 0 6px 8px;
}

.SidebarNav__sep {
  height: 10px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.06);
  margin: 10px 0;
}

.SidebarNav__bottomSpace {
  height: 16px;
}
</style>
