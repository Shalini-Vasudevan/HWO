"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Rocket, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getGeneratedLogo } from "../actions/ai";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  projectName: z.string().min(3, "Project name must be at least 3 characters.").max(50),
  purpose: z.string().min(10, "Purpose must be at least 10 characters.").max(500),
  fundingGoal: z.coerce.number().min(1, "Funding goal must be positive."),
  tokenType: z.enum(["erc20", "erc721", "erc1155"]),
  logoUrl: z.string().optional(),
});

export default function CreateDaoPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isGeneratingLogo, setIsGeneratingLogo] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      purpose: "",
      fundingGoal: 1000,
      tokenType: "erc20",
    },
  });
  
  const purposeValue = form.watch("purpose");

  const handleGenerateLogo = async () => {
    const purpose = form.getValues("purpose");
    if (!purpose || purpose.length < 10) {
      toast({
        title: "Please describe your purpose",
        description: "The purpose needs to be at least 10 characters long to generate a meaningful logo.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingLogo(true);
    setLogoUrl(null); // Clear previous logo
    try {
      const url = await getGeneratedLogo(purpose);
      if (url) {
        setLogoUrl(url);
        form.setValue("logoUrl", url);
      } else {
        throw new Error("Logo generation failed.");
      }
    } catch (error) {
       toast({
        title: "Logo Generation Failed",
        description: "Something went wrong while creating the logo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingLogo(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would call the backend API:
    // const response = await fetch('/api/create-dao', { method: 'POST', body: JSON.stringify(values) });
    // const { daoId } = await response.json();
    console.log(values);
    
    toast({
      title: "🚀 DAO Deployment Initiated!",
      description: "Your new DAO is being created on the blockchain. This might take a moment.",
    });

    // Simulate a delay for API call and redirect
    setTimeout(() => {
      // In a real app: router.push(`/dao/${daoId}`);
      // For now, redirect to a mock DAO page
      router.push(`/dao/new-dao`);
    }, 1500);
  }

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl flex items-center gap-2">
            <Rocket className="h-8 w-8 text-accent" />
            Launch Your DAO
          </CardTitle>
          <CardDescription>Fill in the details below to deploy your new Decentralized Autonomous Organization.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., EcoWarriors Initiative" {...field} />
                    </FormControl>
                    <FormDescription>
                      The public name of your DAO.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purpose</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the mission and goals of your DAO..."
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A brief summary of what your DAO aims to achieve.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormLabel>Project Logo</FormLabel>
                <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-lg border border-dashed flex items-center justify-center bg-muted/50">
                       {isGeneratingLogo ? (
                           <Skeleton className="w-full h-full" />
                       ) : logoUrl ? (
                           <Image src={logoUrl} alt="Generated DAO Logo" width={96} height={96} className="object-cover rounded-md" />
                       ) : (
                           <Bot className="h-8 w-8 text-muted-foreground" />
                       )}
                    </div>
                    <div className="flex-1">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleGenerateLogo}
                          disabled={isGeneratingLogo || !purposeValue || purposeValue.length < 10}
                        >
                          {isGeneratingLogo ? <Loader2 className="animate-spin" /> : <Bot className="mr-2" />}
                          {isGeneratingLogo ? 'Generating...' : 'Generate Logo with AI'}
                        </Button>
                        <p className="text-sm text-muted-foreground mt-2">
                            Describe your purpose above, then let AI create a logo for you.
                        </p>
                    </div>
                </div>
              </div>


              <FormField
                control={form.control}
                name="fundingGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Funding Goal (in USD)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="10000" {...field} />
                    </FormControl>
                     <FormDescription>
                      The target amount you want to raise.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tokenType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a token type for governance" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="erc20">ERC-20 (Fungible Governance Token)</SelectItem>
                        <SelectItem value="erc721">ERC-721 (NFT-based Membership)</SelectItem>
                        <SelectItem value="erc1155">ERC-1155 (Multi-Token Standard)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose how membership and voting power are represented.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Deploying..." : "Deploy DAO"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
