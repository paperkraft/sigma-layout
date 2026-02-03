import React from 'react';
import { Save, RefreshCw, Info } from 'lucide-react';

const InputCell = ({ value }: any) => (
    <div className="relative">
        <span className="absolute left-3 top-2 text-slate-400 text-xs">₹</span>
        <input
            type="text"
            defaultValue={value}
            className="w-full pl-6 pr-2 py-1.5 text-sm border border-slate-200 rounded focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all text-right font-medium text-slate-700"
        />
    </div>
);

export default function TariffConfiguration() {
    return (
        <div className="p-8 space-y-6">

            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Tariff & Pricing</h1>
                    <p className="text-slate-500 text-sm mt-1">Configure rates, security deposits, and operational charges based on connection size.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border rounded-lg hover:bg-slate-50">
                        Discard
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 flex items-center shadow-sm">
                        <Save className="h-4 w-4 mr-2" /> Save Changes
                    </button>
                </div>
            </div>

            {/* Context Selectors */}
            <div className="bg-white p-5 rounded-xl border shadow-sm flex flex-wrap gap-6 items-end">
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Billing Method</label>
                    <select className="w-48 px-3 py-2 bg-slate-50 border rounded-lg text-sm font-medium focus:ring-2 focus:ring-violet-500/20 outline-none">
                        <option>Flat Rate</option>
                        <option>Metered</option>
                    </select>
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Connection Type</label>
                    <select className="w-48 px-3 py-2 bg-slate-50 border rounded-lg text-sm font-medium focus:ring-2 focus:ring-violet-500/20 outline-none">
                        <option>Domestic</option>
                        <option>Commercial</option>
                        <option>Industrial</option>
                    </select>
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Cycle</label>
                    <select className="w-48 px-3 py-2 bg-slate-50 border rounded-lg text-sm font-medium focus:ring-2 focus:ring-violet-500/20 outline-none">
                        <option>Monthly</option>
                        <option>Yearly</option>
                    </select>
                </div>
                <div className="ml-auto text-xs text-slate-400 flex items-center">
                    <Info className="h-4 w-4 mr-1" /> All values are in INR (₹)
                </div>
            </div>

            {/* Pricing Matrix */}
            <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 border-b text-slate-500 font-semibold">
                            <tr>
                                <th className="px-6 py-4 min-w-30 bg-slate-50 sticky left-0 z-10 border-r">Connection Size</th>

                                {/* Group: Recurring Charges */}
                                <th className="px-4 py-4 w-32">Base Tariff</th>
                                <th className="px-4 py-4 w-32">Meter Rent</th>
                                <th className="px-4 py-4 w-32">Service Chg.</th>

                                {/* Group: One-time Charges */}
                                <th className="px-4 py-4 w-32 border-l bg-slate-50/50">Installation</th>
                                <th className="px-4 py-4 w-32 bg-slate-50/50">Deposit</th>

                                {/* Group: Penalties */}
                                <th className="px-4 py-4 w-32 border-l">Fine (Late)</th>
                                <th className="px-4 py-4 w-32">Re-Connect</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {['0.5 Inch', '0.75 Inch', '1.0 Inch', '1.5 Inch', '2.0 Inch'].map((size, index) => (
                                <tr key={index} className="hover:bg-slate-50/30 group">
                                    <td className="px-6 py-3 font-medium text-slate-700 bg-white sticky left-0 border-r group-hover:bg-slate-50/30">
                                        {size}
                                    </td>

                                    {/* Recurring Inputs */}
                                    <td className="px-4 py-3"><InputCell value={(index + 1) * 150} /></td>
                                    <td className="px-4 py-3"><InputCell value="25" /></td>
                                    <td className="px-4 py-3"><InputCell value="10" /></td>

                                    {/* One-time Inputs */}
                                    <td className="px-4 py-3 border-l bg-slate-50/20"><InputCell value="1500" /></td>
                                    <td className="px-4 py-3 bg-slate-50/20"><InputCell value="500" /></td>

                                    {/* Penalty Inputs */}
                                    <td className="px-4 py-3 border-l"><InputCell value="50" /></td>
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