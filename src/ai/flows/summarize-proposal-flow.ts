'use server';

/**
 * @fileOverview A flow for summarizing a DAO proposal.
 *
 * - summarizeProposal - A function that handles the proposal summarization.
 * - SummarizeProposalInput - The input type for the summarizeProposal function.
 * - SummarizeProposalOutput - The return type for the summarizeProposal function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeProposalInputSchema = z.object({
  proposalText: z.string().describe('The full text of the DAO proposal to be summarized.'),
});
export type SummarizeProposalInput = z.infer<typeof SummarizeProposalInputSchema>;

const SummarizeProposalOutputSchema = z.object({
  summary: z.string().describe('A concise, easy-to-understand summary of the proposal.'),
});
export type SummarizeProposalOutput = z.infer<typeof SummarizeProposalOutputSchema>;

export async function summarizeProposal(input: SummarizeProposalInput): Promise<SummarizeProposalOutput> {
  return summarizeProposalFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeProposalPrompt',
  input: {schema: SummarizeProposalInputSchema},
  output: {schema: SummarizeProposalOutputSchema},
  prompt: `You are an expert in decentralized governance and your goal is to make complex proposals accessible to a broad audience.

Your task is to create a clear and concise summary of the following DAO proposal. The summary should be easy for a non-technical person to understand.

Focus on the following:
1.  **What is the main goal of the proposal?** (e.g., fund a project, change a rule)
2.  **What is the expected outcome or impact?** (e.g., create a new feature, increase community rewards)
3.  **What are the key resources required?** (e.g., funding amount, developer time)

Keep the summary to 2-3 short sentences.

Proposal Text:
{{{proposalText}}}
`,
});

const summarizeProposalFlow = ai.defineFlow(
  {
    name: 'summarizeProposalFlow',
    inputSchema: SummarizeProposalInputSchema,
    outputSchema: SummarizeProposalOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
