"use client";

import { handleCopyClick } from "@/lib/utils";
import { BookmarkFilledIcon, CopyIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Button } from "../ui/button";
import { MultiDialogProvider } from "../ui/multi-dialog";

import { useScreenDetector } from "@/app/(app)/hooks/useScreenDetector";
import { CreateBookmarkContent } from "./create-bookmark";
import { HighlightedTextDesktop } from "./highlighted-text-desktop";
import MobileContextMenu from "./mobile-context-menu";

export function HighlightedTextMobile({ children }: { children: React.ReactNode }) {
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const { isMobile } = useScreenDetector();

  const onMouseUp = (e: any) => {
    e.preventDefault();
    const selection = window.getSelection();
    if (selection?.type === "None" || selection?.rangeCount === 0) {
      setIsContextMenuVisible(false);
      return;
    }

    const range = selection!.getRangeAt(0);
    if (range.collapsed) {
      setIsContextMenuVisible(false);
      return;
    }

    const rect = range.getBoundingClientRect();
    setPopupPosition({
      top: rect.top + window.scrollY - 120,
      left: rect.left + window.scrollX,
    });
    setSelectedText(selection!.toString());
    setIsContextMenuVisible(true);
  };

  const handleCopy = () => {
    handleCopyClick(selectedText, "Text");
    setIsContextMenuVisible(false);
  };

  // TODO: Create separate component for managing desktop and mobile views
  if (!isMobile) {
    return <HighlightedTextDesktop>{children}</HighlightedTextDesktop>;
  }

  enum dialogs {
    createBookmark = "createBookmark",
  }

  return (
    <div
      onContextMenu={onMouseUp}
      className="selection:bg-gray-700 selection:text-gray-300 dark:selection:bg-gray-300 dark:selection:text-gray-700"
    >
      {children}
      {isContextMenuVisible && (
        <MobileContextMenu position={popupPosition} onClose={() => setIsContextMenuVisible(false)}>
          <Button onClick={handleCopy}>
            <CopyIcon />
          </Button>
          <MultiDialogProvider<dialogs>>
            {({ Trigger, Container }) => (
              <>
                <Trigger value={dialogs.createBookmark}>
                  <Button>
                    <BookmarkFilledIcon />
                  </Button>
                </Trigger>
                <Container value={dialogs.createBookmark}>
                  <CreateBookmarkContent selection={selectedText} />
                </Container>
              </>
            )}
          </MultiDialogProvider>
        </MobileContextMenu>
      )}
    </div>
  );
}
