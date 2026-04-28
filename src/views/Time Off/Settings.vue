<template>
  <div class="min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div>
        <h2
          class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700"
        >
          Settings
        </h2>
        <p class="mt-1 text-sm text-gray-500">Setting your Time off here</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-6 py-6">
        <div
          class="md:col-span-3 md:h-[170px] lg:h-[158px] bg-white rounded-md p-4 flex flex-col"
        >
          <div class="space-y-3">
            <!-- Holiday Tab -->
            <div
              @click="activeTab = 'holiday'"
              :class="[
                'flex items-center gap-3 cursor-pointer transition-all duration-200 rounded-lg px-4 py-3',
                activeTab === 'holiday'
                  ? 'bg-gray-200 shadow-sm'
                  : 'hover:bg-gray-100 text-gray-700',
              ]"
            >
              <AppIcon
                icon="uil:calender"
                :class="[
                  'w-5 h-5 transition-colors duration-200',
                  activeTab === 'holiday' ? 'text-green-600' : 'text-gray-400',
                ]"
              />
              <span class="font-medium text-sm">Holiday</span>
            </div>

            <!-- Types and Policies Tab -->
            <div
              @click="activeTab = 'types'"
              :class="[
                'flex items-center gap-3 cursor-pointer transition-all duration-200 rounded-lg px-4 py-3',
                activeTab === 'types'
                  ? 'bg-gray-200 shadow-sm'
                  : 'hover:bg-gray-100 text-gray-700',
              ]"
            >
              <div>
                <AppIcon
                  icon="uil:file-alt"
                  :class="[
                    'w-5 h-5 transition-colors duration-200',
                    activeTab === 'types' ? 'text-green-600' : 'text-gray-400',
                  ]"
                />
              </div>
              <span class="font-medium text-sm">Types and Policies</span>
            </div>
          </div>
        </div>

        <div class="md:col-span-9 bg-white h-auto p-6 rounded-md">
          <!-- Holiday Section -->
          <div v-if="activeTab === 'holiday'">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-lg md:text-xl lg:text-2xl font-semibold">
                Holidays
              </h2>
              <div
                @click="addNewHoliday"
                class="bg-[#0a1027] px-4 py-2.5 text-white flex items-center gap-2 rounded-xl cursor-pointer"
              >
                <AppIcon icon="si:add-duotone" class="w-6 h-6" />
                <span>Add New Holiday</span>
              </div>
            </div>

            <div class="overflow-x-auto bg-white rounded-lg shadow">
              <table class="w-full table-auto">
                <thead>
                  <tr class="bg-gray-200/70 text-gray-600 uppercase text-sm">
                    <th class="py-3 px-6 text-left">Holiday Name</th>
                    <th class="py-3 px-6 text-left">Start Date</th>
                    <th class="py-3 px-6 text-left">End Date</th>
                    <th class="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody v-if="isLoading">
                  <tr>
                    <td colspan="4" class="py-3 px-6 text-center">
                      Loading...
                    </td>
                  </tr>
                </tbody>
                <tbody
                  v-else-if="holidays.length"
                  class="text-gray-600 text-sm"
                >
                  <tr
                    v-for="holiday in holidays"
                    :key="holiday.id"
                    class="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <!-- Holiday Name -->
                    <td
                      class="p-5 ml-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      <p
                        v-if="!holiday.isEditing"
                        class="text-sm font-medium text-gray-900"
                      >
                        {{ holiday.name }}
                      </p>
                      <input
                        v-else
                        v-model="holiday.editedName"
                        type="text"
                        class="w-full px-3 py-1.5 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        @keyup.enter="saveHolidayEdit(holiday)"
                        placeholder="Enter holiday name"
                      />
                    </td>

                    <!-- Start Date -->
                    <td
                      class="p-5 ml-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      <p v-if="!holiday.isEditing">
                        {{ holiday.formatted_from_date }}
                      </p>
                      <input
                        v-else
                        v-model="holiday.editedFromDate"
                        type="date"
                        class="w-full px-3 py-1.5 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      />
                    </td>

                    <!-- End Date -->
                    <td
                      class="p-5 ml-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      <p v-if="!holiday.isEditing">
                        {{ holiday.formatted_to_date }}
                      </p>
                      <input
                        v-else
                        v-model="holiday.editedToDate"
                        type="date"
                        class="w-full px-3 py-1.5 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      />
                    </td>

                    <!-- Actions -->
                    <td class="py-3 px-6 text-center">
                      <div class="flex item-center justify-center">
                        <!-- Edit/Save Button -->
                        <div
                          v-if="!holiday.isEditing"
                          @click="toggleHolidayEdit(holiday)"
                          class="mr-2 transform bg-blue-500 flex items-center rounded-md hover:bg-blue-600 hover:scale-110 cursor-pointer p-1"
                        >
                          <AppIcon
                            icon="ei:pencil"
                            class="w-5 h-5 text-white"
                          />
                        </div>
                        <div
                          v-else
                          @click="saveHolidayEdit(holiday)"
                          class="mr-2 transform bg-green-500 flex items-center rounded-md hover:bg-green-600 hover:scale-110 cursor-pointer p-1"
                          :disabled="holiday.isSaving"
                        >
                          <AppIcon icon="ei:check" class="w-5 h-5 text-white" />
                        </div>

                        <!-- Delete Button -->
                        <div
                          @click="deleteHoliday(holiday.id)"
                          class="mr-2 transform bg-red-500 flex items-center p-1 rounded-md hover:bg-red-600 hover:scale-110 cursor-pointer"
                        >
                          <AppIcon
                            icon="fluent:delete-16-regular"
                            class="w-4 h-4 text-white"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <td colspan="4" class="py-3 px-6 text-center">
                      No Holidays
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Types and Policies -->
          <div v-if="activeTab === 'types'">
            <div
              class="flex flex-col md:flex-row justify-between items:start md:items-center mb-4"
            >
              <h2
                class="text-lg md:text-xl lg:text-2xl font-semibold text-gray-700"
              >
                Types and Policies
              </h2>

              <div class="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
                <div
                  @click="showModal = true"
                  class="border border-gray-800 px-3 py-2.5 text-white flex items-center gap-2 rounded-lg"
                >
                  <AppIcon
                    icon="si:add-duotone"
                    class="w-6 h-6 text-gray-800"
                  />
                  <span class="text-gray-800">New Type</span>
                </div>
                <div
                  @click="showNewPolicy = true"
                  class="bg-gray-800 px-3 py-2.5 text-white flex items-center gap-2 rounded-lg"
                >
                  <AppIcon icon="si:add-duotone" class="w-6 h-6" />
                  <span>New Policy</span>
                </div>
              </div>
            </div>

            <!-- Anual -->
            <div class="border bg-white shadow-md rounded-lg p-6 mb-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <h2 class="font-semibold text-xl">Annual</h2>
                  <p
                    class="bg-gray-200 px-2 rounded-full py-1 uppercase text-xs"
                  >
                    unpaid
                  </p>
                </div>
              </div>

              <div class="overflow-x-auto bg-white rounded-lg mt-6">
                <table class="w-full table-auto">
                  <thead>
                    <tr
                      class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
                    >
                      <th class="py-3 px-6 text-left">Policy Name</th>
                      <th class="py-3 px-6 text-left">Description</th>
                      <th class="py-3 px-6 text-left">Eligibility</th>
                      <th class="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-600 text-sm">
                    <tr class="border-b border-gray-200 hover:bg-gray-100">
                      <td class="py-3 px-6 text-left">Anual</td>
                      <td class="py-3 px-6 text-left">-</td>
                      <td class="py-3 px-6 text-left">
                        Full-time employee only
                      </td>
                      <td class="py-3 px-6 text-center">
                        <div class="flex item-center justify-center">
                          <button
                            class="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Engagement -->
            <div class="border bg-white shadow-md rounded-lg p-6 mb-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <h2 class="font-semibold text-xl">Annual</h2>
                  <p
                    class="bg-gray-200 px-2 rounded-full py-1 uppercase text-xs"
                  >
                    unpaid
                  </p>
                </div>
              </div>

              <div class="overflow-x-auto bg-white rounded-lg mt-6">
                <table class="w-full table-auto">
                  <thead>
                    <tr
                      class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
                    >
                      <th class="py-3 px-6 text-left">Policy Name</th>
                      <th class="py-3 px-6 text-left">Description</th>
                      <th class="py-3 px-6 text-left">Eligibility</th>
                      <th class="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-600 text-sm">
                    <tr class="border-b border-gray-200 hover:bg-gray-100">
                      <td class="py-3 px-6 text-left">Anual</td>
                      <td class="py-3 px-6 text-left">-</td>
                      <td class="py-3 px-6 text-left">
                        Full-time employee only
                      </td>
                      <td class="py-3 px-6 text-center">
                        <div class="flex item-center justify-center">
                          <button
                            class="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Maternity -->
            <div class="border bg-white shadow-md rounded-lg p-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <h2 class="font-semibold text-xl">Annual</h2>
                  <p
                    class="bg-gray-200 px-2 rounded-full py-1 uppercase text-xs"
                  >
                    unpaid
                  </p>
                </div>
              </div>

              <div class="overflow-x-auto bg-white rounded-lg mt-6">
                <table class="w-full table-auto">
                  <thead>
                    <tr
                      class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
                    >
                      <th class="py-3 px-6 text-left">Policy Name</th>
                      <th class="py-3 px-6 text-left">Description</th>
                      <th class="py-3 px-6 text-left">Eligibility</th>
                      <th class="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-600 text-sm">
                    <tr class="border-b border-gray-200 hover:bg-gray-100">
                      <td class="py-3 px-6 text-left">Anual</td>
                      <td class="py-3 px-6 text-left">-</td>
                      <td class="py-3 px-6 text-left">
                        Full-time female employee only
                      </td>
                      <td class="py-3 px-6 text-center">
                        <div class="flex item-center justify-center">
                          <button
                            class="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Holiday -->
    <transition name="fade">
      <div
        v-if="showHoliday"
        class="fixed inset-0 bg-black/50 flex items-center justify-end z-50"
      >
        <div class="flex items-center h-full">
          <div
            @click="showModal = false"
            class="bg-white w-10 h-10 p-2 rounded-full shadow-lg text-gray-500 hover:text-gray-700 mr-2 hidden md:block"
          >
            <AppIcon icon="codicon:chevron-right" class="w-6 h-6" />
          </div>
          <div class="h-full bg-white w-98 p-6 flex flex-col">
            <h2 class="text-2xl font-medium mb-6">New Holiday</h2>

            <div>
              <p class="mb-1">
                Holiday name <span class="text-red-500">*</span>
              </p>
              <input
                type="name"
                v-model="formData.name"
                class="border rounded-md border-gray-200 w-full p-2.5"
                placeholder="New Year's Day"
              />
            </div>

            <div class="flex items-center justify-between gap-4 mt-4">
              <div>
                <p class="text-sm mb-1">
                  From <span class="text-red-500">*</span>
                </p>
                <input
                  v-model="formData.from_date"
                  type="date"
                  class="border rounded-md border-gray-200 w-full p-2.5"
                />
              </div>

              <div>
                <p class="text-sm mb-1">
                  To <span class="text-red-500">*</span>
                </p>
                <input
                  v-model="formData.to_date"
                  type="date"
                  class="border rounded-md border-gray-200 w-full p-2.5"
                />
              </div>
            </div>

            <div class="mt-auto pt-4 flex justify-end">
              <div class="flex space-x-4">
                <!-- Cancel Button -->
                <div
                  @click="showHoliday = false"
                  class="px-8 sm:px-12 py-2 border-2 border-gray-800 text-gray-800 rounded-md hover:border-gray-800/50 cursor-pointer"
                >
                  Cancel
                </div>

                <!-- Create btn -->
                <div
                  @click="saveHoliday"
                  :disabled="isLoading"
                  :class="[
                    'px-8 sm:px-12 py-2 rounded-md cursor-pointer',
                    isLoading
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-gray-800 text-white hover:bg-gray-800/50',
                  ]"
                >
                  {{ isLoading ? "Adding..." : "Add" }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal -->
    <transition name="modal">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black/50 flex items-center justify-end z-50"
        @click.self="showModal = false"
      >
        <div class="flex items-center h-full">
          <div
            @click="showModal = false"
            class="bg-white w-10 h-10 p-2 rounded-full shadow-lg text-gray-500 hover:text-gray-700 mr-2 hidden md:block"
          >
            <AppIcon icon="codicon:chevron-right" class="w-6 h-6" />
          </div>
          <div class="h-full bg-white w-96 px-6 py-6">
            <h2 class="text-2xl font-medium text-base mb-6">Add Type</h2>

            <div class="mb-4">
              <p class="mb-1" for="name">
                Type Name <span class="text-red-500">*</span>
              </p>
              <input
                type="name"
                class="border rounded-md border-gray-200 w-full p-2.5"
                placeholder="Engagement"
              />
            </div>

            <div class="mb-4">
              <p class="mb-1">
                Paid/Unpaid <span class="text-red-500">*</span>
              </p>
              <div class="flex items-center gap-4">
                <label
                  class="relative flex-1 items-center px-3 py-3 gap-3 rounded-lg font-medium text-gray-700 border hover:border-2 hover:border-[#28a076] has-[:checked]:border-[#28a076] has-[:checked]:ring-1 has-[:checked]:ring-[#28a076] cursor-pointer select-none"
                >
                  <span class="text-black text-sm">Paid</span>
                  <input
                    type="radio"
                    name="company-industry"
                    class="absolute right-3 w-4 h-4 border-gray-300 accent-[#28a076] focus:ring-[#28a076]"
                  />
                </label>
                <label
                  class="relative flex-1 items-center px-3 py-3 gap-3 rounded-lg font-medium text-gray-700 border hover:border-2 hover:border-[#28a076] has-[:checked]:border-[#28a076] has-[:checked]:ring-1 has-[:checked]:ring-[#28a076] cursor-pointer select-none"
                >
                  <span class="text-black text-sm">Paid</span>
                  <input
                    type="radio"
                    name="company-industry"
                    class="absolute right-3 w-4 h-4 border-gray-300 accent-[#28a076] focus:ring-[#28a076]"
                  />
                </label>
              </div>
            </div>

            <div>
              <p class="mb-1">Unit <span class="text-red-500">*</span></p>
              <label
                class="relative flex items-center px-3 py-3 gap-3 rounded-lg font-medium text-gray-700 border hover:border-2 hover:border-[#28a076] has-[:checked]:border-[#28a076] has-[:checked]:ring-1 has-[:checked]:ring-[#28a076] cursor-pointer select-none"
              >
                <span class="text-black text-sm">Paid</span>
                <input
                  type="radio"
                  name="company-industry"
                  class="absolute right-3 w-4 h-4 border-gray-300 accent-[#28a076] focus:ring-[#28a076]"
                />
              </label>
            </div>

            <div class="flex justify-between pt-4">
              <div
                @click="showModal = false"
                class="px-8 sm:px-12 py-2 border-2 border-gray-800 text-gray-800 rounded-md hover:border-gray-800/50 cursor-pointer"
              >
                Cancel
              </div>
              <div
                @click="createEmployee"
                :class="[
                  'px-8 sm:px-12 py-2 rounded-md cursor-pointer',
                  isLoading
                    ? 'bg-gray-400 text-white pointer-events-none'
                    : 'bg-gray-800 text-white hover:bg-gray-800/50',
                ]"
                :disabled="isLoading"
              >
                {{ isLoading ? "Creating..." : "Create" }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal for New Policy -->
    <transition name="fade">
      <div
        v-if="showNewPolicy"
        class="fixed inset-0 bg-black/50 flex items-center justify-end z-50"
        @click.self="showNewPolicy = false"
      >
        <div class="flex items-center h-full">
          <div
            @click="showNewPolicy = false"
            class="bg-white w-10 h-10 p-2 rounded-full shadow-lg text-gray-500 hover:text-gray-700 mr-2 hidden md:block"
          >
            <AppIcon icon="codicon:chevron-right" class="w-6 h-6" />
          </div>
          <div
            class="bg-white w-sm md:w-xl lg:w-2xl p-6 h-auto h-full overflow-y-auto"
          >
            <h2 class="text-2xl font-medium mb-6">Create Policy</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Policy Name <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors duration-200"
                  required
                  placeholder="Annual"
                />
              </div>
              <div class="w-full">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Policy Type
                  <span class="text-red-500">*</span>
                </label>

                <select
                  class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors duration-200"
                  placeholder="Select Type"
                  required
                >
                  <option value="" disabled selected hidden>Select Type</option>
                  <option value="vacation">Vacation</option>
                  <option value="sick">Sick Leave</option>
                </select>
              </div>
            </div>
            <div class="mb-4">
              <label class="block mb-1">
                Description <span class="text-red-500">*</span>
              </label>
              <textarea
                class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors duration-200"
                rows="1"
                required
                placeholder="Input description about policy"
              ></textarea>
            </div>

            <h3 class="font-medium text-lg mb-4">Accrual</h3>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Assign Date
                <span class="text-red-500">*</span>
              </label>
              <select
                class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors duration-200"
                required
              >
                <option value="">Upon Join Date</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Accural Frequency
                  <span class="text-red-500">*</span>
                </label>
                <select
                  class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors duration-200"
                  required
                >
                  <option value="">Upon Join Date</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Accrual Frequency <span class="text-red-500">*</span>
                </label>
                <select
                  class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors duration-200"
                  required
                >
                  <option value="">Select Period</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Entitlement</label
              >
              <select
                class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors duration-200"
                required
              >
                <option value="">Select Period</option>
                <option value="monthly">3 days per week</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <h3 class="font-medium text-lg mb-4">Carry Over</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Maximum carry over
                  <span class="text-red-500">*</span>
                </label>
                <select
                  class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors duration-200"
                  required
                >
                  <option value="">Upon Join Date</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Carry Over Expiration <span class="text-red-500">*</span>
                </label>
                <select
                  class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors duration-200"
                  required
                >
                  <option value="">Select Period</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>

            <div class="mt-auto flex items-center justify-between pt-4">
              <p class="text-[#28a076]">Save and assign employee</p>
              <div class="flex space-x-4">
                <div
                  @click="showModal = false"
                  class="px-8 sm:px-12 py-2 border-2 border-gray-800 text-gray-800 rounded-md hover:border-gray-800/50 cursor-pointer"
                >
                  Cancel
                </div>
                <div
                  @click="createEmployee"
                  :class="[
                    'px-8 sm:px-12 py-2 rounded-md cursor-pointer',
                    isLoading
                      ? 'bg-gray-400 text-white pointer-events-none'
                      : 'bg-gray-800 text-white hover:bg-gray-800/50',
                  ]"
                  :disabled="isLoading"
                >
                  {{ isLoading ? "Creating..." : "Create" }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import {
  allHolidays,
  addHolidays,
  editHolidays,
  destroyHoliday,
} from "@/services/auth.timeoff";

export default {
  name: "SettingView",
  setup() {
    const activeTab = ref("holiday");
    const showModal = ref(false);
    const showHoliday = ref(false);
    const showNewPolicy = ref(false);
    const isLoading = ref(false);
    const holidays = ref([]);
    const toast = useToast();

    const formData = ref({
      name: "",
      from_date: "",
      to_date: "",
    });

    const getHoliday = async () => {
      isLoading.value = true;

      const response = await allHolidays();
      if (response?.status === 200 && response?.data) {
        holidays.value = (response.data.data || []).map((holiday) => ({
          ...holiday,
          isEditing: false,
          editedName: holiday.name,
          editedFromDate: formatDateForInput(
            holiday.from_date || holiday.formatted_from_date
          ),
          editedToDate: formatDateForInput(
            holiday.to_date || holiday.formatted_to_date
          ),
          isSaving: false,
        }));
      } else {
        holidays.value = [];
      }

      isLoading.value = false;
    };

    const formatDateForInput = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    };

    const formatDisplayDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    const toggleHolidayEdit = (holiday) => {
      holiday.isEditing = true;
    };

    const saveHolidayEdit = async (holiday) => {
      holiday.isSaving = true;

      if (
        holiday.editedName === holiday.name &&
        holiday.editedFromDate === holiday.from_date &&
        holiday.editedToDate === holiday.to_date
      ) {
        toast.info("No changes detected");
        holiday.isEditing = false;
        return;
      }

      const payload = {
        name: holiday.editedName,
        from_date: holiday.editedFromDate,
        to_date: holiday.editedToDate,
      };

      const response = await editHolidays(holiday.id, payload);

      if (response?.status === 200) {
        holiday.name = holiday.editedName;
        holiday.from_date = holiday.editedFromDate;
        holiday.to_date = holiday.editedToDate;
        holiday.formatted_from_date = formatDisplayDate(holiday.editedFromDate);
        holiday.formatted_to_date = formatDisplayDate(holiday.editedToDate);
        holiday.isEditing = false;
        toast.success("Holiday updated successfully");
      } else {
        toast.error("Failed to update holiday");
      }

      holiday.isSaving = false;
    };

    const addNewHoliday = () => {
      showHoliday.value = true;
      resetForm();
    };

    const saveHoliday = async () => {
      if (
        !formData.value.name ||
        !formData.value.from_date ||
        !formData.value.to_date
      ) {
        toast.error("Please fill in all required fields");
        return;
      }

      isLoading.value = true;

      const payload = {
        name: formData.value.name,
        from_date: formData.value.from_date,
        to_date: formData.value.to_date,
      };

      const response = await addHolidays(payload);

      if (response?.status === 200 || response?.status === 201) {
        const newHoliday = {
          ...response.data.data,
          isEditing: false,
          editedName: formData.value.name,
          editedFromDate: formData.value.from_date,
          editedToDate: formData.value.to_date,
          isSaving: false,
          formatted_from_date: formatDisplayDate(formData.value.from_date),
          formatted_to_date: formatDisplayDate(formData.value.to_date),
        };

        holidays.value.push(newHoliday);
        showHoliday.value = false;
        resetForm();
        toast.success("Holiday added successfully!");
      } else {
        toast.error("Failed to save holiday");
      }

      isLoading.value = false;
    };

    const deleteHoliday = async (holiday_id) => {
      const response = await destroyHoliday(holiday_id);
      if (response?.status === 200) {
        holidays.value = holidays.value.filter(
          (holiday) => holiday.id !== holiday_id
        );
        toast.success("Holiday deleted successfully!");
      } else {
        toast.error("Failed to delete holiday");
      }
    };

    const resetForm = () => {
      formData.value = {
        name: "",
        from_date: "",
        to_date: "",
      };
    };

    onMounted(() => {
      getHoliday();
    });

    return {
      activeTab,
      showHoliday,
      showModal,
      showNewPolicy,
      holidays,
      isLoading,
      formData,
      saveHoliday,
      toggleHolidayEdit,
      saveHolidayEdit,
      deleteHoliday,
      addNewHoliday,
      resetForm,
    };
  },
};
</script>
