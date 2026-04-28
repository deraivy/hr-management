<template>
  <div class="">
    <div class="w-full container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <!-- Header -->
      <router-link
        to="/manage-employee"
        class="flex items-center gap-2 mb-4 sm:mb-6"
      >
        <AppIcon
          icon="line-md:chevron-left"
          class="w-5 h-5 sm:w-6 sm:h-6 text-gray-700"
        />
        <h2 class="text-base sm:text-lg md:text-xl font-bold text-gray-700">
          Detail Employee
        </h2>
      </router-link>

      <div class="grid grid-cols-1 lg:grid-cols-6 gap-4 sm:gap-6">
        <!-- Left Sidebar -->
        <div
          class="col-span-1 lg:col-span-2 h-[calc(100vh-10rem)] w-full bg-white shadow-sm rounded-lg p-4 sm:p-6"
        >
          <div v-if="isLoading">
            <div class="animate-pulse">
              <div class="flex items-center justify-center">
                <div class="rounded-full bg-gray-300 h-24 w-24 mb-4"></div>
              </div>

              <div class="flex flex-col items-center">
                <div class="h-4 w-2/6 bg-gray-300 rounded-md mb-2"></div>
                <div class="h-4 w-3/6 bg-gray-300 rounded-md mb-2"></div>
              </div>
              <div class="border-b border-gray-200 my-3"></div>
              <div class="space-y-4 py-1">
                <div class="h-4 bg-gray-300 rounded w-3/4"></div>
                <div class="space-y-2">
                  <div class="h-4 bg-gray-300 rounded"></div>
                  <div class="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              </div>
              <div class="border-b border-gray-200 my-3"></div>
              <div class="space-y-4 py-1">
                <div class="h-4 bg-gray-300 rounded w-3/4"></div>
                <div class="space-y-2">
                  <div class="h-4 bg-gray-300 rounded"></div>
                  <div class="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              </div>
              <div></div>
            </div>
          </div>

          <div v-else-if="employee" class="">
            <div class="flex flex-col items-center">
              <img
                src="/images/profile.jpeg"
                alt="Profile picture"
                class="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
              />
              <p
                class="mt-2 font-bold text-base capitalize sm:text-lg text-gray-900"
              >
                {{ employee?.general?.fullname }}
              </p>
              <p class="mt-1 text-xs sm:text-sm text-gray-600">
                {{ employee?.payroll?.job_title }}
              </p>
              <div class="flex items-center gap-2 mt-2">
                <div
                  class="px-2 py-0.5 sm:px-3 sm:py-1 font-semibold rounded-md text-xs uppercase transition-colors duration-200"
                  :style="statusStyle(employee?.payroll?.employment_status)"
                >
                  {{ employee?.payroll?.employment_status || "-" }}
                </div>
              </div>
            </div>
            <div class="border-b border-gray-200 my-3"></div>
            <div>
              <p class="flex items-center gap-3 font-medium mt-3 sm:mt-4">
                <AppIcon
                  icon="icon-park-outline:mail"
                  class="w-5 h-5 sm:w-6 sm:h-6 text-gray-500"
                />
                <span class="text-xs sm:text-sm">{{
                  employee?.general?.email
                }}</span>
              </p>
              <p class="flex items-center gap-3 font-medium mt-3 sm:mt-4">
                <AppIcon
                  icon="icons8:phone"
                  class="w-5 h-5 sm:w-6 sm:h-6 text-gray-500"
                />
                <span class="text-xs sm:text-sm">{{
                  employee?.general?.phone_number
                }}</span>
              </p>
              <p class="flex items-center gap-3 font-medium mt-3 sm:mt-4">
                <AppIcon
                  icon="fontisto:world-o"
                  class="w-5 h-5 sm:w-6 sm:h-6 text-gray-500"
                />
                <span class="text-xs sm:text-sm">GMT +07:00</span>
              </p>
            </div>
            <div class="border-b border-gray-200 my-3"></div>
            <div>
              <p class="text-gray-500 text-xs sm:text-sm">Department</p>
              <div class="flex items-center mt-2 justify-between">
                <h2 class="text-sm sm:text-base font-semibold">Designer</h2>
                <AppIcon
                  icon="proicons:chevron-right"
                  class="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
                />
              </div>
            </div>
            <div class="mt-3">
              <p class="text-gray-500 text-xs sm:text-sm">Office</p>
              <div class="flex items-center mt-2 justify-between">
                <h2 class="text-sm sm:text-base font-semibold">
                  Unipex Studio
                </h2>
                <AppIcon
                  icon="proicons:chevron-right"
                  class="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
                />
              </div>
            </div>
            <div class="mt-3">
              <p class="text-gray-500 text-xs sm:text-sm">Line Manager</p>
              <div class="flex items-center mt-2 justify-between">
                <h2 class="text-sm sm:text-base font-semibold">
                  Skylar Calzoni
                </h2>
                <AppIcon
                  icon="proicons:chevron-right"
                  class="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
                />
              </div>
            </div>
            <div class="mt-4">
              <button
                class="w-full bg-gray-800 text-white py-2 rounded-md font-medium flex items-center justify-center gap-2 text-xs sm:text-sm hover:bg-gray-900 transition-colors"
              >
                <span>Action</span>
                <AppIcon
                  icon="proicons:chevron-down"
                  class="w-4 h-4 sm:w-5 sm:h-5"
                />
              </button>
            </div>
          </div>
          <div v-else></div>
        </div>

        <!-- Main Content -->
        <div
          class="col-span-3 lg:col-span-4 bg-white shadow-sm rounded-lg p-4 sm:p-6"
        >
          <!-- Tabs -->
          <div>
            <ul
              class="flex flex-row overflow-x-auto gap-2 mb-4 sm:mb-6 border-b border-gray-100"
            >
              <li @click="openTab = 1" class="flex-shrink-0">
                <a
                  href="#"
                  :class="openTab === 1 ? activeClasses : inactiveClasses"
                  class="block py-2 px-3 sm:px-4 text-xs sm:text-sm font-medium rounded-t-md"
                >
                  General
                </a>
              </li>
              <li @click="openTab = 2" class="flex-shrink-0">
                <a
                  href="#"
                  :class="openTab === 2 ? activeClasses : inactiveClasses"
                  class="block py-2 px-3 sm:px-4 text-xs sm:text-sm font-medium rounded-t-md"
                >
                  Job
                </a>
              </li>
              <li @click="openTab = 3" class="flex-shrink-0">
                <a
                  href="#"
                  :class="openTab === 3 ? activeClasses : inactiveClasses"
                  class="block py-2 px-3 sm:px-4 text-xs sm:text-sm font-medium rounded-t-md"
                >
                  Payroll
                </a>
              </li>
              <li @click="openTab = 4" class="flex-shrink-0">
                <a
                  href="#"
                  :class="openTab === 4 ? activeClasses : inactiveClasses"
                  class="block py-2 px-3 sm:px-4 text-xs sm:text-sm font-medium rounded-t-md"
                >
                  Documents
                </a>
              </li>
              <li @click="openTab = 5" class="flex-shrink-0">
                <a
                  href="#"
                  :class="openTab === 5 ? activeClasses : inactiveClasses"
                  class="block py-2 px-3 sm:px-4 text-xs sm:text-sm font-medium rounded-t-md"
                >
                  Setting
                </a>
              </li>
            </ul>
            <div class="w-full">
              <div v-show="openTab === 1">
                <div
                  v-if="isLoading"
                  class="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm"
                >
                  <!-- Personal Info Section -->
                  <div class="mb-6 border border-gray-200 p-4 rounded-lg">
                    <div class="flex justify-between items-center mb-4">
                      <div class="text-xl font-semibold text-gray-900">
                        Personal Info
                      </div>
                      <button
                        class="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      >
                        <AppIcon
                          icon="ei:pencil"
                          class="w-6 h-6 text-gray-400"
                        />
                      </button>
                    </div>
                    <div class="border-t border-gray-200 my-4"></div>
                    <div class="grid grid-cols-2 gap-4">
                      <div class="flex space-x-2">
                        <div class="text-gray-600 mb-1 text-sm">Full Name</div>
                        <div
                          class="h-6 bg-gray-200 rounded w-3/4 animate-pulse"
                        ></div>
                      </div>
                      <div class="flex space-x-2">
                        <div class="text-gray-600 mb-1">Gender</div>
                        <div
                          class="h-6 bg-gray-200 rounded w-1/3 animate-pulse"
                        ></div>
                      </div>
                      <div class="flex space-x-2">
                        <div class="text-gray-600 mb-1">Date of Birth</div>
                        <div
                          class="h-6 bg-gray-200 rounded w-1/2 animate-pulse"
                        ></div>
                      </div>
                      <div class="flex space-x-2">
                        <div class="text-gray-600 mb-1">Marital Status</div>
                        <div
                          class="h-6 bg-gray-200 rounded w-1/3 animate-pulse"
                        ></div>
                      </div>
                      <div class="flex space-x-2">
                        <div class="text-gray-600 mb-1">Nationality</div>
                        <div
                          class="h-6 bg-gray-200 rounded w-1/4 animate-pulse"
                        ></div>
                      </div>
                      <div class="flex space-x-2">
                        <div class="text-gray-600 mb-1">Personal Tax ID</div>
                        <div
                          class="h-6 bg-gray-200 rounded w-1/6 animate-pulse"
                        ></div>
                      </div>
                      <div class="flex space-x-2">
                        <div class="text-gray-600 mb-1">Email</div>
                        <div
                          class="h-6 bg-gray-200 rounded w-2/3 animate-pulse"
                        ></div>
                      </div>
                      <div class="flex space-x-2">
                        <div class="text-gray-600 mb-1">Social Insurance</div>
                        <div
                          class="h-6 bg-gray-200 rounded w-1/6 animate-pulse"
                        ></div>
                      </div>
                      <div class="flex space-x-2">
                        <div class="text-gray-600 mb-1">Health Insurance</div>
                        <div
                          class="h-6 bg-gray-200 rounded w-1/6 animate-pulse"
                        ></div>
                      </div>
                      <div class="flex space-x-2">
                        <div class="text-gray-600 mb-1">Phone Number</div>
                        <div
                          class="h-6 bg-gray-200 rounded w-1/2 animate-pulse"
                        ></div>
                      </div>
                    </div>
                  </div>

                  <!-- Address Section -->
                  <div class="border border-gray-200 p-4 rounded-lg">
                    <div class="flex justify-between items-center mb-4">
                      <div class="text-xl font-semibold text-gray-900">
                        Address
                      </div>
                      <button
                        class="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      >
                        <AppIcon
                          icon="ei:pencil"
                          class="w-6 h-6 text-gray-400"
                        />
                      </button>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                      <div class="flex space-x-2">
                        <div class="text-gray-600 mb-1">Primary Address</div>
                        <div
                          class="h-6 bg-gray-200 rounded w-2/3 animate-pulse"
                        ></div>
                      </div>
                      <div class="flex space-x-2">
                        <div class="text-gray-600 mb-1">Country</div>
                        <div
                          class="h-6 bg-gray-200 rounded w-1/3 animate-pulse"
                        ></div>
                      </div>
                      <div class="flex space-x-2">
                        <div class="text-gray-600 mb-1">State/Province</div>
                        <div
                          class="h-6 bg-gray-200 rounded w-1/3 animate-pulse"
                        ></div>
                      </div>
                      <div class="flex space-x-2">
                        <div class="text-gray-600 mb-1">City</div>
                        <div
                          class="h-6 bg-gray-200 rounded w-1/3 animate-pulse"
                        ></div>
                      </div>
                      <div class="flex space-x-2">
                        <div class="text-gray-600 mb-1">Post Code</div>
                        <div
                          class="h-6 bg-gray-200 rounded w-1/6 animate-pulse"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else-if="employee">
                  <GeneralEmployee
                    :employee="employee"
                    @update="handleUpdate"
                  />
                </div>
                <div v-else>No employee data.</div>
              </div>
              <div v-show="openTab === 2">
                <div v-if="isLoading">
                  <div
                    class="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm"
                  >
                    <div class="flex justify-between items-center mb-4">
                      <div class="text-xl font-semibold text-gray-900">
                        Employment Infomation
                      </div>
                      <button
                        class="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      >
                        <AppIcon
                          icon="ei:pencil"
                          class="w-6 h-6 text-gray-400"
                        />
                      </button>
                    </div>
                    <div class="border-t border-gray-200 my-4"></div>

                    <div class="grid grid-cols-2 gap-4">
                      <div class="flex space-x-2">
                        <div class="text-gray-600 mb-1">Primary Address</div>
                        <div
                          class="h-6 bg-gray-200 rounded w-2/3 animate-pulse"
                        ></div>
                      </div>
                      <div class="flex space-x-2">
                        <div class="text-gray-600 mb-1">Country</div>
                        <div
                          class="h-6 bg-gray-200 rounded w-1/3 animate-pulse"
                        ></div>
                      </div>
                      <div class="flex space-x-2">
                        <div class="text-gray-600 mb-1">State/Province</div>
                        <div
                          class="h-6 bg-gray-200 rounded w-1/3 animate-pulse"
                        ></div>
                      </div>
                      <div class="flex space-x-2">
                        <div class="text-gray-600 mb-1">City</div>
                        <div
                          class="h-6 bg-gray-200 rounded w-1/3 animate-pulse"
                        ></div>
                      </div>
                      <div class="flex space-x-2">
                        <div class="text-gray-600 mb-1">Post Code</div>
                        <div
                          class="h-6 bg-gray-200 rounded w-1/6 animate-pulse"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <Job
                  v-else-if="employee"
                  :employee="employee"
                  @update="handleUpdate"
                />
                <p v-else>Loading employee data...</p>
              </div>

              <div v-show="openTab === 3">
                <Payroll
                  v-if="employee"
                  :employee="employee"
                  @update="handleUpdate"
                />
                <p v-else>Loading employee data...</p>
              </div>
              <div v-show="openTab === 4">
                <Document />
              </div>
              <div v-show="openTab === 5">
                <Setting />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import GeneralEmployee from "@/components/GeneralEmployee.vue";
