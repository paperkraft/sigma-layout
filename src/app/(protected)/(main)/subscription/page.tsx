import { Metadata } from 'next';

import { Placeholder } from '@/components/shared/Placeholder';

export const metadata: Metadata = {
  title: {
    default: "Subscription",
    template: "%s | Sigma Toolbox",
  },
  description: "Subscription",
};

export default function Page() {
  return (<Placeholder title={"Billing & Usage"} description={"Manage your subscription, payment methods, and resource limits."} />);
}

