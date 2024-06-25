import { useEffect, useRef } from 'react';

interface ContentEditableProps extends React.HTMLProps<HTMLDivElement> {
  value: string;
  isEditable: boolean;
  onValueChange?: (value: string) => void;
}

export default function ContentEditable({
  isEditable = true,
  value = '',
  onValueChange,
  ...props
}: ContentEditableProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = value;
    }
  }, [value]);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [isEditable]);

  return (
    <div
      contentEditable={isEditable}
      onFocus={(event) => {
        const range = document.createRange();
        range.selectNodeContents(event.currentTarget);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }}
      {...props}
      onInput={(event) => {
        if (event.currentTarget.textContent !== value) {
          onValueChange?.(event.currentTarget.textContent || '');
        }
      }}
      ref={ref}
    />
  );
}
