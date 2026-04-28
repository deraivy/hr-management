<template>
  <div class="w-full md:container mx-auto p-5">
    <!-- HEADER -->
    <div
      class="flex flex-col md:flex-row items-start md:items-center justify-between"
    >
      <div class="mb-3 md:mb-0">
        <h2 class="text-lg sm:text-xl md:text-2xl mb-1 font-bold text-gray-700">
          My Attendance
        </h2>
        <p class="mt-1 text-sm text-gray-500">Manage your attendance</p>
      </div>

      <div class="flex items-center gap-2">
        <!-- CHECK IN -->
        <div
          v-show="!checkedIn"
          @click="openCheckIn"
          class="bg-[#121827] text-white px-4 py-3 cursor-pointer rounded-md"
        >
          Check in 9:00 AM
        </div>

        <!-- CHECK OUT -->
        <div
          v-show="checkedIn"
          @click="openCheckOut"
          class="bg-red-600 text-white px-4 py-3 cursor-pointer rounded-md"
        >
          Check out 5:00 PM
        </div>
      </div>
    </div>

    <div class="mt-6 bg-white w-full px-6 py-4 rounded-lg">
      <!-- filter -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        <DateRange />
        <select
          class="border border-gray-300 rounded-lg px-2 py-2 w-full sm:w-auto text-sm sm:text-base"
        >
          <option value="">All Types</option>
          <option value="engineering">Engineering</option>
          <option value="design">Design</option>
          <option value="marketing">Marketing</option>
          <option value="sales">Sales</option>
        </select>
        <select
          class="border border-gray-300 rounded-lg px-2 py-2 w-full sm:w-auto text-sm sm:text-base"
        >
          <option value="">All Status</option>
          <option value="engineering">Engineering</option>
          <option value="design">Design</option>
          <option value="marketing">Marketing</option>
          <option value="sales">Sales</option>
        </select>
      </div>

      <!-- table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Start Time
              </th>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Clock In
              </th>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Clock In Location
              </th>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Clock Out
              </th>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Clock Out Location
              </th>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Work Schedule
              </th>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Note
              </th>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                End Time
              </th>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Deficit
              </th>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="isLoading">
              <td
                colspan="11"
                class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500"
              >
                <TableLoader />
              </td>
            </tr>
            <tr v-for="attendance in attendances" :key="attendance.id">
              <td class="px-4 sm:px-6 py-4 text-[#222222] whitespace-nowrap">
                {{ attendance.created_at || "-" }}
              </td>
              <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                {{ attendance.start_time || "-" }}
              </td>
              <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                {{ attendance.check_in || "-" }}
              </td>
              <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                {{ attendance.clock_in_location || "-" }}
              </td>
              <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                {{ attendance.check_out || "-" }}
              </td>
              <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                {{ attendance.clock_out_location || "-" }}
              </td>
              <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                {{ attendance.logged_time || "-" }}
              </td>
              <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                {{ attendance.note || "-" }}
              </td>
              <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                {{ attendance.end_time || "-" }}
              </td>
              <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                {{ attendance.deficit || "-" }}
              </td>
              <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-right">
                <div class="flex items-center gap-2 justify-center">
                  <div
                    class="bg-green-600 p-1 rounded-md hover:bg-green-600/80"
                  >
                    <AppIcon
                      icon="proicons:eye"
                      class="text-white w-4 h-4 sm:w-5 sm:h-5"
                    />
                  </div>
                  <div class="bg-blue-600 p-1 rounded-md hover:bg-blue-600/80">
                    <AppIcon
                      icon="clarity:note-edit-line"
                      class="text-white w-4 h-4 sm:w-5 sm:h-5"
                    />
                  </div>
                  <div class="bg-red-600 p-1 rounded-md hover:bg-red-600/80">
                    <AppIcon
                      icon="proicons:delete"
                      class="text-white w-4 h-4 sm:w-5 sm:h-5"
                    />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- PAGINATION -->
        <div class="px-4">
          <vue-awesome-paginate
            :model-value="currentPage"
            :total-items="totalItems"
            :items-per-page="perPage"
            :page-size="5"
            @update:model-value="(page) => handlePageChange(page)"
            class="pagination-container"
          />
        </div>
      </div>
    </div>

    <!-- CHECK IN MODAL -->
    <transition name="fade">
      <div
        v-if="openModal"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-md w-full max-w-md">
          <h2 class="font-semibold text-xl mb-4">Check in for today</h2>

          <div class="mb-4">
            <p class="text-sm text-gray-700">
              Please enter a note for your check-in
            </p>
          </div>

          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900"
              >Note</label
            >
            <input
              v-model="note"
              type="text"
              placeholder="Input notes here"
              class="border border-gray-300 w-full p-2.5 rounded-md"
            />
          </div>

          <div class="flex gap-3 mt-6">
            <div
              @click="openModal = false"
              class="border p-2.5 w-full text-center cursor-pointer rounded-md"
            >
              Cancel
            </div>
            <div
              @click="submitCheckIn"
              class="bg-[#121828] text-white p-2.5 w-full text-center cursor-pointer rounded-md"
            >
              {{ submitLoading ? "Processing..." : "Check In" }}
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- CHECK OUT MODAL -->
    <transition name="fade">
      <div
        v-if="checkOutModal"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-md w-full max-w-md">
          <h2 class="font-semibold text-xl mb-4">
            Clock out at {{ clockOutTime }}
          </h2>

          <div class="mb-4">
            <p class="text-sm text-gray-700">
              Your check-in time today:
              <span class="font-semibold">{{
                todayRecord?.check_in || "N/A"
              }}</span>
            </p>
          </div>

          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900"
              >Note</label
            >
            <input
              v-model="note"
              type="text"
              placeholder="Enter your note for check-out"
              class="border border-gray-300 w-full p-2.5 rounded-md"
            />
          </div>

          <div class="flex gap-3 mt-6">
            <button
              @click="checkOutModal = false"
              class="border p-2.5 w-full rounded-md"
            >
              Cancel
            </button>
            <button
              @click="submitCheckOut"
              class="bg-red-600 text-white p-2.5 w-full rounded-md"
            >
              {{ submitLoading ? "Processing..." : "Check Out" }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getMyAttendance, clockIn, clockOut } from "@/services/auth.attendance";
