<template>
  <div class="w-full md:container mx-auto p-5">
    <h2 class="text-2xl font-semibold">Notification</h2>

    <div class="mt-4 border-b border-gray-200" />

    <div
      class="border border-gray-200 flex items-center justify-between mt-6 rounded-xl px-4 py-3"
    >
      <div>
        <h2 class="text-lg font-semibold">Job Interview Reminder</h2>
        <p class="text-gray-500">
          Allows a user to receive alerts regarding scheduled job interviews
        </p>
      </div>

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

    <div
      class="border border-gray-200 flex items-center justify-between mt-6 rounded-xl px-4 py-3"
    >
      <div>
        <h2 class="text-lg font-semibold">Email invitation to join the team</h2>
        <p class="text-gray-500">
          Enables users to receive an email about upcoming job interviews that
          they have been invited to join
        </p>
      </div>

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

    <div
      class="border border-gray-200 flex items-center justify-between mt-6 rounded-xl px-4 py-3"
    >
      <div>
        <h2 class="text-lg font-semibold">Mention in board</h2>
        <p class="text-gray-500">
          Allows a user to receive alerts regarding scheduled job interviews
        </p>
      </div>

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

    <div
      class="border border-gray-200 flex items-center justify-between mt-6 rounded-xl px-4 py-3"
    >
      <div>
        <h2 class="text-lg font-semibold">Update employees status</h2>
        <p class="text-gray-500">
          Enables users to receive an email about upcoming job interviews that
          they have been invited to join
        </p>
      </div>

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
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "NotificationView",

  setup() {
    const isList = ref(false);

    return {
      isList,
    };
  },
};
</script>

<style lang="scss" scoped></style>
