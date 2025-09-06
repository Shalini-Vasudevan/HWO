import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Coins, Target, Users, Vote, HandCoins } from "lucide-react";
import Image from "next/image";
import { ProposalCard, type ProposalCardProps } from "@/components/dao/ProposalCard";
import Leaderboard from "@/components/dao/Leaderboard";

// Mock data for a single DAO
const daoData = {
  name: "EcoWarriors Initiative",
  description: "Funding decentralized projects to combat climate change and promote sustainability.",
  imageUrl: "https://picsum.photos/1200/400?random=1",
  imageHint: "nature landscape",
  raised: 75000,
  goal: 100000,
  contributors: 234,
  treasury: 72500, // Slightly less than raised for gas fees etc.
  daoId: "ecowarriors",
};

const mockProposals: ProposalCardProps[] = [
    {
        id: 'prop-001',
        title: 'Fund Reforestation Project in Amazon',
        description: 'This proposal allocates 15,000 USDC from the treasury to partner with a verified local NGO in Brazil for a large-scale reforestation effort in a region affected by illegal logging. The funds will cover the cost of saplings, labor, and 3 years of maintenance and monitoring. The goal is to re-plant 50,000 native trees, restoring critical habitat and creating a carbon sink. Detailed project plan and NGO due diligence report are attached.',
        author: '0x123...abc',
        status: 'active',
        votes: { yes: 120, no: 15, abstain: 30 }
    },
    {
        id: 'prop-002',
        title: 'Develop Ocean Cleanup Drone',
        description: 'We propose to fund a research and development initiative to build a prototype of an autonomous, solar-powered drone for collecting plastic waste from ocean gyres. The initial funding request of 25,000 USDC will support a team of 3 engineers for 6 months, cover material costs, and facilitate initial testing. The project aims to produce an open-source design that other organizations can replicate and deploy.',
        author: '0x456...def',
        status: 'active',
        votes: { yes: 98, no: 42, abstain: 10 }
    },
    {
        id: 'prop-003',
        title: 'Update DAO Governance Parameters',
        description: 'This proposal suggests updating the governance contract to reduce the proposal quorum from 5% to 3% of total token supply, and to lower the voting period from 7 days to 5 days. The goal is to increase the speed and efficiency of decision-making. Analysis of past proposal participation suggests this change would not significantly impact governance security. See attached simulation results.',
        author: '0x789...ghi',
        status: 'passed',
        votes: { yes: 210, no: 5, abstain: 12 }
    }
];

export default function DaoPage({ params }: { params: { id: string } }) {
  const progress = (daoData.raised / daoData.goal) * 100;

  return (
    <div>
      <section className="relative h-64 md:h-80 w-full">
         <Image
          src={daoData.imageUrl}
          alt={daoData.name}
          fill
          className="object-cover"
          data-ai-hint={daoData.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-8">
            <h1 className="font-headline text-4xl md:text-6xl font-bold text-white tracking-tighter">
                {daoData.name}
            </h1>
            <p className="max-w-2xl text-lg text-white/90 mt-2">{daoData.description}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="font-headline">Crowdfunding Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div className="p-4 bg-muted/50 rounded-lg">
                                <HandCoins className="h-6 w-6 mx-auto mb-2 text-primary" />
                                <div className="text-2xl font-bold">${daoData.raised.toLocaleString()}</div>
                                <div className="text-sm text-muted-foreground">Raised</div>
                            </div>
                            <div className="p-4 bg-muted/50 rounded-lg">
                                <Target className="h-6 w-6 mx-auto mb-2 text-primary" />
                                <div className="text-2xl font-bold">${daoData.goal.toLocaleString()}</div>
                                <div className="text-sm text-muted-foreground">Goal</div>
                            </div>
                            <div className="p-4 bg-muted/50 rounded-lg">
                                <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                                <div className="text-2xl font-bold">{daoData.contributors}</div>
                                <div className="text-sm text-muted-foreground">Contributors</div>
                            </div>
                             <div className="p-4 bg-muted/50 rounded-lg">
                                <Coins className="h-6 w-6 mx-auto mb-2 text-accent" />
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

                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Vote /> Active Proposals</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {mockProposals.filter(p => p.status === 'active').map(proposal => (
                           <ProposalCard key={proposal.id} {...proposal} />
                        ))}
                         {mockProposals.filter(p => p.status === 'active').length === 0 && (
                            <p className="text-muted-foreground text-center py-4">No active proposals at the moment.</p>
                        )}
                    </CardContent>
                </Card>
            </div>

            <div className="lg:col-span-1">
                <Card className="shadow-md sticky top-24">
                    <CardHeader>
                        <CardTitle className="font-headline">Trust Leaderboard</CardTitle>
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
