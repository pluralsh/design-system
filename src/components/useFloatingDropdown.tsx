import { MutableRefObject, useMemo } from 'react';
import { useTheme } from 'styled-components';
import { autoUpdate, size, useFloating } from '@floating-ui/react-dom-interactions';
import { mergeRefs } from 'react-merge-refs';
import { SelectProps } from './Select';

export function useFloatingDropdown({
  placement, triggerRef, width, maxHeight,
}: Pick<SelectProps, 'placement' | 'width' | 'maxHeight'> & { triggerRef: MutableRefObject<any>; }) {
  const theme = useTheme();

  const floating = useFloating({
    placement: `bottom-${placement === 'left' ? 'start' : 'end'}`,
    strategy: 'fixed',
    middleware: [
      size({
        apply(args) {
          const { elements, availableHeight, rects } = args;

          const maxH = typeof maxHeight === 'string'
            ? maxHeight
            : maxHeight
              ? Math.min(availableHeight - theme.spacing.xxsmall, maxHeight)
              : Math.min(availableHeight - theme.spacing.xxsmall, 230);

          Object.assign(elements.floating.style, {
            maxWidth: typeof width === 'string' && width
              ? width
              : `${typeof width === 'number' ? width : rects.reference.width}px`,
            maxHeight: `${maxH}px`,
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });
  const mergedRef = useMemo(() => mergeRefs([floating.reference, triggerRef]),
    [floating.reference, triggerRef]);

  return { floating, triggerRef: mergedRef };
}
