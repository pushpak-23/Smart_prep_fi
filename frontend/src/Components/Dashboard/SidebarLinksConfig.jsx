import React from "react";
import {
  LayoutDashboard,
  Home,
  BarChart2,
  SeparatorVertical,
  Layers,
  Calendar,
  LifeBuoy,
  Settings,
} from "lucide-react";

export const sidebarLinks = [
  { to: "/#", icon: <Home size={20} />, text: "Home", alert: true },
  { to: "/dashboard", icon: <LayoutDashboard size={20} />, text: "Dashboard" },
  { to: "/result", icon: <BarChart2 size={20} />, text: "Result", alert: true },
  { to: "/#", icon: <Calendar size={20} />, text: "Calendar" },
  { to: "/#", icon: <Layers size={20} />, text: "Tasks" },
  { to: "/test", icon: <SeparatorVertical size={20} />, text: "Take Test" },
  { to: "/#", icon: <Settings size={20} />, text: "Settings" },
  { to: "/#", icon: <LifeBuoy size={20} />, text: "Help" },
];
