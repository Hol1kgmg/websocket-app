"use client";

/**
 * 点字セルコンポーネント
 * 個別の点字文字とそのドットパターンを表示
 */

import type { BrailleCellProps, DotNumber } from "@/types";

/**
 * 点字の標準配置
 * 1 4
 * 2 5
 * 3 6
 * 7 8
 */
const DOT_POSITIONS: readonly DotNumber[] = [1, 2, 3, 7, 4, 5, 6, 8];

export const BrailleCell = ({ dots, isSelected: _isSelected, onClickAction }: BrailleCellProps) => {
  return (
    <div
      onClick={onClickAction}
      className="flex flex-col items-center justify-center gap-1 rounded border border-gray-300 bg-white p-2 transition-colors hover:border-blue-400 hover:bg-blue-50"
    >
      {/* ドットパターン表示 (2列×4行) */}
      <div className="grid grid-cols-2 gap-0.5">
        {DOT_POSITIONS.map((dotNum) => {
          const isOn = dots.includes(dotNum);
          return (
            <div
              key={dotNum}
              className={`h-1.5 w-1.5 rounded-full ${isOn ? "bg-blue-600" : "bg-gray-200"}`}
              aria-label={`Dot ${dotNum}: ${isOn ? "ON" : "OFF"}`}
            />
          );
        })}
      </div>
    </div>
  );
};
