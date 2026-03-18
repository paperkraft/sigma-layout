'use client';

import { LogOutIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { auth_api } from '@/config';
import { userActions } from '@/config/user-action';
import { useAuth } from '@/context/auth-provider';
import { useApi } from '@/hooks/use-api';
import { cn } from '@/lib/utils';

export function UserAction() {
  const router = useRouter();

  const { setUser, user } = useAuth();
  const { post } = useApi();

  const displayName = user?.firstName ? `${user?.firstName} ${user?.lastName}` : user?.organisationName ?? ""
  const displayImage = user?.firstName?.toLowerCase() === 'vishal' ? "https://github.com/shadcn.png" : ''
  const initials = user && user?.firstName?.charAt(0) + user?.lastName?.charAt(0);

  const RenderUserInfo = () => {
    return (
      <>
        <Avatar className="size-8 rounded-md border">
          <AvatarImage src={displayImage} alt="user" />
          <AvatarFallback className="rounded-md">{initials ?? "UN"}</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold text-foreground">{displayName}</span>
          <span className="truncate text-xs text-muted-foreground">{user?.emailId ?? ""}</span>
        </div>
      </>
    );
  };

  const handleLogout = async () => {
    const { data: result, error } = await post(`${auth_api}/Logout`);

    if (error) {
      console.error("Logout request failed:", error);
    } else if (result && !result.isSuccess) {
      console.error("Logout failed with status:", result?.resMsg);
    }

    // Whether the API failed or succeeded, we clear local state and force a reload
    // to ensure the application resets correctly.
    setUser(null);
    window.location.href = "/auth/sign-in";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer size-8 rounded-md border">
          <AvatarImage src={displayImage} />
          <AvatarFallback className="rounded-md">{initials ?? "UN"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className={cn("w-56 text-sm font-medium text-muted-foreground")}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <RenderUserInfo />
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {userActions.map((menu) => (
            <DropdownMenuItem
              key={menu.title}
              className='cursor-pointer'
              asChild
            >
              <Link href={menu.url ? menu.url : '#'}>
                <menu.icon className='mr-2 size-4' />
                {menu.title}
                <DropdownMenuShortcut>{menu.shortcut}</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          ))}
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