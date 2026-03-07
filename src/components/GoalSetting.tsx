import { useState } from "react";
import { Check, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

interface Goal {
  id: number;
  name: string;
  category: string;
  targetDate: string;
  notes: string;
  done: boolean;
}

const categories = ["Weight Loss", "Muscle Gain", "Endurance", "Flexibility", "General Fitness"];

const GoalSetting = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [targetDate, setTargetDate] = useState("");
  const [notes, setNotes] = useState("");

  const addGoal = () => {
    if (!name.trim()) { toast.error("Enter a goal name"); return; }
    setGoals((g) => [...g, { id: Date.now(), name, category, targetDate, notes, done: false }]);
    setName(""); setTargetDate(""); setNotes("");
    toast.success("Goal added!");
  };

  const toggleGoal = (id: number) => {
    setGoals((g) => g.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));
    toast.success("Goal updated!");
  };

  const deleteGoal = (id: number) => {
    setGoals((g) => g.filter((x) => x.id !== id));
    toast.success("Goal deleted");
  };

  return (
    <section id="goals" className="py-24 px-4 max-w-7xl mx-auto relative z-10">
      <p className="section-label mb-2">// 01. Goal Setting</p>
      <h2 className="font-heading text-4xl sm:text-5xl text-foreground mb-8">SET YOUR <span className="text-primary">GOALS</span></h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Form */}
        <div className="bg-card border border-border rounded-lg p-6 card-hover">
          <div className="space-y-4">
            <div>
              <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-1">Goal Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-foreground focus:border-primary focus:outline-none transition-colors" placeholder="e.g. Run a 5K" />
            </div>
            <div>
              <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-1">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-foreground focus:border-primary focus:outline-none transition-colors">
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-1">Target Date</label>
              <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-foreground focus:border-primary focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-1">Notes</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-foreground focus:border-primary focus:outline-none transition-colors resize-none" placeholder="Additional notes..." />
            </div>
            <button onClick={addGoal} className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg btn-glow transition-all hover:scale-[1.02]">
              <Plus size={18} /> Add Goal
            </button>
          </div>
        </div>

        {/* Goals List */}
        <div className="bg-card border border-border rounded-lg p-6 max-h-[500px] overflow-y-auto card-hover">
          {goals.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">No goals yet. Add one!</p>
          ) : (
            <div className="space-y-3">
              {goals.map((g) => (
                <div key={g.id} className={`bg-muted border border-border rounded-lg p-4 transition-opacity ${g.done ? "opacity-50" : ""}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold text-foreground ${g.done ? "line-through" : ""}`}>{g.name}</h4>
                      <span className="inline-block mt-1 font-mono text-xs px-2 py-0.5 rounded-md bg-primary/10 text-primary">{g.category}</span>
                      {g.targetDate && <p className="text-xs text-muted-foreground mt-1">Target: {g.targetDate}</p>}
                      {g.notes && <p className="text-sm text-muted-foreground mt-1">{g.notes}</p>}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => toggleGoal(g.id)} className={`p-1.5 rounded-md transition-colors ${g.done ? "bg-primary text-primary-foreground" : "bg-muted border border-border text-muted-foreground hover:text-primary"}`}>
                        <Check size={16} />
                      </button>
                      <button onClick={() => deleteGoal(g.id)} className="p-1.5 rounded-md bg-muted border border-border text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
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

export default GoalSetting;
