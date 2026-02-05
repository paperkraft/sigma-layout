'use client'
import { CreditCard, CheckCircle2, Download, Zap } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';

export default function BillingSettings() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* Header */}
            <div>
                <h2 className="text-lg font-bold text-foreground">Plan & Billing</h2>
                <p className="text-sm text-muted-foreground">Manage your subscription plan and view billing history.</p>
            </div>

            {/* Current Plan Card */}
            <div className="bg-linear-to-r from-violet-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10 flex justify-between items-start">
                    <div>
                        <span className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">PRO PLAN</span>
                        <h3 className="text-2xl font-bold mt-2">₹2,499<span className="text-sm font-normal text-white/80">/month</span></h3>
                        <p className="text-xs text-white/70 mt-1">Next billing on Feb 28, 2026</p>
                    </div>
                    <Button variant="secondary" className="bg-white text-violet-700 hover:bg-white/90 border-none">Manage Subscription</Button>
                </div>
                {/* Decorative Circle */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            </div>

            {/* Usage Stats */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Connections</span>
                        <span className="font-bold text-foreground">1,240 / 2,000</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[62%]"></div>
                    </div>
                </div>
                <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">SMS Credits</span>
                        <span className="font-bold text-foreground">450 / 1,000</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[45%]"></div>
                    </div>
                </div>
            </div>

            {/* Billing History */}
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-border bg-muted/30">
                    <h3 className="text-sm font-semibold text-foreground">Invoice History</h3>
                </div>
                <div className="divide-y divide-border">
                    {[
                        { date: "Jan 01, 2026", amount: "₹2,499.00", status: "Paid", inv: "INV-001" },
                        { date: "Dec 01, 2025", amount: "₹2,499.00", status: "Paid", inv: "INV-002" },
                    ].map((inv, i) => (
                        <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-secondary rounded text-muted-foreground">
                                    <CreditCard className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">{inv.date}</p>
                                    <p className="text-xs text-muted-foreground">{inv.inv} • Pro Plan</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-foreground">{inv.amount}</span>
                                <span className="text-xs bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <CheckCircle2 className="h-3 w-3" /> Paid
                                </span>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}