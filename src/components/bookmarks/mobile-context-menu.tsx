import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

function MobileContextMenu({
  position,
  onClose,
  children,
}: {
  position: { top: number; left: number };
  onClose: () => void;
  children: React.ReactNode;
}) {
  // Prevents the context menu from closing when clicking inside
  const handleContextMenu = (e: any) => {
    e.preventDefault();
  };

  return (
    <div
      style={{ position: "absolute", top: position.top, left: position.left }}
      className="flex gap-1 rounded-md border bg-white p-4 shadow-md"
      onContextMenu={handleContextMenu}
    >
      {children}
      <Button variant="link" onClick={onClose}>
        <Cross1Icon />
      </Button>
    </div>
  );
}

export default MobileContextMenu;
