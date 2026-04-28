<template>
  <div
    class="bg-white border border-gray-200 rounded-lg p-4 transition-all duration-300 hover:shadow-md"
  >
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold text-gray-800">Account Settings</h2>
      <button
        class="p-4 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200"
        aria-label="Edit Account Settings"
      >
        <AppIcon
          icon="ei:pencil"
          class="w-5 h-5 text-gray-500 hover:text-green-600"
        />
      </button>
    </div>
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <p class="text-sm text-gray-500 font-medium sm:w-1/3">Timezone</p>
      <p class="text-sm text-gray-800 font-medium sm:w-2/3">
        GMT +7:00 Bangkok, Central Java, Semarang, Indonesia
      </p>
    </div>
  </div>

  <!-- Privacy Card -->
  <div
    class="bg-white border border-gray-200 rounded-lg p-4 mt-4 transition-all duration-300 hover:shadow-md"
  >
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold text-gray-800">Privacy</h2>
      <button
        class="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200"
        aria-label="Edit Privacy Settings"
      >
        <AppIcon
          icon="ei:pencil"
          class="w-5 h-5 text-gray-500 hover:text-green-600"
        />
      </button>
    </div>
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <p class="text-sm text-gray-500 font-medium">
        Who can see your birthday on calendar
      </p>
      <div class="">
        <select
          name="privacy"
          id="privacy"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-green-400 transition-colors duration-200 bg-white bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%234B5563%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.2em]"
        >
          <option value="everyone">Everyone</option>
          <option value="friends">Friends Only</option>
          <option value="only_me">Only Me</option>
          <option value="custom">Custom</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingView",
};
</script>

<style>
select {
  appearance: none;
}
</style>
