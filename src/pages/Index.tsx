import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GoalSetting from "@/components/GoalSetting";
import WeeklyPlanner from "@/components/WeeklyPlanner";
import ProgressTracker from "@/components/ProgressTracker";
import BMICalculator from "@/components/BMICalculator";
import Leaderboard from "@/components/Leaderboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Background effects */}
      <div className="noise-overlay" />
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <Navbar />
      <HeroSection />
      <GoalSetting />
      <WeeklyPlanner />
      <ProgressTracker />
      <BMICalculator />
      <Leaderboard />

      <footer className="relative z-10 text-center py-12 border-t border-border">
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
          FitForge © {new Date().getFullYear()} — Train Smarter.
        </p>
      </footer>
    </div>
  );
};

export default Index;
