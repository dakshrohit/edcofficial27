import { useState } from "react";
import { Cell, Label, Pie, PieChart } from "recharts";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const allocation = [
  { name: "Research", value: 40, fill: "var(--lime)", swatch: "bg-lime" },
  { name: "Strategy", value: 35, fill: "var(--industrial)", swatch: "bg-industrial" },
  { name: "Launch", value: 25, fill: "var(--electric)", swatch: "bg-electric" },
];
const config = {
  Research: { label: "Research", color: "var(--lime)" },
  Strategy: { label: "Strategy", color: "var(--industrial)" },
  Launch: { label: "Launch", color: "var(--electric)" },
} satisfies ChartConfig;

export function SprintChart() {
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered ?? selected;
  const item = active === null ? undefined : allocation[active];

  return (
    <div className="dashboard-card w-full min-w-0 border-2 border-ink bg-canvas shadow-hard">
      <div className="flex items-center justify-between gap-3 border-b-2 border-ink bg-ink px-4 py-4 text-electric-foreground">
        <h2 className="text-sm font-black uppercase">Sprint allocation</h2>
        <Button variant="ghost" size="icon" className="shrink-0 rounded-none border-2 border-electric-foreground hover:bg-electric hover:text-electric-foreground" aria-label="Reset chart selection" title="Reset selection" onClick={() => { setSelected(null); setHovered(null); }}>
          <RotateCcw />
        </Button>
      </div>
      <div className="px-4 pt-4 text-xs font-bold uppercase">Illustrative 4-week sprint</div>
      <ChartContainer config={config} className="mx-auto aspect-square h-[250px] w-full max-w-[280px]" aria-label="Sprint allocation: Research 40 percent, Strategy 35 percent, Launch 25 percent">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel className="rounded-none border-2 border-ink bg-surface font-bold shadow-hard" formatter={(value, name) => <span>{name}: {value}%</span>} />} />
          <Pie data={allocation} dataKey="value" nameKey="name" innerRadius={65} outerRadius={100} paddingAngle={3} stroke="var(--ink)" strokeWidth={3} isAnimationActive={false} onMouseEnter={(_, index) => setHovered(index)} onMouseLeave={() => setHovered(null)} onClick={(_, index) => setSelected(selected === index ? null : index)}>
            {allocation.map((segment, index) => <Cell key={segment.name} fill={segment.fill} opacity={active === null || active === index ? 1 : 0.35} className="cursor-pointer" />)}
            <Label content={({ viewBox }) => {
              if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox) || typeof viewBox.cx !== "number" || typeof viewBox.cy !== "number") return null;
              return <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                <tspan x={viewBox.cx} y={viewBox.cy - 5} className="fill-ink font-display text-4xl font-black">{item ? `${item.value}%` : "4"}</tspan>
                <tspan x={viewBox.cx} y={viewBox.cy + 25} className="fill-ink text-xs font-bold uppercase">{item?.name ?? "Weeks"}</tspan>
              </text>;
            }} />
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="grid border-t-2 border-ink" aria-label="Sprint phases">
        {allocation.map((segment, index) => (
          <Button key={segment.name} variant="ghost" aria-pressed={selected === index} onClick={() => setSelected(selected === index ? null : index)} className={`h-11 justify-start rounded-none px-4 font-bold hover:bg-lime hover:text-ink ${index > 0 ? "border-t-2 border-ink" : ""} ${selected === index ? "bg-ink text-electric-foreground" : "text-ink"}`}>
            <span className={`size-3 border-2 border-ink ${segment.swatch}`} aria-hidden="true" />
            {segment.name}<span className="ml-auto">{segment.value}%</span>
          </Button>
        ))}
      </div>
      <div className="border-t-2 border-ink px-4 py-3 text-xs font-bold uppercase" aria-live="polite">{item ? `${item.name} / ${item.value}% of sprint` : "Discover → Plan → Launch"}</div>
    </div>
  );
}