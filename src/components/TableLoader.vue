<!-- LoadingSkeleton.vue -->
<template v-if="isLoading">
  <tbody class="bg-white divide-y divide-gray-200">
    <tr
      v-for="n in 5"
      :key="'skeleton-' + n"
      class="animate-pulse even:bg-gray-50"
    >
      <!-- Name + Subtitle -->
      <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
        <div class="flex flex-col gap-1">
          <div class="h-4 bg-gray-200 rounded w-32"></div>
          <div class="h-3 bg-gray-200 rounded w-20"></div>
        </div>
      </td>

      <!-- Email -->
      <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
        <div class="h-4 bg-gray-200 rounded w-40"></div>
      </td>

      <!-- Role -->
      <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
        <div class="h-4 bg-gray-200 rounded w-24"></div>
      </td>

      <!-- Department -->
      <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
        <div class="h-4 bg-gray-200 rounded w-28"></div>
      </td>

      <!-- Status -->
      <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
        <div class="h-4 bg-gray-200 rounded w-16"></div>
      </td>

      <!-- Last Login -->
      <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
        <div class="h-4 bg-gray-200 rounded w-24"></div>
      </td>

      <!-- Actions -->
      <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-right">
        <div class="flex justify-end gap-2">
          <div class="h-8 w-8 bg-gray-200 rounded-md"></div>
          <div class="h-8 w-8 bg-gray-200 rounded-md"></div>
          <div class="h-8 w-8 bg-gray-200 rounded-md"></div>
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: "LoadingSkeleton",
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
