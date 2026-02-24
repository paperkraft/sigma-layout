import { Metadata } from 'next';

import { Placeholder } from '@/components/shared/Placeholder';

export const metadata: Metadata = {
   title: "Shared Project",
   description: "Shared Project",
};

export default function Page() {
   return (<Placeholder title={"Shared Projects"} description={"Manage your shared project with team."} />);
}
