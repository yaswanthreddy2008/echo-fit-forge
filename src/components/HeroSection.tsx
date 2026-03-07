import { useEffect, useState } from "react";

const Counter = ({ end, label }: { end: number; label: string }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(end / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setVal(end); clearInterval(timer); }
      else setVal(start);
    }, 30);
    return () => clearInterval(timer);
  }, [end]);
  return (
    <div className="text-center">
      <div className="mono-num text-3xl sm:text-4xl font-bold text-primary">{val.toLocaleString()}</div>
      <div className="font-mono text-xs text-muted-foreground mt-1 uppercase tracking-wider">{label}</div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <h1 className="font-heading text-6xl sm:text-8xl md:text-9xl leading-none tracking-tight text-foreground mb-4">
          TRAIN <span className="text-primary">SMARTER.</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Your all-in-one fitness planner. Set goals, schedule workouts, track progress, and crush your limits — all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="#goals"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm btn-glow transition-all hover:scale-105"
          >
            Start Planning
          </a>
          <a
            href="#progress"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-border text-foreground font-semibold text-sm hover:border-primary hover:text-primary transition-all"
          >
            View Progress
          </a>
        </div>

        {/* Spinning rings */}
        <div className="relative w-52 h-52 mx-auto mb-12 flex items-center justify-center">
          <div className="ring ring-1" />
          <div className="ring ring-2" />
          <div className="ring ring-3" />
          <span className="text-5xl z-10">🔥</span>
        </div>

        <div className="flex justify-center gap-8 sm:gap-16">
          <Counter end={12480} label="Workouts Logged" />
          <Counter end={3250} label="Goals Set" />
          <Counter end={365} label="Day Streak" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
