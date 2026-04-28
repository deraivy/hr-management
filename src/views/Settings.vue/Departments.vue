<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Departments</h2>
    <div class="border border-b w-full border-gray-100" />
    <div class="px-6 flex justify-center mt-6">
      <div class="flex flex-col items-center">
        <div class="relative bg-white shadow-md rounded-md px-6 py-3 border">
          <button
            class="absolute -top-1 -right-4 -translate-x-1/2 bg-black text-white rounded-full h-5 w-5 flex items-center justify-center"
          >
            <AppIcon icon="proicons:pencil" class="w-3 h-3" />
          </button>
          <p class="font-semibold">Unpixel Office</p>
          <button
            class="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white rounded-full h-6 w-6 flex items-center justify-center"
          >
            <AppIcon icon="mdi:plus" class="w-4 h-4" />
          </button>
        </div>

        <div class="w-px h-8"></div>
        <div class="border border-b w-full"></div>

        <div class="flex items-start space-x-8 relative">
          <!-- HR -->
          <div class="flex flex-col items-center">
            <!-- Curved top connector -->
            <div class="relative h-8 flex items-start justify-center w-full">
              <!-- <div class="w-px h-full bg-gray-400"></div> -->
              <div
                class="absolute -bottom-1 top-0 w-6 h-6 border-l border-b border-gray-400 rounded-bl-lg"
                style="left: 50%; transform: translateX(-50%) rotate(90deg)"
              ></div>
            </div>

            <div
              class="relative bg-white shadow-md rounded-md px-4 py-3 border"
            >
              <button
                class="absolute -top-1 -right-4 -translate-x-1/2 bg-black text-white rounded-full h-5 w-5 flex items-center justify-center"
              >
                <AppIcon icon="proicons:pencil" class="w-3 h-3" />
              </button>
              <p class="text-sm">HR</p>
              <button
                class="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white rounded-full h-6 w-6 flex items-center justify-center"
              >
                <AppIcon icon="mdi:plus" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Management -->
          <div class="flex flex-col items-center">
            <div class="w-px h-8 bg-gray-400"></div>
            <div
              class="relative bg-white shadow-md rounded-md px-4 py-3 border"
            >
              <button
                class="absolute -top-1 -right-4 -translate-x-1/2 bg-black text-white rounded-full h-5 w-5 flex items-center justify-center"
              >
                <AppIcon icon="proicons:pencil" class="w-3 h-3" />
              </button>
              <p class="text-sm">Management</p>
              <button
                class="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white rounded-full h-6 w-6 flex items-center justify-center"
              >
                <AppIcon icon="mdi:plus" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Lead Designer + UI UX + Graphic -->
          <div class="flex flex-col items-center">
            <div class="w-px h-8 bg-gray-400"></div>

            <div
              class="relative bg-white shadow-md rounded-md px-4 py-3 border"
            >
              <button
                class="absolute -top-1 -right-4 -translate-x-1/2 bg-black text-white rounded-full h-5 w-5 flex items-center justify-center"
              >
                <AppIcon icon="proicons:pencil" class="w-3 h-3" />
              </button>
              <p class="text-sm">Lead Designer</p>
              <button
                class="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white rounded-full h-6 w-6 flex items-center justify-center"
              >
                <AppIcon icon="mdi:plus" class="w-4 h-4" />
              </button>
            </div>

            <div class="w-px h-8 bg-gray-400"></div>

            <div
              class="relative bg-white shadow-md rounded-md px-4 py-3 border"
            >
              <button
                class="absolute -top-1 -right-4 -translate-x-1/2 bg-black text-white rounded-full h-5 w-5 flex items-center justify-center"
              >
                <AppIcon icon="proicons:pencil" class="w-3 h-3" />
              </button>
              <p class="text-sm">UI UX Design</p>
              <button
                class="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white rounded-full h-6 w-6 flex items-center justify-center"
              >
                <AppIcon icon="mdi:plus" class="w-4 h-4" />
              </button>
            </div>

            <div class="w-px h-8 bg-gray-400"></div>

            <div
              class="relative bg-white shadow-md rounded-md px-4 py-3 border"
            >
              <button
                class="absolute -top-1 -right-4 -translate-x-1/2 bg-black text-white rounded-full h-5 w-5 flex items-center justify-center"
              >
                <AppIcon icon="proicons:pencil" class="w-3 h-3" />
              </button>
              <p class="text-sm">Graphic Design</p>
              <button
                class="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white rounded-full h-6 w-6 flex items-center justify-center"
              >
                <AppIcon icon="mdi:plus" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Marketing -->
          <div class="flex flex-col items-center">
            <div class="w-px h-8 bg-gray-400"></div>
            <div
              class="relative bg-white shadow-md rounded-md px-4 py-3 border"
            >
              <button
                class="absolute -top-1 -right-4 -translate-x-1/2 bg-black text-white rounded-full h-5 w-5 flex items-center justify-center"
              >
                <AppIcon icon="proicons:pencil" class="w-3 h-3" />
              </button>
              <p class="text-sm">Marketing</p>
              <button
                class="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white rounded-full h-6 w-6 flex items-center justify-center"
              >
                <AppIcon icon="mdi:plus" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Lead IT + Android -->
          <div class="flex flex-col items-center">
            <div class="w-px h-8 bg-gray-400"></div>

            <div
              class="relative bg-white shadow-md rounded-md px-4 py-3 border"
            >
              <button
                class="absolute -top-1 -right-4 -translate-x-1/2 bg-black text-white rounded-full h-5 w-5 flex items-center justify-center"
              >
                <AppIcon icon="proicons:pencil" class="w-3 h-3" />
              </button>
              <p class="text-sm">Lead IT</p>
              <button
                class="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white rounded-full h-6 w-6 flex items-center justify-center"
              >
                <AppIcon icon="mdi:plus" class="w-4 h-4" />
              </button>
            </div>

            <div class="w-px h-8 bg-gray-400"></div>

            <div
              class="relative bg-white shadow-md rounded-md px-4 py-3 border"
            >
              <button
                class="absolute -top-1 -right-4 -translate-x-1/2 bg-black text-white rounded-full h-5 w-5 flex items-center justify-center"
              >
                <AppIcon icon="proicons:pencil" class="w-3 h-3" />
              </button>
              <p class="text-sm">Android Dev</p>
              <button
                class="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white rounded-full h-6 w-6 flex items-center justify-center"
              >
                <AppIcon icon="mdi:plus" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Finance -->
          <div class="flex flex-col items-center">
            <div class="w-px h-8 bg-gray-400"></div>
            <div
              class="relative bg-white shadow-md rounded-lg px-2 py-3 border"
            >
              <button
                class="absolute -top-1 -right-4 -translate-x-1/2 bg-black text-white rounded-full h-5 w-5 flex items-center justify-center"
              >
                <AppIcon icon="proicons:pencil" class="w-3 h-3" />
              </button>
              <p class="text-sm">Finance</p>
              <button
                class="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white rounded-full h-6 w-6 flex items-center justify-center"
              >
                <AppIcon icon="mdi:plus" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DepartmentsView",
};
</script>

<style lang="scss" scoped></style>
