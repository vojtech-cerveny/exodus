'use client';

import { useState } from 'react';
import { Label } from './label';
import { Switch } from './switch';

export function FormSwitch({
  label,
  name,
  defaultValue,
  onChange,
}: {
  label: string;
  name: string;
  defaultValue: boolean;
  onChange: any;
}) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="flex items-center space-x-2">
      {/* <div className="flex-1">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      </div>
      <div className="flex h-5 items-center">
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
      </div> */}
      <Switch onCheckedChange={() => onChange(!value)} id="isActive" defaultChecked={value} />
      <Label htmlFor="isActive">Pozvánka je aktivní</Label>
    </div>
  );
}
