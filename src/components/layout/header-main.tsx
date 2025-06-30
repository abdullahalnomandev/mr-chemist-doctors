"use client";

import type React from "react";

import mrChemistLogo from "@/components/assets/images/mr-chemist-logo.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { CircleChevronRight, LogIn, LogOut, Menu, Search, ShoppingCart, User, UserPlus, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { SheetTitle } from "@/components/ui/sheet";
import useDebounce from "@/hooks/use-debounce";
import { getFeaturedProducts, getProducts } from "@/lib/api/api-server";
import { useCartStore } from "@/lib/store/cart-store";
import { TProduct } from "@/lib/types";
import HeaderMenuSketion from "@/skeletons/header-menu";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const navigationLinks = [
  { title: "Health advice", href: "/blogs" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
  { title: "FAQ", href: "/faq" },
];

export function MainHeader() {
  const { items: cardItems } = useCartStore();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const { data: featuredProducts = [], isLoading } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: getFeaturedProducts,
  });

  const { data: searchResults, isLoading: isSearchLoading } = useQuery({
    queryKey: ["products-search", debouncedSearchQuery],
    queryFn: () => getProducts({ searchTerm: debouncedSearchQuery }),
    enabled: debouncedSearchQuery.length > 2,
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?searchTerm=${searchQuery.trim()}`);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const treatmentGroups = featuredProducts.reduce((groups: Record<string, any[]>, product) => {
    const treatmentName = (product as any)?.treatment.name;
    if (!groups[treatmentName]) {
      groups[treatmentName] = [];
    }
    groups[treatmentName].push(product);
    return groups;
  }, {});

  const renderSearchResults = () => (
    <div className="absolute top-full right-0 left-0 z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
      {isSearchLoading ? (
        <ul className="space-y-2 p-4">
          {[...Array(3)].map((_, i) => (
            <li key={i} className="flex animate-pulse items-center space-x-4">
              <div className="h-10 w-10 rounded bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-3/4 rounded bg-gray-200" />
                <div className="h-3 w-1/2 rounded bg-gray-100" />
              </div>
            </li>
          ))}
        </ul>
      ) : (searchResults ?? []).length > 0 ? (
        <ul className="max-h-80 divide-y divide-gray-100 overflow-y-auto">
          {(searchResults ?? []).map((product: TProduct) => (
            <li key={product._id}>
              <Link href={`/products/${product.slug}`} onClick={() => setSearchQuery("")}>
                <div className="flex cursor-pointer items-center gap-4 px-4 py-3 transition-colors hover:bg-gray-50">
                  <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded border bg-gray-100">
                    <Image
                      src={product?.imageUrls?.[0] || "/placeholder.png"}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">{product.name}</span>
                    {product.treatment?.name && <span className="text-xs text-gray-500">{product.treatment.name}</span>}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center p-4 text-center text-sm text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mb-1 h-6 w-6 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          No products found.
        </div>
      )}
    </div>
  );

  return (
    <header className="bg-primary text-primary-foreground w-full px-4 sm:px-16">
      <div className="container mx-auto max-w-6xl py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button - Left */}
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/90 text-white">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-[400px] p-0">
                {activeCategory ? (
                  <MobileSubmenu
                    category={activeCategory}
                    onBack={() => setActiveCategory(null)}
                    onClose={() => setIsSheetOpen(false)}
                  />
                ) : (
                  <MobileMenu onSelectCategory={setActiveCategory} onClose={() => setIsSheetOpen(false)} />
                )}
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo - Centered on Mobile */}
          <Link
            href="/"
            className={cn(
              "hidden items-center space-x-2 sm:flex",
              "md:order-first",
              "absolute left-1/2 -translate-x-1/2 md:relative md:left-0 md:translate-x-0",
            )}
          >
            <Image
              src={mrChemistLogo}
              alt="Mr Chemist Logo"
              width={200}
              height={70}
              priority
              className="h-14 w-auto object-contain brightness-0 invert"
            />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="group bg-primary/80 hover:bg-primary/90 text-white transition-colors hover:text-white">
                  Treatments
                </NavigationMenuTrigger>

                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 gap-x-8 gap-y-6 p-4">
                    {isLoading ? (
                      <HeaderMenuSketion />
                    ) : (
                      Object.entries(treatmentGroups).map(([treatmentName, products]) => (
                        <div key={treatmentName}>
                          <div className="flex items-center justify-between border-b pb-1">
                            <Link
                              className="text-primary"
                              href={`/treatments/${products[0].treatment.slug}`}
                              passHref
                              legacyBehavior
                            >
                              <NavigationMenuLink className="hover:text-primary font-semibold">
                                {treatmentName}
                              </NavigationMenuLink>
                            </Link>
                            <Link href={`/treatments/${products[0].treatment.slug}`}>
                              <CircleChevronRight size={20} className="text-primary hover:text-primary/80" />
                            </Link>
                          </div>
                          <ul>
                            {products.map((product) => (
                              <li key={product._id} className="-py-0.5">
                                <Link href={`/products/${product.slug}`} passHref legacyBehavior>
                                  <NavigationMenuLink asChild>
                                    <span className="cursor-pointer text-sm text-blue-600 hover:underline">
                                      {product.name}
                                    </span>
                                  </NavigationMenuLink>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))
                    )}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {navigationLinks.map((link) => (
                <NavigationMenuItem key={link.title}>
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 focus:text-black",
                      )}
                    >
                      {link.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Icons */}
          <div className="flex items-center">
            {/* Desktop Search */}
            <div className="relative hidden w-64 lg:block" ref={searchContainerRef}>
              <form onSubmit={handleSearchSubmit}>
                <Search className="text-primary absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Search treatment"
                  className="rounded-full border-none bg-white pl-8 text-black"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              {debouncedSearchQuery.length > 2 && renderSearchResults()}
            </div>

            {/* Mobile Search Icon */}
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/90 text-white lg:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>

            <UserMenu />

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="hover:bg-primary/90 relative text-white">
                <ShoppingCart className="h-5 w-5" />
                <span className="text-primary absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-200 text-xs font-medium">
                  {cardItems.length}
                </span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="animate-in fade-in slide-in-from-top mt-4 duration-300 lg:hidden">
            <div className="relative" ref={searchContainerRef}>
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search treatment"
                  className="w-full rounded-full border-none bg-white pl-8 text-black"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              {debouncedSearchQuery.length > 2 && renderSearchResults()}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function UserMenu() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/auth/login" });
  };

  const handleLogin = () => {
    router.push("/auth/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-primary/90 relative text-white">
          <User className="h-5 w-5" />
          {isAuthenticated && <span className="absolute -top-0 -right-0 h-3 w-3 rounded-full bg-green-500" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {isAuthenticated ? (
          <>
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>My Account</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/account/personal-information")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogin}>
              <LogIn className="mr-2 h-4 w-4" />
              <span>Sign In</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/auth/register")}>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Create Account</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MobileMenu({ onSelectCategory }: { onSelectCategory: (category: string) => void; onClose: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="bg-primary flex items-center justify-between p-4 text-white">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <SheetClose asChild>
          <Button variant="ghost" size="icon" className="hover:bg-primary/90 -ml-2 text-white">
            <X className="h-6 w-6" />
          </Button>
        </SheetClose>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hover:bg-primary/90 text-white">
            <Search className="h-5 w-5" />
          </Button>
          <UserMenu />
          <Button variant="ghost" size="icon" className="hover:bg-primary/90 relative text-white">
            <ShoppingCart className="h-5 w-5" />
            <span className="text-primary absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-200 text-xs font-medium">
              2
            </span>
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <nav className="flex flex-col">
          <button
            onClick={() => onSelectCategory("All treatments")}
            className="flex items-center justify-between border-b border-gray-200 px-6 py-4 hover:bg-gray-100"
          >
            <span className="font-medium">All treatments</span>
            <CircleChevronRight className="h-5 w-5 text-gray-400" />
          </button>
          {navigationLinks.map((link) => (
            <SheetClose asChild key={link.title}>
              <Link href={link.href} className="border-b border-gray-200 px-6 py-4 hover:bg-gray-100">
                {link.title}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </div>
    </div>
  );
}

function MobileSubmenu({ category, onBack }: { category: string; onBack: () => void; onClose: () => void }) {
  const { data: featuredProducts = [] } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: getFeaturedProducts,
  });

  const productsInCategory =
    category === "All treatments"
      ? featuredProducts
      : featuredProducts.filter((product) => (product as any)?.treatment?.name === category);

  const treatmentGroups = featuredProducts.reduce((groups: Record<string, any[]>, product: any) => {
    const treatmentName = product?.treatment?.name;
    if (!groups[treatmentName]) {
      groups[treatmentName] = [];
    }
    groups[treatmentName].push(product);
    return groups;
  }, {});

  return (
    <div className="flex h-full flex-col">
      <div className="bg-primary flex items-center justify-between p-4 text-white">
        <SheetTitle className="sr-only">Category Menu</SheetTitle>
        <SheetClose asChild>
          <Button variant="ghost" size="icon" className="hover:bg-primary/90 -ml-2 text-white">
            <X className="h-6 w-6" />
          </Button>
        </SheetClose>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hover:bg-primary/90 text-white">
            <Search className="h-5 w-5" />
          </Button>
          <UserMenu />
          <Button variant="ghost" size="icon" className="hover:bg-primary/90 relative text-white">
            <ShoppingCart className="h-5 w-5" />
            <span className="text-primary absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-200 text-xs font-medium">
              2
            </span>
          </Button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <button onClick={onBack} className="text-primary flex items-center px-6 py-4 hover:bg-gray-100">
          <CircleChevronRight className="mr-2 h-5 w-5 rotate-180" />
          <span>Back</span>
        </button>
      </div>

      <div className="flex-1 overflow-auto py-2">
        {category === "All treatments" ? (
          Object.entries(treatmentGroups).map(([treatmentName, products]: [string, any[]]) => (
            <div key={treatmentName} className="border-b border-gray-200">
              <SheetClose asChild>
                <Link
                  href={`/treatments/${products[0].treatment.slug}`}
                  className="flex items-center justify-between px-6 py-4"
                  onClick={() => onBack()}
                >
                  <h3 className="font-medium">{treatmentName}</h3>
                  <CircleChevronRight className="text-primary h-5 w-5" />
                </Link>
              </SheetClose>
              <div className="pb-2 pl-6">
                {products.map((product) => (
                  <SheetClose asChild key={product._id}>
                    <Link href={`/products/${product.slug}`} className="text-primary block py-2 hover:underline">
                      {product.name}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </div>
          ))
        ) : (
          <ul className="space-y-2 px-6">
            {productsInCategory.map((product) => (
              <li key={product._id}>
                <SheetClose asChild>
                  <Link href={`/products/${product.slug}`} className="hover:text-primary block">
                    {product.name}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
