import { Metadata } from 'next';

import Dashboard from './Dashboard';

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Aquabill Dashboard",
};

export default function Page() {
    return <Dashboard />
}