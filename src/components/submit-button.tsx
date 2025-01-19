'use client';

import { Half2Icon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';
import { Button, ButtonProps } from './ui/button';

export default function SubmitButton({ children, className, ...props }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className={`disabled:bg-zinc-500 ${className}`} disabled={pending} {...props}>
      {pending && <Half2Icon className="ml-2 animate-spin" />}
      {children}
    </Button>
  );
}
