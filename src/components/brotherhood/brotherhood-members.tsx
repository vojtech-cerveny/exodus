import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

export function BrotherhoodMembers({
  members,
}: {
  members: {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    brotherhoodId: string | null;
  }[];
}) {
  if (!members) {
    return <div>Zatím žádní členové</div>;
  }

  return (
    <div className="flex gap-2">
      {members.map((member: any) => (
        <div key={member.id} className="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100 shadow-md">
          <Avatar>
            <AvatarImage src={member.image} />
            <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
          </Avatar>
        </div>
      ))}
    </div>
  );
}
