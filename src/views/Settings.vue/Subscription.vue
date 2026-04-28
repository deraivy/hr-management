<template>
  <div class="w-full md:container mx-auto p-5">
    <div class="flex justify-between items-center">
      <h2 class="font-semibold text-xl">Subscription</h2>

      <div
        @click="upgrade = true"
        class="bg-[#121828] rounded-lg text-white p-2"
      >
        upgrade plan
      </div>
    </div>

    <div class="flex items-center border-b-2 border-gray-200 space-x-4 mb-4">
      <!-- Permission Tab -->
      <div
        @click="activeTab = 'plan'"
        :class="[
          'cursor-pointer border-b-2 px-3 py-2 transition',
          activeTab === 'plan'
            ? 'border-green-600 text-green-600'
            : 'border-transparent text-gray-500 hover:text-green-600 hover:border-green-700',
        ]"
      >
        Plan
      </div>

      <!-- Member Tab -->
      <div
        @click="activeTab = 'history'"
        :class="[
          'cursor-pointer border-b-2 px-3 py-2 transition',
          activeTab === 'History'
            ? 'border-green-600 text-green-600'
            : 'border-transparent text-gray-500 hover:text-green-600 hover:border-green-700',
        ]"
      >
        history
      </div>
    </div>

    <div
      v-if="activeTab === 'plan'"
      class="border border-gray-200 p-4 mt-6 rounded-lg"
    >
      <div class="flex items-center gap-1">
        <h2 class="text-lg font-medium">Perform Plan</h2>
        <div class="bg-green-500 text-white text-xs px-2 py-1 rounded-lg">
          Active
        </div>
      </div>

      <div class="border-b border-gray-200 my-4" />

      <div class="space-y-3">
        <div class="grid grid-cols-1 sm:grid-cols-2">
          <span>Current employee</span>

          <span>100 Employee</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2">
          <span>Current employee</span>

          <span>100 Employee</span>
        </div>
      </div>
    </div>

    <div v-if="activeTab === 'history'">
      <div class="flex flex-col mt-6">
        <div class="overflow-x-auto pb-4">
          <div class="min-w-full inline-block align-middle">
            <div class="overflow-hidden border rounded-lg border-gray-300">
              <table class="table-auto min-w-full rounded-xl">
                <thead>
                  <tr class="bg-gray-50">
                    <th
                      scope="col"
                      class="p-5 text-left whitespace-nowrap leading-6 font-semibold text-gray-900 capitalize"
                    >
                      Plan
                    </th>
                    <th
                      scope="col"
                      class="p-5 text-left whitespace-nowrap leading-6 font-semibold text-gray-900 capitalize"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      class="p-5 text-left whitespace-nowrap leading-6 font-semibold text-gray-900 capitalize"
                    >
                      Billing Cycle
                    </th>

                    <th
                      scope="col"
                      class="p-5 text-left whitespace-nowrap leading-6 font-semibold text-gray-900 capitalize"
                    >
                      Created Date
                    </th>
                    <th
                      scope="col"
                      class="p-5 text-left whitespace-nowrap leading-6 font-semibold text-gray-900 capitalize"
                    >
                      End Date
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-300">
                  <tr
                    class="bg-white transition-all duration-500 hover:bg-gray-50"
                  >
                    <td
                      class="p-5 whitespace-nowrap leading-6 font-medium text-gray-900"
                    >
                      Perform Plan
                    </td>

                    <td
                      class="p-5 whitespace-nowrap leading-6 font-medium text-gray-900"
                    >
                      <div
                        class="py-1.5 px-2.5 bg-red-50 rounded-lg flex justify-center w-20 items-center gap-1"
                      >
                        <span class="font-medium text-xs text-red-600 uppercase"
                          >unpaid</span
                        >
                      </div>
                    </td>
                    <td
                      class="p-5 whitespace-nowrap leading-6 font-medium text-gray-900"
                    >
                      3
                    </td>

                    <td
                      class="p-5 whitespace-nowrap leading-6 font-medium text-gray-900"
                    >
                      20 Jan 2026
                    </td>
                    <td
                      class="p-5 whitespace-nowrap leading-6 font-medium text-gray-900"
                    >
                      20 Feb 2026
                    </td>
                  </tr>

                  <tr
                    class="bg-white transition-all duration-500 hover:bg-gray-50"
                  >
                    <td
                      class="p-5 whitespace-nowrap leading-6 font-medium text-gray-900"
                    >
                      Perform Plan
                    </td>

                    <td
                      class="p-5 whitespace-nowrap leading-6 font-medium text-gray-900"
                    >
                      <div
                        class="py-1.5 px-2.5 bg-emerald-50 rounded-lg flex justify-center w-20 items-center gap-1"
                      >
                        <span
                          class="font-medium text-emerald-600 text-xs uppercase"
                          >Active</span
                        >
                      </div>
                    </td>
                    <td
                      class="p-5 whitespace-nowrap leading-6 font-medium text-gray-900"
                    >
                      3
                    </td>

                    <td
                      class="p-5 whitespace-nowrap leading-6 font-medium text-gray-900"
                    >
                      20 Jan 2026
                    </td>
                    <td
                      class="p-5 whitespace-nowrap leading-6 font-medium text-gray-900"
                    >
                      20 Feb 2026
                    </td>
                  </tr>

                  <tr
                    class="bg-white transition-all duration-500 hover:bg-gray-50"
                  >
                    <td
                      class="p-5 whitespace-nowrap leading-6 font-medium text-gray-900"
                    >
                      Perform Plan
                    </td>

                    <td
                      class="p-5 whitespace-nowrap leading-6 font-medium text-gray-900"
                    >
                      <div
                        class="py-1.5 px-2.5 bg-emerald-50 rounded-lg flex justify-center w-20 items-center gap-1"
                      >
                        <span
                          class="font-medium text-emerald-600 uppercase text-xs"
                          >Active</span
                        >
                      </div>
                    </td>
                    <td
                      class="p-5 whitespace-nowrap leading-6 font-medium text-gray-900"
                    >
                      3
                    </td>

                    <td
                      class="p-5 whitespace-nowrap leading-6 font-medium text-gray-900"
                    >
                      20 Jan 2026
                    </td>
                    <td
                      class="p-5 whitespace-nowrap leading-6 font-medium text-gray-900"
                    >
                      20 Feb 2026
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="upgrade"
          class="bg-black/50 fixed z-50 flex items-center justify-end inset-0"
        >
          <div
            @click="upgrade = false"
            class="bg-white w-10 h-10 p-2 rounded-full shadow-lg text-gray-500 hover:text-gray-700 mr-2 hidden md:block"
          >
            <AppIcon icon="codicon:chevron-right" class="w-6 h-6" />
          </div>
          <div class="bg-white h-full w-1/2 p-6 overflow-y-auto">
            <div class="flex justify-between items-center mb-6">
              <!-- Title -->
              <h2 class="text-xl font-semibold">Pick A Plan</h2>

              <!-- Plan Toggle -->
              <div class="flex items-center gap-6">
                <!-- Monthly Toggle -->
                <div class="flex items-center gap-2">
                  <p
                    class="uppercase text-sm text-gray-500 cursor-pointer"
                    @click="isList = false"
                  >
                    Monthly
                  </p>
                  <div
                    @click="isList = !isList"
                    :class="[
                      'relative w-12 h-7 rounded-full flex items-center p-1 cursor-pointer transition',
                      isList ? 'bg-[#11ad5d]' : 'bg-gray-300',
                    ]"
                  >
                    <div
                      :class="[
                        'w-5 h-5 rounded-full bg-white shadow flex items-center justify-center transform transition',
                        isList ? 'translate-x-2.5' : 'translate-x-0',
                      ]"
                    >
                      <AppIcon
                        v-if="isList"
                        icon="material-symbols:done"
                        class="w-3.5 h-3.5 text-[#11ad5d]"
                      />
                    </div>
                  </div>
                </div>

                <!-- Annual Plan -->
                <div class="flex items-center gap-2">
                  <p
                    class="uppercase text-sm font-medium cursor-pointer"
                    @click="isList = true"
                  >
                    Annual
                  </p>
                  <div
                    class="inline-flex items-center bg-yellow-100 px-2 py-1 rounded-lg"
                  >
                    <span class="text-yellow-600 uppercase text-xs font-medium">
                      Save 20%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Essential plan -->
            <div class="border border-gray-200 rounded-md mt-12 p-4">
              <div class="flex items-center justify-between mt-4">
                <div>
                  <h2 class="text-xl font-semibold">Essential Plan</h2>
                  <p>
                    Start centralizing and automating your core HR operations.
                  </p>
                </div>
                <div class="bg-[#121828] p-2 rounded-lg text-white">
                  Pick Plan
                </div>
              </div>

              <div class="border-b border-gray-200 mt-4" />
              <div class="flex items-center my-4">
                <h2 class="text-green-600 font-bold text-2xl">$3</h2>
                <p>/Employee/month</p>
              </div>
              <div class="border-b border-gray-200 mt-2" />

              <div class="mt-4">
                <div class="flex items-center gap-2">
                  <AppIcon
                    icon="material-symbols:done-rounded"
                    class="w-6 h-6 text-green-600"
                  />
                  <p>Core hr</p>
                </div>

                <div class="flex items-center gap-2">
                  <AppIcon
                    icon="material-symbols:done-rounded"
                    class="w-6 h-6 text-green-600"
                  />
                  <p>Time Off & Attendance</p>
                </div>
                <div class="flex items-center gap-2">
                  <AppIcon
                    icon="material-symbols:done-rounded"
                    class="w-6 h-6 text-green-600"
                  />
                  <p>Remote Onboarding</p>
                </div>

                <div class="flex items-center gap-2">
                  <AppIcon
                    icon="material-symbols:done-rounded"
                    class="w-6 h-6 text-green-600"
                  />
                  <p>Recuitment</p>
                </div>

                <div class="flex items-center gap-2">
                  <AppIcon
                    icon="material-symbols:done-rounded"
                    class="w-6 h-6 text-green-600"
                  />
                  <p>Mobile App (Employee self service)</p>
                </div>

                <div class="flex items-center gap-2">
                  <AppIcon
                    icon="material-symbols:done-rounded"
                    class="w-6 h-6 text-green-600"
                  />
                  <p>Integration</p>
                </div>
              </div>
            </div>

            <!-- Perform Plan -->
            <div class="border border-gray-200 rounded-md mt-12 p-4">
              <div class="flex items-center justify-between mt-4">
                <div>
                  <div class="flex">
                    <h2 class="text-xl font-semibold">Perform Plan</h2>
                    <div
                      class="flex items-center bg-green-600 px-2 py-1 text-xs uppercase rounded-lg text-white ml-2"
                    >
                      Recommended
                    </div>
                  </div>
                  <p>
                    Start centralizing and automating your core HR operations.
                  </p>
                </div>
                <div class="bg-[#121828] p-2 rounded-lg text-white">
                  Pick Plan
                </div>
              </div>

              <div class="border-b border-gray-200 mt-4" />
              <div class="flex items-center my-4">
                <h2 class="text-green-600 font-bold text-2xl">$4</h2>
                <p>/Employee/month</p>
              </div>
              <div class="border-b border-gray-200 mt-2" />

              <div class="mt-4">
                <div class="flex items-center gap-2">
                  <AppIcon
                    icon="material-symbols:done-rounded"
                    class="w-6 h-6 text-green-600"
                  />
                  <p>Core hr</p>
                </div>

                <div class="flex items-center gap-2">
                  <AppIcon
                    icon="material-symbols:done-rounded"
                    class="w-6 h-6 text-green-600"
                  />
                  <p>Time Off & Attendance</p>
                </div>
                <div class="flex items-center gap-2">
                  <AppIcon
                    icon="material-symbols:done-rounded"
                    class="w-6 h-6 text-green-600"
                  />
                  <p>Remote Onboarding</p>
                </div>

                <div class="flex items-center gap-2">
                  <AppIcon
                    icon="material-symbols:done-rounded"
                    class="w-6 h-6 text-green-600"
                  />
                  <p>Recuitment</p>
                </div>

                <div class="flex items-center gap-2">
                  <AppIcon
                    icon="material-symbols:done-rounded"
                    class="w-6 h-6 text-green-600"
                  />
                  <p>Mobile App (Employee self service)</p>
                </div>

                <div class="flex items-center gap-2">
                  <AppIcon
                    icon="material-symbols:done-rounded"
                    class="w-6 h-6 text-green-600"
                  />
                  <p>Integration</p>
                </div>
              </div>

              <div class="border-b border-gray-200 mt-4" />
              <p class="text-gray-500 mt-4">
                14 days free trial. No credit card required
              </p>
            </div>

            <!-- Engagement Plan -->
            <div class="border border-gray-200 rounded-md mt-12 p-4">
              <div class="flex items-center justify-between mt-4">
                <div>
                  <div class="flex">
                    <h2 class="text-xl font-semibold">Perform Plan</h2>
                    <div
                      class="flex items-center bg-amber-600 px-2 py-1 text-xs uppercase rounded-lg text-white ml-2"
                    >
                      Best value
                    </div>
                  </div>
                  <p>Start building an engaging distributed work culture</p>
                </div>
                <div class="bg-[#121828] p-2 rounded-lg text-white">
                  Pick Plan
                </div>
              </div>

              <div class="border-b border-gray-200 mt-4" />
              <div class="flex items-center my-4">
                <h2 class="text-green-600 font-bold text-2xl">$6</h2>
                <p>/Employee/month</p>
              </div>
              <div class="border-b border-gray-200 mt-2" />

              <div class="mt-4">
                <div class="flex items-center gap-2">
                  <AppIcon
                    icon="material-symbols:done-rounded"
                    class="w-6 h-6 text-green-600"
                  />
                  <p>Core hr</p>
                </div>

                <div class="flex items-center gap-2">
                  <AppIcon
                    icon="material-symbols:done-rounded"
                    class="w-6 h-6 text-green-600"
                  />
                  <p>Peer feedback & recognition</p>
                </div>
                <div class="flex items-center gap-2">
                  <AppIcon
                    icon="material-symbols:done-rounded"
                    class="w-6 h-6 text-green-600"
                  />
                  <p>Polls and pulse survays</p>
                </div>

                <div class="flex items-center gap-2">
                  <AppIcon
                    icon="material-symbols:done-rounded"
                    class="w-6 h-6 text-green-600"
                  />
                  <p>Company social feed</p>
                </div>

                <div class="flex items-center gap-2">
                  <AppIcon
                    icon="material-symbols:done-rounded"
                    class="w-6 h-6 text-green-600"
                  />
                  <p>Interest group</p>
                </div>

                <div class="flex items-center gap-2">
                  <AppIcon
                    icon="material-symbols:done-rounded"
                    class="w-6 h-6 text-green-600"
                  />
                  <p>Instant messages</p>
                </div>
              </div>

              <div class="border-b border-gray-200 mt-4" />
              <p class="text-gray-500 mt-4">
                14 days free trial. No credit card required
              </p>
            </div>

            <div class="flex flex-col mt-12">
              <label for="employee" class=""
                >Number of employees <span class="text-red-600">*</span></label
              >
              <input
                class="border border-gray-200 rounded-lg mt-2 px-4 py-2"
                placeholder="1"
              />
            </div>

            <div class="flex flex-col mt-6 mb-8">
              <label for="employee" class=""
                >Billing Cycle <span class="text-red-600">*</span></label
              >
              <select
                name=""
                id=""
                class="border border-gray-200 rounded-lg mt-2 px-4 py-2"
              >
                <option value="monthly">Monthly</option>
                <option value="annually">Annually</option>
              </select>
            </div>

            <div class="mt-auto flex justify-end gap-4 mt-6">
              <div
                @click="upgrade = false"
                class="px-8 sm:px-12 py-2 border-2 border-gray-800 text-gray-800 rounded-md hover:border-gray-800/50 cursor-pointer"
              >
                Cancel
              </div>
              <div
                @click="createEmployee"
                class="px-8 sm:px-12 py-3 rounded-md cursor-pointer bg-[#121828] text-white hover:bg-gray-800/50"
              >
                Continue
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "SubscriptionView",
  setup() {
    const activeTab = ref("history");
    const upgrade = ref(false);
    const isList = ref(false);
    return {
      activeTab,
      upgrade,
      isList,
    };
  },
};
</script>

<style lang="scss" scoped></style>
