<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<template>
  <div class="p-6">
    <!-- Page header -->
    <div class="flex items-start justify-between flex-wrap gap-4 mb-6">
      <div>
        <h1 class="text-xl font-semibold text-gray-900">Contacts</h1>
        <p class="text-sm text-gray-500 mt-0.5">
          {{ contacts.length }} total records
        </p>
      </div>
      <div class="flex items-center gap-3">
        <!-- Search -->
        <div class="relative">
          <svg
            class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            v-model="search"
            type="text"
            placeholder="Search contacts…"
            class="h-9 pl-8 pr-3 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-52 transition"
          />
        </div>
        <!-- Add button -->
        <button
          @click="openAdd"
          class="flex items-center gap-2 h-9 px-4 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          <svg
            class="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add contact
        </button>
      </div>
    </div>

    <!-- Stat cards -->
    <div class="grid grid-cols-4 gap-3 mb-6">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white border border-gray-200 rounded-xl p-4"
      >
        <p
          class="text-xs uppercase tracking-widest text-gray-400 font-medium mb-1"
        >
          {{ stat.label }}
        </p>
        <p class="text-2xl font-semibold text-indigo-6-indigo-600">
          {{ stat.value }}
        </p>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <table class="w-full text-sm border-collapse">
        <thead>
          <tr class="bg-gray-50 border-b border-gray-200">
            <th
              class="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider w-[22%]"
            >
              Name
            </th>
            <th
              class="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider w-[18%]"
            >
              Phone
            </th>
            <th
              class="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider w-[22%]"
            >
              Email
            </th>
            <th
              class="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider w-[25%]"
            >
              Remark
            </th>
            <th
              class="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider w-[13%]"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Empty state -->
          <tr v-if="filtered.length === 0">
            <td colspan="5" class="py-14 text-center">
              <div class="flex flex-col items-center gap-2">
                <div
                  class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </div>
                <p class="text-sm text-gray-400">No contacts found</p>
              </div>
            </td>
          </tr>

          <!-- Rows -->
          <tr
            v-for="contact in filtered"
            :key="contact.id"
            class="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
          >
            <td class="px-4 py-3">
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-semibold text-indigo-600 shrink-0"
                >
                  {{ initials(contact.name) }}
                </div>
                <span class="font-medium text-gray-900 truncate">{{
                  contact.name
                }}</span>
              </div>
            </td>
            <td class="px-4 py-3 text-gray-500 text-xs font-mono">
              {{ contact.phone || "—" }}
            </td>
            <td class="px-4 py-3 text-indigo-500 truncate max-w-0">
              {{ contact.email || "—" }}
            </td>
            <td class="px-4 py-3 text-gray-400 text-xs truncate max-w-0">
              {{ contact.remark || "—" }}
            </td>
            <td class="px-4 py-3">
              <div class="flex items-center gap-2">
                <button
                  @click="openEdit(contact)"
                  class="h-7 px-3 text-xs border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Edit
                </button>
                <button
                  @click="askDelete(contact)"
                  class="h-7 px-3 text-xs border border-red-200 rounded-md text-red-500 hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add / Edit Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-150"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showModal"
          class="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
          @click.self="closeModal"
        >
          <div
            class="bg-white rounded-2xl border border-gray-200 w-full max-w-md shadow-xl"
          >
            <!-- Header -->
            <div
              class="flex items-center justify-between px-6 py-4 border-b border-gray-100"
            >
              <h2 class="text-base font-semibold text-gray-900">
                {{ editing ? "Edit contact" : "Add contact" }}
              </h2>
              <button
                @click="closeModal"
                class="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none"
              >
                &times;
              </button>
            </div>

            <!-- Body -->
            <div class="px-6 py-5 flex flex-col gap-4">
              <div class="flex flex-col gap-1.5">
                <label
                  class="text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >Name</label
                >
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Full name"
                  :class="[
                    'h-10 px-3 rounded-lg text-sm border text-gray-900 placeholder-gray-400 outline-none transition',
                    errors.name
                      ? 'border-red-400 focus:ring-1 focus:ring-red-400'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500',
                  ]"
                  @input="errors.name = false"
                />
                <p v-if="errors.name" class="text-xs text-red-500">
                  Name is required.
                </p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label
                  class="text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >Phone</label
                >
                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="+234 800 000 0000"
                  class="h-10 px-3 rounded-lg text-sm border border-gray-300 text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>

              <div class="flex flex-col gap-1.5">
                <label
                  class="text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >Email</label
                >
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="email@example.com"
                  class="h-10 px-3 rounded-lg text-sm border border-gray-300 text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>

              <div class="flex flex-col gap-1.5">
                <label
                  class="text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >Remark</label
                >
                <textarea
                  v-model="form.remark"
                  placeholder="Notes about this contact…"
                  rows="3"
                  class="px-3 py-2.5 rounded-lg text-sm border border-gray-300 text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition resize-none leading-relaxed"
                ></textarea>
              </div>
            </div>

            <!-- Footer -->
            <div
              class="flex justify-end gap-3 px-6 py-4 border-t border-gray-100"
            >
              <button
                @click="closeModal"
                class="h-9 px-4 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                @click="save"
                class="h-9 px-5 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                {{ editing ? "Save changes" : "Add contact" }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Delete Confirm Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-150"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showConfirm"
          class="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
          @click.self="closeConfirm"
        >
          <div
            class="bg-white rounded-2xl border border-gray-200 w-full max-w-sm shadow-xl"
          >
            <div
              class="flex items-center justify-between px-6 py-4 border-b border-gray-100"
            >
              <h2 class="text-base font-semibold text-gray-900">
                Delete contact?
              </h2>
              <button
                @click="closeConfirm"
                class="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none"
              >
                &times;
              </button>
            </div>
            <div class="px-6 py-5">
              <p class="text-sm text-gray-500 leading-relaxed">
                You are about to delete
                <span class="text-gray-900 font-medium">{{
                  pendingDelete?.name
                }}</span
                >. This cannot be undone.
              </p>
            </div>
            <div
              class="flex justify-end gap-3 px-6 py-4 border-t border-gray-100"
            >
              <button
                @click="closeConfirm"
                class="h-9 px-4 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                @click="confirmDelete"
                class="h-9 px-5 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "CRMView",

  setup() {
    const contacts = ref([
      {
        id: 1,
        name: "Amara Osei",
        phone: "+234 801 234 5678",
        email: "amara@example.com",
        remark: "VIP client, follow up monthly",
      },
      {
        id: 2,
        name: "Chidi Nweze",
        phone: "+234 703 987 6543",
        email: "chidi@mybiz.ng",
        remark: "Interested in premium plan",
      },
      {
        id: 3,
        name: "Fatima Aliyu",
        phone: "+234 812 555 0001",
        email: "fatima.aliyu@corp.com",
        remark: "",
      },
    ]);

    const search = ref("");

    const filtered = computed(() => {
      return contacts.value.filter((contact) =>
        // eslint-disable-next-line prettier/prettier
        contact.name.toLowerCase().includes(search.value.toLowerCase()),
      );
    });

    const stats = computed(() => [
      {
        label: "Total",
        value: contacts.value.length,
      },
      {
        label: "With Email",
        value: contacts.value.filter((c) => c.email).length,
      },
      {
        label: "With Phone",
        value: contacts.value.filter((c) => c.phone).length,
      },
      {
        label: "Remarks",
        value: contacts.value.filter((c) => c.remark).length,
      },
    ]);

    const showModal = ref(false);
    const showConfirm = ref(false);
    const editing = ref(false);

    const pendingDelete = ref(null);

    const form = ref({
      id: null,
      name: "",
      phone: "",
      email: "",
      remark: "",
    });

    const errors = ref({
      name: false,
    });

    const openAdd = () => {
      editing.value = false;

      form.value = {
        id: null,
        name: "",
        phone: "",
        email: "",
        remark: "",
      };

      showModal.value = true;
    };

    const openEdit = (contact) => {
      editing.value = true;

      form.value = { ...contact };

      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const save = () => {
      if (!form.value.name.trim()) {
        errors.value.name = true;
        return;
      }

      if (editing.value) {
        const index = contacts.value.findIndex((c) => c.id === form.value.id);

        if (index !== -1) {
          contacts.value[index] = { ...form.value };
        }
      } else {
        contacts.value.push({
          ...form.value,
          id: Date.now(),
        });
      }

      closeModal();
    };

    const askDelete = (contact) => {
      pendingDelete.value = contact;
      showConfirm.value = true;
    };

    const closeConfirm = () => {
      showConfirm.value = false;
    };

    const initials = (name) => {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
    };

    return {
      contacts,
      search,
      filtered,
      stats,
      showModal,
      showConfirm,
      editing,
      pendingDelete,
      form,
      errors,
      openAdd,
      openEdit,
      closeModal,
      save,
      askDelete,
      closeConfirm,
      initials,
    };
  },
};
</script>
