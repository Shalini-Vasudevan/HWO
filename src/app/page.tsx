import { Button } from "@/components/ui/button";
import { DAOCard, type DAOCardProps } from "@/components/dao/DAOCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const mockDaos: DAOCardProps[] = [
  {
    name: "EcoWarriors Initiative",
    description: "Funding decentralized projects to combat climate change and promote sustainability.",
    imageUrl: "https://picsum.photos/600/400?random=1",
    logoUrl: "https://picsum.photos/100/100?random=11",
    imageHint: "nature environment",
    raised: 75000,
    goal: 100000,
    contributors: 234,
    daoId: "ecowarriors",
  },
  {
    name: "Artisan Guild DAO",
    description: "A community-governed fund to support independent artists and creators worldwide.",
    imageUrl: "https://picsum.photos/600/400?random=2",
    logoUrl: "https://picsum.photos/100/100?random=12",
    imageHint: "art studio",
    raised: 42000,
    goal: 50000,
    contributors: 158,
    daoId: "artisan-guild",
  },
  {
    name: "Code-Crafters Collective",
    description: "Developing open-source tools and infrastructure for the decentralized web.",
    imageUrl: "https://picsum.photos/600/400?random=3",
    logoUrl: "https://picsum.photos/100/100?random=13",
    imageHint: "code computer",
    raised: 120000,
    goal: 250000,
    contributors: 88,
    daoId: "code-crafters",
  },
  {
    name: "HealthChain DAO",
    description: "Funding research and development of decentralized healthcare solutions.",
    imageUrl: "https://picsum.photos/600/400?random=4",
    logoUrl: "https://picsum.photos/100/100?random=14",
    imageHint: "health science",
    raised: 180000,
    goal: 200000,
    contributors: 412,
    daoId: "healthchain",
  }
];


export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center py-16 md:py-24">
        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          The Future of Community-Led Funding
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/80 mb-8">
          Launch, fund, and govern your project with the power of a Decentralized Autonomous Organization. Transparent, democratic, and revolutionary.
        </p>
        <Link href="/create">
          <Button size="lg" variant="default">
            Start a DAO Instantly <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>

      <section className="py-16">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
          Featured DAOs
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {mockDaos.map((dao) => (
            <DAOCard key={dao.daoId} {...dao} />
          ))}
        </div>
      </section>
    </div>
  );
}
