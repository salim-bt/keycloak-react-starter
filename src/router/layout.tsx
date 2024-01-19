import React from 'react'
import "./App.css";
import { Outlet } from "react-router";
import { Header } from "./header";

export function Layout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

