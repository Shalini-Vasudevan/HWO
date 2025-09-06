'use server';

/**
 * @fileOverview A flow for generating a logo using AI.
 *
 * - generateLogo - A function that handles the logo generation process.
 * - GenerateLogoInput - The input type for the generateLogo function.
 * - GenerateLogoOutput - The return type for the generateLogo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLogoInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate the logo from.'),
});
export type GenerateLogoInput = z.infer<typeof GenerateLogoInputSchema>;

const GenerateLogoOutputSchema = z.object({
  logoUrl: z.string().describe('The data URL of the generated logo.'),
});
export type GenerateLogoOutput = z.infer<typeof GenerateLogoOutputSchema>;

export async function generateLogo(
  input: GenerateLogoInput
): Promise<GenerateLogoOutput> {
  return generateLogoFlow(input);
}

const generateLogoFlow = ai.defineFlow(
  {
    name: 'generateLogoFlow',
    inputSchema: GenerateLogoInputSchema,
    outputSchema: GenerateLogoOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: `A modern, minimalist, square vector logo for a project with the following purpose: ${input.prompt}. The logo should be on a clean background.`,
      config: {
        aspectRatio: '1:1',
      }
    });

    if (!media.url) {
      throw new Error('Image generation failed to return a URL.');
    }

    return {
      logoUrl: media.url,
    };
  }
);
