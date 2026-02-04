'use client'
import {
    AlertTriangle, CheckCircle2, DollarSign, Mail, RotateCcw, Save, Shield, Wallet, Zap
} from 'lucide-react';
import React, { useState } from 'react';

// --- Components ---

const Switch = ({ checked, onChange }: any) => (
    <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card ${checked ? 'bg-primary' : 'bg-input'}`}
    >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
);

const Input = ({ label, prefix, suffix, value, disabled, placeholder }: any) => (
    <div className={`flex flex-col ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
        {label && <span className="text-xs font-semibold text-muted-foreground mb-1.5">{label}</span>}
        <div className="relative">
            {prefix && <span className="absolute left-3 top-2 text-muted-foreground text-sm">{prefix}</span>}
            <input
                type="text"
                defaultValue={value}
                disabled={disabled}
                placeholder={placeholder}
                className={`w-full bg-background border border-input rounded-lg py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${prefix ? 'pl-7' : 'pl-3'} ${suffix ? 'pr-8' : 'pr-3'}`}
            />
            {suffix && <span className="absolute right-3 top-2 text-muted-foreground text-sm">{suffix}</span>}
        </div>
    </div>
);

const Select = ({ value, options, disabled }: any) => (
    <div className={`relative ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
        <select
            defaultValue={value}
            disabled={disabled}
            className="w-full appearance-none bg-background border border-input text-foreground text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        >
            {options.map((opt: any) => <option key={opt}>{opt}</option>)}
        </select>
        <div className="absolute right-3 top-2.5 pointer-events-none text-muted-foreground">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
    </div>
);

const SettingRow = ({ title, description, icon: Icon, enabled, onToggle, children }: any) => (
    <div className="p-5 flex flex-col md:flex-row gap-6 border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
        {/* Label Section */}
        <div className="flex-1 flex gap-4">
            <div className={`p-2 rounded-lg h-fit ${enabled ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <div className="flex items-center gap-3">
                    <h4 className={`text-sm font-medium ${enabled ? 'text-foreground' : 'text-muted-foreground'}`}>{title}</h4>
                    <Switch checked={enabled} onChange={onToggle} />
                </div>
                <p className="text-xs text-muted-foreground mt-1 max-w-md leading-relaxed">{description}</p>
            </div>
        </div>

        {/* Input Section */}
        <div className={`md:w-1/3 flex gap-3 items-end transition-opacity duration-200 ${enabled ? 'opacity-100' : 'opacity-30 blur-[1px] pointer-events-none select-none'}`}>
            {children}
        </div>
    </div>
);

export default function GeneralSettings() {
    const [hasChanges, setHasChanges] = useState(false);

    // --- State for Toggles ---
    const [settings, setSettings] = useState<any>({
        autoEmail: true,
        installation: true,
        securityDeposit: true,
        minBill: true,
        serviceCharge: true,
        meterRent: false,
        meterFault: true,
        fine: true,
        disconnect: true,
        reconnect: true,
        rebate: true
    });

    const toggle = (key: any) => {
        setSettings((prev: any) => ({ ...prev, [key]: !prev[key] }));
        setHasChanges(true);
    };

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500 pb-24 text-foreground">

            {/* 1. Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">General Settings</h1>
                <p className="text-muted-foreground text-sm mt-1">Configure global billing rules, surcharges, and notification preferences.</p>
            </div>

            {/* 2. Notifications Section */}
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-3 bg-muted/30 border-b border-border flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold text-foreground text-sm">System Notifications</h3>
                </div>
                <SettingRow
                    title="Automatic Email Notifications"
                    description="Automatically send invoices and payment receipts to registered email addresses upon generation."
                    icon={Mail}
                    enabled={settings.autoEmail}
                    onToggle={() => toggle('autoEmail')}
                >
                    <div className="w-full">
                        <span className="text-xs font-semibold text-muted-foreground block mb-1.5">Email Template</span>
                        <Select options={["Default Invoice Template", "Modern Receipt"]} />
                    </div>
                </SettingRow>
            </div>

            {/* 3. Onboarding & One-time Charges */}
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-3 bg-muted/30 border-b border-border flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold text-foreground text-sm">Onboarding & One-time Charges</h3>
                </div>

                <SettingRow
                    title="Connection Installation Charges"
                    description="One-time fee applied to new connection requests."
                    icon={Zap}
                    enabled={settings.installation}
                    onToggle={() => toggle('installation')}
                >
                    <div className="w-1/2">
                        <span className="text-xs font-semibold text-muted-foreground block mb-1.5">Type</span>
                        <Select options={["Fixed Amount"]} />
                    </div>
                    <div className="w-1/2">
                        <Input label="Value" prefix="₹" value="1,500" />
                    </div>
                </SettingRow>

                <SettingRow
                    title="Security Deposit"
                    description="Refundable deposit collected at the time of connection."
                    icon={Shield}
                    enabled={settings.securityDeposit}
                    onToggle={() => toggle('securityDeposit')}
                >
                    <div className="w-1/2">
                        <span className="text-xs font-semibold text-muted-foreground block mb-1.5">Type</span>
                        <Select options={["Fixed Amount"]} />
                    </div>
                    <div className="w-1/2">
                        <Input label="Value" prefix="₹" value="500" />
                    </div>
                </SettingRow>
            </div>

            {/* 4. Recurring & Operational */}
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-3 bg-muted/30 border-b border-border flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold text-foreground text-sm">Recurring Charges & Rules</h3>
                </div>

                <SettingRow
                    title="Minimum Bill Charges"
                    description="The minimum amount a user must pay if consumption is zero or below threshold."
                    icon={DollarSign}
                    enabled={settings.minBill}
                    onToggle={() => toggle('minBill')}
                >
                    <div className="w-full">
                        <Input label="Minimum Amount" prefix="₹" value="150" />
                    </div>
                </SettingRow>

                <SettingRow
                    title="Service Charges"
                    description="Additional operational fee added to every bill cycle."
                    icon={CheckCircle2}
                    enabled={settings.serviceCharge}
                    onToggle={() => toggle('serviceCharge')}
                >
                    <div className="w-1/2">
                        <span className="text-xs font-semibold text-muted-foreground block mb-1.5">Type</span>
                        <Select options={["Fixed Amount", "Percentage"]} />
                    </div>
                    <div className="w-1/2">
                        <Input label="Value" prefix="₹" value="50" />
                    </div>
                </SettingRow>

                <SettingRow
                    title="Meter Rent"
                    description="Monthly rental fee for utility-owned meters."
                    icon={Zap}
                    enabled={settings.meterRent}
                    onToggle={() => toggle('meterRent')}
                >
                    <div className="w-full">
                        <Input label="Monthly Rent" prefix="₹" value="25" />
                    </div>
                </SettingRow>

                <SettingRow
                    title="Meter Out of Order Logic"
                    description="If meter is faulty, generate bill based on average previous consumption."
                    icon={AlertTriangle}
                    enabled={settings.meterFault}
                    onToggle={() => toggle('meterFault')}
                >
                    <div className="w-full">
                        <span className="text-xs font-semibold text-muted-foreground block mb-1.5">Calculation Basis</span>
                        <Select options={["Last 3 Months Average", "Last 6 Months Average", "Flat Minimum Rate"]} />
                    </div>
                </SettingRow>
            </div>

            {/* 5. Penalties & Incentives */}
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-3 bg-muted/30 border-b border-border flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold text-foreground text-sm">Penalties & Incentives</h3>
                </div>

                <SettingRow
                    title="Late Payment Fine"
                    description="Penalty applied if bill is not paid by due date."
                    icon={AlertTriangle}
                    enabled={settings.fine}
                    onToggle={() => toggle('fine')}
                >
                    <div className="w-1/2">
                        <span className="text-xs font-semibold text-muted-foreground block mb-1.5">Type</span>
                        <Select options={["Fixed Amount", "Percentage"]} />
                    </div>
                    <div className="w-1/2">
                        <Input label="Value" prefix="₹" value="100" />
                    </div>
                </SettingRow>

                <SettingRow
                    title="Disconnection Charges"
                    description="Fee for processing a disconnection request."
                    icon={Zap}
                    enabled={settings.disconnect}
                    onToggle={() => toggle('disconnect')}
                >
                    <div className="w-full">
                        <Input label="Charge" prefix="₹" value="200" />
                    </div>
                </SettingRow>

                <SettingRow
                    title="Reconnection Charges"
                    description="Fee for restoring a previously disconnected service."
                    icon={RotateCcw}
                    enabled={settings.reconnect}
                    onToggle={() => toggle('reconnect')}
                >
                    <div className="w-full">
                        <Input label="Charge" prefix="₹" value="500" />
                    </div>
                </SettingRow>

                <SettingRow
                    title="Early Payment Rebate"
                    description="Discount given if bill is paid before the due date."
                    icon={DollarSign}
                    enabled={settings.rebate}
                    onToggle={() => toggle('rebate')}
                >
                    <div className="w-1/2">
                        <span className="text-xs font-semibold text-muted-foreground block mb-1.5">Type</span>
                        <Select options={["Percentage"]} />
                    </div>
                    <div className="w-1/2">
                        <Input label="Value" suffix="%" value="2" />
                    </div>
                </SettingRow>
            </div>

            {/* Floating Save Action Bar */}
            <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-foreground text-background dark:bg-zinc-100 dark:text-zinc-900 px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 transition-all duration-300 z-50 ${hasChanges ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                <span className="text-sm font-medium">You have unsaved changes</span>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setHasChanges(false)}
                        className="px-3 py-1 text-sm text-muted/80 hover:text-background dark:hover:text-zinc-900 transition-colors"
                    >
                        Reset
                    </button>
                    <button className="px-4 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full text-sm font-bold shadow-sm transition-colors flex items-center">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                    </button>
                </div>
            </div>

        </div>
    );
}