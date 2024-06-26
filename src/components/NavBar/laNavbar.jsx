"use client"
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu} from "@nextui-org/react";
// import {ChevronDown, Lock, Activity, Flash, Server, TagUser, Scale} from "./Icons.jsx";
// import {AcmeLogo} from "./AcmeLogo.jsx";
import LogoSegimed from "../logo/LogoSegimed"

export default function LaNAvbar() {
//   const icons = {
//     chevron: <ChevronDown fill="currentColor" size={16} />,
//     scale: <Scale className="text-warning" fill="currentColor" size={30} />,
//     lock: <Lock className="text-success" fill="currentColor" size={30} />,
//     activity: <Activity className="text-secondary" fill="currentColor" size={30} />,
//     flash: <Flash className="text-primary" fill="currentColor" size={30} />,
//     server: <Server className="text-success" fill="currentColor" size={30} />,
//     user: <TagUser className="text-danger" fill="currentColor" size={30} />,
//   };

  return (
    <Navbar  className=" mb-4" >
      <NavbarBrand>
        <LogoSegimed />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4 " justify="center" color="white" >
        {/* <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                
                radius="sm"
                variant="light"
              >
                Features
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="autoscaling"
              description="ACME scales apps to meet user demand, automagically, based on load."
              
            >
              Autoscaling
            </DropdownItem>
            <DropdownItem
              key="usage_metrics"
              description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
             
            >
              Usage Metrics
            </DropdownItem>
            <DropdownItem
              key="production_ready"
              description="ACME runs on ACME, join us and others serving requests at web scale."
              
            >
              Production Ready
            </DropdownItem>
            <DropdownItem
              key="99_uptime"
              description="Applications stay on the grid with high availability and high uptime guarantees."
              
            >
              +99% Uptime
            </DropdownItem>
            <DropdownItem
              key="supreme_support"
              description="Overcome any challenge with a supporting team ready to respond."
              
            >
              +Supreme Support
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> */}
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem >
            <Button as={Link} color="primary" href="#" variant="flat">
            Login
             </Button>
          
        </NavbarItem>
        <NavbarItem>
            <Link href="#">SingUP</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
