'use client'
import { Bell, Mail, MessageSquare } from 'lucide-react';
import React, { useState } from 'react';

// --- Reusable Toggle Component ---
const ToggleRow = ({ title, desc, checked, onChange }: any) => (
    <div className="flex items-center justify-between py-4">
        <div>
            <h4 className="text-sm font-medium text-foreground">{title}</h4>
            <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
        <button
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${checked ? 'bg-primary' : 'bg-input'
                }`}
        >
            <span className={`inline-block h-3 w-3 transform rounded-full bg-background transition-transform ${checked ? 'translate-x-5' : 'translate-x-1'
                }`} />
        </button>
    </div>
);

export default function NotificationSettings() {
    const [prefs, setPrefs] = useState({
        billGen: true,
        payment: true,
        marketing: false,
        sms: true,
        email: true
    });

    const toggle = (key: string) => setPrefs((p: any) => ({ ...p, [key]: !p[key] }));

    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* Header */}
            <div>
                <h2 className="text-lg font-bold text-foreground">Notifications</h2>
                <p className="text-sm text-muted-foreground">Choose what you want to be notified about.</p>
            </div>

            {/* Activity Notifications */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-foreground border-b border-border pb-2 mb-2 flex items-center gap-2">
                    <Bell className="h-4 w-4 text-primary" /> Activity Alerts
                </h3>
                <div className="divide-y divide-border/50">
                    <ToggleRow
                        title="Bill Generation"
                        desc="Notify me when monthly bills are successfully generated."
                        checked={prefs.billGen}
                        onChange={() => toggle('billGen')}
                    />
                    <ToggleRow
                        title="Payment Received"
                        desc="Notify me when a customer makes an online payment."
                        checked={prefs.payment}
                        onChange={() => toggle('payment')}
                    />
                    <ToggleRow
                        title="Marketing & Updates"
                        desc="Receive news about new features and promotions."
                        checked={prefs.marketing}
                        onChange={() => toggle('marketing')}
                    />
                </div>
            </div>

            {/* Channel Preferences */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-foreground border-b border-border pb-2 mb-2 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" /> Channels
                </h3>
                <div className="divide-y divide-border/50">
                    <ToggleRow
                        title="Email Notifications"
                        desc="Send digests and alerts to vishal.sannake@infraplan.co.in"
                        checked={prefs.email}
                        onChange={() => toggle('email')}
                    />
                    <ToggleRow
                        title="SMS Notifications"
                        desc="Send critical alerts to +91 98*** **321"
                        checked={prefs.sms}
                        onChange={() => toggle('sms')}
                    />
                </div>
            </div>
        </div>
    );
}