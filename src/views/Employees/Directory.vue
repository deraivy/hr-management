<template>
  <div class="">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 class="text-2xl font-bold text-gray-900 mb-8">Directory</h1>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="item in directory"
          :key="item.id"
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <img
            class="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            :src="item.image"
            :alt="`Profile picture of ${item.name}`"
          />

          <div class="text-center">
            <h2 class="text-lg font-semibold text-gray-900">
              <router-link
                :to="`/profile/${item.id}`"
                class="hover:text-indigo-600 transition-colors duration-300"
              >
                {{ item.name }}
              </router-link>
            </h2>
            <p class="text-sm text-gray-500 mt-1">{{ item.role }}</p>
            <div class="mt-4 space-y-2">
              <p class="text-sm text-gray-700 flex items-center justify-center">
                <AppIcon
                  icon="material-symbols:mail"
                  class="w-5 h-5 text-gray-400 mr-4"
                />
                <a
                  :href="`mailto:${item.email}`"
                  class="hover:text-indigo-600 transition-colors duration-300"
                >
                  {{ item.email }}
                </a>
              </p>
              <p class="text-sm text-gray-700 flex items-center justify-center">
                <AppIcon
                  icon="icons8:phone"
                  class="w-6 h-6 mr-4 text-[#a3a8aa]"
                />
                <a
                  :href="`tel:${item.phone}`"
                  class="hover:text-indigo-600 transition-colors duration-300"
                >
                  {{ item.phone }}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DirectoryView",
  setup() {
    const directory = [
      {
        id: 1,
        name: "John Doe",
        role: "Developer",
        email: "john.doe@example.com",
        phone: "+234-910-123-4567",
        image: "https://randomuser.me/api/portraits/women/21.jpg",
      },
      {
        id: 2,
        name: "Jane Smith",
        role: "Designer",
        email: "jane.smith@example.com",
        phone: "+234-910-987-6543",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
      },
      {
        id: 3,
        name: "Alex Johnson",
        role: "Manager",
        email: "alex.johnson@example.com",
        phone: "+234-910-555-5555",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        id: 4,
        name: "Chi Johnson",
        role: "Manager",
        email: "alex.johnson@example.com",
        phone: "+234-910-555-5555",
        image: "https://randomuser.me/api/portraits/men/33.jpg",
      },
    ];

    return {
      directory,
    };
  },
};
</script>

<style scoped>
/* Ensure consistent typography */
h1 {
  font-family: "Nunito", sans-serif;
}
</style>
