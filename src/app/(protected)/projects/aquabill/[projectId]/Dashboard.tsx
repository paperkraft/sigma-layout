'use client';
import React, { useState } from 'react';
import AquabillSidebar from './Sidebar';
import DashboardHome from './DashboardHome';
import ConnectionsPage from './Connection';
import FlatBillGeneration from './FlatBillGeneration';
import MeterBillGeneration from './MeterBillGeneration';
import PaymentsPage from './PaymentsPage';
import GeneralSettings from './configuration/GeneralSettings';
import ReferenceDataManager from './configuration/ReferenceDataManager';
import TariffConfiguration from './configuration/TariffConfiguration';
import PaymentGatewaySettings from './configuration/PaymentGatewaySettings';
import AllConnectionsReport from './reports/AllConnectionsReport';

export default function AquaBillDashboard() {
    return (
        <>
            <AquabillSidebar />
            <main className={`flex-1 flex flex-col transition-all duration-300 md:ml-64`}>
                {/* <DashboardHome /> */}
                {/* <ConnectionsPage /> */}
                {/* <FlatBillGeneration /> */}
                {/* <MeterBillGeneration /> */}
                {/* <PaymentsPage /> */}
                {/* <GeneralSettings /> */}
                {/* <ReferenceDataManager /> */}
                {/* <TariffConfiguration /> */}
                {/* <PaymentGatewaySettings /> */}
                {/* <AllConnectionsReport /> */}
            </main>
        </>
    );
}