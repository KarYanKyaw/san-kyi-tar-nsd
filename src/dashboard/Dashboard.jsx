import Container from "@/components/Container";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className=" grid grid-cols-12 h-screen">
      <div className=" md:col-span-3 xl:col-span-2 overflow-scroll">
        <div className="p-5 h-screen">
          <div className="flex h-full justify-between flex-col">
            <Sidebar />
            <Button variant="outline" size="sm">
              Log Out
            </Button>
          </div>
        </div>
      </div>
      <div className="md:col-span-9 xl:col-span-10 bg-secondary max-h-full overflow-scroll">
        <div className="py-5 mb-12 h-screen bg-secondary">
          <Container>
            <div className=" space-y-3 h-[93%]">
              <DashboardHeader />
              <Outlet />
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
