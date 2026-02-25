import { CreditCardIcon, LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { base_url } from '@/config/base_url';
import { useAuth } from '@/features/auth/AuthProvider';

export function UserAction() {
  const router = useRouter();

  const { setUser } = useAuth();

  const RenderUserInfo = () => {
    return (
      <>
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src="https://github.com/shadcn.png" alt="user" />
          <AvatarFallback className="rounded-lg">SV</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold text-foreground">Vishal Sannake</span>
          <span className="truncate text-xs text-muted-foreground">
            vishal.sannake@infraplan.co.in
          </span>
        </div>
      </>
    );
  };

  const handleLogout = async () => {
    try {
      const res = await fetch(`${base_url}/api/User/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.error("Logout failed with status:", res.status);
      }

      // Whether the API failed or succeeded, we clear local state and force a reload
      // to ensure the application resets correctly.
      setUser(null);
      window.location.href = "/auth/sign-in";

    } catch (error) {
      console.error("Logout request failed:", error);
      setUser(null);
      window.location.href = "/auth/sign-in";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer h-8 w-8 rounded-lg border border-border">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="rounded-lg">SV</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className={cn(
          "w-56",
          "text-sm font-medium text-muted-foreground"
        )}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <RenderUserInfo />
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push("/settings/profile")}
            className="cursor-pointer"
          >
            <UserIcon className="mr-2 h-4 w-4" />
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/subscription")}
            className="cursor-pointer"
          >
            <CreditCardIcon className="mr-2 h-4 w-4" />
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <SettingsIcon className="mr-2 h-4 w-4" />
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
            onClick={handleLogout}
          >
            <LogOutIcon className="mr-2 h-4 w-4 text-destructive" />
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}