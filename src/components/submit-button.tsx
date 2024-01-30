"use client";

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function SubmitButton({ children, className }: { children: ReactNode; className?: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className={`disabled:bg-zinc-500 ${className}`} disabled={pending}>
      {children}
    </Button>
  );
}
