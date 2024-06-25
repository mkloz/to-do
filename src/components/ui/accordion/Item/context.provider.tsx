import React from 'react';

interface IAccordionItemContext {
  onCollapse: () => void;
}

const AccordionItemContext = React.createContext<IAccordionItemContext | null>(
  null,
);

export function useAccordionItemContext() {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      'AccordionItem compound components cannot be rendered outside the AccordionItem component',
    );
  }
  return context;
}

export function AccordionItemProvider({
  children,
  onCollapse,
}: {
  children: React.ReactNode;
  onCollapse: () => void;
}) {
  return (
    <AccordionItemContext.Provider value={{ onCollapse }}>
      {children}
    </AccordionItemContext.Provider>
  );
}
