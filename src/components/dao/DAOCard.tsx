import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export interface DAOCardProps {
  name: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  raised: number;
  goal: number;
  contributors: number;
  daoId: string;
}

export function DAOCard({
  name,
  description,
  imageUrl,
  imageHint,
  raised,
  goal,
  contributors,
  daoId,
}: DAOCardProps) {
  const progress = (raised / goal) * 100;

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          data-ai-hint={imageHint}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{name}</CardTitle>
        <CardDescription className="line-clamp-2 h-[40px]">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div>
          <div className="mb-2 flex justify-between items-baseline">
            <span className="text-lg font-bold text-foreground">
              ${raised.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">
              Goal: ${goal.toLocaleString()}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center bg-muted/50 py-3 px-6">
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="mr-1.5 h-4 w-4" />
          {contributors} contributors
        </div>
        <Link href={`/dao/${daoId}`} passHref>
          <Button variant="secondary">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
