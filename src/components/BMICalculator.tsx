import { useState } from "react";
import { Calculator, Scale, Heart, Activity, Utensils } from "lucide-react";
import { toast } from "sonner";

const BMICalculator = () => {
  const [metric, setMetric] = useState(true);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [result, setResult] = useState<null | {
    bmi: number; category: string; color: string; idealRange: string;
    delta: string; tdee: number; risk: string; advice: string; pct: number;
  }>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = metric ? parseFloat(height) / 100 : (parseFloat(height) * 12 + parseFloat(heightIn || "0")) * 0.0254;
    const a = parseInt(age);
    const wKg = metric ? w : w * 0.453592;
    const hCm = metric ? parseFloat(height) : (parseFloat(height) * 12 + parseFloat(heightIn || "0")) * 2.54;

    if (!w || !h || !a || h <= 0) { toast.error("Fill in all fields"); return; }

    const bmi = wKg / (h * h);
    let category: string, color: string, risk: string;
    if (bmi < 18.5) { category = "Underweight"; color = "text-secondary"; risk = "Low (nutritional deficiency risk)"; }
    else if (bmi < 25) { category = "Normal"; color = "text-primary"; risk = "Very Low"; }
    else if (bmi < 30) { category = "Overweight"; color = "text-yellow-400"; risk = "Moderate"; }
    else { category = "Obese"; color = "text-destructive"; risk = "High"; }

    // Devine formula ideal weight
    const hInches = hCm / 2.54;
    const baseM = 50 + 2.3 * (hInches - 60);
    const baseF = 45.5 + 2.3 * (hInches - 60);
    const idealLow = gender === "Male" ? baseM - 5 : baseF - 5;
    const idealHigh = gender === "Male" ? baseM + 5 : baseF + 5;
    const idealRange = `${idealLow.toFixed(1)} – ${idealHigh.toFixed(1)} kg`;
    const idealMid = (idealLow + idealHigh) / 2;
    const delta = wKg > idealHigh ? `Lose ${(wKg - idealHigh).toFixed(1)} kg` : wKg < idealLow ? `Gain ${(idealLow - wKg).toFixed(1)} kg` : "On target!";

    // Mifflin-St Jeor × 1.55
    let bmr: number;
    if (gender === "Male") bmr = 10 * wKg + 6.25 * hCm - 5 * a + 5;
    else bmr = 10 * wKg + 6.25 * hCm - 5 * a - 161;
    const tdee = Math.round(bmr * 1.55);

    const pct = Math.min(Math.max(((bmi - 10) / 35) * 100, 0), 100);

    const advice = category === "Normal"
      ? "Great job! Maintain a balanced diet and regular exercise to stay in your healthy range."
      : category === "Underweight"
        ? "Consider increasing your caloric intake with nutrient-dense foods and strength training."
        : category === "Overweight"
          ? "A moderate calorie deficit with regular cardio and strength training can help reach a healthy weight."
          : "Consult a healthcare professional. Focus on sustainable lifestyle changes for long-term health.";

    setResult({ bmi, category, color, idealRange, delta, tdee, risk, advice, pct });
    toast.success("BMI calculated!");
  };

  const scaleRef = [
    { label: "Underweight", range: "<18.5", color: "bg-secondary" },
    { label: "Normal", range: "18.5–24.9", color: "bg-primary" },
    { label: "Overweight", range: "25–29.9", color: "bg-yellow-400" },
    { label: "Obese", range: "30+", color: "bg-destructive" },
  ];

  return (
    <section id="bmi" className="py-24 px-4 max-w-7xl mx-auto relative z-10">
      <p className="section-label mb-2">// 04. BMI Calculator</p>
      <h2 className="font-heading text-4xl sm:text-5xl text-foreground mb-8">CHECK YOUR <span className="text-secondary">BMI</span></h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left panel */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6 card-hover space-y-4">
            {/* Unit toggle */}
            <div className="flex gap-2">
              {["Metric", "Imperial"].map((u) => (
                <button key={u} onClick={() => setMetric(u === "Metric")} className={`flex-1 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-colors ${(u === "Metric") === metric ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground border border-border"}`}>
                  {u}
                </button>
              ))}
            </div>
            <div>
              <label className="font-mono text-xs text-muted-foreground block mb-1">Weight ({metric ? "kg" : "lbs"})</label>
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-foreground focus:border-primary focus:outline-none transition-colors" />
            </div>
            <div className={metric ? "" : "grid grid-cols-2 gap-3"}>
              <div>
                <label className="font-mono text-xs text-muted-foreground block mb-1">Height ({metric ? "cm" : "ft"})</label>
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-foreground focus:border-primary focus:outline-none transition-colors" />
              </div>
              {!metric && (
                <div>
                  <label className="font-mono text-xs text-muted-foreground block mb-1">Inches</label>
                  <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-foreground focus:border-primary focus:outline-none transition-colors" />
                </div>
              )}
            </div>
            <div>
              <label className="font-mono text-xs text-muted-foreground block mb-1">Age</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-foreground focus:border-primary focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="font-mono text-xs text-muted-foreground block mb-1">Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-foreground focus:border-primary focus:outline-none transition-colors">
                <option>Male</option><option>Female</option><option>Prefer not to say</option>
              </select>
            </div>
            <button onClick={calculate} className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg btn-glow transition-all hover:scale-[1.02]">
              <Calculator size={18} /> Calculate
            </button>
          </div>
          {/* Scale reference */}
          <div className="bg-card border border-border rounded-lg p-4 card-hover">
            <p className="font-mono text-xs text-muted-foreground uppercase mb-3">BMI Scale Reference</p>
            <div className="space-y-2">
              {scaleRef.map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${s.color}`} />
                  <span className="text-sm text-foreground font-medium w-24">{s.label}</span>
                  <span className="font-mono text-xs text-muted-foreground">{s.range}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel – result */}
        {result && (
          <div className="space-y-4 animate-fade-up">
            <div className="bg-card border border-border rounded-lg p-6 card-hover text-center">
              <div className={`mono-num text-6xl font-bold ${result.color}`}>{result.bmi.toFixed(1)}</div>
              <div className={`inline-block mt-2 font-mono text-sm px-4 py-1 rounded-full border ${result.color} border-current bg-current/10`}>{result.category}</div>
              {/* Gradient bar */}
              <div className="mt-6 relative h-3 rounded-full overflow-hidden" style={{ background: "linear-gradient(to right, hsl(204,100%,68%), hsl(72,88%,59%), hsl(50,100%,60%), hsl(0,100%,69%))" }}>
                <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-foreground border-2 border-background transition-all duration-700" style={{ left: `calc(${result.pct}% - 8px)` }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <Scale size={20} />, label: "Ideal Weight", value: result.idealRange },
                { icon: <Activity size={20} />, label: "Weight Goal", value: result.delta },
                { icon: <Utensils size={20} />, label: "Daily Calories", value: `${result.tdee} kcal` },
                { icon: <Heart size={20} />, label: "Health Risk", value: result.risk },
              ].map((c, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4 card-hover text-center">
                  <div className="text-primary mb-1 flex justify-center">{c.icon}</div>
                  <div className="font-mono text-xs text-muted-foreground uppercase">{c.label}</div>
                  <div className="text-sm font-semibold text-foreground mt-1">{c.value}</div>
                </div>
              ))}
            </div>

            <div className="bg-card border border-border rounded-lg p-5 card-hover">
              <p className="font-mono text-xs text-muted-foreground uppercase mb-2">Personalized Advice</p>
              <p className="text-sm text-foreground leading-relaxed">{result.advice}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BMICalculator;
