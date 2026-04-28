<template>
  <div class="">
    <div class="w-full container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <router-link to="/manage-employee">Employee</router-link>
      <div
        class="flex flex-col lg:flex-row justify-between items-center gap-4 bg-white rounded-lg relative"
      >
        <div class="relative w-full p-2">
          <!-- Cross Demarcation Lines -->
          <div
            class="absolute inset-0 flex justify-center items-center pointer-events-none p-2"
          >
            <!-- Vertical Line -->
            <div class="w-[2px] h-full bg-gray-300"></div>
            <!-- Horizontal Line -->
            <div class="absolute w-full h-[2px] bg-gray-300"></div>
          </div>

          <!-- Content Grid -->
          <div class="grid grid-cols-2 gap-12 p-6 relative z-10">
            <div class="">
              <div
                class="bg-[#f8f8f8] w-12 h-12 flex justify-center items-center rounded-full"
              >
                <AppIcon icon="ion:people-outline" class="w-7 h-7" />
              </div>
              <div class="flex justify-between mt-6">
                <h1 class="text-3xl font-bold">3,540</h1>
                <div
                  class="bg-[#ebf6f2] p-1 flex justify-center items-center gap-2 rounded-lg"
                >
                  <img src="/icon/arrow.svg" class="w-4 h-4" alt="" />
                  <p class="text-sm">+25.5%</p>
                </div>
              </div>
              <p class="my-4 font-semibold">Total Employees</p>
            </div>

            <div class="">
              <div
                class="bg-[#f8f8f8] w-12 h-12 flex justify-center items-center rounded-full"
              >
                <AppIcon icon="fluent:briefcase-32-regular" class="w-6 h-6" />
              </div>
              <div class="flex justify-between mt-6">
                <h1 class="text-3xl font-bold">1,150</h1>
                <div
                  class="bg-[#ebf6f2] p-1 flex justify-center items-center gap-2 rounded-lg"
                >
                  <img src="/icon/arrow.svg" class="w-4 h-4" alt="" />
                  <p class="text-sm">+4.10%</p>
                </div>
              </div>
              <p class="my-4 font-semibold">Job Applicants</p>
            </div>

            <div class="">
              <div
                class="bg-[#f8f8f8] w-12 h-12 flex justify-center items-center rounded-full"
              >
                <AppIcon icon="material-symbols:add-rounded" class="w-6 h-6" />
              </div>
              <div class="flex justify-between mt-6">
                <h1 class="text-3xl font-bold">500</h1>
                <div
                  class="bg-[#ebf6f2] p-1 flex justify-center items-center gap-2 rounded-lg"
                >
                  <img src="/icon/arrow.svg" class="w-4 h-4" alt="" />
                  <p class="text-sm">+5.1%</p>
                </div>
              </div>
              <p class="my-4 font-semibold">New Employees</p>
            </div>

            <div class="">
              <div
                class="bg-[#f8f8f8] w-12 h-12 flex justify-center items-center rounded-full"
              >
                <AppIcon icon="tabler:minus" class="w-4 h-4" />
              </div>
              <div class="flex justify-between mt-6">
                <h1 class="text-3xl font-bold">93</h1>
                <div
                  class="bg-[#fdebec] p-2 flex justify-center items-center gap-2 rounded-lg"
                >
                  <img src="/icon/arrow.svg" class="w-4 h-4" alt="" />
                  <p class="text-sm text-red-500">-25.5%</p>
                </div>
              </div>
              <p class="my-4 font-semibold">Resigned Employees</p>
            </div>
          </div>
        </div>

        <!-- Right Section -->
        <div class="w-full rounded-md p-6">
          <p>Team Performance</p>
          <TeamPerformance />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import TeamPerformance from "../components/TeamPerformance.vue";
export default {
  name: "DashboardView",
  // components: {
  //   TeamPerformance,
  // },
};
</script>

<style lang="scss" scoped></style>
