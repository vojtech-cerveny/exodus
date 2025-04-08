"use client";

import { updateBrotherhoodAction } from "@/domain/brotherhood/brotherhood-action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SubmitButton from "../submit-button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";

interface BrotherhoodSettingsFormProps {
  brotherhoodId: string;
  userId: string;
  initialData: {
    description?: string | null;
    visibility: boolean;
  };
}

export function BrotherhoodSettingsForm({ brotherhoodId, userId, initialData }: BrotherhoodSettingsFormProps) {
  const [visibility, setVisibility] = useState(initialData.visibility);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await updateBrotherhoodAction(brotherhoodId, userId, formData);
    router.refresh();
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="grid h-full w-full gap-2">
        <Label htmlFor="description">Popis bratrstva</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={initialData.description || ""}
          placeholder="Popište účel a cíle vašeho bratrstva..."
        />
      </div>

      <div className="flex items-center justify-between space-x-2">
        <Label htmlFor="visibility">Veřejné bratrstvo</Label>
        <Switch id="visibility" name="visibility" checked={visibility} onCheckedChange={setVisibility} />
      </div>
      <p className="text-muted-foreground text-sm">
        Veřejné bratrstvo bude viditelné pro ostatní uživatele a budou se moci připojit bez pozvánky. Pro veřejné
        bratrstvo je vyžadován popis.
      </p>

      <div className="flex justify-end">
        <SubmitButton>Uložit změny</SubmitButton>
      </div>
    </form>
  );
}
