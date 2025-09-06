import { DAOCard, type DAOCardProps } from "@/components/dao/DAOCard";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const myDaos: DAOCardProps[] = [
  {
    name: "EcoWarriors Initiative",
    description: "Funding decentralized projects to combat climate change and promote sustainability.",
    imageUrl: "https://picsum.photos/600/400?random=1",
    imageHint: "nature environment",
    raised: 75000,
    goal: 100000,
    contributors: 234,
    daoId: "ecowarriors",
  },
  {
    name: "HealthChain DAO",
    description: "Funding research and development of decentralized healthcare solutions.",
    imageUrl: "https://picsum.photos/600/400?random=4",
    imageHint: "health science",
    raised: 180000,
    goal: 200000,
    contributors: 412,
    daoId: "healthchain",
  }
];


export default function MyDaosPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">
          My DAOs
        </h1>
        <Link href="/create">
          <Button>
            <Plus className="mr-2 h-5 w-5" />
            Create New DAO
          </Button>
        </Link>
      </div>

      {myDaos.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {myDaos.map((dao) => (
            <DAOCard key={dao.daoId} {...dao} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-dashed border-2 rounded-lg">
            <h2 className="text-xl font-semibold text-foreground/80">You haven't joined or created any DAOs yet.</h2>
            <p className="text-muted-foreground mt-2 mb-6">Explore existing DAOs or start your own!</p>
            <Link href="/create">
              <Button>
                Start a DAO Instantly
              </Button>
            </Link>
        </div>
      )}
    </div>
  );
}
