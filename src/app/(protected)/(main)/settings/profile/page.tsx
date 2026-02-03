import { Metadata } from 'next';

import ProfileSettings from '@/features/settings/profile/ProfileSettings';

export const metadata: Metadata = {
   title: {
      default: "Settings",
      template: "%s | Sigma Toolbox",
   },
   description: "Settings",
};

export default function Page() {
   return (<ProfileSettings />);
}