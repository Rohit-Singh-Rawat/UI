/**
 * Systems on the roadmap that don't exist in the registry yet. They render
 * as blueprint-only cards on /systems | unbuilt means blueprint only.
 * Remove an entry here when the real system ships in registry.json.
 */
export interface PlannedSystem {
  slug: string;
  title: string;
}

export const plannedSystems: PlannedSystem[] = [
  { slug: "select", title: "Select" },
  { slug: "dialog", title: "Dialog" },
  { slug: "checkbox", title: "Checkbox" },
  { slug: "switch", title: "Switch" },
  { slug: "tooltip", title: "Tooltip" },
  { slug: "radio", title: "Radio" },
  { slug: "slider", title: "Slider" },
  { slug: "input", title: "Input" },
];
