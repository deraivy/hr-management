<!-- components/Pagination.vue -->
<template>
  <div v-if="totalPages > 1" class="flex items-center justify-between mt-6">
    <div class="text-sm text-gray-600">
      Showing {{ startItem }} to {{ endItem }} of {{ totalItems }} results
    </div>

    <div class="flex items-center gap-1">
      <!-- Previous button -->
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <AppIcon icon="codicon:chevron-left" class="w-5 h-5" />
      </button>

      <!-- First page -->
      <button
        v-if="currentPage > 2"
        @click="goToPage(1)"
        :class="[
          'px-3 py-2 rounded-md',
          currentPage === 1
            ? 'bg-green-900 text-white'
            : 'bg-gray-100 hover:bg-gray-200',
        ]"
      >
        1
      </button>

      <!-- Ellipsis before current if needed -->
      <span v-if="currentPage > 3" class="px-2">...</span>

      <!-- Page before current if exists -->
      <button
        v-if="currentPage > 1"
        @click="goToPage(currentPage - 1)"
        class="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
      >
        {{ currentPage - 1 }}
      </button>

      <!-- Current page -->
      <button class="px-3 py-2 rounded-md bg-green-900 text-white">
        {{ currentPage }}
      </button>

      <!-- Page after current if exists -->
      <button
        v-if="currentPage < totalPages"
        @click="goToPage(currentPage + 1)"
        class="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
      >
        {{ currentPage + 1 }}
      </button>

      <!-- Ellipsis after current if needed -->
      <span v-if="currentPage < totalPages - 2" class="px-2">...</span>

      <!-- Last page -->
      <button
        v-if="currentPage < totalPages - 1"
        @click="goToPage(totalPages)"
        :class="[
          'px-3 py-2 rounded-md',
          currentPage === totalPages
            ? 'bg-green-900 text-white'
            : 'bg-gray-100 hover:bg-gray-200',
        ]"
      >
        {{ totalPages }}
      </button>

      <!-- Next button -->
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <AppIcon icon="codicon:chevron-right" class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaginationVue",
  props: {
    currentPage: {
      type: Number,
      required: true,
      default: 1,
    },
    totalItems: {
      type: Number,
      required: true,
      default: 0,
    },
    perPage: {
      type: Number,
      required: true,
      default: 10,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.perPage);
    },
    startItem() {
      return (this.currentPage - 1) * this.perPage + 1;
    },
    endItem() {
      const end = this.currentPage * this.perPage;
      return end > this.totalItems ? this.totalItems : end;
    },
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit("page-changed", page);
      }
    },
  },
};
</script>
