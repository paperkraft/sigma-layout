'use client'
import React, { useState } from 'react';
import { Key, Eye, EyeOff, CheckCircle2, AlertCircle, Save } from 'lucide-react';

export default function PaymentGatewaySettings() {
    const [showKey, setShowKey] = useState(false);

    return (
        <div className="p-8 space-y-6 text-foreground">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Payment Integrations</h1>
                <p className="text-muted-foreground text-sm mt-1">Configure API keys for Razorpay to enable online bill collection.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Razorpay Card */}
                <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-border flex justify-between items-center bg-muted/30">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-sm">
                                Razorpay
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground">Razorpay Gateway</h3>
                                <p className="text-xs text-muted-foreground">Supports UPI, Credit Card, Netbanking</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                                <CheckCircle2 className="w-3 h-3 mr-1" /> Active
                            </span>
                            <label className="relative inline-flex items-center cursor-pointer ml-4">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-input peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-muted-foreground">Merchant ID</label>
                                <input
                                    type="text"
                                    value="MID_129384812"
                                    className="w-full px-3 py-2 border border-border rounded-lg bg-secondary/50 text-muted-foreground text-sm cursor-not-allowed"
                                    readOnly
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-muted-foreground">Webhook Secret</label>
                                <input
                                    type="password"
                                    value="whsec_12345"
                                    className="w-full px-3 py-2 border border-border rounded-lg bg-secondary/50 text-muted-foreground text-sm cursor-not-allowed"
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-foreground">API Key ID</label>
                            <div className="relative">
                                <Key className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    defaultValue="rzp_live_839210391203"
                                    className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-foreground">API Key Secret</label>
                            <div className="relative">
                                <Key className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    type={showKey ? "text" : "password"}
                                    defaultValue="839210391203_SECRET_KEY_HERE"
                                    className="w-full pl-10 pr-10 py-2 bg-background border border-input rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                />
                                <button
                                    onClick={() => setShowKey(!showKey)}
                                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="pt-4 flex items-center justify-between border-t border-border">
                            <div className="text-xs text-muted-foreground flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1 text-orange-500" />
                                Last tested: 2 hours ago
                            </div>
                            <div className="flex gap-3">
                                <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary border border-border rounded-lg transition-colors">
                                    Test Connection
                                </button>
                                <button className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg flex items-center shadow-sm transition-colors">
                                    <Save className="h-4 w-4 mr-2" /> Update Credentials
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}