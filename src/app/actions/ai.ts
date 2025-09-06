"use server";

import { generateLeaderboard } from "@/ai/flows/gamified-trust-leaderboard";
import { generateLogo } from "@/ai/flows/generate-logo-flow";

export async function getLeaderboardData() {
  try {
    const leaderboardData = await generateLeaderboard({
      contributorActivities: `
        - Alice (0x123...abc): Proposed 3 successful initiatives, voted on 95% of all proposals, contributed 15 ETH.
        - Bob (0x456...def): Contributed 50 ETH, active in community discussions, voted on 60% of proposals.
        - Charlie (0x789...ghi): Wrote extensive documentation for the DAO, onboarded 5 new high-value members, voted on 80% of proposals.
        - Diana (0xaaa...bbb): Identified a critical security flaw, contributed 5 ETH, consistently provides feedback on proposals.
        - Eve (0xccc...ddd): Frequent participant in Discord, contributed 1 ETH, voted on 30% of proposals.
        - Frank (0xeee...fff): Contributed 20 ETH, has not participated in voting or discussions.
        - Grace (0xggg...hhh): Leads the marketing working group, has brought in 3 major partnerships, voted on 75% of proposals.
        - Hank (0xiiii...jjj): Wrote 2 successful proposals, contributed 10 ETH.
        - Ivan (0xkkk...lll): Active voter (99% participation), specializes in reviewing technical proposals.
        - Judy (0xmmm...nnn): Long-time member, contributed 2 ETH, mentors new members.
      `,
      trustAlgorithmDescription: `
        The trust score is calculated based on a weighted average of several factors:
        1. Financial Contribution (30%): The total value of ETH contributed.
        2. Governance Participation (40%): A combination of proposals created, voting frequency, and quality of feedback.
        3. Community Building (20%): Actions that grow or strengthen the community, like onboarding, documentation, and marketing.
        4. Security & Auditing (10%): Identifying vulnerabilities or contributing to the security of the DAO.
        Perks: Top-ranked members get special voting power, access to exclusive channels, and early access to new projects.
      `,
      numberOfTopMembers: 7,
    });
    return leaderboardData;
  } catch (error) {
    console.error("Error generating leaderboard:", error);
    return null;
  }
}

export async function getGeneratedLogo(prompt: string) {
    try {
        const { logoUrl } = await generateLogo({ prompt });
        return logoUrl;
    } catch (error) {
        console.error("Error generating logo:", error);
        return null;
    }
}
