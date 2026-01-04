"use client";

/**
 * 点字テーブルコンポーネント
 * 全256個の点字文字を16×16グリッドで表示
 */

import type { BrailleTableProps } from "@/types";
import { generateBrailleData } from "@/lib/braille";
import { BrailleGrid } from "./BrailleGrid";

export const BrailleTable = ({ filterMode: _filterMode }: BrailleTableProps) => {
  const brailleData = generateBrailleData();

  return (
    <div className="flex flex-col items-start p-4">
      <BrailleGrid data={brailleData} selectedDots={[]} onDotToggleAction={() => {}} />
    </div>
  );
};
