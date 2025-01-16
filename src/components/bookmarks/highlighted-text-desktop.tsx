"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { handleCopyClick } from "@/lib/utils";
import { BookmarkFilledIcon, CopyIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { MultiDialogProvider } from "../ui/multi-dialog";
import { CreateBookmarkContent } from "./create-bookmark";

export function HighlightedTextDesktop({ children }: { children: React.ReactNode }) {
  const [textSelected, setTextSelected] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<string>("");
  const [selection, setSelection] = useState<Selection | null>(null);
  useEffect(() => {
    const updateTextSelection = () => {
      setSelection(window.getSelection());
      const isTextSelected =
        selection &&
        selection.type !== "None" &&
        selection.rangeCount > 0 &&
        (!selection.getRangeAt(0).collapsed as boolean);
      setTextSelected(!isTextSelected);
      if (isTextSelected) {
        setSelectedText(selection.toString());
      }
    };

    // Update text selection state on mouse up and key up events
    document.addEventListener("mouseup", updateTextSelection);
    document.addEventListener("keyup", updateTextSelection);

    return () => {
      // Clean up event listeners when the component is unmounted
      document.removeEventListener("mouseup", updateTextSelection);
      document.removeEventListener("keyup", updateTextSelection);
    };
  }, [textSelected, selection]);

  enum dialogs {
    createBookmark = "createBookmark",
  }

  return (
    <div className="selection:bg-gray-700 selection:text-gray-300 selection:dark:bg-gray-300 selection:dark:text-gray-700">
      <MultiDialogProvider<dialogs>>
        {({ Trigger, Container }) => (
          <>
            <ContextMenu>
              <ContextMenuTrigger>{children}</ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  className="gap-2"
                  disabled={textSelected}
                  onClick={() => handleCopyClick(selection!.toString(), "Text")}
                >
                  <CopyIcon />
                  Kopírovat
                </ContextMenuItem>
                <ContextMenuSeparator />
                <Trigger value={dialogs.createBookmark}>
                  <ContextMenuItem className="gap-2" disabled={textSelected}>
                    <BookmarkFilledIcon />
                    Vytvořit záložku
                  </ContextMenuItem>
                </Trigger>
              </ContextMenuContent>
            </ContextMenu>
            <Container value={dialogs.createBookmark}>
              <CreateBookmarkContent selection={selectedText} />
            </Container>
          </>
        )}
      </MultiDialogProvider>
    </div>
  );
}
