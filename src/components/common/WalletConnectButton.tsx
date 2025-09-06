"use client";

import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useState } from "react";

export default function WalletConnectButton() {
  const [isConnected, setIsConnected] = useState(false);

  const handleClick = () => {
    // In a real app, this would trigger wallet connection logic (e.g., wagmi, ethers)
    setIsConnected(!isConnected);
  };

  return (
    <Button onClick={handleClick} variant="outline">
      <Wallet className="mr-2 h-4 w-4" />
      {isConnected ? "0x123...aBcD" : "Connect Wallet"}
    </Button>
  );
}
