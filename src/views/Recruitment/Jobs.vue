<template>
  <div class="w-full md:container mx-auto p-5">
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center"
    >
      <div class="mb-6 md:mb-0">
        <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-700">
          Recruitment
        </h2>
        <p class="mt-1 text-sm text-gray-500">Here's all job list</p>
      </div>

      <div class="flex items-center gap-2">
        <!-- Search input -->
        <div class="relative">
          <input
            type="search"
            placeholder="Search..."
            class="border border-gray-300 rounded-md p-2 w-full"
          />
          <AppIcon
            icon="ic:round-search"
            class="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          />
        </div>

        <!-- Add New button -->
        <div
          @click="addJob = true"
          class="bg-[#11172f] text-white px-4 py-2 rounded-md flex items-center cursor-pointer"
        >
          <AppIcon icon="si:add-line" class="w-5 h-5 text-white mr-2" />
          <p>Add New</p>
        </div>
      </div>
    </div>
    <div v-if="isPosting" class="space-y-4 mt-12">
      <div
        v-for="n in 3"
        :key="n"
        class="bg-white p-4 rounded-md shadow-sm animate-pulse"
      >
        <!-- Title -->
        <div class="h-5 bg-gray-300 rounded w-1/3 mb-3"></div>

        <!-- Meta -->
        <div class="flex gap-2 mb-2">
          <div class="h-4 bg-gray-300 rounded w-1/4"></div>
          <div class="h-4 bg-gray-300 rounded w-1/6"></div>
        </div>

        <!-- Job type -->
        <div class="h-4 bg-gray-300 rounded w-1/5 mb-3"></div>

        <!-- Footer -->
        <div class="flex justify-between">
          <div class="h-4 bg-gray-300 rounded w-1/4"></div>
          <div class="h-4 bg-gray-300 rounded w-1/5"></div>
        </div>
      </div>
    </div>
    <div v-else-if="postings.length > 0" class="mt-8">
      <div
        v-for="job in postings"
        :key="job.id"
        class="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-7 mb-6 border border-gray-100 hover:border-indigo-200 relative overflow-hidden"
      >
        <!-- Status Indicator Ribbon -->
        <div
          class="absolute top-0 left-0 w-1.5 h-full"
          :class="{
            'bg-green-500': job.status === 'active',
            'bg-gray-400': job.status === 'inactive',
            'bg-red-500': job.status === 'closed',
          }"
        ></div>

        <!-- Header Section -->
        <div class="flex items-start justify-between mb-6">
          <div class="flex-1 ml-2">
            <!-- Job Title Row -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div v-if="editingJobId !== job.id">
                  <h3
                    class="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors"
                  >
                    {{ job.title }}
                  </h3>
                </div>
                <div v-else class="w-full max-w-lg">
                  <input
                    v-model="jobForm.title"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg font-semibold shadow-sm"
                    placeholder="Enter job title"
                  />
                </div>
              </div>

              <!-- Status Badge -->
              <span
                class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border"
                :class="{
                  'bg-green-50 text-green-700 border-green-200':
                    job.status === 'active',
                  'bg-gray-50 text-gray-700 border-gray-200':
                    job.status === 'inactive',
                  'bg-red-50 text-red-700 border-red-200':
                    job.status === 'closed',
                }"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full mr-1.5"
                  :class="{
                    'bg-green-500': job.status === 'active',
                    'bg-gray-500': job.status === 'inactive',
                    'bg-red-500': job.status === 'closed',
                  }"
                ></span>
                {{ job.status.charAt(0).toUpperCase() + job.status.slice(1) }}
              </span>
            </div>

            <!-- Job Details Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 ml-2">
              <!-- Department -->
              <div class="flex items-center gap-3">
                <div class="p-2 bg-indigo-50 rounded-lg">
                  <AppIcon icon="mdi:domain" class="w-4 h-4 text-indigo-600" />
                </div>
                <div class="flex-1">
                  <p class="text-xs text-gray-500 mb-1">Department</p>
                  <span v-if="editingJobId === job.id" class="block">
                    <select
                      v-model="jobForm.department_id"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    >
                      <option disabled value="">Select department</option>
                      <option
                        v-for="dept in departments"
                        :key="dept.id"
                        :value="dept.id"
                      >
                        {{ dept.name }}
                      </option>
                    </select>
                  </span>
                  <span v-else class="text-gray-800 font-medium text-sm">
                    {{ job.department }}
                  </span>
                </div>
              </div>

              <!-- Location -->
              <div class="flex items-center gap-3">
                <div class="p-2 bg-blue-50 rounded-lg">
                  <AppIcon
                    icon="mdi:map-marker"
                    class="w-4 h-4 text-blue-600"
                  />
                </div>
                <div class="flex-1">
                  <p class="text-xs text-gray-500 mb-1">Location</p>
                  <span v-if="editingJobId === job.id" class="block">
                    <input
                      v-model="jobForm.location"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter location"
                    />
                  </span>
                  <span v-else class="text-gray-800 font-medium text-sm">
                    {{ job.location }}
                  </span>
                </div>
              </div>

              <!-- Job Type -->
              <div class="flex items-center gap-3">
                <div class="p-2 bg-emerald-50 rounded-lg">
                  <AppIcon
                    icon="mdi:briefcase"
                    class="w-4 h-4 text-emerald-600"
                  />
                </div>
                <div class="flex-1">
                  <p class="text-xs text-gray-500 mb-1">Job Type</p>
                  <span v-if="editingJobId === job.id" class="block">
                    <div class="relative">
                      <select
                        v-model="jobForm.job_type"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none pr-8 bg-white"
                      >
                        <option value="" disabled>Select type</option>
                        <option value="intern">Intern</option>
                        <option value="full-time">Full Time</option>
                        <option value="contract">Contract</option>
                      </select>
                      <AppIcon
                        icon="mdi:chevron-down"
                        class="w-4 h-4 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                      />
                    </div>
                  </span>
                  <span v-else class="text-gray-800 font-medium text-sm">
                    {{
                      job.job_type.charAt(0).toUpperCase() +
                      job.job_type.slice(1)
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-1 ml-4">
            <button
              @click="startEdit(job)"
              class="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
              title="Edit job"
            >
              <AppIcon icon="mdi:pencil-outline" class="w-5 h-5" />
            </button>
            <button
              @click="openDeleteModal(job.id)"
              class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              title="Delete job"
            >
              <AppIcon icon="mdi:delete-outline" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Description Section -->
        <div class="mb-6 ml-2">
          <label
            v-if="editingJobId === job.id"
            class="block text-sm font-semibold text-gray-700 mb-3"
          >
            Job Description
          </label>
          <div v-if="editingJobId === job.id" class="relative">
            <textarea
              v-model="jobForm.description"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[140px] text-gray-700"
              rows="4"
              placeholder="Enter job description..."
            />
          </div>
          <p v-else class="text-gray-600 leading-relaxed line-clamp-2 text-sm">
            {{ job.description }}
          </p>
        </div>

        <!-- Stats Section -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 ml-2">
          <!-- Salary Range -->
          <div
            class="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-100"
          >
            <div v-if="editingJobId === job.id">
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                Salary Range
              </label>
              <div class="flex items-center gap-3">
                <div class="flex-1">
                  <label class="block text-xs text-gray-500 mb-2"
                    >Minimum</label
                  >
                  <div class="relative">
                    <span
                      class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium"
                      >₦</span
                    >
                    <input
                      v-model="jobForm.min_salary"
                      type="number"
                      class="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div class="pt-5">
                  <span class="text-gray-400">—</span>
                </div>
                <div class="flex-1">
                  <label class="block text-xs text-gray-500 mb-2"
                    >Maximum</label
                  >
                  <div class="relative">
                    <span
                      class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium"
                      >₦</span
                    >
                    <input
                      v-model="jobForm.max_salary"
                      type="number"
                      class="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="flex items-center gap-3 mb-2">
                <div class="p-2 bg-amber-50 rounded-lg">
                  <AppIcon icon="mdi:cash" class="w-4 h-4 text-amber-600" />
                </div>
                <span class="text-sm text-gray-500">Salary Range</span>
              </div>
              <div class="text-lg font-bold text-gray-900">
                ₦{{ job.min_salary?.toLocaleString() || "0" }} — ₦{{
                  job.max_salary?.toLocaleString() || "0"
                }}
              </div>
            </div>
          </div>

          <!-- Applications -->
          <div
            class="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-100"
          >
            <div class="flex items-center gap-3 mb-2">
              <div class="p-2 bg-purple-50 rounded-lg">
                <AppIcon
                  icon="mdi:account-group"
                  class="w-4 h-4 text-purple-600"
                />
              </div>
              <span class="text-sm text-gray-500">Applications</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="text-lg font-bold text-gray-900">
                {{ job.applied_count }}
              </div>
              <span class="text-xs text-gray-500">
                of {{ job.quantity || 1 }} opening{{
                  job.quantity > 1 ? "s" : ""
                }}
              </span>
            </div>
          </div>

          <!-- Dates -->
          <div
            class="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-100"
          >
            <div class="flex items-center gap-3 mb-2">
              <div class="p-2 bg-rose-50 rounded-lg">
                <AppIcon icon="mdi:calendar" class="w-4 h-4 text-rose-600" />
              </div>
              <span class="text-sm text-gray-500">Timeline</span>
            </div>
            <div class="space-y-1">
              <div class="text-xs text-gray-700">
                Posted: {{ job.created_at }}
              </div>
              <div class="text-xs text-gray-700">
                Closes: {{ job.closing_date }}
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div
          class="flex items-center justify-between pt-5 border-t border-gray-100"
        >
          <div v-if="editingJobId === job.id" class="w-full">
            <label class="block text-sm font-semibold text-gray-700 mb-3 ml-2">
              Number of Openings
            </label>
            <div class="flex items-center gap-4 ml-2">
              <select
                v-model="jobForm.quantity"
                class="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-40"
              >
                <option value="1">1 opening</option>
                <option value="2">2 openings</option>
                <option value="5">5 openings</option>
                <option value="10">10+ openings</option>
              </select>
            </div>
          </div>
          <div v-else class="text-xs text-gray-500 ml-2">
            <span class="flex items-center gap-1">
              <AppIcon icon="mdi:update" class="w-3 h-3" />
              Last updated: Today
            </span>
          </div>

          <!-- Save/Cancel Buttons -->
          <div v-if="editingJobId === job.id" class="flex items-center gap-3">
            <button
              @click="cancelEdit"
              class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors border border-gray-300"
            >
              Cancel
            </button>
            <button
              @click="saveEdit(job.id)"
              class="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              <span class="flex items-center gap-2"> Save </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-gray-500 mt-4">No job postings found.</div>

    <!-- Modal -->
    <div
      v-if="addJob"
      class="fixed inset-0 bg-black/50 flex items-center justify-end z-50"
    >
      <div
        @click.stop
        class="bg-white overflow-y-auto p-6 shadow-lg w-full sm:w-4/6 lg:w-3/6 h-full flex flex-col"
      >
        <!-- HEADER -->
        <div>
          <h2 class="text-xl font-semibold mb-4">Create New Job</h2>

          <!-- FORM -->
          <div class="space-y-6">
            <!-- Job Title -->
            <div>
              <label>Job Title <span class="text-red-600">*</span></label>
              <input
                v-model="jobForm.title"
                type="text"
                class="mt-2 border border-gray-300 rounded-md p-2 w-full outline-none"
                placeholder="Job Title"
              />
            </div>

            <!-- Job Type & Department -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  >Employment Type <span class="text-red-600">*</span></label
                >
                <div class="relative">
                  <select
                    v-model="jobForm.job_type"
                    class="mt-2 border border-gray-300 rounded-md p-2 w-full outline-none appearance-none pr-10"
                  >
                    <option value="" disabled>Select type</option>
                    <option value="intern">Intern</option>
                    <option value="full-time">Full Time</option>
                    <option value="contract">Contract</option>
                  </select>
                  <AppIcon
                    icon="mdi:chevron-down"
                    class="w-5 h-5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  />
                </div>
              </div>

              <div>
                <label>Department <span class="text-red-600">*</span></label>

                <div v-if="isLoading">Loading...</div>

                <div v-else-if="departments.length">
                  <div class="relative">
                    <select
                      v-model="jobForm.department_id"
                      class="mt-2 border border-gray-300 rounded-md p-2 w-full outline-none appearance-none"
                    >
                      <option value="" disabled>Select department</option>
                      <option
                        v-for="dept in departments"
                        :key="dept.id"
                        :value="dept.id"
                      >
                        {{ dept.name }}
                      </option>
                    </select>
                    <AppIcon
                      icon="mdi:chevron-down"
                      class="w-5 h-5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                </div>

                <div v-else class="text-gray-500 mt-2">
                  No departments found
                </div>
              </div>
            </div>

            <div>
              <label>Location <span class="text-red-600">*</span></label>
              <input
                v-model="jobForm.location"
                type="text"
                class="mt-2 border border-gray-300 rounded-md p-2 w-full outline-none"
                placeholder="Location"
              />
            </div>

            <!-- Salary -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label>Min Salary</label>
                <input
                  v-model="jobForm.minSalary"
                  type="number"
                  class="mt-2 border border-gray-300 rounded-md p-2 w-full outline-none"
                />
              </div>

              <div>
                <label>Max Salary</label>
                <input
                  v-model="jobForm.maxSalary"
                  type="number"
                  class="mt-2 border border-gray-300 rounded-md p-2 w-full outline-none"
                />
              </div>
            </div>

            <!-- Quantity & Closing Date -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label>Quantity <span class="text-red-600">*</span></label>
                <div class="relative">
                  <select
                    v-model="jobForm.quantity"
                    class="mt-2 border border-gray-300 rounded-md p-2 w-full outline-none"
                  >
                    <option value="" disabled>Select quantity</option>
                    <option value="1">1</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                  </select>
                  <AppIcon
                    icon="mdi:chevron-down"
                    class="w-5 h-5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  />
                </div>
              </div>

              <div>
                <label>Expected Closing Date</label>
                <input
                  v-model="jobForm.closing_date"
                  type="date"
                  class="mt-2 border border-gray-300 rounded-md p-2 w-full outline-none"
                />
              </div>
            </div>

            <!-- Description -->
            <div>
              <label>Description</label>
              <textarea
                v-model="jobForm.description"
                rows="6"
                class="mt-2 border border-gray-300 rounded-md p-2 w-full outline-none"
                placeholder="Write job description here..."
              ></textarea>
            </div>
          </div>
        </div>

        <!-- FOOTER -->
        <div class="mt-auto flex justify-end gap-4 pt-4">
          <div
            @click="addJob = false"
            class="px-8 sm:px-12 py-2 border-2 border-gray-800 text-gray-800 rounded-md hover:border-gray-800/50"
          >
            Cancel
          </div>

          <div
            @click="createJobPost"
            :disabled="isPosting"
            :class="[
              'px-8 sm:px-12 py-2 rounded-md',
              isPosting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-800/50',
            ]"
          >
            {{ isPosting ? "Submitting..." : "Submit" }}
          </div>
        </div>
      </div>
    </div>

    <!-- .;L -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      @click.self="showDeleteModal = false"
    >
      <div class="bg-white rounded-xl p-6 w-[420px] shadow-xl">
        <h3 class="text-lg font-semibold text-gray-900">Delete job posting</h3>
        <p class="text-sm text-gray-500 mt-1">This action cannot be undone.</p>

        <div class="flex justify-end gap-3 mt-6">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 border rounded-md"
          >
            Cancel
          </button>

          <button
            @click="deleteJob"
            class="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  editPosting,
  getDepartments,
  getJobPosting,
  postJob,
} from "@/services/auth.recuitment";
import { useToast } from "vue-toastification";
import { onMounted, ref } from "vue";
import { deletePosting } from "@/services/auth.recuitment";

