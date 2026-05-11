<template>
  <aside
    class="fixed inset-y-0 left-0 z-40 bg-white text-gray-700 transition-all duration-300 ease-in-out border-r border-gray-200"
    :class="{
      'w-64': isOpen && !isMobile,
      'w-16': !isOpen || (isMobile && !isMobileOpen),
      'w-full': isMobile && isMobileOpen,
      'w-0 hidden': isMobile && !isMobileOpen,
    }"
  >
    <!-- <div class="flex flex-col justify-between"> -->
    <div class="flex flex-col h-full">
      <!-- Sidebar Header -->
      <div class="flex items-center justify-between gap-4 p-4">
        <h1
          v-if="isOpen || isMobileOpen"
          class="text-xl font-bold truncate text-gray-800"
        >
          <span class="text-green-500 font-bold">H</span> HRDashboard
        </h1>
        <div
          @click="toggleSidebar"
          class="cursor-pointer text-gray-500 hover:text-green-500 transition-colors"
          aria-label="Toggle sidebar"
        >
          <span v-if="isMobile && isMobileOpen" class="text-lg font-medium">
            ✕
          </span>
          <span v-else class="text-3xl font-medium">
            {{ isOpen ? "«" : "»" }}
          </span>
        </div>
      </div>

      <!-- Dashboard Button -->
      <div class="px-4">
        <router-link
          to="/"
          class="bg-[#11ad5d] text-white rounded-lg p-4 w-full flex items-center justify-between hover:bg-green-600 transition-colors"
          active-class="bg-green-600"
        >
          <span class="text-sm font-medium">Dashboard </span>
          <AppIcon icon="tdesign:app" class="w-5 h-5" />
        </router-link>
      </div>

      <!-- Navigation Items -->
      <nav class="flex-1 overflow-y-auto p-4">
        <template v-for="(item, index) in navItems" :key="index">
          <!-- Parent Items with Children -->
          <div v-if="item.children" class="mb-2">
            <div
              @click="toggleDropdown(index)"
              class="flex items-center px-2 py-3 rounded-lg hover:bg-gray-100 transition-colors group focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
              :class="{ 'bg-gray-100': activeDropdown === index }"
            >
              <div>
                <AppIcon
                  :icon="item.icon"
                  :class="`${item.icon} w-6 h-6 text-lg mr-3 text-gray-500 group-hover:text-green-500 transition-colors`"
                />
              </div>

              <span
                v-if="isOpen || isMobileOpen"
                class="truncate text-sm font-medium"
              >
                {{ item.text }}
              </span>
              <i
                class="fas fa-chevron-down ml-auto text-gray-500 group-hover:text-green-500 transition-transform text-sm"
                :class="{ 'rotate-180': activeDropdown === index }"
              ></i>
            </div>

            <!-- Dropdown Content -->
            <div
              v-if="activeDropdown === index && (isOpen || isMobileOpen)"
              class="ml-6 pl-3 border-l border-gray-200"
            >
              <router-link
                v-for="(child, childIndex) in item.children"
                :key="childIndex"
                :to="child.path"
                class="flex items-center p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-green-500 text-sm bg-white m-2"
                active-class="text-green-500 font-medium"
              >
                <span class="truncate">{{ child.text }}</span>
              </router-link>
            </div>
          </div>

          <!-- Single Items without Children -->
          <router-link
            v-else
            :to="item.path"
            class="flex items-center p-3 py-2 rounded-lg hover:bg-gray-100 transition-colors group focus:outline-none focus:ring-2 focus:ring-green-500 mb-1"
            active-class="bg-gray-100 text-green-500"
          >
            <div>
              <AppIcon
                :icon="item.icon"
                :class="`${item.icon} text-lg ${
                  isOpen || isMobileOpen ? 'mr-3' : 'mx-auto'
                } w-5 h-5 text-gray-500 group-hover:text-green-500 transition-colors`"
              />
            </div>
            <span
              v-if="isOpen || isMobileOpen"
              class="truncate text-sm font-medium"
            >
              {{ item.text }}
            </span>
            <AppIcon
              v-if="isOpen || isMobileOpen"
              class="fas fa-chevron-down ml-auto text-gray-500 group-hover:text-green-500 transition-transform text-sm opacity-0"
            />
          </router-link>
        </template>
      </nav>

      <div class="mt-auto p-4">
        <router-link
          to="/setting"
          class="flex items-center p-3 py-2 rounded-lg hover:bg-gray-100 transition-colors group focus:outline-none focus:ring-2 focus:ring-green-500 mb-1"
          active-class="bg-gray-100 text-green-500"
        >
          <div>
            <AppIcon
              icon="material-symbols:settings"
              :class="`text-lg ${
                isOpen || isMobileOpen ? 'mr-3' : 'mx-auto'
              } w-5 h-5 text-gray-500 group-hover:text-green-500 transition-colors`"
            />
          </div>

          <span
            v-if="isOpen || isMobileOpen"
            class="truncate text-sm font-medium"
          >
            Settings
          </span>
        </router-link>
      </div>
    </div>

    <!-- </div> -->
  </aside>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";

export default {
  name: "NavDrawer",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    isMobileOpen: {
      type: Boolean,
      default: false, // Default to closed for mobile
    },
  },
  setup(props, { emit }) {
    const isMobile = ref(false);
    const activeDropdown = ref(null);

    const navItems = [
      {
        text: "Employees",
        icon: "famicons:people-outline",
        children: [
          { text: "Manage Employees", path: "/manage-employee" },
          { text: "Directory", path: "/directory" },
        ],
      },

      {
        text: "Time Off",
        icon: "material-symbols:timer-outline",
        children: [
          { text: "My Time Off", path: "/my-time-off" },
          { text: "Team Time Off", path: "/team-time-off" },
          { text: "Employee Time Off", path: "/employee-time-off" },
          { text: "Settings", path: "/settings" },
        ],
      },
      {
        text: "Attendance",
        icon: "clarity:date-line",
        children: [
          { text: "My Attendance", path: "/my-attendance" },
          { text: "Team Attendance", path: "/team-attendance" },
          { text: "Employee Attendance", path: "/employee-attendance" },
          { text: "Attendance Setting", path: "/attendance-settings" },
        ],
      },
      {
        text: "Payroll",
        icon: "material-symbols:add-card-outline",
        children: [
          { text: "Employee Payroll", path: "/employee-payroll" },
          { text: "Payroll Setting", path: "/payroll-setting" },
        ],
      },
      {
        text: "Recruitment",
        icon: "fluent:briefcase-24-regular",
        children: [
          { text: "Job", path: "/job" },
          { text: "Candidates", path: "/candidates" },
          { text: "Settings", path: "/recuitsetting" },
        ],
      },
      {
        text: "CRM",
        icon: "material-symbols:contact-mail-outline",
        path: "/crm",
      },
    ];

    const toggleDropdown = (index) => {
      activeDropdown.value = activeDropdown.value === index ? null : index;
    };

    const checkMobile = () => {
      isMobile.value = window.innerWidth < 768;
    };

    const toggleSidebar = () => {
      if (isMobile.value) {
        emit("toggle-mobile-nav");
      } else {
        emit("toggle-nav");
      }
    };

    onMounted(() => {
      checkMobile();
      window.addEventListener("resize", checkMobile);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", checkMobile);
    });

    return {
      isMobile,
      navItems,
      activeDropdown,
      toggleDropdown,
      toggleSidebar,
    };
  },
};
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css");
.rotate-180 {
  transform: rotate(180deg);
}

.transition-transform {
  transition: transform 0.2s ease-in-out;
}

.transition-all {
  transition: all 0.3s ease-in-out;
}

.router-link-active {
  @apply text-green-500 font-medium;
}

.border-l {
  border-left-width: 1px;
}
</style>