import DateRange from "@/components/DateRange.vue";
import { useToast } from "vue-toastification";
import TableLoader from "@/components/TableLoader.vue";

const attendances = ref([]);
const currentPage = ref(1);
const perPage = ref(2);
const totalItems = ref(0);
const isLoading = ref(false);
const checkedIn = ref(false);
const openModal = ref(false);
const checkOutModal = ref(false);
const note = ref("");
const submitLoading = ref(false);
const todayRecord = ref(null);
const toast = useToast();

// ✅ FETCH ATTENDANCES
const fetchAttendances = async (page = 1) => {
  isLoading.value = true;

  try {
    const response = await getMyAttendance({
      page,
      perPage: perPage.value,
    });

    if (response?.status === 200 && response?.data) {
      attendances.value = response.data.data || response.data.attendances || [];
      totalItems.value = response.data.totalItems || response.data.total || 0;

      // Get today's date
      const today = new Date();
      const todayDay = today.getDate();
      const todayMonth = today.getMonth();
      const todayYear = today.getFullYear();

      // Find today's attendance record
      todayRecord.value = attendances.value.find((record) => {
        if (!record.created_at) return false;

        try {
          // Parse date in format: "08-Dec-2025"
          const dateParts = record.created_at.split("-");
          if (dateParts.length !== 3) return false;

          const recordDay = parseInt(dateParts[0]);
          const recordMonthStr = dateParts[1];
          const recordYear = parseInt(dateParts[2]);

          // Convert month string to number
          const monthMap = {
            Jan: 0,
            Feb: 1,
            Mar: 2,
            Apr: 3,
            May: 4,
            Jun: 5,
            Jul: 6,
            Aug: 7,
            Sep: 8,
            Oct: 9,
            Nov: 10,
            Dec: 11,
          };

          const recordMonth = monthMap[recordMonthStr];

          return (
            recordDay === todayDay &&
            recordMonth === todayMonth &&
            recordYear === todayYear
          );
        } catch (error) {
          console.error("Error parsing date:", error);
          return false;
        }
      });

      console.log("🔍 Today's record:", todayRecord.value);

      // Determine checked-in status
      if (todayRecord.value) {
        // Has check_in but no valid check_out
        const hasCheckIn =
          todayRecord.value.check_in &&
          todayRecord.value.check_in.trim() !== "" &&
          todayRecord.value.check_in !== "-" &&
          todayRecord.value.check_in.toLowerCase() !== "null";

        const hasCheckOut =
          todayRecord.value.check_out &&
          todayRecord.value.check_out.trim() !== "" &&
          todayRecord.value.check_out !== "-" &&
          todayRecord.value.check_out.toLowerCase() !== "null";

        checkedIn.value = hasCheckIn && !hasCheckOut;

        console.log("🔍 Status check:", {
          hasCheckIn,
          hasCheckOut,
          check_in: todayRecord.value.check_in,
          check_out: todayRecord.value.check_out,
          checkedIn: checkedIn.value,
        });
      } else {
        checkedIn.value = false;
        console.log("🔍 No record found for today");
      }
    }
  } catch (error) {
    console.error("❌ Error fetching attendance:", error);
    attendances.value = [];
    totalItems.value = 0;
    checkedIn.value = false;
    todayRecord.value = null;
  }

  isLoading.value = false;
};

