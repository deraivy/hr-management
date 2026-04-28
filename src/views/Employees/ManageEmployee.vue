<template>
  <div class="">
    <div
      class="flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8"
    >
      <div
        class="bg-white shadow-sm rounded-lg container w-full p-4 sm:p-6 lg:p-8"
      >
        <!-- Header -->
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6"
        >
          <div>
            <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-700">
              Employees
            </h2>
            <p class="mt-1 text-sm text-gray-500">Manage your Employees</p>
          </div>
          <div class="flex items-center gap-3">
            <div
              class="flex items-center gap-2 px-3 py-2.5 border-2 border-gray-800 text-gray-800 rounded-lg hover:border-pink-600 cursor-pointer"
            >
              <AppIcon icon="mingcute:file-download-line" class="w-5 h-5" />
              <span class="font-semibold text-sm sm:text-base">Download</span>
            </div>
            <div
              @click="showModal = true"
              class="flex items-center gap-2 px-3 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-800/90 cursor-pointer"
            >
              <AppIcon icon="lsicon:add-one-filled" class="w-5 h-5" />
              <span class="text-sm sm:text-base">Add New</span>
            </div>
          </div>
        </div>

        <!-- Filters -->
        <div class="flex flex-col md:flex-row items-center gap-4 mb-4 sm:mb-6">
          <input
            type="search"
            placeholder="Search for anything"
            class="max-w-2xl w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors"
          />
          <div
            class="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto"
          >
            <select
              class="border border-gray-300 rounded-lg px-8 py-2 w-full sm:w-auto text-sm sm:text-base"
            >
              <option value="">All Offices</option>
              <option value="engineering">Engineering</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
            </select>
            <select
              class="border border-gray-300 rounded-lg px-8 py-2 w-full sm:w-auto text-sm sm:text-base"
            >
              <option value="">All Job Titles</option>
              <option value="engineering">Engineering</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
            </select>
            <select
              class="border border-gray-300 rounded-lg px-8 py-2 w-full sm:w-auto text-sm sm:text-base"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="onboarding">Onboarding</option>
              <option value="probation">Probation</option>
              <option value="onleave">On Leave</option>
            </select>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Job Title
                </th>
                <th
                  class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Line Manager
                </th>
                <th
                  class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Department
                </th>
                <th
                  class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Office
                </th>
                <th
                  class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Employee Status
                </th>
                <th
                  class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Account
                </th>
                <th
                  class="px-4 sm:px-6 py-3 whitespace-nowrap text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="isLoading">
                <td colspan="10" class="text-center p-5">
                  <TableLoader />
                </td>
              </tr>
              <tr v-else-if="employees.length === 0">
                <td colspan="10" class="text-center p-5 text-gray-500">
                  <img src="/public/images/no-data.png" alt="" />
                </td>
              </tr>
              <tr
                v-else
                v-for="employee in employees"
                :key="employee.id"
                class="hover:bg-gray-50"
              >
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                  {{ employee.name }}
                  <br />
                  <span class="text-sm text-gray-500">{{
                    employee.email
                  }}</span>
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                  {{ employee.job_title }}
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                  {{ employee.line_manager }}
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                  {{ employee.department }}
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                  {{ employee.office }}
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                  {{ employee.employment_status }}
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                  {{ employee.account }}
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-right">
                  <div class="flex items-center gap-2 justify-center">
                    <router-link
                      :to="`/employee-detail/${employee.id}`"
                      class="bg-blue-500 p-1 rounded-md hover:bg-blue-500/80"
                    >
                      <AppIcon
                        icon="proicons:eye"
                        class="text-white w-4 h-4 sm:w-5 sm:h-5"
                      />
                    </router-link>

                    <div class="bg-red-600 p-1 rounded-md hover:bg-red-600/80">
                      <AppIcon
                        icon="proicons:delete"
                        class="text-white w-4 h-4 sm:w-5 sm:h-5"
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Pagination -->
        <div
          v-if="employees.length"
          class="flex justify-right items-center gap-2 mt-6"
        >
          <div
            @click="prev"
            :disabled="currentPage === 1"
            class="px-2 py-2 bg-green-600 rounded-lg disabled:opacity-50"
          >
            <AppIcon
              icon="codicon:chevron-left"
              class="w-6 h-6 text-white hover:text-white"
            />
          </div>

          <button
            v-for="page in totalPages"
            :key="page"
            @click="handlePageChange(page)"
            :class="[
              'px-4 py-2 bg-green-600 rounded-md',
              currentPage === page
                ? 'bg-green-900 text-white'
                : 'bg-green-600 hover:bg-gray-300 hover:text-white',
            ]"
          >
            {{ page }}
          </button>

          <button
            @click="next"
            :disabled="currentPage === totalPages"
            class="p-2 bg-gray-200 rounded disabled:opacity-50"
          >
            <AppIcon icon="codicon:chevron-right" class="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>

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
          <div
            @click.stop
            class="modal-content bg-white p-6 shadow-lg w-96 h-full flex flex-col overflow-y-auto"
          >
            <h2 class="text-xl font-bold mb-4">Add New Profile</h2>
            <div class="flex-1">
              <div class="flex flex-col gap-1">
                <label for="firstName" class="text-sm font-medium text-gray-700"
                  >First Name</label
                >
                <input
                  id="firstName"
                  v-model="form.firstName"
                  type="text"
                  placeholder="First name"
                  class="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-green-500 focus:border-green-500 transition-colors"
                  :class="{ 'border-red-500': errors.firstName }"
                />
                <span v-if="errors.firstName" class="text-xs text-red-500">{{
                  errors.firstName
                }}</span>
              </div>

              <div class="flex flex-col gap-1 mt-4">
                <label for="lastName" class="text-sm font-medium text-gray-700"
                  >Last Name</label
                >
                <input
                  id="lastName"
                  v-model="form.lastName"
                  type="text"
                  placeholder="Last name"
                  class="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  :class="{ 'border-red-500': errors.lastName }"
                />
                <span v-if="errors.lastName" class="text-xs text-red-500">{{
                  errors.lastName
                }}</span>
              </div>

              <div class="flex flex-col gap-1 mt-4">
                <label for="email" class="text-sm font-medium text-gray-700"
                  >Email</label
                >
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="Email"
                  class="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  :class="{ 'border-red-500': errors.email }"
                />
                <span v-if="errors.email" class="text-xs text-red-500">{{
                  errors.email
                }}</span>
              </div>
              <label for="date" class="text-base font-medium text-gray-700"
                >Join Date</label
              >
              <Date class="mt-4" v-model="form.joinDate" />
            </div>

            <div class="mt-auto flex justify-between pt-4">
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
  </div>
