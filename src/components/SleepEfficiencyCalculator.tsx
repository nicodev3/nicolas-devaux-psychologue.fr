import { useState, useMemo } from "react";

type SleepInputs = {
  bedtime: string;
  waketime: string;
  sleepLatency: string;
  nightAwakenings: string;
  earlyMorning: string;
};

type EfficiencyLevel = "very-good" | "good" | "moderate" | "low";

function parseMinutes(val: string): number {
  const n = parseInt(val, 10);
  return isNaN(n) || n < 0 ? 0 : n;
}

function timeToMinutes(time: string): number | null {
  if (!time) return null;
  const parts = time.split(":");
  if (parts.length !== 2) return null;
  const h = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);
  if (isNaN(h) || isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59) return null;
  return h * 60 + m;
}

function formatDuration(mins: number): string {
  if (mins <= 0) return "0 min";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h}h`;
  return `${h}h${String(m).padStart(2, "0")}`;
}

function getEfficiencyLevel(pct: number): EfficiencyLevel {
  if (pct >= 90) return "very-good";
  if (pct >= 85) return "good";
  if (pct >= 80) return "moderate";
  return "low";
}

const LEVEL_CONFIG: Record<
  EfficiencyLevel,
  {
    label: string;
    description: string;
    barColor: string;
    badgeClass: string;
    alertClass: string;
  }
> = {
  "very-good": {
    label: "Très bonne efficacité",
    description:
      "Votre efficacité de sommeil est excellente. Votre temps au lit correspond bien à votre temps de sommeil effectif.",
    barColor: "bg-green-500",
    badgeClass: "bg-green-100 text-green-700",
    alertClass: "border-green-200 bg-green-50 text-green-800",
  },
  good: {
    label: "Bonne efficacité",
    description:
      "Votre efficacité de sommeil est satisfaisante. Elle reste dans les limites recommandées par la TCC-I.",
    barColor: "bg-lime-500",
    badgeClass: "bg-lime-100 text-lime-700",
    alertClass: "border-lime-200 bg-lime-50 text-lime-800",
  },
  moderate: {
    label: "Efficacité moyenne",
    description:
      "Votre efficacité de sommeil est modérée. Des marges d'amélioration existent, notamment en travaillant sur le temps passé au lit.",
    barColor: "bg-amber-400",
    badgeClass: "bg-amber-100 text-amber-700",
    alertClass: "border-amber-200 bg-amber-50 text-amber-800",
  },
  low: {
    label: "Efficacité faible",
    description:
      "Votre efficacité de sommeil est faible. Passer davantage de temps au lit que de temps à dormir peut entretenir l'insomnie. Un accompagnement en TCC-I peut être bénéfique.",
    barColor: "bg-orange-500",
    badgeClass: "bg-orange-100 text-orange-700",
    alertClass: "border-orange-200 bg-orange-50 text-orange-800",
  },
};

interface NumberInputProps {
  id: string;
  label: string;
  hint: string;
  value: string;
  onChange: (val: string) => void;
}

function NumberInput({ id, label, hint, value, onChange }: NumberInputProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-ink-primary">
        {label}
      </label>
      <p className="mb-2 text-xs text-ink-tertiary">{hint}</p>
      <div className="relative">
        <input
          id={id}
          type="number"
          min="0"
          max="480"
          placeholder="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-border-strong bg-transparent py-2.5 pl-3 pr-12 text-sm text-ink-primary placeholder:text-ink-tertiary focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-tertiary">
          min
        </span>
      </div>
    </div>
  );
}

export default function SleepEfficiencyCalculator() {
  const [inputs, setInputs] = useState<SleepInputs>({
    bedtime: "",
    waketime: "",
    sleepLatency: "",
    nightAwakenings: "",
    earlyMorning: "",
  });

  function handleChange(key: keyof SleepInputs, value: string) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  const results = useMemo(() => {
    const bedMins = timeToMinutes(inputs.bedtime);
    const wakeMins = timeToMinutes(inputs.waketime);
    if (bedMins === null || wakeMins === null) return null;

    let timeInBed = wakeMins - bedMins;
    if (timeInBed <= 0) timeInBed += 24 * 60;

    if (timeInBed < 30) return null;

    const latency = parseMinutes(inputs.sleepLatency);
    const awakenings = parseMinutes(inputs.nightAwakenings);
    const earlyMorning = parseMinutes(inputs.earlyMorning);
    const totalWake = latency + awakenings + earlyMorning;

    const estimatedSleep = Math.max(0, timeInBed - totalWake);
    const efficiency = Math.round((estimatedSleep / timeInBed) * 100);

    return { timeInBed, estimatedSleep, efficiency };
  }, [inputs]);

  const levelConfig = results ? LEVEL_CONFIG[getEfficiencyLevel(results.efficiency)] : null;

  return (
    <div className="space-y-6">
      {/* Input card */}
      <div className="rounded-xl border border-border-subtle p-6 md:p-8">
        <h2 className="font-display typo-display-lg mb-6 text-ink-primary">Vos données de sommeil</h2>

        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="bedtime" className="mb-1.5 block text-sm font-medium text-ink-primary">
                Heure habituelle du coucher
              </label>
              <input
                id="bedtime"
                type="time"
                value={inputs.bedtime}
                onChange={(e) => handleChange("bedtime", e.target.value)}
                className="w-full rounded-lg border border-border-strong bg-transparent px-3 py-2.5 text-sm text-ink-primary focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>
            <div>
              <label htmlFor="waketime" className="mb-1.5 block text-sm font-medium text-ink-primary">
                Heure habituelle du lever
              </label>
              <input
                id="waketime"
                type="time"
                value={inputs.waketime}
                onChange={(e) => handleChange("waketime", e.target.value)}
                className="w-full rounded-lg border border-border-strong bg-transparent px-3 py-2.5 text-sm text-ink-primary focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>
          </div>

          <div className="rounded-lg bg-secondary/40 p-4 md:p-5">
            <p className="mb-4 text-sm text-ink-secondary">
              Indiquez les durées moyennes d'éveil. Entrez <strong>0</strong> si la situation ne vous
              concerne pas.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <NumberInput
                id="sleep-latency"
                label="Temps pour s'endormir"
                hint="Latence d'endormissement"
                value={inputs.sleepLatency}
                onChange={(val) => handleChange("sleepLatency", val)}
              />
              <NumberInput
                id="night-awakenings"
                label="Éveils pendant la nuit"
                hint="Temps total éveillé"
                value={inputs.nightAwakenings}
                onChange={(val) => handleChange("nightAwakenings", val)}
              />
              <NumberInput
                id="early-morning"
                label="Éveil trop tôt le matin"
                hint="Avant l'heure du lever"
                value={inputs.earlyMorning}
                onChange={(val) => handleChange("earlyMorning", val)}
              />
            </div>
          </div>
        </div>

        {!results && (
          <p className="mt-5 flex items-center gap-2 text-sm text-ink-tertiary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            Renseignez l'heure du coucher et du lever pour voir vos résultats.
          </p>
        )}
      </div>

      {/* Results card */}
      {results && levelConfig && (
        <div className="rounded-xl border border-border-subtle p-6 md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display typo-display-lg text-ink-primary">Résultats</h2>
            <span className={`rounded-full px-3 py-1 text-sm font-medium ${levelConfig.badgeClass}`}>
              {levelConfig.label}
            </span>
          </div>

          {/* Score + progress bar */}
          <div className="mb-6">
            <div className="mb-3 flex items-baseline gap-2">
              <span className="font-display text-5xl font-medium tabular-nums text-ink-primary">
                {results.efficiency}
              </span>
              <span className="text-2xl text-ink-tertiary">%</span>
              <span className="text-sm text-ink-secondary">d'efficacité du sommeil</span>
            </div>
            <div
              className="relative h-4 overflow-hidden rounded-full bg-surface-muted"
              role="progressbar"
              aria-valuenow={results.efficiency}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Efficacité du sommeil : ${results.efficiency} %`}
            >
              <div
                className={`h-4 rounded-full transition-all duration-700 ease-out ${levelConfig.barColor}`}
                style={{ width: `${Math.min(100, results.efficiency)}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-ink-tertiary">
              <span>0 %</span>
              <span>80 %</span>
              <span>85 %</span>
              <span>90 %</span>
              <span>100 %</span>
            </div>
          </div>

          {/* Summary stats */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border-subtle bg-secondary/30 px-5 py-4">
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-ink-tertiary">
                Temps au lit
              </p>
              <p className="font-display text-2xl text-ink-primary">{formatDuration(results.timeInBed)}</p>
            </div>
            <div className="rounded-lg border border-border-subtle bg-secondary/30 px-5 py-4">
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-ink-tertiary">
                Temps de sommeil estimé
              </p>
              <p className="font-display text-2xl text-ink-primary">
                {formatDuration(results.estimatedSleep)}
              </p>
            </div>
          </div>

          {/* Legend */}
          <div className="mb-5 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-orange-100 px-2.5 py-1 font-medium text-orange-700">
              {"< 80 % : Faible"}
            </span>
            <span className="rounded-full bg-amber-100 px-2.5 py-1 font-medium text-amber-700">
              80–85 % : Moyenne
            </span>
            <span className="rounded-full bg-lime-100 px-2.5 py-1 font-medium text-lime-700">
              85–90 % : Bonne
            </span>
            <span className="rounded-full bg-green-100 px-2.5 py-1 font-medium text-green-700">
              ≥ 90 % : Très bonne
            </span>
          </div>

          {/* Interpretation */}
          <div className={`rounded-lg border p-4 text-sm ${levelConfig.alertClass}`}>
            {levelConfig.description}
          </div>

          {/* Disclaimer */}
          <p className="mt-4 flex items-start gap-1.5 text-xs text-ink-tertiary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mt-0.5 h-3.5 w-3.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            Cet outil fournit uniquement une estimation et ne remplace pas un avis médical ou
            psychologique.
          </p>
        </div>
      )}
    </div>
  );
}
