import { Metadata } from 'next';

import { Placeholder } from '@/components/shared/Placeholder';

export const metadata: Metadata = {
  title: {
    default: "Collaboration",
    template: "%s | Sigma Toolbox",
  },
  description: "Manage collaboration requests",
};

export default function Page() {
  return (<Placeholder title={"Collaboration Center"} description={"Manage project access and review pending invitations."} />);
}
