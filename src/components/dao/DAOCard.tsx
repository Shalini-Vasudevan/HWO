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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export interface DAOCardProps {
  name: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  logoUrl?: string;
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
  logoUrl,
  raised,
  goal,
  contributors,
  daoId,
}: DAOCardProps) {
  const progress = (raised / goal) * 100;

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-40 w-full">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          data-ai-hint={imageHint}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute -bottom-8 left-6">
            <Avatar className="h-16 w-16 border-4 border-card">
              {logoUrl && <AvatarImage src={logoUrl} alt={`${name} logo`} />}
              <AvatarFallback className="text-lg font-bold bg-muted">{name.charAt(0)}</AvatarFallback>
            </Avatar>
        </div>
      </div>
       <CardHeader className="pt-12">
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
