import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface PriceRangeFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
}

const PriceRangeFilter = ({
  min,
  max,
  value,
  onValueChange,
}: PriceRangeFilterProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span>
          R$ {value[0].toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        <span>
          R$ {value[1].toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>
      <SliderPrimitive.Root
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          "data-[orientation=horizontal]:h-5"
        )}
        value={value}
        onValueChange={onValueChange}
        min={min}
        max={max}
        step={100}
      >
        <SliderPrimitive.Track
          className={cn(
            "relative h-2 w-full grow overflow-hidden rounded-full bg-gray-100",
            "dark:bg-gray-800"
          )}
        >
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className={cn(
            "block h-5 w-5 rounded-full border-2 border-primary bg-white ring-offset-white transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-50",
            "dark:border-primary dark:bg-gray-950 dark:ring-offset-gray-950",
            "hover:bg-gray-100 dark:hover:bg-gray-800"
          )}
        />
        <SliderPrimitive.Thumb
          className={cn(
            "block h-5 w-5 rounded-full border-2 border-primary bg-white ring-offset-white transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-50",
            "dark:border-primary dark:bg-gray-950 dark:ring-offset-gray-950",
            "hover:bg-gray-100 dark:hover:bg-gray-800"
          )}
        />
      </SliderPrimitive.Root>
    </div>
  );
};

export default PriceRangeFilter; 