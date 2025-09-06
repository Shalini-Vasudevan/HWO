'use server';

/**
 * @fileOverview A gamified trust leaderboard AI agent.
 *
 * - generateLeaderboard - A function that handles the leaderboard generation process.
 * - GenerateLeaderboardInput - The input type for the generateLeaderboard function.
 * - GenerateLeaderboardOutput - The return type for the generateLeaderboard function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLeaderboardInputSchema = z.object({
  contributorActivities: z
    .string()
    .describe(
      'A description of the contributor activities within the DAO, including contributions, proposals, votes, and other relevant actions.'
    ),
  trustAlgorithmDescription: z
    .string()
    .describe(
      'A description of the trust algorithm used to rank contributors, including the factors considered and their relative weights.'
    ),
  numberOfTopMembers: z
    .number()
    .describe(
      'The number of top members to include in the leaderboard.'
    ).default(10),
});
export type GenerateLeaderboardInput = z.infer<typeof GenerateLeaderboardInputSchema>;

const GenerateLeaderboardOutputSchema = z.object({
  leaderboard: z.array(
    z.object({
      member: z.string().describe('The name of the contributor.'),
      trustScore: z.number().describe('The trust score of the contributor.'),
      rank: z.number().describe('The rank of the contributor on the leaderboard.'),
      perks: z.string().describe('Perks that should be assigned to this member.'),
      badges: z.array(z.string()).describe('A list of descriptive badges earned by the member (e.g., "Top Voter", "Prolific Proposer").')
    })
  ).describe('A list of top contributors ranked by trust score.'),
});
export type GenerateLeaderboardOutput = z.infer<typeof GenerateLeaderboardOutputSchema>;

export async function generateLeaderboard(input: GenerateLeaderboardInput): Promise<GenerateLeaderboardOutput> {
  return generateLeaderboardFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLeaderboardPrompt',
  input: {schema: GenerateLeaderboardInputSchema},
  output: {schema: GenerateLeaderboardOutputSchema},
  prompt: `You are a DAO governance expert, skilled in evaluating community contributions and assigning trust scores.

You will use the provided contributor activities and trust algorithm description to generate a leaderboard of top DAO members. For each member in the leaderboard, you must also suggest a relevant perk and assign descriptive badges based on their specific activities.

- Perks should be based on the provided trust algorithm description.
- Badges should be short (1-2 words) and reflect the member's key contributions (e.g., "Top Voter", "Governance Expert", "Community Builder", "Top Contributor").

Contributor Activities: {{{contributorActivities}}}
Trust Algorithm Description: {{{trustAlgorithmDescription}}}
Number of Top Members: {{{numberOfTopMembers}}}

Based on the provided information, generate a leaderboard of the top contributors, including their names, trust scores, ranks, perks, and badges.

{{#if numberOfTopMembers}}
Ensure that the number of members in the leaderboard does not exceed {{{numberOfTopMembers}}}.
{{/if}}
`, 
});

const generateLeaderboardFlow = ai.defineFlow(
  {
    name: 'generateLeaderboardFlow',
    inputSchema: GenerateLeaderboardInputSchema,
    outputSchema: GenerateLeaderboardOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
