export const INCOMING_INVITES = [
    {
        id: "inv-1",
        inviter: { name: "Ganesh Patil", avatar: null, email: "ganesh.patil@infraplan.co.in" },
        project: { name: "HQ Simulation Optimization", type: "CFD Analysis" },
        role: "Editor",
        sentAt: "2 hours ago",
        message: "Hey! Need your help checking the boundary layer setup on this one."
    },
    {
        id: "inv-2",
        inviter: { name: "Prathamesh Patil", avatar: null, email: "prathamesh.patil@infraplan.co.in" },
        project: { name: "District Water Billing", type: "Thermal Analysis" },
        role: "Viewer",
        sentAt: "Yesterday",
        message: null
    }
];

export const SENT_INVITES = [
    {
        id: "s-1",
        email: "prathamesh.patil@infraplan.co.in",
        project: "Pump Station Network",
        role: "Editor",
        status: "pending", // pending, accepted, expired
        sentAt: "3 days ago"
    },
    {
        id: "s-2",
        email: "kirti.patil@infraplan.co.in",
        project: "City Water Billing",
        role: "Viewer",
        status: "expired",
        sentAt: "2 weeks ago"
    }
];

export const PROJECTS = [
    "Pump Station Network",
    "Urban Water Distribution",
];