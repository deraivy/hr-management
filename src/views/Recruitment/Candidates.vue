<template>
  <div class="w-full md:container mx-auto p-5">
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-700">
          Candidate
        </h2>
        <p class="mt-1 text-sm text-gray-500">Here's all job list</p>
      </div>

      <div class="flex items-center space-x-2">
        <!-- Search input -->
        <div class="relative">
          <input
            type="search"
            placeholder="Search..."
            class="border border-gray-300 rounded-md p-2 pr-10 w-64"
          />
          <AppIcon
            icon="ic:round-search"
            class="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          />
        </div>

        <!-- Add New button -->
        <div
          @click="showModal = true"
          class="bg-[#11172f] text-white px-4 py-2 rounded-md flex items-center cursor-pointer"
        >
          <AppIcon icon="si:add-line" class="w-5 h-5 text-white mr-2" />
          <span>Add Candidate</span>
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-lg mt-8">
      <div class="overflow-x-auto">
        <table class="min-w-full rounded-md divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
              >
                Phone Number
              </th>
              <th
                scope="col"
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
              >
                CV
              </th>
              <th
                scope="col"
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
              >
                Created Date
              </th>
              <th
                scope="col"
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
              >
                Stages
              </th>
              <th
                scope="col"
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="isLoading">
              <td colspan="6">
                <TableLoader />
              </td>
            </tr>
            <tr v-else-if="applicants.length === 0">
              <td colspan="10" class="text-center p-5 text-gray-500">
                <img src="/public/images/no-data.png" alt="" />
              </td>
            </tr>
            <tr v-else v-for="applicant in applicants" :key="applicant.id">
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ applicant.full_name }}
                </div>
                <div class="text-sm text-gray-500">{{ applicant.email }}</div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ applicant.phone_number }}
              </td>
              <td class="p-5 whitespace-nowrap text-sm">
                <div v-if="applicant.resume">
                  <a
                    :href="applicant.resume"
                    target="_blank"
                    class="inline-flex items-center gap-1.5 hover:underline text-sm"
                  >
                    <AppIcon icon="ep:document" class="w-5 h-5" />
                    <span class="truncate max-w-[160px]">
                      {{
                        applicant.document_name ||
                        applicant.resume
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

              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ applicant.created_at }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                <!-- DISPLAY MODE -->
                <div
                  v-if="!applicant.isEditingStage"
                  class="flex gap-1 items-center"
                >
                  <span>{{ applicant.job_stage }}</span>
                  <div class="flex flex-col">
                    <button
                      @click="enableStageEdit(applicant)"
                      class="text-gray-400 hover:text-indigo-600 w-2 h-2"
                    >
                      ▲
                    </button>

                    <!-- Down Arrow -->
                    <button
                      @click="enableStageEdit(applicant)"
                      class="text-gray-400 hover:text-indigo-600 w-2 h-2"
                    >
                      ▼
                    </button>
                  </div>
                </div>

                <!-- EDIT MODE -->
                <div v-else>
                  <select
                    v-model="applicant.job_stage_id"
                    @change="updateStage(applicant)"
                    :disabled="updatingId === applicant.id"
                    class="border rounded px-2 py-1 text-sm"
                  >
                    <option
                      v-for="stage in workflows"
                      :key="stage.id"
                      :value="stage.id"
                    >
                      {{ stage.name }}
                    </option>
                  </select>

                  <button
                    class="ml-2 text-xs text-gray-500 hover:underline"
                    @click="cancelStageEdit(applicant)"
                  >
                    Cancel
                  </button>
                </div>
              </td>

              <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
                <a href="#" class="text-indigo-600 hover:text-indigo-900"
                  >Edit</a
                >
                <a href="#" class="ml-2 text-red-600 hover:text-red-900"
                  >Delete</a
                >
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

    <!-- Modal -->
    <div
      v-if="showModal"
      @click="showModal = false"
      class="fixed inset-0 bg-black/50 flex items-center justify-end z-50"
    >
      <div
        @click.stop="showModal = false"
        class="bg-white w-10 h-10 p-2 rounded-full shadow-lg text-gray-500 hover:text-gray-700 mr-2 hidden md:block self-center"
      >
        <AppIcon icon="codicon:chevron-right" class="w-6 h-6" />
      </div>

      <div class="w-3/6 bg-white h-full p-8 overflow-y-auto">
        <h2 class="text-2xl font-semibold mb-4">New Candidate</h2>
        <div class="space-y-4">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="w-full">
              <label for="cv">upload cv</label>
              <div class="relative mt-2">
                <input
                  type="text"
                  class="p-2 w-full outline-none appearance-none pr-10 border border-gray-300 rounded-md"
                  placeholder="U CV"
                />
                <AppIcon
                  icon="ph:file-plus-thin"
                  class="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
              <span class="text-xs mt-2 text-gray-400"
                >Max file size: 5MB file format: pdf, doc, png and jpeg</span
              >
            </div>

            <div class="w-full">
              <label for="photo">upload photo </label>
              <div class="relative mt-2">
                <input
                  type="text"
                  placeholder="upload photo"
                  class="p-2 w-full outline-none appearance-none pr-10 border border-gray-300 rounded-md"
                />
                <AppIcon
                  icon="ph:file-plus-thin"
                  class="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
              <span class="text-xs mt-2 text-gray-400"
                >Max file size: 5MB file format: pdf, doc, png and jpeg</span
              >
            </div>
          </div>

          <div class="w-full">
            <label for="cv">Attachment </label>
            <div class="relative mt-2">
              <input
                type="text"
                class="p-2 w-full outline-none appearance-none pr-10 border border-gray-300 rounded-md"
                placeholder="upload attachment"
              />
              <AppIcon
                icon="ph:file-plus-thin"
                class="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              />
            </div>
            <span class="text-xs mt-2 text-gray-400"
              >Max file size: 5MB file format: pdf, doc, png and jpeg</span
            >
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="w-full">
              <label for="firstname"
                >First Name <span class="text-red-600">*</span></label
              >
              <input
                type="text"
                class="p-2 mt-2 w-full outline-none appearance-none pr-10 border border-gray-300 rounded-md"
                placeholder="Sulaimon"
              />
            </div>

            <div class="w-full">
              <label for="lastname"
                >Last Name <span class="text-red-600">*</span></label
              >
              <input
                type="text"
                placeholder="Aro"
                class="p-2 mt-2 w-full outline-none appearance-none pr-10 border border-gray-300 rounded-md"
              />
            </div>

            <div class="w-full">
              <label for="email"
                >Last Name <span class="text-red-600">*</span></label
              >
              <input
                type="email"
                placeholder="example@gmail.com"
                class="p-2 mt-2 w-full outline-none appearance-none pr-10 border border-gray-300 rounded-md"
              />
            </div>

            <div class="w-full">
              <label for="phonenumber"
                >Phone Number <span class="text-red-600">*</span></label
              >
              <input
                type="number"
                placeholder="example@gmail.com"
                class="p-2 mt-2 w-full outline-none appearance-none pr-10 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label for="job">Job</label>
              <div class="relative mt-2">
                <select
                  class="p-2 w-full outline-none appearance-none pr-10 border border-gray-300 rounded-md"
                >
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
                <AppIcon
                  icon="ph:chevron-down"
                  class="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
            </div>

            <div>
              <label for="job">Source</label>
              <div class="relative mt-2">
                <select
                  class="p-2 w-full outline-none appearance-none pr-10 border border-gray-300 rounded-md"
                >
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
                <AppIcon
                  icon="ph:chevron-down"
                  class="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label for="coverletter"> Cover Letter</label>
            <input
              type="text"
              placeholder="input cover letter"
              class="border border-gray-300 w-full mt-2 p-2 rounded-md"
            />
          </div>
        </div>
        <div class="mt-auto flex justify-end gap-4 pt-4">
          <div
            v-if="currentStep === 1"
            @click="addJob = false"
            class="px-8 sm:px-12 py-2 border-2 border-gray-800 text-gray-800 rounded-md hover:border-gray-800/50 cursor-pointer"
          >
            Cancel
          </div>

          <div
            @click="showModal = false"
            class="px-8 sm:px-12 py-2 border-2 border-gray-800 text-gray-800 rounded-md hover:border-gray-800/50 cursor-pointer"
          >
            Back
          </div>

          <div
            type="button"
            @click="createEmployee"
            :disabled="isLoading"
            class="px-8 sm:px-12 py-2 text-white border-2 border-gray-800 rounded-md hover:border-gray-800/50 cursor-pointer"
            :class="
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gray-800 hover:bg-gray-700'
            "
          >
            {{ isLoading ? "Creating..." : "Create" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableLoader from "@/components/TableLoader.vue";
import {
  getJobApplicants,
  getWorkflow,
  changeApplicantStage,
} from "@/services/auth.recuitment";
import { onMounted, ref } from "vue";

export default {
  name: "CandidatesView",
  components: { TableLoader },
  setup() {
    const showModal = ref(false);
    const isLoading = ref(false);
    const applicants = ref([]);
    const perPage = ref(10);
    const currentPage = ref(1);
    const totalItems = ref(0);
    const workflows = ref([]);
    const updatingId = ref(null);

    const handlePageChange = (page) => {
      currentPage.value = page;
      fetchCandidates(page);
    };

    const enableStageEdit = (applicant) => {
      applicant.isEditingStage = true;
      applicant._oldStageId = applicant.job_stage_id;
    };

    const cancelStageEdit = (applicant) => {
      applicant.job_stage_id = applicant._oldStageId;
      applicant.isEditingStage = false;
    };

    const updateStage = async (applicant) => {
      try {
        updatingId.value = applicant.id;

        await changeApplicantStage({
          applicant_id: applicant.id,
          job_stage_id: applicant.job_stage_id,
        });

        const stage = workflows.value.find(
          (s) => s.id === applicant.job_stage_id
        );

        applicant.job_stage = stage?.name;
        applicant.isEditingStage = false;
      } catch (error) {
        console.error("Stage update failed", error);
        applicant.job_stage_id = applicant._oldStageId;
      } finally {
        updatingId.value = null;
      }
    };

    const fetchCandidates = async (page = 1) => {
      isLoading.value = true;
      const response = await getJobApplicants({
        page,
        per_page: perPage.value,
      });
      if (response && response.status === 200) {
        applicants.value = response.data.applicants;
        totalItems.value = response.data.total_items;
      } else {
        applicants.value = [];
        totalItems.value = 0;
      }
      isLoading.value = false;
    };

    const changeStage = ref(false);
    const loadingStages = ref(false);
    const jobStages = ref([]);

    const fetchWorkflow = async () => {
      isLoading.value = true;
      const response = await getWorkflow();
      if (response?.data) {
        workflows.value = response.data.data.stages
          .sort((a, b) => a.priority - b.priority)
          .map((stage) => ({
            ...stage,
            isEditing: false,
            original: { ...stage }, // for cancel
          }));
      }

      isLoading.value = false;
    };

    onMounted(() => {
      fetchCandidates();
      fetchWorkflow();
    });

    return {
      showModal,
      isLoading,
      applicants,
      handlePageChange,
      perPage,
      currentPage,
      totalItems,
      changeStage,
      loadingStages,
      jobStages,
      workflows,
      updatingId,
      enableStageEdit,
      cancelStageEdit,
      updateStage,
    };
  },
};
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 10px 0;
}

:deep(.back-button) {
  margin-right: 5px;
}

:deep(.next-button) {
  margin-left: 5px;
}

/* All number buttons */
:deep(.paginate-buttons) {
  height: 32px;
  width: 32px;
  border-radius: 6px;
  cursor: pointer;
  background-color: white;
  border: 1px solid #e5e5e5;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: #f2f2f3 0px 1px 2px 0px;
}

:deep(.paginate-buttons:hover) {
  background-color: #f2f2f3;
  transform: translateY(-1px);
}

/* Active (selected) page */
:deep(.active-page) {
  background-color: #e5e5e5;
  border-color: #e5e5e5;
  color: black;
}

/* Dots (…) */
:deep(.dots) {
  padding: 0 4px;
  color: #999;
  font-size: 16px;
}

/* PREVIOUS + NEXT buttons (black background) */
:deep(.back-button),
:deep(.next-button) {
  height: 36px;
  width: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: black !important;
  border: 1px solid black !important;
  transition: all 0.2s ease;
}

:deep(.back-button:hover),
:deep(.next-button:hover) {
  background-color: #f2f2f3 !important;
  transform: translateY(-1px);
}

:deep(.back-button:disabled),
:deep(.next-button:disabled) {
  opacity: 0.4;
  cursor: not-allowed;
  background-color: #f2f2f3 !important;
}

/* Modal transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
