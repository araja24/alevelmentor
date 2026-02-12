"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface AccordionContextValue {
  openItems: Set<string>;
  toggle: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextValue>({
  openItems: new Set(),
  toggle: () => {},
});

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  defaultValue?: string[];
}

function Accordion({ type = "single", defaultValue = [], className, children, ...props }: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set(defaultValue));

  const toggle = React.useCallback(
    (value: string) => {
      setOpenItems((prev) => {
        const next = new Set(prev);
        if (next.has(value)) {
          next.delete(value);
        } else {
          if (type === "single") next.clear();
          next.add(value);
        }
        return next;
      });
    },
    [type]
  );

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div className={cn("", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

function AccordionItem({ value, className, children, ...props }: AccordionItemProps) {
  return (
    <div className={cn("border-b border-border", className)} data-value={value} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{ itemValue?: string }>, { itemValue: value });
        }
        return child;
      })}
    </div>
  );
}

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  itemValue?: string;
}

function AccordionTrigger({ className, children, itemValue, ...props }: AccordionTriggerProps) {
  const ctx = React.useContext(AccordionContext);
  const isOpen = itemValue ? ctx.openItems.has(itemValue) : false;

  return (
    <button
      type="button"
      className={cn(
        "flex flex-1 w-full items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      data-state={isOpen ? "open" : "closed"}
      onClick={() => itemValue && ctx.toggle(itemValue)}
      {...props}
    >
      {children}
      <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")} />
    </button>
  );
}

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  itemValue?: string;
}

function AccordionContent({ className, children, itemValue, ...props }: AccordionContentProps) {
  const ctx = React.useContext(AccordionContext);
  const isOpen = itemValue ? ctx.openItems.has(itemValue) : false;

  if (!isOpen) return null;

  return (
    <div className={cn("overflow-hidden pb-4 pt-0 text-sm", className)} {...props}>
      {children}
    </div>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
