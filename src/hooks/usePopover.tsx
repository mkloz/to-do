// import { Placement } from '@popperjs/core';
// import { HTMLProps, useState } from 'react';
// import { usePopper } from 'react-popper';

// export function usePopover({
//   placement = 'top',
//   flip = true,
// }: {
//   placement?: Placement;
//   flip?: boolean;
// }) {
//   const [referenceElement, elementRef] = useState<HTMLElement | null>(null);
//   const [popperElement, popoverRef] = useState<HTMLElement | null>(null);
//   const [arrowElement, arrowRef] = useState<HTMLElement | null>(null);
//   const popper = usePopper(referenceElement, popperElement, {
//     placement,
//     strategy: 'absolute',
//     modifiers: [
//       { name: 'arrow', options: { element: arrowElement } },
//       { name: 'offset', options: { offset: [10, 10] } },
//       flip ? { name: 'flip', options: { padding: 8 } } : {},
//       { name: 'hide' },
//     ],
//   });

//   const Popover = (props: HTMLProps<HTMLDivElement>) => (
//     <div
//       {...props}
//       ref={popoverRef}
//       style={popper.styles.popper}
//       {...popper.attributes.popper}
//     >
//       {props.children}
//       <div ref={arrowRef} style={popper.styles.arrow} />
//     </div>
//   );

//   return {
//     elementRef,
//     popoverRef,
//     arrowRef,
//     Popover,
//   };
// }