</template>

<script>
import { allEmployees, addEmployee } from "@/services/auth.employees";
import Date from "../../components/DatePicker.vue";
import TableLoader from "@/components/TableLoader.vue";
import { ref, computed, onMounted } from "vue";

export default {
  name: "ManageEmployee",
  components: { Date, TableLoader },
  setup() {
    const employees = ref([]);
    const isLoading = ref(false);
    const showModal = ref(false);
    const form = ref({
      firstName: "",
      lastName: "",
      email: "",
      joinDate: "",
    });
    const errors = ref({
      firstName: "",
      lastName: "",
      email: "",
      joinDate: "",
    });

    const perPage = ref(5);
    const totalItems = ref(0);
    const currentPage = ref(1);

    // compute total pages dynamically
    const totalPages = computed(() =>
      Math.max(1, Math.ceil(totalItems.value / perPage.value))
    );

    const next = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
        fetchEmployees(currentPage.value);
      }
    };

    const prev = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        fetchEmployees(currentPage.value);
      }
    };

    const setPage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        fetchEmployees(page);
      }
    };

    // const formatDate = (dateString) => {
    //   if (!dateString) return "-";
    //   const [dateOnly] = dateString.split("T");
    //   const date = new Date(dateOnly);
    //   return date.toLocaleDateString("en-US", {
    //     year: "numeric",
    //     month: "short",
    //     day: "numeric",
    //   });
    // };

    const fetchEmployees = async (page) => {
      isLoading.value = true;
      try {
        const response = await allEmployees({ page, per_page: perPage.value });
        if (response && response.status === 200 && response.data) {
          employees.value = response.data.employees || [];
          totalItems.value = Number(response.data.total_items) || 0;
        } else {
          employees.value = [];
          totalItems.value = 0;
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        employees.value = [];
        totalItems.value = 0;
      } finally {
        isLoading.value = false;
      }
    };

    const validateForm = () => {
      let isValid = true;
      errors.value = { firstName: "", lastName: "", email: "", joinDate: "" };

      if (!form.value.firstName) {
        errors.value.firstName = "First name is required";
        isValid = false;
      }
      if (!form.value.lastName) {
        errors.value.lastName = "Last name is required";
        isValid = false;
      }
      if (!form.value.email) {
        errors.value.email = "Email is required";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
        errors.value.email = "Invalid email format";
        isValid = false;
      }
      if (!form.value.joinDate) {
        errors.value.joinDate = "Join date is required";
        isValid = false;
      }

      return isValid;
    };

    const createEmployee = async () => {
      if (!validateForm()) return;
      isLoading.value = true;

      try {
        const payload = {
          first_name: form.value.firstName,
          last_name: form.value.lastName,
          email: form.value.email,
          date_joined: form.value.joinDate,
        };

        const response = await addEmployee(payload);

        if (response && response.status === 201) {
          showModal.value = false;
          form.value = { firstName: "", lastName: "", email: "", joinDate: "" };
          errors.value = {
            firstName: "",
            lastName: "",
            email: "",
            joinDate: "",
          };
          await fetchEmployees(currentPage.value);
        } else {
          errors.value.email = "Failed to create employee. Please try again.";
        }
      } catch (error) {
        console.error("Error creating employee:", error);
        errors.value.email =
          error.response?.data?.detail?.[0]?.msg ||
          error.response?.data?.message ||
          "An error occurred";
      }

      isLoading.value = false;
    };

    const handlePageChange = (page) => {
      setPage(page);
    };

    onMounted(() => {
      fetchEmployees(currentPage.value);
    });

    return {
      employees,
      showModal,
      form,
      errors,
      isLoading,
      fetchEmployees,
      createEmployee,
      handlePageChange,
      currentPage,
      totalPages,
      next,
      prev,
    };
  },
};
</script>

<style scoped>
.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: translateX(100%);
}
.pagination-container {
  display: flex;

  column-gap: 10px;
}

.paginate-buttons {
  height: 40px;

  width: 40px;

  border-radius: 20px;

  cursor: pointer;

  background-color: rgb(242, 242, 242);

  border: 1px solid rgb(217, 217, 217);

  color: black;
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: #3498db;

  border: 1px solid #3498db;

  color: white;
}

.active-page:hover {
  background-color: #2988c8;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
