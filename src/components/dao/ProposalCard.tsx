import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProposalDetailsDialog } from "./ProposalDetailsDialog";

export interface ProposalCardProps {
    id: string;
    title: string;
    description: string;
    author: string;
    status: 'active' | 'passed' | 'failed';
    votes: {
        yes: number;
        no: number;
        abstain: number;
    }
}

export function ProposalCard(props: ProposalCardProps) {
    const { title, author, status, votes } = props;
    const totalVotes = votes.yes + votes.no;
    const yesPercentage = totalVotes > 0 ? (votes.yes / totalVotes) * 100 : 0;
    const noPercentage = totalVotes > 0 ? (votes.no / totalVotes) * 100 : 0;
    
    const statusVariant = {
        active: "secondary",
        passed: "default",
        failed: "destructive"
    } as const;


    return (
        <Card className="bg-background/50 hover:bg-muted/50 transition-colors">
            <CardHeader>
                <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-lg font-headline">{title}</CardTitle>
                    <Badge variant={statusVariant[status]} className="shrink-0">{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
                </div>
                <CardDescription>Proposed by: <span className="font-mono text-xs">{author}</span></CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="space-y-2">
                    <div className="text-sm font-medium">Current Tally</div>
                    <div className="w-full bg-muted rounded-full h-2 flex overflow-hidden">
                        <div className="bg-[hsl(var(--chart-2))]" style={{ width: `${yesPercentage}%` }} title="Yes votes" />
                        <div className="bg-[hsl(var(--chart-1))]" style={{ width: `${noPercentage}%` }} title="No votes" />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Yes: {votes.yes.toLocaleString()} ({yesPercentage.toFixed(0)}%)</span>
                        <span>No: {votes.no.toLocaleString()} ({noPercentage.toFixed(0)}%)</span>
                    </div>
                 </div>
            </CardContent>
            <CardFooter className="flex gap-4">
                {status === 'active' && (
                    <>
                        <Button className="flex-1 text-primary-foreground bg-[hsl(var(--chart-2))] hover:bg-[hsl(var(--chart-2))]/90">Vote Yes</Button>
                        <Button className="flex-1 text-primary-foreground bg-[hsl(var(--chart-1))] hover:bg-[hsl(var(--chart-1))]/90">Vote No</Button>
                    </>
                )}
                <ProposalDetailsDialog {...props} />
            </CardFooter>
        </Card>
    )
}
