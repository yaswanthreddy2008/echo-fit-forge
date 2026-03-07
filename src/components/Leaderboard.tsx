import { useState } from "react";
import { Trash2, Plus, ArrowUpDown } from "lucide-react";
import { toast } from "sonner";

interface Entry {
  id: number;
  name: string;
  score: number;
  badge: "Elite" | "Pro" | "Active";
}

const badgeColors: Record<string, string> = {
  Elite: "bg-primary/20 text-primary border-primary/30",
  Pro: "bg-secondary/20 text-secondary border-secondary/30",
  Active: "bg-destructive/20 text-destructive border-destructive/30",
};

const rankColors = ["text-yellow-400", "text-gray-300", "text-amber-600"];

const initialEntries: Entry[] = [
  { id: 1, name: "Alex Rivera", score: 285, badge: "Elite" },
  { id: 2, name: "Jordan Kim", score: 240, badge: "Pro" },
  { id: 3, name: "Sam Patel", score: 198, badge: "Pro" },
  { id: 4, name: "Casey Morgan", score: 152, badge: "Active" },
  { id: 5, name: "Taylor Brooks", score: 120, badge: "Active" },
];

const Leaderboard = () => {
  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [badge, setBadge] = useState<Entry["badge"]>("Active");

  const addEntry = () => {
    if (!name.trim()) { toast.error("Enter a name"); return; }
    setEntries((e) => [...e, { id: Date.now(), name, score, badge }]);
    setName(""); setScore(0);
    toast.success("Entry added!");
  };

  const deleteEntry = (id: number) => {
    setEntries((e) => e.filter((x) => x.id !== id));
    toast.success("Entry removed");
  };

  const sortByScore = () => setEntries((e) => [...e].sort((a, b) => b.score - a.score));
  const sortByName = () => setEntries((e) => [...e].sort((a, b) => a.name.localeCompare(b.name)));

  return (
    <section id="leaderboard" className="py-24 px-4 max-w-7xl mx-auto relative z-10">
      <p className="section-label mb-2">// 05. Leaderboard</p>
      <h2 className="font-heading text-4xl sm:text-5xl text-foreground mb-8">TOP <span className="text-primary">PERFORMERS</span></h2>

      {/* Add form */}
      <div className="bg-card border border-border rounded-lg p-6 card-hover mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="flex-1 bg-muted border border-border rounded-lg px-4 py-2.5 text-foreground focus:border-primary focus:outline-none transition-colors" />
          <input type="number" value={score} onChange={(e) => setScore(+e.target.value)} placeholder="Score" className="w-28 bg-muted border border-border rounded-lg px-4 py-2.5 text-foreground focus:border-primary focus:outline-none transition-colors" />
          <select value={badge} onChange={(e) => setBadge(e.target.value as Entry["badge"])} className="bg-muted border border-border rounded-lg px-4 py-2.5 text-foreground focus:border-primary focus:outline-none transition-colors">
            <option>Elite</option><option>Pro</option><option>Active</option>
          </select>
          <button onClick={addEntry} className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-lg btn-glow transition-all hover:scale-[1.02]">
            <Plus size={18} /> Add
          </button>
        </div>
      </div>

      {/* Sort buttons */}
      <div className="flex gap-2 mb-4">
        <button onClick={sortByScore} className="flex items-center gap-1 bg-muted border border-border text-muted-foreground px-4 py-2 rounded-lg hover:text-primary transition-colors text-sm font-mono">
          <ArrowUpDown size={14} /> Score
        </button>
        <button onClick={sortByName} className="flex items-center gap-1 bg-muted border border-border text-muted-foreground px-4 py-2 rounded-lg hover:text-primary transition-colors text-sm font-mono">
          <ArrowUpDown size={14} /> Name
        </button>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden card-hover">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="font-mono text-xs text-muted-foreground uppercase p-4 text-left">Rank</th>
              <th className="font-mono text-xs text-muted-foreground uppercase p-4 text-left">Name</th>
              <th className="font-mono text-xs text-muted-foreground uppercase p-4 text-left">Score</th>
              <th className="font-mono text-xs text-muted-foreground uppercase p-4 text-left">Badge</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => (
              <tr key={e.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className={`p-4 font-mono font-bold ${rankColors[i] || "text-muted-foreground"}`}>#{i + 1}</td>
                <td className="p-4 font-semibold text-foreground">{e.name}</td>
                <td className="p-4 mono-num text-primary">{e.score} pts</td>
                <td className="p-4">
                  <span className={`inline-block font-mono text-xs px-3 py-1 rounded-full border ${badgeColors[e.badge]}`}>{e.badge}</span>
                </td>
                <td className="p-4">
                  <button onClick={() => deleteEntry(e.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Leaderboard;
