import { useState } from "react";
import { Dumbbell, Clock, Flame, Plus } from "lucide-react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip as ChartTooltip } from "chart.js";
import { toast } from "sonner";

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTooltip);

interface LogEntry {
  id: number;
  name: string;
  duration: number;
  calories: number;
  date: string;
  dayIndex: number;
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const ProgressTracker = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(30);
  const [calories, setCalories] = useState(200);

  const totalWorkouts = logs.length;
  const totalMinutes = logs.reduce((s, l) => s + l.duration, 0);
  const totalCalories = logs.reduce((s, l) => s + l.calories, 0);

  const perDay = days.map((_, i) => logs.filter((l) => l.dayIndex === i).reduce((s, l) => s + l.duration, 0));

  const logWorkout = () => {
    if (!name.trim()) { toast.error("Enter exercise name"); return; }
    const now = new Date();
    const dayIdx = now.getDay();
    setLogs((l) => [...l, { id: Date.now(), name, duration, calories, date: now.toLocaleDateString(), dayIndex: dayIdx === 0 ? 6 : dayIdx - 1 }]);
    setName("");
    toast.success("Workout logged!");
  };

  return (
    <section id="progress" className="py-24 px-4 max-w-7xl mx-auto relative z-10">
      <p className="section-label mb-2">// 03. Progress Tracker</p>
      <h2 className="font-heading text-4xl sm:text-5xl text-foreground mb-8">TRACK YOUR <span className="text-destructive">PROGRESS</span></h2>

      {/* Metric Cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: <Dumbbell size={28} />, val: totalWorkouts, label: "Total Workouts", color: "text-primary" },
          { icon: <Clock size={28} />, val: totalMinutes, label: "Minutes Trained", color: "text-secondary" },
          { icon: <Flame size={28} />, val: totalCalories, label: "Calories Burned", color: "text-destructive" },
        ].map((m, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-6 card-hover text-center">
            <div className={`${m.color} mb-2 flex justify-center`}>{m.icon}</div>
            <div className={`mono-num text-3xl font-bold ${m.color}`}>{m.val.toLocaleString()}</div>
            <div className="font-mono text-xs text-muted-foreground uppercase mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-card border border-border rounded-lg p-6 mb-8 card-hover">
        <Bar
          data={{
            labels: days,
            datasets: [{
              label: "Minutes",
              data: perDay,
              backgroundColor: "hsl(72, 88%, 59%)",
              borderRadius: 6,
            }],
          }}
          options={{
            responsive: true,
            plugins: { tooltip: { enabled: true } },
            scales: {
              x: { ticks: { color: "#666", font: { family: "Space Mono" } }, grid: { display: false } },
              y: { ticks: { color: "#666", font: { family: "Space Mono" } }, grid: { color: "rgba(255,255,255,0.05)" } },
            },
          }}
        />
      </div>

      {/* Log Form + Entries */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6 card-hover space-y-4">
          <h3 className="font-heading text-xl text-foreground">Log Completed Workout</h3>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-foreground focus:border-primary focus:outline-none transition-colors" placeholder="Exercise name" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-mono text-xs text-muted-foreground block mb-1">Duration (min)</label>
              <input type="number" min={1} value={duration} onChange={(e) => setDuration(+e.target.value)} className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-foreground focus:border-primary focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="font-mono text-xs text-muted-foreground block mb-1">Calories</label>
              <input type="number" min={0} value={calories} onChange={(e) => setCalories(+e.target.value)} className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-foreground focus:border-primary focus:outline-none transition-colors" />
            </div>
          </div>
          <button onClick={logWorkout} className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg btn-glow transition-all hover:scale-[1.02]">
            <Plus size={18} /> Log Workout
          </button>
        </div>
        <div className="bg-card border border-border rounded-lg p-6 card-hover max-h-[400px] overflow-y-auto">
          {logs.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No workouts logged yet.</p>
          ) : (
            <div className="space-y-2">
              {[...logs].reverse().map((l) => (
                <div key={l.id} className="bg-muted border border-border rounded-lg px-4 py-3 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-foreground">{l.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">{l.date}</span>
                  </div>
                  <div className="flex gap-3 text-xs font-mono">
                    <span className="text-secondary">{l.duration}m</span>
                    <span className="text-destructive">{l.calories}cal</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProgressTracker;
