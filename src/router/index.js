import { createRouter, createWebHistory } from "vue-router";
import { session } from "@/utils";
import Register from "@/views/authentication/register.vue";
import Login from "@/views/authentication/login.vue";
import Dashboard from "../views/Dashboard.vue";
import Resetpassword from "@/views/authentication/resetpassword.vue";
import Otp from "@/views/authentication/otp.vue";
import Updatepassword from "@/views/authentication/updatepassword.vue";
import MultiStepForm from "@/views/authentication/MultiStepForm.vue";
import ManageEmployee from "@/views/Employees/ManageEmployee.vue";
import EmployeeDetail from "@/views/Employees/EmployeeDetail.vue";
import Directory from "@/views/Employees/Directory.vue";
import MyTimeOff from "@/views/Time Off/MyTimeOff.vue";
import TeamTimeOff from "@/views/Time Off/TeamTimeOff.vue";
import EmployeeTimeOff from "@/views/Time Off/EmployeeTimeOff.vue";
import Settings from "@/views/Time Off/Settings.vue";
import EmployeePayroll from "@/views/Payroll/EmployeePayroll.vue";
import PayrollSetting from "@/views/Payroll/PayrollSetting.vue";
import MyAttendance from "@/views/Attendance/MyAttendance.vue";
import TeamAttendance from "@/views/Attendance/TeamAttendance.vue";
import EmployeeAttendance from "@/views/Attendance/EmployeeAttendance.vue";
import AttendanceSettings from "@/views/Attendance/AttendanceSettings.vue";
import Candidates from "@/views/Recruitment/Candidates.vue";
import Jobs from "@/views/Recruitment/Jobs.vue";
import ListJob from "@/views/Recruitment/ListJob.vue";
import PayrollDetail from "@/views/Payroll/PayrollDetail.vue";
import SettingRecuitment from "@/views/Recruitment/SettingRecuitment.vue";
import ChecklistSetting from "@/views/Checklist/ChecklistSetting.vue";
import Todo from "@/views/Checklist/Todo.vue";
import Onboarding from "@/views/Checklist/Onboarding.vue";
import OffBoarding from "@/views/Checklist/OffBoarding.vue";
import Setting from "@/views/Setting.vue";
import Home from "@/views/Home.vue";
import Apply from "@/views/Apply.vue";
import Career from "@/views/Recruitment/Career.vue";
import Departments from "@/views/Settings.vue/Departments.vue";
import Offices from "@/views/Settings.vue/Offices.vue";
import Info from "@/views/Settings.vue/Info.vue";
import Schedule from "@/views/Settings.vue/Schedule.vue";
import JobTitle from "@/views/Settings.vue/JobTitle.vue";
import Password from "@/views/Settings.vue/Password.vue";
import Permission from "@/views/Settings.vue/Permission.vue";
import Integration from "@/views/Settings.vue/Integration.vue";
import Subscription from "@/views/Settings.vue/Subscription.vue";
import Notification from "@/views/Settings.vue/Notification.vue";
import Crm from "@/views/crm.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { noApp: true },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { noApp: true },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: { noApp: true },
  },
  {
    path: "/resetpassword",
    name: "resetpassword",
    component: Resetpassword,
    meta: { noApp: true },
  },
  {
    path: "/otp",
    name: "otp",
    component: Otp,
    meta: { noApp: true },
  },
  {
    path: "/updatepassword",
    name: "updatepassword",
    component: Updatepassword,
    meta: { noApp: true },
  },
  {
    path: "/multistepform",
    name: "multistepform",
    component: MultiStepForm,
    meta: { noApp: true },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/manage-employee",
    name: "manage-employee",
    component: ManageEmployee,
  },
  {
    path: "/employee-detail/:id",
    name: "employee-detail",
    component: EmployeeDetail,
    props: true,
  },
  {
    path: "/directory",
    name: "directory",
    component: Directory,
  },
  {
    path: "/my-time-off",
    name: "MyTimeOff",
    component: MyTimeOff,
  },
  {
    path: "/team-time-off",
    name: "TeamTimeOff",
    component: TeamTimeOff,
  },
  {
    path: "/employee-time-off",
    name: "employeetimeoff",
    component: EmployeeTimeOff,
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
  },
  {
    path: "/employee-payroll",
    name: "employee-payroll",
    component: EmployeePayroll,
  },
  {
    path: "/payroll-detail/:id",
    name: "payroll-detail",
    component: PayrollDetail,
  },
  {
    path: "/payroll-setting",
    name: "payroll-setting",
    component: PayrollSetting,
    props: true,
  },
  {
    path: "/my-attendance",
    name: "my-attendance",
    component: MyAttendance,
  },
  {
    path: "/team-attendance",
    name: "team-attendance",
    component: TeamAttendance,
  },
  {
    path: "/employee-attendance",
    name: "employee-attendance",
    component: EmployeeAttendance,
  },
  {
    path: "/attendance-settings",
    name: "attendance-settings",
    component: AttendanceSettings,
  },
  {
    path: "/job",
    name: "job",
    component: Jobs,
  },
  {
    path: "/list-job:id",
    name: "list-job",
    component: ListJob,
  },
  {
    path: "/candidates",
    name: "candidates",
    component: Candidates,
  },
  {
    path: "/recuitsetting",
    name: "recuitsetting",
    component: SettingRecuitment,
  },

  {
    path: "/to-do",
    name: "to-do",
    component: Todo,
  },
  {
    path: "/onboarding",
    name: "onboarding",
    component: Onboarding,
  },
  {
    path: "/offboarding",
    name: "offboarding",
    component: OffBoarding,
  },
  {
    path: "/checklist-setting",
    name: "checklist-setting",
    component: ChecklistSetting,
  },

  {
    path: "/setting",
    name: "setting",
    component: Setting,
  },

  {
    path: "/career",
    name: "career",
    component: Career,
    meta: { noApp: true },
  },

  {
    path: "/apply/:id",
    name: "apply",
    component: Apply,
    meta: { noApp: true },
  },

  {
    path: "/crm",
    name: "crm",
    component: Crm,
  },

  {
    path: "/setting",
    name: "setting",
    component: Setting,

    children: [
      {
        path: "",
        name: "info",
        component: Info,
      },
      {
        path: "offices",
        name: "Offices",
        component: Offices,
      },
      {
        path: "departments",
        name: "departments",
        component: Departments,
      },

      {
        path: "schedule",
        name: "schedule",
        component: Schedule,
      },

      {
        path: "jobtitle",
        name: "jobtitle",
        component: JobTitle,
      },

      {
        path: "permission",
        name: "permission",
        component: Permission,
      },

      {
        path: "integration",
        name: "integration",
        component: Integration,
      },

      {
        path: "subscription",
        name: "subscription",
        component: Subscription,
      },

      {
        path: "notification",
        name: "notification",
        component: Notification,
      },

      {
        path: "password",
        name: "password",
        component: Password,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
//   const sessionData = session.get("sessionData");

//   if (requiresAuth && !sessionData) {
//     next({ name: "login" });
//   } else {
//     next();
//   }
// });

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const sessionData = session.get("sessionData");

  if (requiresAuth && !sessionData) {
    if (to.name !== "login") {
      next({ name: "login" });
    } else {
      next();
    }
  } else if (!requiresAuth && sessionData && to.name === "login") {
    // Redirect logged-in users away from login page
    next({ name: "dashboard" });
  } else {
    next();
  }
});

export default router;
