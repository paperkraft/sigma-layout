"use client";

import {
    Bell, Building2, Camera, CreditCard, Globe, Mail, Monitor, Moon, Save, Shield, Sun, User
} from 'lucide-react';
import React, { useState } from 'react';
import { useTheme } from "next-themes";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { USER } from '@/config/profile_dummy';

import { NavButton } from './components/NavButton';
import { ThemeOption } from './components/ThemeOption';

export default function ProfileSettings() {
    const [activeTab, setActiveTab] = useState("profile");
    const [isLoading, setIsLoading] = useState(false);
    const { setTheme, theme } = useTheme();

    const handleSave = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <div className="flex-1 w-full p-6 md:p-8 flex flex-col md:flex-row gap-8">
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

            {/* RIGHT CONTENT AREA */}
            <main className="flex-1 max-w-3xl">

                {/* HEADER */}
                <div className="mb-8 border-b border-border pb-4">
                    <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
                    <p className="text-muted-foreground text-sm mt-1">Manage your personal information and application preferences.</p>
                </div>

                {/* SECTION: AVATAR - Using bg-card to separate from bg-background */}
                <div className="bg-card border border-border rounded-xl p-6 mb-6 shadow-sm">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-sm font-bold text-card-foreground">Profile Picture</h3>
                            <p className="text-xs text-muted-foreground mt-1 max-w-75">
                                This will be displayed on your shared projects and forum posts.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl border-2 border-background shadow-sm overflow-hidden">
                                {USER.avatarUrl ? (
                                    <img src={USER.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <span>{USER.initials}</span>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Button variant="outline" size="sm" className="h-8 text-xs bg-background hover:bg-muted">
                                    <Camera size={14} className="mr-2" /> Change
                                </Button>
                                <button className="text-[10px] text-destructive hover:underline">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION: PERSONAL INFO */}
                <div className="bg-card border border-border rounded-xl p-6 mb-6 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-card-foreground">Personal Information</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-foreground/80">Full Name</label>
                            <Input defaultValue={USER.name} className="h-9 bg-background border-input" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-foreground/80">Job Title</label>
                            <Input defaultValue={USER.role} className="h-9 bg-background border-input" />
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-semibold text-foreground/80">Email Address</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <Input defaultValue={USER.email} disabled className="h-9 pl-9 bg-muted text-muted-foreground cursor-not-allowed border-transparent" />
                            </div>
                            <p className="text-[10px] text-muted-foreground/80">To change your email, please contact your organization admin.</p>
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-semibold text-foreground/80">Bio / About</label>
                            <textarea
                                className="w-full min-h-20 text-sm p-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
                                defaultValue={USER.bio}
                            />
                        </div>
                    </div>
                </div>

                {/* SECTION: PREFERENCES */}
                <div className="bg-card border border-border rounded-xl p-6 mb-6 shadow-sm space-y-6">
                    <h3 className="text-sm font-bold text-card-foreground">Workbench Preferences</h3>

                    <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-1.5 w-full">
                            <label className="text-xs font-semibold text-foreground/80 flex items-center gap-2">
                                <Globe size={14} /> Language
                            </label>
                            <Select defaultValue="en">
                                <SelectTrigger className="h-9 bg-background border-input">
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English (US)</SelectItem>
                                    <SelectItem value="hi">Hindi</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-semibold text-foreground/80">Appearance</label>
                            <div className="grid grid-cols-3 gap-3">
                                <ThemeOption
                                    mode="light"
                                    icon={<Sun size={20} />}
                                    label="Light"
                                    active={theme === 'light'}
                                    onClick={() => setTheme('light')}
                                />
                                <ThemeOption
                                    mode="dark"
                                    icon={<Moon size={20} />}
                                    label="Dark"
                                    active={theme === 'dark'}
                                    onClick={() => setTheme('dark')}
                                />
                                <ThemeOption
                                    mode="system"
                                    icon={<Monitor size={20} />}
                                    label="System"
                                    active={theme === 'system'}
                                    onClick={() => setTheme('system')}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION: DANGER ZONE */}
                <div className="border border-destructive/20 bg-destructive/5 rounded-xl p-6 mb-8">
                    <h3 className="text-sm font-bold text-destructive mb-2">Danger Zone</h3>
                    <p className="text-xs text-destructive/80 mb-4">
                        Permanently delete your account and all associated simulation data. This action cannot be undone.
                    </p>
                    <Button variant="outline" className="border-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive bg-transparent h-8 text-xs">
                        Delete Account
                    </Button>
                </div>

                {/* FOOTER ACTIONS */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border sticky bottom-0 bg-background/95 backdrop-blur-sm py-4 -mx-6 px-6 md:mx-0 md:px-0">
                    <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Cancel</Button>
                    <Button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="bg-primary hover:bg-primary/90 min-w-30"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
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