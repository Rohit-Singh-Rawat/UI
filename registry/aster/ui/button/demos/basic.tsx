"use client";

import { Button } from "@/registry/aster/ui/button/button";

export default function BasicDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>Continue</Button>
      <Button variant="outline">Cancel</Button>
      <Button variant="ghost">Skip</Button>
    </div>
  );
}
