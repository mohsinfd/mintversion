import { Plus, Check } from 'lucide-react';
import { useComparison } from '@/contexts/ComparisonContext';
import { cn } from '@/lib/utils';

interface CompareToggleIconProps {
  card: any;
  className?: string;
}

export function CompareToggleIcon({ card, className }: CompareToggleIconProps) {
  const { toggleCard, isSelected } = useComparison();
  const cardId = card.id?.toString() || card.seo_card_alias;
  const selected = isSelected(cardId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleCard(card);
      }}
      className={cn(
        "group w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
        selected 
          ? "bg-primary text-primary-foreground shadow-lg scale-105" 
          : "bg-background/80 backdrop-blur-sm border-2 border-border hover:border-primary hover:bg-primary/10 hover:scale-110",
        className
      )}
      aria-label={selected ? "Remove from comparison" : "Add to comparison"}
    >
      {selected ? (
        <Check className="w-4 h-4 animate-scale-in" />
      ) : (
        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
      )}
    </button>
  );
}
