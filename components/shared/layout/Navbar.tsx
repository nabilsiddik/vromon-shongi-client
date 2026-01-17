import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import LogoutUserButton from "@/components/LogoutUserButton";
import Logo from "@/components/logo";
import getLogedInUser from "@/services/user/userManagement";
import Button from "../buttons/Button";

export default async function Navbar() {
  const user = await getLogedInUser();

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/explore-travelers", label: "Explore Travelers" },
    { href: "/travel-plans", label: "Find Buddy" },
    { href: "/subscription", label: "Subscriptions" },
  ];

  return (
    <header className="border-b fixed z-100 w-full left-0 top-0 block bg-white">
      <div className="container mx-auto px-5 flex py-3 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              {/* <Button
                className="group size-12 lg:hidden"
                size="icon"
                variant="ghost"
              >
                <svg
                  className="pointer-events-none"
                  fill="none"
                  height={50}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width={50}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="-translate-y-[7px] origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    d="M4 12L20 12"
                  />
                  <path
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    d="M4 12H20"
                  />
                  <path
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    d="M4 12H20"
                  />
                </svg>
              </Button> */}
            </PopoverTrigger>
            <PopoverContent align="start" className="w-64 p-3">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink
                        className="py-1.5 text-md"
                        href={link?.href}
                      >
                        {link?.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Logo />
            {/* Navigation menu */}
            <NavigationMenu className="max-lg:hidden" viewport={false}>
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      className="py-1.5 font-medium text-muted-foreground hover:text-primary text-md"
                      href={link?.href}
                    >
                      {link?.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          {user?.email ? (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="cursor-pointer border border-black">
                    <AvatarImage src={user?.profileImage} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex flex-col gap-1 items-start">
                    <h3 className="font-bold text-lg">Hi, {`${user?.firstName} ${user?.lastName}`}</h3>
                    <p className="text-lg">{user?.email}</p>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {user?.email && user?.role === "ADMIN" && (
                    <>
                      <Link
                        href={"/admin/dashboard/profile"}
                        className="cursor-pointer"
                      >
                        <DropdownMenuItem className="cursor-pointer text-lg">
                          Profile
                        </DropdownMenuItem>
                      </Link>

                      <Link href={"/admin/dashboard"} className="cursor-pointer">
                        <DropdownMenuItem className="cursor-pointer text-lg">
                          Admin Dashboard
                        </DropdownMenuItem>
                      </Link>
                    </>
                  )}

                  {user?.email && user?.role === "USER" && (
                    <>
                      <Link
                        href={"/user/dashboard/profile"}
                        className="cursor-pointer"
                      >
                        <DropdownMenuItem className="cursor-pointer text-lg">
                          Profile
                        </DropdownMenuItem>
                      </Link>

                      <Link href={"/user/dashboard"} className="cursor-pointer">
                        <DropdownMenuItem className="cursor-pointer text-lg">
                          User Dashboard
                        </DropdownMenuItem>
                      </Link>

                      <Link
                        href={"/user/dashboard/my-travel-plans"}
                        className="cursor-pointer"
                      >
                        <DropdownMenuItem className="cursor-pointer text-lg">
                          My Plans
                        </DropdownMenuItem>
                      </Link>
                    </>
                  )}
                  <Link href={"/subscription"} className="cursor-pointer">
                    <DropdownMenuItem className="cursor-pointer text-lg">
                      Subscriptions
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <LogoutUserButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link href={"/login"}>
              {/* <Button link="/login">Login</Button> */}
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
