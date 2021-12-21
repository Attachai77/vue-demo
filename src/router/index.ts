import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import Attendance from "../views/Attendance.vue";
import LeaveRequest from "../views/LeaveRequest/List.vue";
import CreateLeaveRequest from "../views/LeaveRequest/Create.vue";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
