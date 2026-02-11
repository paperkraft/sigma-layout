'use client'
import { Bell, Building2, CreditCard, Shield, User } from 'lucide-react';
import React, { useState } from 'react';

import BillingSettings from './sub-components/BillingSettings';
import MyProfileView from './sub-components/MyProfileView';
import { NavButton } from './sub-components/NavButton';
import NotificationSettings from './sub-components/NotificationSettings';
import OrganizationSettings from './sub-components/OrganizationSettings';
import SecuritySettings from './sub-components/SecuritySettings';

export default function ProfileSettings() {
    const [activeTab, setActiveTab] = useState("profile");

    // --- Dynamic Content Switcher ---
    const renderContent = () => {
        switch (activeTab) {
            case 'account':
                return <SecuritySettings />;
            case 'org':
                return <OrganizationSettings />;
            case 'billing':
                return <BillingSettings />;
            case 'notifications':
                return <NotificationSettings />;
            case 'profile':
            default:
                return <MyProfileView />;
        }
    };

    return (
        <div className="flex-1 w-full p-6 md:p-8 flex flex-col md:flex-row gap-8 text-foreground animate-in fade-in duration-500 min-h-screen">

            {/* LEFT SIDEBAR NAVIGATION */}
            <aside className="w-full md:w-64 shrink-0 space-y-1">
                <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-3">
                    Settings
                </h2>
                <NavButton
                    active={activeTab === 'profile'}
                    onClick={() => setActiveTab('profile')}
                    icon={<User size={18} />}
                    label="My Profile"
                />
                <NavButton
                    active={activeTab === 'account'}
                    onClick={() => setActiveTab('account')}
                    icon={<Shield size={18} />}
                    label="Security & Login"
                />
                <NavButton
                    active={activeTab === 'org'}
                    onClick={() => setActiveTab('org')}
                    icon={<Building2 size={18} />}
                    label="Organization"
                />
                <NavButton
                    active={activeTab === 'billing'}
                    onClick={() => setActiveTab('billing')}
                    icon={<CreditCard size={18} />}
                    label="Plan & Billing"
                />
                <NavButton
                    active={activeTab === 'notifications'}
                    onClick={() => setActiveTab('notifications')}
                    icon={<Bell size={18} />}
                    label="Notifications"
                />
            </aside>

            {/* RIGHT CONTENT AREA (Dynamic) */}
            <main className="flex-1 max-w-3xl">
                {renderContent()}
            </main>
        </div>
    );
}