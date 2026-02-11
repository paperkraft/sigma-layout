'use client'
import { Building2, Plus, Mail, MoreHorizontal, UserPlus } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function OrganizationSettings() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-foreground">Organization</h2>
                    <p className="text-sm text-muted-foreground">Manage your company details and team members.</p>
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <UserPlus className="h-4 w-4 mr-2" /> Invite Member
                </Button>
            </div>

            {/* Company Info */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="flex gap-6">
                    <div className="h-20 w-20 bg-secondary rounded-lg border border-border flex items-center justify-center shrink-0">
                        <Building2 className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-4 flex-1">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-muted-foreground">Company Name</label>
                                <Input defaultValue="AquaBill Utilities" className="bg-background" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-muted-foreground">Company ID</label>
                                <Input defaultValue="ORG_882910" disabled className="bg-muted/50 cursor-not-allowed" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button variant="outline" size="sm">Save Changes</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Members */}
            <div className="border border-border rounded-xl bg-card overflow-hidden shadow-sm">
                <div className="px-6 py-3 border-b border-border bg-muted/30 flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-foreground">Team Members (3)</h3>
                </div>
                <div className="divide-y divide-border">
                    {[
                        { name: "Nilesh Patil", email: "nilesh@aquabill.com", role: "Owner" },
                        { name: "Mayur Patil", email: "mayur@aquabill.com", role: "Admin" },
                        { name: "Amit Sharma", email: "amit.s@aquabill.com", role: "Viewer" },
                    ].map((member, i) => (
                        <div key={i} className="px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                                    {member.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">{member.name}</p>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Mail className="h-3 w-3" /> {member.email}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-medium bg-secondary text-foreground px-2 py-1 rounded border border-border">
                                    {member.role}
                                </span>
                                <button className="text-muted-foreground hover:text-foreground">
                                    <MoreHorizontal className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}