'use client'
import { Shield, Key, Smartphone, LogOut, Laptop, Phone } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SecuritySettings() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* Header */}
            <div>
                <h2 className="text-lg font-bold text-foreground">Security & Login</h2>
                <p className="text-sm text-muted-foreground">Manage your password and security preferences.</p>
            </div>

            {/* Password Section */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Key className="h-4 w-4 text-primary" /> Change Password
                </h3>
                <div className="grid gap-4 max-w-md">
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">Current Password</label>
                        <Input type="password" placeholder="••••••••" className="bg-background" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">New Password</label>
                        <Input type="password" placeholder="••••••••" className="bg-background" />
                    </div>
                    <div className="pt-2">
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Update Password</Button>
                    </div>
                </div>
            </div>

            {/* 2FA Section */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-primary" /> Two-Factor Authentication
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 max-w-sm">
                        Add an extra layer of security to your account by requiring a code from your authenticator app.
                    </p>
                </div>
                <Button variant="outline" className="border-border text-foreground hover:bg-secondary">Enable 2FA</Button>
            </div>

            {/* Active Sessions */}
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-border bg-muted/30">
                    <h3 className="text-sm font-semibold text-foreground">Active Sessions</h3>
                </div>
                <div className="divide-y divide-border">
                    {[
                        { device: "MacBook Pro", loc: "Kolhapur, IN", active: true, icon: Laptop },
                        { device: "iPhone 14", loc: "Pune, IN", active: false, icon: Phone },
                    ].map((session, i) => (
                        <div key={i} className="px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-secondary rounded-full text-muted-foreground">
                                    <session.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground flex items-center gap-2">
                                        {session.device}
                                        {session.active && <span className="text-[10px] bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 px-1.5 py-0.5 rounded-full">Current</span>}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{session.loc} • {session.active ? 'Active now' : '2 days ago'}</p>
                                </div>
                            </div>
                            {!session.active && (
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                                    <LogOut className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}