export default {
  name: "JobView",
  setup() {
    const currentStep = ref(1);
    const addJob = ref(false);
    const isLoading = ref(false);
    const postings = ref([]);
    const selectedDepartment = ref("");
    const isPosting = ref(false);
    const departments = ref([]);
    const toast = useToast();
    const isEditing = ref(false);
    const editingJobId = ref(null);
    const showDeleteModal = ref(false);
    const jobToDeleteId = ref(null);
    const jobForm = ref({
      title: "",
      job_type: "",
      description: "",
      location: "",
      quantity: "",
      min_salary: "",
      max_salary: "",
      department_id: "",
      closing_date: "",
    });

    const openDeleteModal = (jobId) => {
      jobToDeleteId.value = jobId;
      showDeleteModal.value = true;
    };

    const fetchDepartments = async () => {
      isLoading.value = true;
      const response = await getDepartments();

      if (response.status === 200) {
        departments.value = response.data.data || [];
      } else {
        toast.error("Failed to load departments");
      }
      isLoading.value = false;
    };

    const selectedJob = ref(null);

    const createJobPost = async () => {
      if (
        !jobForm.value.title ||
        !jobForm.value.job_type ||
        !jobForm.value.department_id ||
        !jobForm.value.quantity
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      isPosting.value = true;

      // Prepare payload for API
      const payload = {
        title: jobForm.value.title,
        job_type: jobForm.value.job_type,
        department_id: jobForm.value.department_id,
        description: jobForm.value.description,
        location: jobForm.value.location,
        quantity: Number(jobForm.value.quantity),
        min_salary: Number(jobForm.value.minSalary || 0),
        max_salary: Number(jobForm.value.maxSalary || 0),
        closing_date: jobForm.value.closing_date || null,
      };

      try {
        const response = await postJob(payload);

        if (response?.status === 201) {
          toast.success("Job posting created successfully!");
          addJob.value = false;

          // Reset form
          jobForm.value = {
            title: "",
            job_type: "",
            department_id: "",
            description: "",
            location: "",
            quantity: "",
            min_salary: 0,
            max_salary: 0,
            closing_date: "",
          };

          await fetchPosting();
        } else {
          toast.error(response.data?.detail || "Failed to create job");
        }
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.detail || "Failed to create job");
      } finally {
        isPosting.value = false;
      }
    };

    const fetchPosting = async () => {
      try {
        isPosting.value = true;
        const response = await getJobPosting();

        if (response.status === 200) {
          postings.value = response.data.postings || [];
        }
      } catch (error) {
        console.error(error);
      } finally {
        isPosting.value = false;
      }
    };

    const deleteJob = async () => {
      if (!jobToDeleteId.value) return;

      try {
        const response = await deletePosting(jobToDeleteId.value);

        if (response?.status === 200) {
          postings.value = postings.value.filter(
            (posting) => posting.id !== jobToDeleteId.value
          );
          toast.success("Job posting deleted successfully!");
        } else {
          toast.error("Failed to delete job posting");
        }
      } catch (err) {
        toast.error("An error occurred while deleting the job posting");
        console.error(err);
      } finally {
        showDeleteModal.value = false;
        jobToDeleteId.value = null;
      }
    };
    const saveEdit = async (postingId) => {
      const payload = {
        title: jobForm.value.title,
        description: jobForm.value.description,
        department_id: jobForm.value.department_id,
        job_type: jobForm.value.job_type,
        location: jobForm.value.location,
        quantity: jobForm.value.quantity,
        min_salary: jobForm.value.min_salary,
        max_salary: jobForm.value.max_salary,
      };

      const response = await editPosting(postingId, payload);

      if (response?.status === 200) {
        const index = postings.value.findIndex((j) => j.id === postingId);
        if (index !== -1) {
          postings.value[index] = {
            ...postings.value[index],
            ...payload,
          };
        }

        toast.success("Job posting edited successfully!");
        editingJobId.value = null;
      } else {
        toast.error("Failed to edit job posting");
      }
    };

    const startEdit = (job) => {
      editingJobId.value = job.id;

      jobForm.value.id = job.id;
      jobForm.value.title = job.title;
      jobForm.value.department_id = job.department_id;
      jobForm.value.location = job.location;
      jobForm.value.quantity = job.quantity;
      jobForm.value.description = job.description;
      jobForm.value.job_type = job.job_type;
      jobForm.value.min_salary = job.min_salary;
      jobForm.value.max_salary = job.max_salary;
    };

    const cancelEdit = () => {
      editingJobId.value = null;
    };

    onMounted(() => {
      fetchDepartments();
      fetchPosting();
    });

    return {
      editingJobId,
      startEdit,
      cancelEdit,
      saveEdit,
      addJob,
      currentStep,
      isLoading,
      departments,
      isPosting,
      postings,
      fetchPosting,
      selectedDepartment,
      jobForm,
      createJobPost,
      deleteJob,
      selectedJob,
      isEditing,
      jobToDeleteId,
      openDeleteModal,
      showDeleteModal,
    };
  },
};
</script>

<style scoped></style>
