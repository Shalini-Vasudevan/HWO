"use client";

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Bot, FileText, Loader2 } from 'lucide-react';
import { getProposalSummary } from '@/app/actions/ai';
import type { ProposalCardProps } from './ProposalCard';
import { Skeleton } from '../ui/skeleton';


function SummarySkeleton() {
    return (
        <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
        </div>
    )
}

export function ProposalDetailsDialog(props: ProposalCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [summary, setSummary] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen && !summary) {
            async function fetchSummary() {
                setIsLoading(true);
                const result = await getProposalSummary(props.description);
                setSummary(result);
                setIsLoading(false);
            }
            fetchSummary();
        }
    }, [isOpen, summary, props.description]);


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex-1">View Details</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl">{props.title}</DialogTitle>
                    <DialogDescription>Proposed by: <span className="font-mono text-xs">{props.author}</span></DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-primary">
                            <Bot className="h-5 w-5" />
                            AI Summary
                        </h3>
                        <div className="p-4 rounded-lg bg-muted/70 text-sm">
                            {isLoading && <SummarySkeleton />}
                            {(!isLoading && summary) && <p>{summary}</p>}
                            {(!isLoading && !summary) && <p className="text-destructive">Could not generate summary.</p>}
                        </div>
                    </div>
                    
                    <Separator />

                    <div>
                         <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Full Proposal
                        </h3>
                        <ScrollArea className="h-60 w-full rounded-md border p-4">
                            <p className="text-sm whitespace-pre-wrap">{props.description}</p>
                        </ScrollArea>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