import Job from "@/components/Job.vue";
import Payroll from "@/components/Payroll.vue";
import Document from "@/components/Document.vue";
import Setting from "@/components/Setting.vue";
import { oneEmployee, updateEmployees } from "@/services/auth.employees";
import { useRoute } from "vue-router";
export default {
  name: "EmployeeDetail",
  components: { GeneralEmployee, Job, Payroll, Document, Setting },
  setup() {
    const openTab = ref(1);
    const error = ref(null);
    const activeClasses = "bg-white border-b border-green-600 text-green-600";
    const inactiveClasses =
      "text-gray-500 hover:text-gray-700 hover:bg-gray-50";

    const route = useRoute();
    const employee = ref(null);
    const isLoading = ref(false);

    // Fetch employee details
    const fetchEmployee = async () => {
      isLoading.value = true;
      try {
        const response = await oneEmployee(route.params.id);
        if (response && response.status === 200 && response.data) {
          employee.value = response.data.employee || response.data;
        } else {
          error.value = "Failed to fetch employee details";
        }
      } catch (err) {
        error.value = "Error fetching employee: " + err.message;
      } finally {
        isLoading.value = false;
      }
    };

    const handleUpdate = async (updatedData) => {
      try {
        await updateEmployees(route.params.id, updatedData);

        if (updatedData.edit_type === "general") {
          employee.value.general = {
            ...employee.value.general,
            ...updatedData.data,
          };
        }
        if (updatedData.edit_type === "job") {
          employee.value.job = {
            ...employee.value.job,
            ...updatedData.data,
          };
        }
        if (updatedData.edit_type === "payroll") {
          employee.value.payroll = {
            ...employee.value.payroll,
            ...updatedData.data,
          };
        }
      } catch (err) {
        console.error("Failed to update:", err.response?.data || err.message);
      }
    };

    const statusStyle = (status) => {
      switch (status) {
        case "Active":
          return { backgroundColor: "#d1fae5", color: "#065f46" }; // green
        case "Inactive":
          return { backgroundColor: "#f3f4f6", color: "#6b7280" }; // gray
        case "On Boarding":
          return { backgroundColor: "#e0f2fe", color: "#0369a1" }; // blue
        case "On Leave":
          return { backgroundColor: "#fef9c3", color: "#854d0e" }; // yellow
        case "Suspended":
          return { backgroundColor: "#fee2e2", color: "#991b1b" }; // red
        case "Terminated":
          return { backgroundColor: "#fef2f2", color: "#b91c1c" }; // rose
        case "Probation":
          return { backgroundColor: "#ede9fe", color: "#5b21b6" }; // violet
        case "Resigned":
          return { backgroundColor: "#f3e8ff", color: "#581c87" }; // purple
        default:
          return { backgroundColor: "#f3f4f6", color: "#6b7280" }; // default gray
      }
    };

    onMounted(() => {
      fetchEmployee();
    });

    return {
      openTab,
      activeClasses,
      inactiveClasses,
      fetchEmployee,
      employee,
      error,
      isLoading,
      handleUpdate,
      statusStyle,
    };
  },
};
</script>

<style>
button:hover {
  background-color: #1f2937;
}
</style>
