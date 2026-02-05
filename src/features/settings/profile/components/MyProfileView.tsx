'use client'
import React, { useState } from 'react';
import { Camera, Globe, Mail, Monitor, Moon, Save, Sun } from 'lucide-react';
import { useTheme } from "next-themes";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ThemeOption } from './ThemeOption';

// Mock User Data
const USER = {
    name: "Vishal Sannake",
    role: "Administrator",
    email: "vishal.sannake@infraplan.co.in",
    bio: "Managing water distribution networks and billing operations for the North-West zone.",
    initials: "SV",
    avatarUrl: null
};

export default function MyProfileView() {
    const [isLoading, setIsLoading] = useState(false);
    const { setTheme, theme } = useTheme();

    const handleSave = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* HEADER */}
            <div className="mb-8 border-b border-border pb-4">
                <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
                <p className="text-muted-foreground text-sm mt-1">Manage your personal information and application preferences.</p>
            </div>

            {/* AVATAR */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-sm font-bold text-foreground">Profile Picture</h3>
                        <p className="text-xs text-muted-foreground mt-1 max-w-75">
                            This will be displayed on your shared projects and forum posts.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-xl border-2 border-background shadow-sm overflow-hidden">
                            {USER.avatarUrl ? (
                                <img src={USER.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <span>{USER.initials}</span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Button variant="outline" size="sm" className="h-8 text-xs bg-card border-border hover:bg-secondary text-foreground">
                                <Camera size={14} className="mr-2" /> Change
                            </Button>
                            <button className="text-[10px] text-red-500 hover:underline">Remove</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* PERSONAL INFO */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-foreground">Personal Information</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground">Full Name</label>
                        <Input defaultValue={USER.name} className="h-9 bg-background border-input text-foreground" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground">Job Title</label>
                        <Input defaultValue={USER.role} className="h-9 bg-background border-input text-foreground" />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-semibold text-muted-foreground">Email Address</label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input defaultValue={USER.email} disabled className="h-9 pl-9 bg-secondary text-muted-foreground cursor-not-allowed border-transparent" />
                        </div>
                        <p className="text-[10px] text-muted-foreground/80">To change your email, please contact your organization admin.</p>
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-semibold text-muted-foreground">Bio / About</label>
                        <textarea
                            className="w-full min-h-25 text-sm p-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y transition-colors"
                            defaultValue={USER.bio}
                        />
                    </div>
                </div>
            </div>

            {/* PREFERENCES */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
                <h3 className="text-sm font-bold text-foreground">Workbench Preferences</h3>

                <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5 w-full">
                        <label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                            <Globe size={14} /> Language
                        </label>
                        <Select defaultValue="en">
                            <SelectTrigger className="h-9 bg-background border-input text-foreground">
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">English (US)</SelectItem>
                                <SelectItem value="hi">Hindi</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-semibold text-muted-foreground">Appearance</label>
                        <div className="grid grid-cols-3 gap-3">
                            <ThemeOption
                                icon={<Sun size={20} />}
                                label="Light"
                                active={theme === 'light'}
                                onClick={() => setTheme('light')}
                            />
                            <ThemeOption
                                icon={<Moon size={20} />}
                                label="Dark"
                                active={theme === 'dark'}
                                onClick={() => setTheme('dark')}
                            />
                            <ThemeOption
                                icon={<Monitor size={20} />}
                                label="System"
                                active={theme === 'system'}
                                onClick={() => setTheme('system')}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* DANGER ZONE */}
            <div className="border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/10 rounded-xl p-6">
                <h3 className="text-sm font-bold text-red-600 dark:text-red-400 mb-2">Danger Zone</h3>
                <p className="text-xs text-red-600/80 dark:text-red-400/80 mb-4">
                    Permanently delete your account and all associated simulation data. This action cannot be undone.
                </p>
                <Button variant="outline" className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 bg-transparent h-8 text-xs">
                    Delete Account
                </Button>
            </div>

            {/* FOOTER ACTIONS */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border sticky bottom-0 bg-inherit backdrop-blur-sm py-4 -mx-6 px-6 md:mx-0 md:px-0">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-secondary">Cancel</Button>
                <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-30"
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
        </div>
    );
}