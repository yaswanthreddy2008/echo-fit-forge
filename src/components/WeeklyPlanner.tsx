import { useState } from "react";
import { Undo2, Trash2, CalendarPlus } from "lucide-react";
import { toast } from "sonner";

interface Workout {
  id: number;
  name: string;
  type: "Strength" | "Cardio" | "Flexibility";
  day: string;
  duration: number;
  intensity: string;
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const types = ["Strength", "Cardio", "Flexibility"] as const;
const intensities = ["Low", "Medium", "High"];

const chipColor: Record<string, string> = {
  Strength: "bg-destructive/20 text-destructive border-destructive/30",
  Cardio: "bg-secondary/20 text-secondary border-secondary/30",
  Flexibility: "bg-primary/20 text-primary border-primary/30",
};

const WeeklyPlanner = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [undoStack, setUndoStack] = useState<Workout[]>([]);
  const [name, setName] = useState("");
  const [type, setType] = useState<typeof types[number]>("Strength");
  const [day, setDay] = useState("Mon");
  const [duration, setDuration] = useState(30);
  const [intensity, setIntensity] = useState("Medium");

  const todayIdx = new Date().getDay();
  const todayDay = days[todayIdx === 0 ? 6 : todayIdx - 1];

  const schedule = () => {
    if (!name.trim()) { toast.error("Enter exercise name"); return; }
    const w: Workout = { id: Date.now(), name, type, day, duration, intensity };
    setWorkouts((p) => [...p, w]);
    setUndoStack((s) => [...s, w]);
    setName("");
    toast.success(`${name} scheduled on ${day}`);
  };

  const undo = () => {
    if (undoStack.length === 0) { toast.error("Nothing to undo"); return; }
    const last = undoStack[undoStack.length - 1];
    setUndoStack((s) => s.slice(0, -1));
    setWorkouts((w) => w.filter((x) => x.id !== last.id));
    toast.success("Undid last action");
  };

  const clearWeek = () => {
    setWorkouts([]);
    setUndoStack([]);
    toast.success("Week cleared");
  };

  return (
    <section id="planner" className="py-24 px-4 max-w-7xl mx-auto relative z-10">
      <p className="section-label mb-2">// 02. Weekly Planner</p>
      <h2 className="font-heading text-4xl sm:text-5xl text-foreground mb-8">PLAN YOUR <span className="text-secondary">WEEK</span></h2>
      <div className="grid lg:grid-cols-[300px_1fr] gap-6">
        {/* Form */}
        <div className="bg-card border border-border rounded-lg p-6 card-hover space-y-4">
          <div>
            <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-1">Exercise Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-foreground focus:border-primary focus:outline-none transition-colors" placeholder="e.g. Bench Press" />
          </div>
          <div>
            <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-1">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value as typeof types[number])} className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-foreground focus:border-primary focus:outline-none transition-colors">
              {types.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-1">Day</label>
            <select value={day} onChange={(e) => setDay(e.target.value)} className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-foreground focus:border-primary focus:outline-none transition-colors">
              {days.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-1">Duration (min)</label>
            <input type="number" min={1} value={duration} onChange={(e) => setDuration(+e.target.value)} className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-foreground focus:border-primary focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-1">Intensity</label>
            <select value={intensity} onChange={(e) => setIntensity(e.target.value)} className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-foreground focus:border-primary focus:outline-none transition-colors">
              {intensities.map((i) => <option key={i}>{i}</option>)}
            </select>
          </div>
          <button onClick={schedule} className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg btn-glow transition-all hover:scale-[1.02]">
            <CalendarPlus size={18} /> Schedule
          </button>
          <div className="flex gap-2">
            <button onClick={undo} className="flex-1 flex items-center justify-center gap-1 bg-muted border border-border text-muted-foreground py-2 rounded-lg hover:text-primary transition-colors text-sm">
              <Undo2 size={14} /> Undo
            </button>
            <button onClick={clearWeek} className="flex-1 flex items-center justify-center gap-1 bg-muted border border-border text-muted-foreground py-2 rounded-lg hover:text-destructive transition-colors text-sm">
              <Trash2 size={14} /> Clear
            </button>
          </div>
        </div>

        {/* Weekly Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {days.map((d) => (
            <div key={d} className={`bg-card border rounded-lg p-3 min-h-[160px] transition-colors ${d === todayDay ? "border-primary" : "border-border"}`}>
              <div className={`font-mono text-xs uppercase tracking-wider mb-2 ${d === todayDay ? "text-primary" : "text-muted-foreground"}`}>{d}</div>
              <div className="space-y-2">
                {workouts.filter((w) => w.day === d).map((w) => (
                  <div key={w.id} className={`text-xs px-2 py-1.5 rounded-md border ${chipColor[w.type]}`}>
                    <div className="font-semibold truncate">{w.name}</div>
                    <div className="opacity-70">{w.duration}m · {w.intensity}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeeklyPlanner;
