<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <h2
      class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700"
    >
      Setting Recruitment
    </h2>
    <p class="mt-1 text-sm text-gray-500">Setting your Time off here</p>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-6 py-6">
      <div
        class="md:col-span-3 md:h-[160px] lg:h-[140px] bg-white rounded-md p-4 flex flex-col"
      >
        <div class="space-y-3">
          <div
            @click="activeTab = 'hiring'"
            :class="[
              'flex items-center gap-3 cursor-pointer transition-all duration-200 rounded-lg px-4 py-3',
              activeTab === 'hiring'
                ? 'bg-gray-200 shadow-sm'
                : 'hover:bg-gray-100 text-gray-700',
            ]"
          >
            <AppIcon
              icon="uil:calender"
              :class="[
                'w-5 h-5 transition-colors duration-200',
                activeTab === 'hiring' ? 'text-green-600' : 'text-gray-400',
              ]"
            />
            <span class="font-medium text-sm">Hiring Workflow</span>
          </div>
        </div>
      </div>

      <div
        v-if="activeTab === 'hiring'"
        class="col-span-9 bg-white p-5 rounded-md"
      >
        <div class="flex justify-between gap-4 items-center">
          <h2 class="font-medium text-gray-900 text-xl">Hiring Workflow</h2>
          <div
            @click="showModal = true"
            class="flex items-center gap-2 cursor-pointer bg-[#121828] text-white px-4 py-3 rounded-md transition-colors"
          >
            <AppIcon icon="ion:add-outline" /> New Stage
          </div>
        </div>

        <div v-if="isLoading" class="border rounded-md mt-6 divide-y">
          <div
            v-for="n in 5"
            :key="n"
            class="p-4 flex justify-between items-center animate-pulse"
          >
            <!-- Left text -->
            <div class="h-4 w-40 bg-gray-300 rounded"></div>

            <!-- Right side -->
            <div class="flex gap-4 items-center">
              <div class="h-4 w-10 bg-gray-300 rounded"></div>
              <div class="h-5 w-5 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>

        <div
          v-else-if="workflows.length > 0"
          class="border border-gray-200 mt-6 rounded-md"
        >
          <div
            v-for="stage in workflows"
            :key="stage.id"
            class="border-b border-gray-300 p-4"
          >
            <!-- VIEW MODE -->
            <div
              v-if="!stage.isEditing"
              class="flex justify-between items-center"
            >
              <p>{{ stage.name }}</p>
              <div class="flex gap-4 items-center">
                <p>{{ stage.priority }}</p>

                <AppIcon
                  icon="uil:edit"
                  class="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer"
                  @click="startEdit(stage)"
                />
              </div>
            </div>

            <!-- EDIT MODE -->
            <div v-else class="flex gap-4 items-center">
              <input
                type="text"
                v-model="stage.name"
                class="border rounded px-2 py-1"
              />
              <input
                type="number"
                v-model="stage.priority"
                class="border rounded px-2 py-1 w-20"
              />

              <button class="text-green-600 font-medium" @click="save(stage)">
                Save
              </button>

              <button class="text-gray-500" @click="cancelEdit(stage)">
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div v-else class="flex items-center justify-center mt-6 border py-6">
          <img src="/images/no-data.png" alt="" />
        </div>
      </div>
    </div>

    <transition name="modal">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black/50 flex items-center justify-end z-50"
        @click.self="showModal = false"
      >
        <div class="flex items-center h-full">
          <div
            @click="showModal = false"
            class="bg-white w-10 h-10 p-2 rounded-full shadow-lg text-gray-500 hover:text-gray-700 mr-2 hidden md:block cursor-pointer hover:shadow-xl transition-shadow"
          >
            <AppIcon icon="codicon:chevron-right" class="w-6 h-6" />
          </div>
          <div class="h-full bg-white w-96 px-6 py-6 overflow-y-auto">
            <h2 class="text-2xl font-medium text-base mb-6">Add New Stage</h2>

            <div class="mb-4">
              <label class="block mb-2 text-sm font-medium text-gray-700">
                Name <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                v-model="formData.name"
                class="border rounded-md border-gray-300 w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Technical Interview"
              />
            </div>

            <div class="mb-4">
              <label class="block mb-2 text-sm font-medium text-gray-700">
                Priority <span class="text-red-500">*</span>
              </label>
              <input
                type="number"
                v-model="formData.priority"
                class="border rounded-md border-gray-300 w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 1"
                min="1"
              />
            </div>

            <div class="flex justify-between pt-4 border-t border-gray-200">
              <button
                @click="showModal = false"
                class="px-8 sm:px-12 py-2 border-2 border-gray-800 text-gray-800 rounded-md hover:border-gray-600 hover:text-gray-600 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                @click="createStage"
                :disabled="isLoading"
                :class="[
                  'px-8 sm:px-12 py-2 rounded-md cursor-pointer transition-colors',
                  isLoading
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gray-800 text-white hover:bg-gray-700',
                ]"
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

<script>
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import {
  getWorkflow,
  editWorkflow,
  createJobStage,
} from "@/services/auth.recuitment";

export default {
  name: "SettingRecuitment",
  setup() {
    const workflows = ref([]);
    const isLoading = ref(false);
    const activeTab = ref("hiring");
    const showModal = ref(false);
    const toast = useToast();
    const formData = ref({
      name: "",
      priority: "",
    });

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

    const createStage = async () => {
      if (!formData.value.name || !formData.value.priority) return;

      isLoading.value = true;

      const payload = {
        name: formData.value.name,
        priority: Number(formData.value.priority),
      };

      const response = await createJobStage(payload);

      if (response?.status === 200 || response?.status === 201) {
        await fetchWorkflow();
        formData.value = {
          name: "",
          priority: null,
        };
        showModal.value = false;
      } else {
        toast.error("Failed to add new stage. Please try again.");
      }

      isLoading.value = false;
    };

    const startEdit = (stage) => {
      stage.isEditing = true;
      stage.original = { ...stage };
    };

    const cancelEdit = (stage) => {
      Object.assign(stage, stage.original);
      stage.isEditing = false;
    };

    const save = async (stage) => {
      isLoading.value = true;
      try {
        await editWorkflow(stage.id, {
          job_stage_id: stage.id,
          name: stage.name,
          priority: stage.priority,
        });
        stage.isEditing = false;
      } catch (err) {
        console.error(err);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(fetchWorkflow);

    return {
      workflows,
      startEdit,
      cancelEdit,
      save,
      isLoading,
      activeTab,
      showModal,
      formData,
      createStage,
    };
  },
};
</script>

<style scoped>
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
</style>
