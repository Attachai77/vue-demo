import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import Attendance from "../views/Attendance.vue";
import LeaveRequest from "../views/LeaveRequest/List.vue";
import CreateLeaveRequest from "../views/LeaveRequest/Create.vue";
import ActivateStaffQRCode from "../views/Users/ActivateQRCode.vue";
import Activate from "../views/Users/Activate.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/attendance",
    name: "Attendance",
    component: Attendance,
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },
  {
    path: "/leave-request",
    name: "LeaveRequest",
    component: LeaveRequest,
  },
  {
    path: "/create-leave-request",
    name: "CreateLeaveRequest",
    component: CreateLeaveRequest,
  },
  {
    path: "/activate-staff-qr-code",
    name: "ActivateStaffQRCode",
    component: ActivateStaffQRCode,
  },
  {
    path: "/activate/:userId",
    name: "Activate",
    component: Activate,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
