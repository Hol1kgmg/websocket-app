import type { BrailleCellProps } from "@/types";

export const BrailleCell = ({
  dots: _dots,
  isSelected: _isSelected,
  onClick,
}: BrailleCellProps) => {
  return <div onClick={onClick}></div>;
};
