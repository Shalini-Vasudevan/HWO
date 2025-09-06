"use client";

import { useEffect, useState } from "react";
import { getLeaderboardData } from "@/app/actions/ai";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import type { GenerateLeaderboardOutput } from "@/ai/flows/gamified-trust-leaderboard";
import { Award, Medal, Trophy } from "lucide-react";

type LeaderboardData = GenerateLeaderboardOutput | null;

function LeaderboardSkeleton() {
    return (
        <div className="space-y-3">
            {[...Array(7)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-1">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                    <Skeleton className="h-4 w-1/4" />
                </div>
            ))}
        </div>
    )
}

export default function Leaderboard() {
  const [data, setData] = useState<LeaderboardData>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const result = await getLeaderboardData();
      setData(result);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <LeaderboardSkeleton />;
  }

  if (!data || !data.leaderboard || data.leaderboard.length === 0) {
    return <p className="text-muted-foreground text-center py-8">Leaderboard data could not be generated.</p>;
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-slate-400" />;
    if (rank === 3) return <Award className="h-6 w-6 text-yellow-700" />;
    return <span className="font-bold text-lg w-6 text-center text-muted-foreground">{rank}</span>;
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Top contributors ranked by trust score based on community activity.</p>
       <div className="-mx-6 -mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">Rank</TableHead>
              <TableHead>Member</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.leaderboard.map((member) => (
              <TableRow key={member.rank} className="h-16">
                <TableCell>
                    <div className="flex items-center justify-center h-full w-full">
                        {getRankIcon(member.rank)}
                    </div>
                </TableCell>
                <TableCell>
                    <div className="font-medium">{member.member}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                        {member.perks}
                    </div>
                </TableCell>
                <TableCell className="text-right font-mono font-semibold">{member.trustScore.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
       </div>
    </div>
  );
}
