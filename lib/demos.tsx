import type { ComponentType } from "react";
import BasicDemo from "@/registry/aster/ui/button/demos/basic";
import PressedDemo from "@/registry/aster/ui/button/demos/pressed";

/**
 * Live demo components per primitive slug. Code strings come from the
 * loader; this map provides the rendered instances. Order here is the
 * display order; names must match the demo file names.
 */
export const demoRegistry: Record<
  string,
  { name: string; Component: ComponentType }[]
> = {
  button: [
    { name: "basic", Component: BasicDemo },
    { name: "pressed", Component: PressedDemo },
  ],
};
