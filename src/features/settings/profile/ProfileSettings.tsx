"use client";

import {
    Bell, Building2, Camera, CreditCard, Globe, Mail, Monitor, Moon, Save, Shield, Sun, User
} from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { USER } from '@/config/profile_dummy';

import { NavButton } from './components/NavButton';
import { ThemeOption } from './components/ThemeOption';

export default function ProfileSettings() {
    const [activeTab, setActiveTab] = useState("profile");
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <div className="flex-1 w-full p-6 md:p-8 flex flex-col md:flex-row gap-8">
            {/* LEFT SIDEBAR NAVIGATION */}
            <aside className="w-full md:w-64 shrink-0 space-y-1">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-3">
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

            {/* RIGHT CONTENT AREA */}
            <main className="flex-1 max-w-3xl">

                {/* HEADER */}
                <div className="mb-8 border-b border-slate-200 pb-4">
                    <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage your personal information and application preferences.</p>
                </div>

                {/* SECTION: AVATAR */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6 shadow-sm">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-sm font-bold text-slate-900">Profile Picture</h3>
                            <p className="text-xs text-slate-500 mt-1 max-w-75">
                                This will be displayed on your shared projects and forum posts.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl border-2 border-white shadow-sm overflow-hidden">
                                {USER.avatarUrl ? (
                                    <img src={USER.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <span>{USER.initials}</span>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Button variant="outline" size="sm" className="h-8 text-xs">
                                    <Camera size={14} className="mr-2" /> Change
                                </Button>
                                <button className="text-[10px] text-red-600 hover:underline">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION: PERSONAL INFO */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-900">Personal Information</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700">Full Name</label>
                            <Input defaultValue={USER.name} className="h-9 bg-slate-50 border-slate-200" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700">Job Title</label>
                            <Input defaultValue={USER.role} className="h-9 bg-slate-50 border-slate-200" />
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-semibold text-slate-700">Email Address</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <Input defaultValue={USER.email} disabled className="h-9 pl-9 bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed" />
                            </div>
                            <p className="text-[10px] text-slate-400">To change your email, please contact your organization admin.</p>
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-semibold text-slate-700">Bio / About</label>
                            <textarea
                                className="w-full min-h-20 text-sm p-3 rounded-md border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900/10 resize-y"
                                defaultValue={USER.bio}
                            />
                        </div>
                    </div>
                </div>

                {/* SECTION: PREFERENCES (ENGINEERING SPECIFIC) */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6 shadow-sm space-y-6">
                    <h3 className="text-sm font-bold text-slate-900">Workbench Preferences</h3>

                    <div className="grid md:grid-cols-2 gap-5">
                        {/* Language */}
                        <div className="space-y-1.5 w-full">
                            <label className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                                <Globe size={14} /> Language
                            </label>
                            <Select defaultValue="en">
                                <SelectTrigger className="h-9 bg-slate-50 border-slate-200">
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English (US)</SelectItem>
                                    <SelectItem value="hi">Hindi</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Theme */}
                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-semibold text-slate-700">Appearance</label>
                            <div className="grid grid-cols-3 gap-3">
                                <ThemeOption mode="light" icon={<Sun size={20} />} label="Light" active />
                                <ThemeOption mode="dark" icon={<Moon size={20} />} label="Dark" />
                                <ThemeOption mode="system" icon={<Monitor size={20} />} label="System" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION: DANGER ZONE */}
                <div className="border border-red-200 bg-red-50 rounded-xl p-6 mb-8">
                    <h3 className="text-sm font-bold text-red-900 mb-2">Danger Zone</h3>
                    <p className="text-xs text-red-700/80 mb-4">
                        Permanently delete your account and all associated simulation data. This action cannot be undone.
                    </p>
                    <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-100 hover:text-red-900 bg-white h-8 text-xs">
                        Delete Account
                    </Button>
                </div>

                {/* FOOTER ACTIONS */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 sticky bottom-0 bg-slate-50/90 backdrop-blur-sm py-4 -mx-6 px-6 md:mx-0 md:px-0">
                    <Button variant="ghost" className="text-slate-500 hover:text-slate-900">Cancel</Button>
                    <Button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="bg-blue-600 hover:bg-blue-700 min-w-30"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Saving...
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Save size={16} /> Save Changes
                            </div>
                        )}
                    </Button>
                </div>

            </main>
        </div>
    );
}