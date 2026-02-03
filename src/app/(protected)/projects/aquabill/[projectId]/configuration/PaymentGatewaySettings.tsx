import React, { useState } from 'react';
import { Key, Eye, EyeOff, CheckCircle2, AlertCircle, Save } from 'lucide-react';

export default function PaymentGatewaySettings() {
    const [showKey, setShowKey] = useState(false);

    return (
        <div className="p-8 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Payment Integrations</h1>
                <p className="text-slate-500 text-sm mt-1">Configure API keys for Razorpay to enable online bill collection.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Razorpay Card */}
                <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                                Razorpay
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">Razorpay Gateway</h3>
                                <p className="text-xs text-slate-500">Supports UPI, Credit Card, Netbanking</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
                                <CheckCircle2 className="w-3 h-3 mr-1" /> Active
                            </span>
                            <label className="relative inline-flex items-center cursor-pointer ml-4">
                                <input type="checkbox" className="sr-only peer" checked />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                            </label>
                        </div>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Merchant ID</label>
                                <input type="text" value="MID_129384812" className="w-full px-3 py-2 border rounded-lg bg-slate-50 text-slate-600 text-sm" readOnly />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Webhook Secret</label>
                                <input type="password" value="whsec_12345" className="w-full px-3 py-2 border rounded-lg bg-slate-50 text-slate-600 text-sm" readOnly />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">API Key ID</label>
                            <div className="relative">
                                <Key className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <input
                                    type="text"
                                    defaultValue="rzp_live_839210391203"
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">API Key Secret</label>
                            <div className="relative">
                                <Key className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <input
                                    type={showKey ? "text" : "password"}
                                    defaultValue="839210391203_SECRET_KEY_HERE"
                                    className="w-full pl-10 pr-10 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
                                />
                                <button
                                    onClick={() => setShowKey(!showKey)}
                                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                                >
                                    {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="pt-4 flex items-center justify-between border-t">
                            <div className="text-xs text-slate-500 flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1 text-orange-500" />
                                Last tested: 2 hours ago
                            </div>
                            <div className="flex gap-3">
                                <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 border rounded-lg">Test Connection</button>
                                <button className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center">
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