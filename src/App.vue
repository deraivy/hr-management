<template>
  <div class="min-h-screen flex flex-col">
    <router-view v-if="$route.meta.noApp" />

    <!-- Main App Layout -->
    <div v-else class="flex flex-1 overflow-hidden">
      <!-- Mobile Menu Toggle Button -->
      <button
        @click="toggleMobileNav"
        class="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Toggle sidebar"
      >
        <i class="fas fa-bars text-lg"></i>
      </button>

      <!-- NavDrawer -->
      <NavDrawer
        :is-open="isNavOpen"
        :is-mobile-open="isMobileNavOpen"
        @toggle-nav="toggleNav"
        @toggle-mobile-nav="toggleMobileNav"
      />

      <!-- Main Content -->
      <main
        :class="{
          'md:ml-16 lg:ml-64': isNavOpen,
          'md:ml-16 lg:ml-16': !isNavOpen,
          'ml-0': isMobile,
        }"
        class="flex-1 min-h-screen transition-all duration-300 overflow-y-auto"
      >
        <!-- Top Navigation Bar -->
        <nav class="bg-white shadow-sm p-4 sticky top-0 z-20">
          <div
            class="flex flex-col md:flex-row justify-between items-center gap-3 container mx-auto"
          >
            <!-- Search Bar -->
            <div class="relative flex-1 w-full md:max-w-xs lg:max-w-md">
              <i
                class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              ></i>
              <input
                v-model="searchQuery"
                @input="debouncedSearch"
                type="text"
                placeholder="Search for anything..."
                class="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                aria-label="Search"
              />
            </div>

            <!-- Desktop Navigation -->
            <div class="hidden md:flex items-center gap-2 lg:gap-6">
              <router-link
                v-for="(item, index) in topNavItems"
                :key="index"
                :to="item.path"
                class="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors whitespace-nowrap"
                active-class="text-indigo-600 font-semibold"
              >
                {{ item.text }}
              </router-link>
              <div class="flex gap-2 lg:gap-4 items-center">
                <button
                  class="p-2 hover:bg-gray-100 rounded-md"
                  aria-label="Messages"
                >
                  <i
                    class="fas fa-envelope text-lg text-gray-600 hover:text-indigo-600"
                  ></i>
                </button>
                <button
                  class="p-2 hover:bg-gray-100 rounded-md"
                  aria-label="Chat"
                >
                  <i
                    class="fas fa-comment text-lg text-gray-600 hover:text-indigo-600"
                  ></i>
                </button>
                <!-- Logout button (desktop) -->
                <button
                  class="p-2 hover:bg-gray-100 rounded-md"
                  aria-label="Logout"
                  @click="logout"
                >
                  Logout
                </button>
                <!-- Profile -->
                <img
                  src="https://via.placeholder.com/32"
                  alt="Profile"
                  class="w-8 h-8 rounded-full border border-gray-200 object-cover"
                />
              </div>
            </div>
          </div>
        </nav>

        <!-- Mobile Menu Dropdown -->
        <transition name="slide-down">
          <div
            v-if="isMobileNavOpen && isMobile"
            class="md:hidden bg-white border-b border-gray-200 py-4 shadow-lg z-10"
          >
            <ul class="flex flex-col gap-3 px-4 max-w-7xl mx-auto">
              <li
                v-for="(item, index) in topNavItems"
                :key="index"
                class="text-sm hover:bg-gray-50 cursor-pointer py-2"
              >
                <router-link
                  :to="item.path"
                  class="flex items-center gap-3 text-gray-600 hover:text-indigo-600"
                  active-class="text-indigo-600 font-semibold"
                  @click="toggleMobileNav"
                >
                  <span>{{ item.text }}</span>
                </router-link>
              </li>
              <!-- Logout (mobile) -->
              <li
                class="text-sm hover:bg-gray-50 cursor-pointer py-2 text-red-600"
                @click="logout"
              >
                <div class="flex items-center gap-3">
                  <i class="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </div>
              </li>
            </ul>
          </div>
        </transition>

        <!-- Main Content Area -->
        <div class="bg-[#eaeaea] h-full">
          <router-view />
        </div>
        <Footer />
      </main>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import NavDrawer from "@/components/NavDrawer.vue";
import Footer from "@/components/Footer.vue";
import { debounce } from "lodash";

export default {
  name: "App",
  components: {
    NavDrawer,
    Footer,
  },
  setup() {
    const isNavOpen = ref(false);
    const isMobileNavOpen = ref(false);
    const isMobile = ref(false);
    const searchQuery = ref("");

    const topNavItems = [
      { text: "Documents", path: "/" },
      { text: "News", path: "/" },
      { text: "Payslip", path: "/" },
      { text: "Report", path: "/" },
    ];

    const toggleMobileNav = () => {
      isMobileNavOpen.value = !isMobileNavOpen.value;
    };

    const toggleNav = () => {
      isNavOpen.value = !isNavOpen.value;
    };

    const checkMobile = () => {
      isMobile.value = window.innerWidth < 768;
      if (!isMobile.value && isMobileNavOpen.value) {
        isMobileNavOpen.value = false;
      }
      if (window.innerWidth < 768) {
        isNavOpen.value = false;
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        isNavOpen.value = false;
      } else if (window.innerWidth >= 1024) {
        isNavOpen.value = true;
      }
    };

    const debouncedSearch = debounce(() => {
      console.log("Search query:", searchQuery.value);
    }, 300);

    const logout = () => {
      sessionStorage.clear();
      window.location.href = "/";
    };
    onMounted(() => {
      checkMobile();
      window.addEventListener("resize", checkMobile);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", checkMobile);
      debouncedSearch.cancel();
    });

    return {
      isNavOpen,
      isMobileNavOpen,
      isMobile,
      searchQuery,
      topNavItems,
      toggleMobileNav,
      toggleNav,
      debouncedSearch,
      logout,
    };
  },
};
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css");

.router-link-active {
  @apply text-indigo-600 font-semibold;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