const handlePageChange = (page) => {
  currentPage.value = page;
  fetchAttendances(page);
};

// ✅ MODAL CONTROLS
const openCheckIn = () => {
  note.value = "";
  openModal.value = true;
};

const openCheckOut = () => {
  note.value = "";
  checkOutModal.value = true;
};

// ✅ CHECK IN FUNCTION
const submitCheckIn = async () => {
  if (!note.value.trim()) {
    toast.error("Please enter a note before checking in.", {
      timeout: 5000,
      position: "top-right",
    });
    return;
  }

  submitLoading.value = true;

  try {
    const response = await clockIn({
      note: note.value.trim(),
    });

    console.log("🔍 Check-in Response:", response);

    if (response && response.status === 201) {
      toast.success("Checked in successfully ✅", {
        timeout: 5000,
        position: "top-right",
      });

      // Close modal and reset
      openModal.value = false;
      note.value = "";

      // Update status
      checkedIn.value = true;

      // Refresh data with a small delay
      setTimeout(async () => {
        await fetchAttendances(currentPage.value);
      }, 1000);
    } else if (response && response.error && response.error.detail) {
      toast.warning(response.error.detail, {
        timeout: 10000,
        position: "top-right",
      });
    } else {
      toast.error("Failed to check in. Please try again.", {
        timeout: 5000,
        position: "top-right",
      });
    }
  } catch (error) {
    console.error("❌ Check-in error:", error);
    toast.error("An error occurred while checking in. Please try again.", {
      timeout: 5000,
      position: "top-right",
    });
  }

  submitLoading.value = false;
};

// ✅ CHECK OUT FUNCTION
const submitCheckOut = async () => {
  if (!note.value.trim()) {
    toast.error("Please enter a note before checking out.", {
      timeout: 5000,
      position: "top-right",
    });
    return;
  }

  submitLoading.value = true;

  try {
    const response = await clockOut({
      note: note.value.trim(),
      // Include attendance ID if required by your API
      // attendance_id: todayRecord.value?.id
    });

    console.log("🔍 Check-out Response:", response);

    if (response && response.status === 201) {
      toast.success("Checked out successfully ✅", {
        timeout: 5000,
        position: "top-right",
      });

      // Close modal and reset
      checkOutModal.value = false;
      note.value = "";

      // Update status
      checkedIn.value = false;

      // Refresh data
      setTimeout(async () => {
        await fetchAttendances(currentPage.value);
      }, 1000);
    } else if (response && response.error && response.error.detail) {
      toast.warning(response.error.detail, {
        timeout: 10000,
        position: "top-right",
      });
    } else {
      toast.error("Failed to check out. Please try again.", {
        timeout: 5000,
        position: "top-right",
      });
    }
  } catch (error) {
    console.error("❌ Check-out error:", error);
    toast.error("An error occurred while checking out. Please try again.", {
      timeout: 5000,
      position: "top-right",
    });
  }

  submitLoading.value = false;
};

// ✅ COMPUTED PROPERTY FOR CLOCK OUT TIME
const clockOutTime = computed(() => {
  if (todayRecord.value?.check_in) {
    try {
      const checkInTime = todayRecord.value.check_in;
      // Assuming format "08:46 AM" or "08:46"
      const [time, period] = checkInTime.split(" ");

      let [hours, minutes] = time.split(":").map(Number);

      // Handle 12-hour format
      if (period) {
        if (period === "PM" && hours < 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;
      }

      // Add 9 hours for work day
      const checkOutHour = (hours + 9) % 24;

      // Format back to 12-hour format
      const displayHour = checkOutHour % 12 || 12;
      const displayMinutes = minutes.toString().padStart(2, "0");
      const displayPeriod = checkOutHour >= 12 ? "PM" : "AM";

      return `${displayHour}:${displayMinutes} ${displayPeriod}`;
    } catch (e) {
      console.error("Error calculating clock out time:", e);
      return "5:00 PM";
    }
  }
  return "5:00 PM";
});

onMounted(() => {
  fetchAttendances(currentPage.value);
});
</script>
