<template>
  <div class="w-full md:container mx-auto p-5">
    <div>
      <h1 class="text-2xl font-semibold">Setting</h1>
      <p class="text-sm">Manage your dashboard settings</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-8 gap-4 mt-8">
      <!-- Sidebar -->
      <div
        class="col-span-2 w-full bg-white px-3 py-4 rounded-lg space-y-1 self-start sticky top-4"
      >
        <button
          v-for="item in navItems"
          :key="item.path"
          @click="$router.push(item.path)"
          :class="[
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-150',
            $route.path === item.path
              ? 'bg-emerald-50 text-emerald-600'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
          ]"
        >
          <AppIcon
            :icon="item.icon"
            :class="[
              'w-5 h-5 flex-shrink-0',
              $route.path === item.path ? 'text-emerald-500' : 'text-gray-400',
            ]"
          />
          <span>{{ item.label }}</span>

          <!-- Active indicator dot -->
          <span
            v-if="$route.path === item.path"
            class="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500"
          />
        </button>
      </div>

      <!-- Content -->
      <div class="col-span-6 bg-white p-4 rounded-lg">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "SettingView",
  setup() {
    const router = useRouter();
    const navItems = [
      {
        path: "/setting",
        icon: "material-symbols:info-outline-rounded",
        label: "Company Info",
      },
      {
        path: "/setting/offices",
        icon: "ph:building-office-light",
        label: "Office",
      },
      {
        path: "/setting/departments",
        icon: "ph:buildings-light",
        label: "Departments",
      },
      {
        path: "/setting/jobtitle",
        icon: "fluent:briefcase-32-regular",
        label: "Job Title",
      },
      {
        path: "/setting/schedule",
        icon: "prime:calendar",
        label: "Work Schedule",
      },
      { path: "/setting/permission", icon: "uil:setting", label: "Permission" },
      {
        path: "/setting/integration",
        icon: "carbon:ibm-cloud-pak-integration",
        label: "Integration",
      },
      {
        path: "/setting/subscription",
        icon: "fluent:flash-16-regular",
        label: "Subscription",
      },
      {
        path: "/setting/password",
        icon: "hugeicons:lock-password",
        label: "Password",
      },
      {
        path: "/setting/notification",
        icon: "hugeicons:notification-01",
        label: "Notification",
      },
    ];
    const goTo = (path) => {
      router.push(path);
    };

    return {
      goTo,
      navItems,
    };
  },
};
</script>

<style lang="scss" scoped></style>
