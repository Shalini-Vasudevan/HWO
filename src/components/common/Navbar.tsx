import Link from "next/link";
import WalletConnectButton from "./WalletConnectButton";
import { Network } from "lucide-react";


export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Network className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg sm:inline-block">
              DAO Crowd
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/create"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Create DAO
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
           <WalletConnectButton />
        </div>
      </div>
    </header>
  );
}
