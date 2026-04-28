<template>
  <div class="w-full md:container mx-auto p-5">
    <div class="flex justify-between items-center">
      <h2>Integration</h2>

      <select class="border border-gray-200 rounded-lg p-2">
        <option value="application tracking system">
          Application Tracking System
        </option>
      </select>
    </div>
    <div class="mt-4 border-b border-gray-200" />

    <div class="border border-gray-200 p-4 mt-12 rounded-lg">
      <div class="flex items-start gap-4">
        <!-- Logo -->
        <img
          src="/images/download.png"
          alt=""
          class="rounded-full w-16 h-16 border"
        />

        <!-- Content -->
        <div class="flex-1">
          <!-- Top row -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <h2 class="font-semibold">Workable</h2>
              <div class="bg-gray-200 px-2 py-1 rounded-lg text-xs">ATS</div>
            </div>

            <!-- Toggle -->
            <div
              @click="isList = !isList"
              :class="[
                'relative w-12 h-7 rounded-full flex items-center p-1 cursor-pointer transition',
                isList ? 'bg-[#11ad5d]' : 'bg-gray-300',
              ]"
            >
              <div
                :class="[
                  'w-5 h-5 rounded-full bg-white shadow transform transition flex items-center justify-center',
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

          <!-- Description -->
          <p class="text-gray-500 mt-2 text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam
            autem pariatur assumenda illum quo magnam dolores.
          </p>
        </div>
      </div>
    </div>

    <div class="border border-gray-200 p-4 mt-6 rounded-lg">
      <div class="flex items-start gap-4">
        <!-- Logo -->
        <img
          src="/images/download.png"
          alt=""
          class="rounded-full w-16 h-16 border"
        />

        <!-- Content -->
        <div class="flex-1">
          <!-- Top row -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <h2 class="font-semibold">Workable</h2>
              <div class="bg-gray-200 px-2 py-1 rounded-lg text-xs">ATS</div>
            </div>

            <!-- Toggle -->
            <div
              @click="isList = !isList"
              :class="[
                'relative w-12 h-7 rounded-full flex items-center p-1 cursor-pointer transition',
                isList ? 'bg-[#11ad5d]' : 'bg-gray-300',
              ]"
            >
              <div
                :class="[
                  'w-5 h-5 rounded-full bg-white shadow transform transition flex items-center justify-center',
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

          <!-- Description -->
          <p class="text-gray-500 mt-2 text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam
            autem pariatur assumenda illum quo magnam dolores.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "IntegrationView",

  setup() {
    const isList = ref(false);
    return {
      isList,
    };
  },
};
</script>

<style lang="scss" scoped></style>
