<template>
  <div class="bg-[#eaeaea]">
    <div class="w-full md:container mx-auto px-5 py-3">
      <!-- slider -->
      <div class="mb-12">
        <LeaveTypeSelector mode="slider" />
      </div>

      <!-- Table -->
      <div class="bg-white p-6 rounded-lg shadow mb-8">
        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4"
        >
          <div>
            <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-700">
              Request Time List
            </h2>
            <p class="mt-1 text-sm text-gray-500">Manage your time list</p>
          </div>
          <div class="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div
              @click="showModal = true"
              class="border px-4 py-3 rounded-md hover:bg-gray-100 cursor-pointer flex items-center gap-2"
            >
              <AppIcon icon="uil:calender" class="w-6 h-6 text-gray-500" />
              Sync with Google
            </div>
            <div
              @click="addModal = true"
              class="bg-[#121828] px-4 py-3 rounded-md hover:bg-[#121828]/80 cursor-pointer flex items-center gap-2 text-white"
            >
              <AppIcon icon="si:add-fill" class="w-6 h-6 text-white" />
              Add New Request
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-7">
          <div>
            <DateRange />
          </div>

          <select
            class="border border-gray-300 rounded-lg px-2 py-2.5 w-full sm:w-auto text-sm sm:text-base"
          >
            <option value="">All Types</option>
            <option value="engineering">Engineering</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="sales">Sales</option>
          </select>
          <select
            class="border border-gray-300 rounded-lg px-2 py-2.5 w-full sm:w-auto text-sm sm:text-base"
          >
            <option value="">All Status</option>
            <option value="declined">Declined</option>
            <option value="pending">Pending</option>
            <option value="success">Success</option>
          </select>
        </div>

        <!-- Table  -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  From
                </th>
                <th
                  class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  To
                </th>
                <th
                  class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total
                </th>
                <th
                  class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Attachment
                </th>
                <th
                  class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
              <tr v-if="isLoading">
                <td colspan="10" class="text-center p-5">
                  <TableLoader :isLoading="isLoading" />
                </td>
              </tr>

              <tr v-else-if="leaveRequests.length === 0">
                <td colspan="10" class="text-center p-5 text-gray-500">
                  <img src="/public/images/no-data.png" alt="" />
                </td>
              </tr>
              <tr
                v-else
                v-for="(request, index) in leaveRequests"
                :key="index"
                class="bg-white transition-all duration-500 hover:bg-gray-50"
              >
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                  {{ formatDate(request.start_date) }}
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                  {{ formatDate(request.end_date) }}
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                  {{ request.days }} day{{ request.days > 1 ? "s" : "" }}
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                  {{ request.leave_type }}
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                  <div v-if="request.document_url">
                    <a
                      :href="request.document_url"
                      target="_blank"
                      class="inline-flex items-center gap-1.5 hover:underline text-sm"
                    >
                      <AppIcon icon="ep:document" class="w-5 h-5" />
                      <span class="truncate max-w-[160px]">
                        {{
                          request.document_name ||
                          request.document_url
                            .split("/")
                            .pop()
                            .split("?")[0]
                            .substring(0, 25) + "..."
                        }}
                      </span>
                    </a>
                  </div>
                  <span v-else class="text-gray-400 text-xs">—</span>
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                  <div
                    class="py-1 px-2.5 rounded-full flex justify-center w-20 items-center gap-1"
                    :class="statusClass(request.status)"
                  >
                    <span class="font-medium text-xs capitalize">
                      {{ request.status }}
                    </span>
                  </div>
                </td>
                <td class="flex p-5 items-center gap-1">
                  <button
                    class="bg-green-600 p-1 rounded-md hover:bg-green-600/80"
                    @click="viewRequest(request)"
                  >
                    <AppIcon
                      icon="basil:eye-outline"
                      class="text-white w-4 h-4 sm:w-5 sm:h-5"
                    />
                  </button>
                  <button
                    class="bg-blue-600 p-1 rounded-md hover:bg-blue-600/80"
                    @click="editRequest(request)"
                  >
                    <AppIcon
                      icon="ep:edit"
                      class="text-white w-4 h-4 sm:w-5 sm:h-5"
                    />
                  </button>
                  <button
                    class="bg-red-600 p-1 rounded-md hover:bg-red-600/80"
                    @click="deleteRequest(request.id)"
                  >
                    <AppIcon
                      icon="proicons:delete"
                      class="text-white w-4 h-4 sm:w-5 sm:h-5"
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="px-4">
            <vue-awesome-paginate
              :model-value="currentPage"
              :total-items="totalItems"
              :items-per-page="perPage"
              :page-size="5"
              @update:model-value="(page) => handlePageChange(page)"
              class="pagination-container"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- sync modal -->
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
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold mb-4">Detail Time Offer</h2>
              <div
                class="bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full text-sm font-medium"
              >
                Pending
              </div>
            </div>

            <div class="flex-1">
              <div class="flex justify-between gap-4">
                <div class="mt-4 flex flex-col gap-4 flex-1">
                  <label for="date">From</label>
                  <input
                    type="text"
                    placeholder="01 Mar, 2023"
                    class="placeholder:text-black outline-none"
                  />
                </div>
                <div class="mt-4 flex flex-col gap-4 flex-1">
                  <label for="date">To</label>
                  <input
                    type="text"
                    placeholder="01 Mar, 2023"
                    class="placeholder:text-black outline-none"
                  />
                </div>
              </div>
              <div class="mt-4 flex flex-col gap-4">
                <label for="From">Total</label>
                <input type="text" placeholder="3 days" class="" />
              </div>
              <div class="mt-4 flex flex-col gap-4">
                <label for="From">Type</label>
                <input type="text" placeholder="Engagement" class="" />
              </div>

              <div class="mt-4 flex flex-col gap-2">
                <label for="file" class="font-medium">Attachment</label>

                <!-- Custom clickable area -->
                <label
                  for="file"
                  class="flex items-center gap-2 border border-gray-300 rounded-md p-3 cursor-pointer hover:bg-gray-50"
                >
                  <AppIcon
                    name="iconamoon:file-add-light"
                    class="w-5 h-5 text-gray-500"
                  />
                  <span class="text-gray-600">Upload file</span>
                </label>

                <!-- Hidden real file input -->
                <input id="file" type="file" class="hidden" />

                <small class="text-gray-500 text-sm">
                  Max file size: 5MB &middot; Formats: pdf, doc, png, jpg, jpeg
                </small>
              </div>
            </div>

            <div class="mt-auto flex justify-between pt-4 gap-4">
              <!-- Cancel -->
              <button
                type="button"
                @click="showModal = false"
                class="flex-1 p-3 border-2 border-gray-800 text-gray-800 rounded-lg hover:border-gray-800/50 hover:text-white transition-colors duration-200"
              >
                Cancel Request
              </button>

              <!-- Edit -->
              <button
                type="button"
                @click="createEmployee"
                :disabled="isLoading"
                class="flex-1 p-3 rounded-lg text-white transition-colors duration-200"
                :class="
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gray-800 hover:bg-gray-700'
                "
              >
                {{ isLoading ? "Editing..." : "Edit" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Add New Request -->
    <transition name="modal">
      <div
        v-if="addModal"
        class="fixed inset-0 bg-black/50 flex items-center justify-end z-50"
        @click.self="addModal = false"
      >
        <div class="flex items-center h-full">
          <div
            @click="addModal = false"
            class="bg-white w-10 h-10 p-2 rounded-full shadow-lg text-gray-500 hover:text-gray-700 mr-2 hidden md:block"
          >
            <AppIcon icon="codicon:chevron-right" class="w-6 h-6" />
          </div>

          <div
            @click.stop
            class="modal-content bg-white p-6 shadow-lg w-96 h-full flex flex-col overflow-y-auto"
          >
            <h2 class="text-xl font-bold mb-4">Add New Time Off</h2>

            <div class="flex-1">
              <!-- Time Off Type -->
              <div class="mt-4 flex flex-col gap-4">
                <label class="font-medium text-sm">Time Off Type</label>
                <LeaveTypeSelector mode="select" v-model="leaveData.type" />
              </div>

              <!-- Date pickers -->
              <div class="mt-4 flex flex-col gap-4">
                <div>
                  <label for="date" class="font-medium text-sm"
                    >Start Date</label
                  >
                  <DatePicker
                    v-model="leaveData.startDate"
                    placeholder="Start Date"
                    class="flex-1"
                  />
                </div>

                <div>
                  <label for="date" class="font-medium text-sm">End Date</label>
                  <DatePicker
                    v-model="leaveData.endDate"
                    placeholder="End Date"
                    class="flex-1"
                  />
                </div>
              </div>

              <!-- Note -->
              <div class="mt-4 flex flex-col gap-4">
                <label for="note" class="font-medium text-sm">Note</label>
                <input
                  v-model="leaveData.note"
                  type="text"
                  id="note"
                  placeholder="Add a note"
                  class="p-2 rounded-md border"
                />
              </div>

              <!-- Attachment -->
              <div class="mt-4 flex flex-col gap-2">
                <label for="file" class="font-medium text-sm">Attachment</label>
                <label
                  for="file"
                  class="flex relative items-center gap-2 border border-gray-300 rounded-md p-3 cursor-pointer hover:bg-gray-50"
                >
                  <AppIcon
                    name="iconamoon:file-add-light"
                    class="w-5 h-5 absolute text-gray-500"
                  />
                  <span class="text-gray-600">Upload file</span>
                </label>
                <input
                  id="file"
                  type="file"
                  class="hidden"
                  @change="handleFile"
                />
                <small class="text-gray-500 text-xs">
                  Max file size: 5MB · Formats: pdf, doc, png, jpg, jpeg
                </small>
                <span
                  v-if="leaveData.documentName"
                  class="text-xs text-green-600"
                >
                  {{ leaveData.documentName }} uploaded
                </span>
              </div>

              <!-- Assign To -->
              <div class="mt-4 flex flex-col gap-4">
                <label for="assignTo" class="font-medium text-sm"
                  >Assign To</label
                >
                <input
                  type="search"
                  placeholder="Search member name"
                  class="p-2 rounded-md border"
                />
              </div>
            </div>

            <!-- Buttons -->
            <div class="mt-auto flex justify-between pt-4 gap-4">
              <button
                type="button"
                @click="addModal = false"
                class="flex-1 p-3 border-2 border-gray-800 text-gray-800 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200"
              >
                Cancel Request
              </button>

              <button
                @click="createLeaveRequest"
                :disabled="isLoading"
                class="flex-1 p-3 rounded-lg text-white transition-colors duration-200"
                :class="
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gray-800 hover:bg-gray-700'
                "
              >
                {{ isLoading ? "Creating..." : "Create" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import DatePicker from "@/components/DatePicker.vue";
import DateRange from "@/components/DateRange.vue";
import { uploadFile } from "@/services/auth.employees";
import { fetchLeaveRequests, requestLeave } from "@/services/auth.timeoff.js";
import { onMounted, reactive, ref, defineProps } from "vue";
import TableLoader from "@/components/TableLoader.vue";
import "swiper/css";
import "swiper/css/pagination";
import LeaveTypeSelector from "@/components/LeaveType.vue";
import { useToast } from "vue-toastification";

defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const toast = useToast();
const showModal = ref(false);
const addModal = ref(false);
const isLoading = ref(false);
const leaveRequests = ref([]);
const leaveData = reactive({
  startDate: "",
  endDate: "",
  type: "",
  note: "",
  documentName: "",
  documentUrl: "",
});

const statusClass = (status) => {
  switch (status.toLowerCase()) {
    case "approved":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "rejected":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const createLeaveRequest = async () => {
  if (!leaveData.startDate || !leaveData.type) {
    toast.error("Please fill in all required fields.");
    return;
  }

  isLoading.value = true;

  const payload = {
    leave_type_id: leaveData.type,
    start_date: leaveData.startDate,
    end_date: leaveData.endDate,
    note: leaveData.note,
    document_name: leaveData.documentName,
    document_url: leaveData.documentUrl,
  };

  const response = await requestLeave(payload);

  if (response?.status === 201 && response?.data) {
    toast.success("Leave request created successfully");
    addModal.value = false;
  } else {
    toast.error("Failed to create leave request");
  }

  isLoading.value = false;
};

const handleFile = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    toast.error("File exceeds 5MB limit");
    return;
  }

  try {
    const fileUrl = await uploadToCloudinary(file);

    leaveData.documentName = file.name;
    leaveData.documentUrl = fileUrl;

    toast.success("File uploaded successfully");
  } catch (error) {
    toast.error("File upload failed");
    console.error(error);
  }
};

const generateID = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(
    { length: 30 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};

const uploadToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const base64 = reader.result.split(",")[1];

        const payload = {
          public_id: generateID(),
          file: base64,
          action: "upload",
          folder: "hr_mgt/docs",
        };

        const response = await uploadFile(payload);

        const fileUrl = response?.data?.data?.file_url;

        if (!fileUrl) {
          reject("Cloudinary URL missing");
          return;
        }

        resolve(fileUrl);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = () => reject("File reading failed");
    reader.readAsDataURL(file);
  });
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const [dateOnly] = dateString.split("T");
  const date = new Date(dateOnly);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const currentPage = ref(1);
const perPage = ref(2);
const totalItems = ref(0);

const handlePageChange = (page) => {
  currentPage.value = page;
  getLeaveRequests(page);
};

const getLeaveRequests = async (page = 1) => {
  isLoading.value = true;

  const response = await fetchLeaveRequests({
    page,
    per_page: perPage.value,
  });

  if (response?.status === 200) {
    leaveRequests.value = response.data.data;
    totalItems.value = Number(response.data.total_items || response.data.total);
  } else {
    leaveRequests.value = [];
    totalItems.value = 0;
  }

  isLoading.value = false;
};

onMounted(() => {
  getLeaveRequests(currentPage.value);
});
</script>
