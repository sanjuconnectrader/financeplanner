<template>
  <q-page class="Dash q-pa-lg">
    <!-- Top Stats -->
    <div class="row q-col-gutter-md q-mb-md">
      <div v-for="c in statCards" :key="c.title" class="col-12 col-sm-6 col-md-3">
        <q-card class="DashCard">
          <q-card-section class="DashCard__body">
            <div class="DashCard__iconWrap" :class="c.iconBg">
              <q-icon :name="c.icon" class="DashCard__icon" />
            </div>

            <div class="DashCard__text">
              <div class="DashCard__title">{{ c.title }}</div>
              <div class="DashCard__value">{{ c.value }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Mid Section (MAKE BOTH SAME HEIGHT) -->
    <div class="row q-col-gutter-md q-mb-md items-stretch">
      <!-- Today's Tasks -->
      <div class="col-12 col-lg-5 Dash__stretchCol">
        <q-card class="Panel Dash__stretchCard">
          <q-card-section class="Panel__head">
            <div class="Panel__title">Today's Tasks</div>
          </q-card-section>

          <q-separator />

          <q-card-section class="Panel__body Dash__growBody">
            <div
              v-for="t in todaysTasks"
              :key="t.title"
              class="TaskRow"
            >
              <div class="TaskRow__bar" :class="t.bar" />
              <div class="TaskRow__meta">
                <div class="TaskRow__title">{{ t.title }}</div>
                <div class="TaskRow__sub">{{ t.due }}</div>
              </div>
              <q-space />
              <q-btn class="BtnPrimary" label="Complete" unelevated />
            </div>

            <!-- fills remaining height so card matches the right one -->
            <div class="Dash__filler" />
          </q-card-section>
        </q-card>
      </div>

      <!-- Client Alerts -->
      <div class="col-12 col-lg-7 Dash__stretchCol">
        <q-card class="Panel Dash__stretchCard">
          <q-card-section class="Panel__head Panel__head--row">
            <div class="Panel__title">Client Alerts</div>
            <q-space />
            <q-btn flat round dense icon="more_horiz" />
          </q-card-section>

          <q-separator />

          <q-card-section class="Panel__body Dash__growBody">
            <div
              v-for="a in alerts"
              :key="a.text"
              class="AlertRow"
            >
              <div class="AlertRow__dot" :class="a.dot" />
              <div class="AlertRow__text">{{ a.text }}</div>
            </div>

            <q-space />
            <div class="row justify-end q-mt-md">
              <q-btn class="BtnPrimary" label="Add Note" unelevated />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Bottom Section (MAKE BOTH SAME HEIGHT) -->
    <div class="row q-col-gutter-md items-stretch">
      <!-- Recent Clients -->
      <div class="col-12 col-lg-8 Dash__stretchCol">
        <q-card class="Panel Dash__stretchCard">
          <q-card-section class="Panel__head Panel__head--row">
            <div class="Panel__title">Recent Clients</div>
            <q-space />
            <q-btn class="BtnPrimary" label="Add Client" unelevated>
              <q-icon name="keyboard_arrow_down" class="q-ml-sm" />
            </q-btn>
          </q-card-section>

          <q-separator />

          <q-card-section class="Panel__body Dash__growBody">
            <q-table
              flat
              class="DashTable"
              :rows="recentClients"
              :columns="columns"
              row-key="name"
              hide-bottom
            >
              <template #body-cell-status="props">
                <q-td :props="props">
                  <span class="Badge" :class="badgeClass(props.row.status)">
                    {{ props.row.status }}
                  </span>
                </q-td>
              </template>

              <template #body-cell-actions="props">
                <q-td :props="props">
                  <div class="ActionCell">
                    <a class="ActionLink" href="javascript:void(0)">View</a>
                    <q-icon name="keyboard_arrow_down" class="ActionChevron" />
                  </div>
                </q-td>
              </template>
            </q-table>

            <!-- filler to keep same height with the right card if needed -->
            <div class="Dash__filler" />
          </q-card-section>
        </q-card>
      </div>

      <!-- Net Worth Overview -->
      <div class="col-12 col-lg-4 Dash__stretchCol">
        <q-card class="Panel Dash__stretchCard">
          <q-card-section class="Panel__head Panel__head--row">
            <div class="Panel__title">Net Worth Overview</div>
            <q-space />
            <q-btn flat round dense icon="more_horiz" />
          </q-card-section>

          <q-separator />

          <q-card-section class="Panel__body Dash__growBody">
            <div class="NetWorth">
              <div class="NetWorth__info">
                <div class="NetWorth__value">$850,250</div>
                <div class="NetWorth__line"><b>Assets:</b> $1,200,000</div>
                <div class="NetWorth__line"><b>Liabilities:</b> $349,750</div>
              </div>

              <div class="NetWorth__chart">
                <div class="Donut">
                  <div class="Donut__hole"></div>
                </div>
              </div>
            </div>

            <div class="Dash__filler" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
const statCards = [
  { title: "Active Clients", value: "24", icon: "groups", iconBg: "bgBlue" },
  { title: "Pending Tasks", value: "8", icon: "assignment", iconBg: "bgNavy" },
  { title: "Docs to Review", value: "5", icon: "folder", iconBg: "bgOrange" },
  { title: "Upcoming Reviews", value: "3", icon: "event", iconBg: "bgBlue2" },
];

const todaysTasks = [
  { title: "Call: Review Investment Plan for Sarah Lee", due: "Due Today", bar: "barOrange" },
  { title: "Follow Up: Request Tax Documents from Mark", due: "Due Tomorrow", bar: "barGreen" },
  { title: "Prepare Retirement Analysis for Client X", due: "Due in 2 Days", bar: "barRed" },
];

const alerts = [
  { text: "3 Docs Pending Verification", dot: "dotGreen" },
  { text: "Income Info Missing for Jim H.", dot: "dotRed" },
  { text: "Goal Off Track: The Johnsons", dot: "dotOrange" },
  { text: "New Client: Laura M.", dot: "dotGreen" },
];

const columns = [
  { name: "name", label: "Client Name", field: "name", align: "left" },
  { name: "status", label: "Status", field: "status", align: "left" },
  { name: "lastUpdate", label: "Last Update", field: "lastUpdate", align: "left" },
  { name: "actions", label: "Actions", field: "actions", align: "right" },
];

const recentClients = [
  { name: "David Miller", status: "Active", lastUpdate: "Today" },
  { name: "Lisa Carter", status: "Active", lastUpdate: "2 days ago" },
  { name: "Michael Wong", status: "Pending", lastUpdate: "3 days ago" },
  { name: "Emma Rogers", status: "Inactive", lastUpdate: "1 week ago" },
];

function badgeClass(status) {
  if (status === "Active") return "Badge--active";
  if (status === "Pending") return "Badge--pending";
  return "Badge--inactive";
}
</script>

<style scoped>
/* page bg */
.Dash {
  background: radial-gradient(1200px 600px at 50% 0%, #eef2f7 0%, #f6f8fb 55%, #f3f6fb 100%);
}

/* IMPORTANT: equal heights */
.Dash__stretchCol {
  display: flex;
}
.Dash__stretchCard {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.Dash__growBody {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.Dash__filler {
  flex: 1;
}

/* generic card look */
.Panel,
.DashCard {
  border-radius: 10px;
  background: #fff;
  border: 1px solid rgba(20, 40, 70, 0.12);
  box-shadow: 0 8px 20px rgba(16, 30, 60, 0.10);
}

/* top stats */
.DashCard__body {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 18px;
}
.DashCard__iconWrap {
  width: 54px;
  height: 54px;
  border-radius: 10px;
  display: grid;
  place-items: center;
}
.DashCard__icon {
  font-size: 30px;
  color: #fff;
}
.bgBlue { background: #2f6fd6; }
.bgBlue2 { background: #2d79c7; }
.bgNavy { background: #1f4f9a; }
.bgOrange { background: #f39b2d; }

.DashCard__title { font-weight: 600; color: #2b3c54; font-size: 14px; }
.DashCard__value { font-weight: 800; color: #0f203a; font-size: 28px; line-height: 1.1; }

/* headers */
.Panel__head { padding: 14px 18px; }
.Panel__head--row { display: flex; align-items: center; }
.Panel__title { font-size: 16px; font-weight: 700; color: #1a2b44; }
.Panel__body { padding: 16px 18px 18px; }

/* buttons */
.BtnPrimary {
  background: linear-gradient(180deg, #2f6fd6 0%, #1f58b5 100%);
  color: #fff;
  border-radius: 8px;
  padding: 0 16px;
  height: 36px;
  box-shadow: 0 6px 14px rgba(31, 88, 181, 0.25);
}

/* tasks */
.TaskRow {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 8px;
  border-bottom: 1px solid rgba(20, 40, 70, 0.12);
}
.TaskRow:last-child { border-bottom: 0; }
.TaskRow__bar { width: 10px; height: 18px; border-radius: 3px; }
.barOrange { background: #f39b2d; }
.barGreen { background: #35b36b; }
.barRed { background: #ea4e4e; }
.TaskRow__title { font-weight: 700; color: #1b2f49; font-size: 13px; }
.TaskRow__sub { color: #6b7b90; font-size: 12px; margin-top: 2px; }

/* alerts */
.AlertRow {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 8px;
  border-bottom: 1px solid rgba(20, 40, 70, 0.12);
}
.AlertRow:last-child { border-bottom: 0; }
.AlertRow__dot { width: 10px; height: 10px; border-radius: 2px; }
.dotGreen { background: #35b36b; }
.dotRed { background: #ea4e4e; }
.dotOrange { background: #f39b2d; }
.AlertRow__text { font-weight: 600; color: #1b2f49; font-size: 13px; }

/* table */
.DashTable :deep(th) { font-weight: 800; color: #1a2b44; }
.DashTable :deep(td) { color: #1b2f49; }
.DashTable :deep(.q-table__top),
.DashTable :deep(.q-table__bottom) { display: none; }

/* badges */
.Badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 800;
  font-size: 12px;
  color: #fff;
}
.Badge--active { background: #35b36b; }
.Badge--pending { background: #f39b2d; }
.Badge--inactive { background: #ea4e4e; }

/* actions */
.ActionCell { display: inline-flex; align-items: center; gap: 6px; justify-content: flex-end; }
.ActionLink { color: #1f58b5; font-weight: 700; text-decoration: none; }
.ActionChevron { color: #1f58b5; }

/* net worth */
.NetWorth {
  display: grid;
  grid-template-columns: 1fr 160px;
  gap: 14px;
  align-items: center;
}
.NetWorth__value { font-size: 30px; font-weight: 900; color: #0f203a; margin-bottom: 6px; }
.NetWorth__line { color: #2b3c54; font-size: 13px; margin: 4px 0; }

/* donut */
.Donut {
  width: 150px;
  height: 150px;
  border-radius: 999px;
  background: conic-gradient(#2ea86a 0 38%, #1c7b4a 38% 52%, #ea4e4e 52% 84%, #f39b2d 84% 100%);
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.08), 0 10px 18px rgba(0,0,0,0.12);
  position: relative;
  margin-left: auto;
}
.Donut__hole {
  position: absolute;
  inset: 26px;
  background: #fff;
  border-radius: 999px;
  box-shadow: inset 0 6px 14px rgba(0,0,0,0.08);
}
</style>
