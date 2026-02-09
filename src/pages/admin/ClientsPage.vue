<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 text-weight-bold q-mb-md">Clients</div>

    <!-- STAT CARDS -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat bordered class="fp-card">
          <q-card-section class="row items-center no-wrap">
            <div class="fp-ico fp-ico--blue q-mr-md">
              <q-icon name="groups" size="22px" />
            </div>
            <div class="col">
              <div class="text-subtitle2 text-grey-7">Total Clients</div>
              <div class="text-h5 text-weight-bold">124</div>
            </div>
            <div class="text-grey-6">124 ›</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat bordered class="fp-card">
          <q-card-section class="row items-center no-wrap">
            <div class="fp-ico fp-ico--blue q-mr-md">
              <q-icon name="check" size="22px" />
            </div>
            <div class="col">
              <div class="text-subtitle2 text-grey-7">Active Clients</div>
              <div class="text-h5 text-weight-bold">96</div>
            </div>
            <div class="text-grey-6">96 ›</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat bordered class="fp-card">
          <q-card-section class="row items-center no-wrap">
            <div class="fp-ico fp-ico--gold q-mr-md">
              <q-icon name="remove" size="22px" />
            </div>
            <div class="col">
              <div class="text-subtitle2 text-grey-7">Inactive Clients</div>
              <div class="text-h5 text-weight-bold">28</div>
            </div>
            <div class="text-grey-6">28 ›</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat bordered class="fp-card">
          <q-card-section class="row items-center no-wrap">
            <div class="fp-ico fp-ico--orange q-mr-md">
              <q-icon name="person_add" size="22px" />
            </div>
            <div class="col">
              <div class="text-subtitle2 text-grey-7">New Clients This Month</div>
              <div class="text-h5 text-weight-bold">
                5 <span class="text-negative text-subtitle2">-22%</span>
              </div>
            </div>
            <div class="text-grey-6">›</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- TABLE CARD -->
    <q-card flat bordered class="fp-tableCard">
      <q-card-section class="row items-center justify-between q-py-md">
        <div class="row items-center q-gutter-md">
          <div class="fp-tabs">
            <span :class="['fp-tab', activeTab==='all' && 'is-active']" @click="activeTab='all'">All</span>
            <span :class="['fp-tab', activeTab==='active' && 'is-active']" @click="activeTab='active'">
              Active <span class="text-grey-6 q-ml-xs">96</span>
            </span>
            <span :class="['fp-tab', activeTab==='inactive' && 'is-active']" @click="activeTab='inactive'">
              Inactive <span class="text-grey-6 q-ml-xs">28</span>
            </span>
          </div>
        </div>

        <div class="row items-center q-gutter-sm">
          <q-btn color="primary" icon="add" label="Add Client" no-caps class="fp-addBtn" />
          <q-input dense outlined placeholder="Search clients..." v-model="search" class="fp-search" />
        </div>
      </q-card-section>

      <q-separator />

      <q-table
        :rows="filteredRows"
        :columns="columns"
        row-key="name"
        flat
        hide-bottom
        class="fp-table"
      >
        <template #body-cell-status="props">
          <q-td :props="props">
            <q-badge
              :color="props.row.status === 'Active' ? 'green-7' : 'red-6'"
              class="fp-status"
            >
              {{ props.row.status }}
            </q-badge>
          </q-td>
        </template>

        <template #body-cell-actions="props">
          <q-td :props="props" class="text-right">
            <q-btn color="primary" no-caps label="Actions" class="fp-actionsBtn">
              <q-menu>
                <q-list style="min-width: 140px">
                  <q-item clickable v-close-popup><q-item-section>View</q-item-section></q-item>
                  <q-item clickable v-close-popup><q-item-section>Edit</q-item-section></q-item>
                  <q-item clickable v-close-popup><q-item-section class="text-negative">Delete</q-item-section></q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-td>
        </template>
      </q-table>

      <q-card-section class="row items-center justify-between q-py-sm">
        <div class="text-grey-7">1-8 of 124</div>
        <q-pagination v-model="page" :max="3" direction-links boundary-links />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { computed, ref } from "vue";

const page = ref(1);
const search = ref("");
const activeTab = ref("all");

const columns = [
  { name: "name", label: "Name", field: "name", align: "left", sortable: true },
  { name: "email", label: "Email", field: "email", align: "left" },
  { name: "phone", label: "Phone", field: "phone", align: "left" },
  { name: "status", label: "Status", field: "status", align: "left" },
  { name: "actions", label: "Actions", field: "actions", align: "right" },
];

const rows = [
  { name: "David Miller", email: "david.miller@email.com", phone: "(555) 123-4567", status: "Active" },
  { name: "Sarah Johnson", email: "sarah.johnson@email.com", phone: "(555) 294-5678", status: "Active" },
  { name: "Mike Brown", email: "mike.brown@email.com", phone: "(555) 345-6789", status: "Active" },
  { name: "Emily Davis", email: "emily.davis@email.com", phone: "(555) 456-7890", status: "Active" },
  { name: "Karen Thompson", email: "karen.thompson@email.com", phone: "(555) 557-8901", status: "Active" },
  { name: "James Taylor", email: "james.taylor@email.com", phone: "(555) 678-2012", status: "Active" },
  { name: "Linda Carter", email: "linda.carter@email.com", phone: "(555) 763-0123", status: "Inactive" },
  { name: "Lisa Williams", email: "lisa.williams@email.com", phone: "(555) 890-1234", status: "Active" },
  { name: "John Smith", email: "johnsmith@email.com", phone: "(555) 896-1234", status: "Active" },
];

const filteredRows = computed(() => {
  const s = search.value.trim().toLowerCase();

  return rows
    .filter((r) => {
      if (activeTab.value === "active") return r.status === "Active";
      if (activeTab.value === "inactive") return r.status === "Inactive";
      return true;
    })
    .filter((r) => {
      if (!s) return true;
      return (
        r.name.toLowerCase().includes(s) ||
        r.email.toLowerCase().includes(s) ||
        r.phone.toLowerCase().includes(s)
      );
    });
});
</script>

<style scoped>
.fp-card {
  border-radius: 12px;
}

.fp-ico {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: grid;
  place-items: center;
}
.fp-ico--blue {
  background: rgba(29, 79, 153, 0.12);
  color: #1d4f99;
}
.fp-ico--gold {
  background: rgba(222, 170, 55, 0.14);
  color: #c38c11;
}
.fp-ico--orange {
  background: rgba(225, 120, 55, 0.14);
  color: #d06a24;
}

.fp-tableCard {
  border-radius: 14px;
}

.fp-search {
  width: 220px;
}

.fp-tabs {
  display: flex;
  gap: 16px;
  align-items: center;
}
.fp-tab {
  cursor: pointer;
  color: #6b7280;
  font-weight: 600;
}
.fp-tab.is-active {
  color: #1d4f99;
  position: relative;
}
.fp-tab.is-active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 100%;
  height: 2px;
  background: #1d4f99;
}

.fp-status {
  border-radius: 8px;
  padding: 6px 12px;
}

.fp-actionsBtn {
  border-radius: 10px;
  padding-left: 16px;
  padding-right: 16px;
}

.fp-addBtn {
  border-radius: 10px;
}
</style>
