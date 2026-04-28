<template>
  <div class="w-full md:container mx-auto px-5 py-12">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Setting Payroll</h1>
      <p class="text-gray-600">Setting your payroll</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-8 gap-4">
      <div class="col-span-2 bg-white rounded-md p-4">
        <!-- tab -->
        <div
          @click="activeTab = 'general'"
          :class="[
            'flex items-center gap-3 cursor-pointer transition-all duration-200 rounded-lg px-4 py-3 mb-4',
            activeTab === 'general'
              ? 'bg-gray-200 shadow-sm'
              : 'hover:bg-gray-100 text-gray-700',
          ]"
        >
          <AppIcon
            icon="ep:setting"
            :class="[
              'w-6 h-6 transition-colors duration-200',
              activeTab === 'general' ? 'text-green-600' : 'text-gray-400',
            ]"
          />
          General
        </div>

        <div
          @click="activeTab = 'types'"
          :class="[
            'flex items-center gap-3 cursor-pointer transition-all duration-200 rounded-lg px-4 py-3 mb-4',
            activeTab === 'types'
              ? 'bg-gray-200 shadow-sm'
              : 'hover:bg-gray-100 text-gray-700',
          ]"
        >
          <AppIcon
            icon="fluent:card-ui-20-regular"
            :class="[
              'w-7 h-7 transition-colors duration-200',
              activeTab === 'types' ? 'text-green-600' : 'text-gray-400',
            ]"
          />
          <span class="font-medium text-sm">Pay Cycle</span>
        </div>

        <div
          @click="activeTab = 'compensation'"
          :class="[
            'flex items-center gap-3 cursor-pointer transition-all duration-200 rounded-lg px-4 py-3',
            activeTab === 'compensation'
              ? 'bg-gray-200 shadow-sm'
              : 'hover:bg-gray-100 text-gray-700',
          ]"
        >
          <AppIcon
            icon="fluent:card-ui-20-regular"
            :class="[
              'w-7 h-7 transition-colors duration-200',
              activeTab === 'compensation' ? 'text-green-600' : 'text-gray-400',
            ]"
          />
          <span class="font-medium text-sm">Compensation</span>
        </div>
      </div>

      <div class="col-span-6 bg-white rounded-md p-4">
        <div v-if="activeTab === 'general'" class="">
          <h2 class="text-xl font-semibold mb-4">General</h2>
          <p>Currency <span class="text-red-500">*</span></p>
        </div>

        <div v-if="activeTab === 'types'" class="">
          <div class="space-y-6">
            <div class="">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">
                New Pay Cycle
              </h3>

              <div class="">
                <!-- Name -->
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Name <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Pristia Candra"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>

                <!-- Description -->
                <div class="md:col-span-2 mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Description <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Write description"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                  ></textarea>
                </div>

                <!-- Repeat Every -->
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Repeat Every <span class="text-red-500">*</span>
                  </label>
                  <div class="flex gap-2">
                    <input
                      type="number"
                      min="1"
                      class="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />
                    <select
                      class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    >
                      <option value="days">Days</option>
                      <option value="weeks">Weeks</option>
                      <option value="months">Months</option>
                    </select>
                  </div>
                </div>

                <!-- Cut-off Date -->
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Cut-off Date <span class="text-red-500">*</span>
                  </label>
                  <div class="grid grid-cols-2 iems-center gap-6">
                    <input
                      type="date"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />

                    <div class="flex items-center">
                      <span
                        class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        i
                      </span>
                      <p class="text-sm text-gray-500 ml-3">
                        This is the latest date that payroll information should
                        be submitted to calculate payroll
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Who's in Charge Section -->
            <div class="">
              <h3 class="text-lg font-medium text-gray-900 mb-4">
                Who's in Charge
              </h3>

              <div>
                <!-- Person in Charge -->
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Person in Charge <span class="text-red-500">*</span>
                  </label>
                  <select
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  >
                    <option value="">Select Employee</option>
                    <option value="">Chidera</option>
                  </select>
                </div>

                <!-- Review Before Cut-off Date -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Review Before Cut-off Date
                    <span class="text-red-500">*</span>
                  </label>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <select
                      name=""
                      id=""
                      class="w-full border px-3 py-2 rounded-md"
                    >
                      <option value="1">1 Days</option>
                      <option value="1">2 Days</option>
                      <option value="1">3 Days</option>
                      <option value="1">4 Days</option>
                      <option value="1">5 Days</option>
                    </select>

                    <div class="flex items-center">
                      <span
                        class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        i
                      </span>
                      <p class="text-sm text-gray-500 ml-3">
                        Your person in charge will receive a reminder on that
                        day
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Eligibility Section -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">
                Eligibility
              </h3>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Criteria <span class="text-red-500">*</span>
                </label>
                <select
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                >
                  <option value="active">All Active Employees</option>
                  <option value="full_time">Full-time Employees Only</option>
                  <option value="department">By Department</option>
                  <option value="custom">Custom Criteria</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end gap-3 pt-6 mt-6">
            <button
              @click="resetForm"
              class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <div
              @click="savePayCycle"
              class="px-6 py-2 bg-[#14ae5d] text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Save Pay Cycle
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'compensation'" class="">
        <h2 class="text-xl font-semibold mb-4">Compensation</h2>
        <p>Currency <span class="text-red-500">*</span></p>
        <!-- Your content here -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Remove the unused function – we're using direct assignment in the template
const activeTab = ref("general");
</script>

<style lang="scss" scoped></style>
