# **App Name**: DAO Crowd

## Core Features:

- Landing Page with DAO Showcase: Displays a list of recent DAOs/projects with key details (name, funds raised, progress) using DAOCard components, providing an overview for users.
- DAO Creation Form: Presents a form for users to input project details like name, purpose, funding goal, and token type, then calls the backend API to deploy a new DAO on the BlockDAG.
- DAO Dashboard: Provides a personalized dashboard for each DAO, displaying treasury balance, active proposals with voting options, and a gamified leaderboard of contributors.
- Crowdfunding Page: Presents detailed information about a specific DAO, including its goal, funds raised, and list of contributors.  Includes a 'Contribute' button that integrates with wallet functionality.
- Voting Tool for Proposals: Displays a list of active proposals with 'Yes' and 'No' voting buttons, automatically calling tally functions from the backend to register user votes in real time.
- Gamified Trust Leaderboard: Uses a generative AI tool to analyze contributor activities and rank them based on a trust algorithm. High ranked members receive perks in the system.
- Wallet Connection: Allows users to connect and disconnect their wallets (MetaMask or WalletConnect) to interact with the platform, manage funds, and participate in DAO activities.

## Style Guidelines:

- Primary color: Deep indigo (#4B0082) to convey sophistication and innovation.
- Background color: Very light gray (#F5F5F5), offering a clean and modern backdrop.
- Accent color: Vibrant purple (#A020F0) for calls to action and important elements, providing visual pop.
- Headline font: 'Playfair' serif, conveying elegance. Body font: 'PT Sans' sans-serif. This is a font pairing, to combine legibility with style.
- Use modern, minimalist icons to represent different DAO functions and actions.
- Implement a grid-based layout with generous spacing for a clean and organized user interface.
- Incorporate subtle transitions and animations to enhance user experience without being distracting.