import React from 'react';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string; // Optional className to be applied to the main content (card) container
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className }) => {
  return (
    // Overall container: Centers content on the screen.
    // Based on Layout Requirements.overall.definition: "flex items-center justify-center h-screen"
    // Using min-h-screen for robustness with content that might exceed viewport height.
    // bg-background and text-foreground are applied as per Tailwind setup and general page styling.
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      {/* 
        Main content container: Styled as a card.
        Based on Layout Requirements.mainContent.container: "flex flex-col w-96 p-6 bg-surface rounded-lg shadow-lg"
        - 'bg-surface' is interpreted as 'bg-card' based on the provided Tailwind configuration.
        - 'text-card-foreground' is added to ensure proper text color on the card.
      */}
      <main
        className={cn(
          'flex flex-col w-96 p-6 bg-card text-card-foreground rounded-lg shadow-lg',
          className
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default MainAppLayout;
