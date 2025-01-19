import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Task } from '@/payload-types';

export const TasksAccordeon = ({ tasks }: { tasks: Task['tasks'] }) => {
  if (!tasks) return null;
  return (
    <Accordion type="single" collapsible className="w-full">
      {tasks.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{item.taskTitle}</AccordionTrigger>
          <AccordionContent>{item.description}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
