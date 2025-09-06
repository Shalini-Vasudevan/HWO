'use client';

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Coins, Target, Users, Vote, HandCoins, BarChart3, Star } from 'lucide-react';
import Image from 'next/image';
import { ProposalCard, type ProposalCardProps } from '@/components/dao/ProposalCard';
import Leaderboard from '@/components/dao/Leaderboard';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';

// Mock data for a single DAO
const daoData = {
  name: 'EcoWarriors Initiative',
  description: 'Funding decentralized projects to combat climate change and promote sustainability.',
  imageUrl: 'https://picsum.photos/1200/400?random=1',
  imageHint: 'nature landscape',
  raised: 75000,
  goal: 100000,
  contributors: 234,
  treasury: 72500, // Slightly less than raised for gas fees etc.
  daoId: 'ecowarriors',
};

const mockProposals: ProposalCardProps[] = [
  {
    id: 'prop-001',
    title: 'Fund Reforestation Project in Amazon',
    description:
      'This proposal allocates 15,000 USDC from the treasury to partner with a verified local NGO in Brazil for a large-scale reforestation effort in a region affected by illegal logging. The funds will cover the cost of saplings, labor, and 3 years of maintenance and monitoring. The goal is to re-plant 50,000 native trees, restoring critical habitat and creating a carbon sink. Detailed project plan and NGO due diligence report are attached.',
    author: '0x123...abc',
    status: 'active',
    votes: { yes: 120, no: 15, abstain: 30 },
  },
  {
    id: 'prop-002',
    title: 'Develop Ocean Cleanup Drone',
    description:
      'We propose to fund a research and development initiative to build a prototype of an autonomous, solar-powered drone for collecting plastic waste from ocean gyres. The initial funding request of 25,000 USDC will support a team of 3 engineers for 6 months, cover material costs, and facilitate initial testing. The project aims to produce an open-source design that other organizations can replicate and deploy.',
    author: '0x456...def',
    status: 'active',
    votes: { yes: 98, no: 42, abstain: 10 },
  },
  {
    id: 'prop-003',
    title: 'Update DAO Governance Parameters',
    description:
      'This proposal suggests updating the governance contract to reduce the proposal quorum from 5% to 3% of total token supply, and to lower the voting period from 7 days to 5 days. The goal is to increase the speed and efficiency of decision-making. Analysis of past proposal participation suggests this change would not significantly impact governance security. See attached simulation results.',
    author: '0x789...ghi',
    status: 'passed',
    votes: { yes: 210, no: 5, abstain: 12 },
  },
  {
    id: 'prop-004',
    title: 'Community Marketing Initiative',
    description:
      'This proposal requests 5,000 USDC to fund a 3-month community-led marketing campaign to increase awareness of the EcoWarriors DAO. The budget includes allocations for social media promotion, content creation, and small bounties for community participation. The goal is to double our social media following and increase new contributor onboarding by 20%.',
    author: '0xggg...hhh',
    status: 'failed',
    votes: { yes: 80, no: 85, abstain: 20 },
  },
];

const chartConfig = {
  proposals: {
    label: 'Proposals',
  },
  passed: {
    label: 'Passed',
    color: 'hsl(var(--chart-2))',
  },
  active: {
    label: 'Active',
    color: 'hsl(var(--chart-4))',
  },
  failed: {
    label: 'Failed',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function DaoPage({ params }: { params: { id: string } }) {
  const progress = (daoData.raised / daoData.goal) * 100;

  const proposalStatusData = useMemo(() => {
    const counts = mockProposals.reduce(
      (acc, p) => {
        acc[p.status] = (acc[p.status] || 0) + 1;
        return acc;
      },
      {} as Record<'passed' | 'active' | 'failed', number>
    );

    return [
      { name: 'passed', value: counts.passed || 0, fill: 'var(--color-passed)' },
      { name: 'active', value: counts.active || 0, fill: 'var(--color-active)' },
      { name: 'failed', value: counts.failed || 0, fill: 'var(--color-failed)' },
    ];
  }, []);

  return (
    <div>
      <section className="relative h-64 w-full md:h-80">
        <Image
          src={daoData.imageUrl}
          alt={daoData.name}
          fill
          className="object-cover"
          data-ai-hint={daoData.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        <div className="relative container mx-auto flex h-full flex-col justify-end px-4 pb-8">
          <h1 className="font-headline text-4xl font-bold tracking-tighter text-white md:text-6xl">
            {daoData.name}
          </h1>
          <p className="mt-2 max-w-2xl text-lg text-white/90">{daoData.description}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="font-headline">Crowdfunding Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
                  <div className="rounded-lg bg-muted/50 p-4">
                    <HandCoins className="mx-auto mb-2 h-6 w-6 text-primary" />
                    <div className="text-2xl font-bold">${daoData.raised.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Raised</div>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-4">
                    <Target className="mx-auto mb-2 h-6 w-6 text-primary" />
                    <div className="text-2xl font-bold">${daoData.goal.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Goal</div>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-4">
                    <Users className="mx-auto mb-2 h-6 w-6 text-primary" />
                    <div className="text-2xl font-bold">{daoData.contributors}</div>
                    <div className="text-sm text-muted-foreground">Contributors</div>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-4">
                    <Coins className="mx-auto mb-2 h-6 w-6 text-accent" />
                    <div className="text-2xl font-bold">${daoData.treasury.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Treasury</div>
                  </div>
                </div>
                <Progress value={progress} className="h-3" />
                <Button size="lg" className="w-full text-base">
                  Contribute to this DAO
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <BarChart3 /> DAO Analytics
                </CardTitle>
                <CardDescription>A visual breakdown of governance activity.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                  <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie
                      data={proposalStatusData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      strokeWidth={5}
                    >
                      {proposalStatusData.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartLegend
                      content={<ChartLegendContent nameKey="name" />}
                      className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                    />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Vote /> Active Proposals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockProposals
                  .filter((p) => p.status === 'active')
                  .map((proposal) => (
                    <ProposalCard key={proposal.id} {...proposal} />
                  ))}
                {mockProposals.filter((p) => p.status === 'active').length === 0 && (
                  <p className="py-4 text-center text-muted-foreground">
                    No active proposals at the moment.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-md">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Star /> Trust Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Leaderboard />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
