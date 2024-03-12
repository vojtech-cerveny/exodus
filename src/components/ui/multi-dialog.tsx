import { Slot, SlotProps } from "@radix-ui/react-slot";
import { createContext, useCallback, useContext, useState } from "react";
import { Dialog } from "./dialog";

type Maybe<T> = T | null | undefined;

const MultiDialogContainerContext = createContext<unknown>(null);
MultiDialogContainerContext.displayName = "MultiDialogContainerContext";

export const useMultiDialog = <T = unknown,>() => {
  const s = useContext(MultiDialogContainerContext);
  if (!s) throw new Error("Cannot use 'useMultiDialog' outside 'MultiDialogProvider'.");
  return s as [Maybe<T>, React.Dispatch<React.SetStateAction<Maybe<T>>>];
};

export function MultiDialogTrigger<T>({
  value,
  onClick,
  ...props
}: SlotProps &
  React.RefAttributes<HTMLElement> & {
    value: T;
  }) {
  const [, open] = useMultiDialog();
  const oc = useCallback<React.MouseEventHandler<HTMLElement>>(
    (e) => {
      open(value);
      onClick && onClick(e);
    },
    [value, onClick],
  );
  return <Slot onClick={oc} {...props} />;
}

export function MultiDialogContainer<T>({ value, children }: { value: T; children: React.ReactNode }) {
  const [opened] = useMultiDialog();
  return opened === value ? children ?? null : null;
}

type Builder<T> = {
  Trigger: (...args: Parameters<typeof MultiDialogTrigger<T>>) => React.ReactNode;
  Container: (...args: Parameters<typeof MultiDialogContainer<T>>) => React.ReactNode;
};

const builder = {
  Trigger: MultiDialogTrigger,
  Container: MultiDialogContainer,
};

export const MultiDialogProvider = <T,>({
  defaultOpen = null,
  children,
}: {
  defaultOpen?: T | null;
  children?: React.ReactNode | ((builder: Builder<T>) => React.ReactNode);
}) => {
  const [state, setState] = useState<T | null>(defaultOpen);

  return (
    <MultiDialogContainerContext.Provider value={[state, setState]}>
      <Dialog
        open={state != null}
        onOpenChange={(v) => {
          if (!v) setState(null);
        }}
      >
        {typeof children === "function" ? children(builder) : children}
      </Dialog>
    </MultiDialogContainerContext.Provider>
  );
};
