'use client'
import React from 'react';
import { Save, RefreshCw, Info } from 'lucide-react';

const InputCell = ({ value }: any) => (
    <div className="relative">
        <span className="absolute left-3 top-2 text-muted-foreground text-xs">₹</span>
        <input
            type="text"
            defaultValue={value}
            className="w-full pl-6 pr-2 py-1.5 text-sm bg-background border border-input rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-right font-medium text-foreground"
        />
    </div>
);

export default function TariffConfiguration() {
    return (
        <div className="p-8 space-y-6 text-foreground">

            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Tariff & Pricing</h1>
                    <p className="text-muted-foreground text-sm mt-1">Configure rates, security deposits, and operational charges based on connection size.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-muted-foreground bg-card border border-border rounded-lg hover:bg-accent hover:text-foreground transition-colors">
                        Discard
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 flex items-center shadow-sm transition-colors">
                        <Save className="h-4 w-4 mr-2" /> Save Changes
                    </button>
                </div>
            </div>

            {/* Context Selectors */}
            <div className="bg-card p-5 rounded-xl border border-border shadow-sm flex flex-wrap gap-6 items-end">
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Billing Method</label>
                    <select className="w-48 px-3 py-2 bg-background border border-input rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-foreground">
                        <option>Flat Rate</option>
                        <option>Metered</option>
                    </select>
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Connection Type</label>
                    <select className="w-48 px-3 py-2 bg-background border border-input rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-foreground">
                        <option>Domestic</option>
                        <option>Commercial</option>
                        <option>Industrial</option>
                    </select>
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Cycle</label>
                    <select className="w-48 px-3 py-2 bg-background border border-input rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-foreground">
                        <option>Monthly</option>
                        <option>Yearly</option>
                    </select>
                </div>
                <div className="ml-auto text-xs text-muted-foreground flex items-center">
                    <Info className="h-4 w-4 mr-1" /> All values are in INR (₹)
                </div>
            </div>

            {/* Pricing Matrix */}
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                            <tr>
                                <th className="px-6 py-4 min-w-30 bg-muted/50 sticky left-0 z-10 border-r border-border">Connection Size</th>

                                {/* Group: Recurring Charges */}
                                <th className="px-4 py-4 w-32">Base Tariff</th>
                                <th className="px-4 py-4 w-32">Meter Rent</th>
                                <th className="px-4 py-4 w-32">Service Chg.</th>

                                {/* Group: One-time Charges */}
                                <th className="px-4 py-4 w-32 border-l border-border bg-accent/20">Installation</th>
                                <th className="px-4 py-4 w-32 bg-accent/20">Deposit</th>

                                {/* Group: Penalties */}
                                <th className="px-4 py-4 w-32 border-l border-border">Fine (Late)</th>
                                <th className="px-4 py-4 w-32">Re-Connect</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {['0.5 Inch', '0.75 Inch', '1.0 Inch', '1.5 Inch', '2.0 Inch'].map((size, index) => (
                                <tr key={index} className="hover:bg-accent/30 group transition-colors">
                                    <td className="px-6 py-3 font-medium text-foreground bg-card sticky left-0 border-r border-border group-hover:bg-accent/30 transition-colors">
                                        {size}
                                    </td>

                                    {/* Recurring Inputs */}
                                    <td className="px-4 py-3"><InputCell value={(index + 1) * 150} /></td>
                                    <td className="px-4 py-3"><InputCell value="25" /></td>
                                    <td className="px-4 py-3"><InputCell value="10" /></td>

                                    {/* One-time Inputs */}
                                    <td className="px-4 py-3 border-l border-border bg-accent/10"><InputCell value="1500" /></td>
                                    <td className="px-4 py-3 bg-accent/10"><InputCell value="500" /></td>

                                    {/* Penalty Inputs */}
                                    <td className="px-4 py-3 border-l border-border"><InputCell value="50" /></td>
                                    <td className="px-4 py-3"><InputCell value="200" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}