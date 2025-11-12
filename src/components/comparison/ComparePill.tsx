import { useState, useEffect } from 'react';
import { useComparison } from '@/contexts/ComparisonContext';
import { Button } from '@/components/ui/button';
import { X, ArrowRightLeft } from 'lucide-react';
import { ComparePanel } from './ComparePanel';
import { cn } from '@/lib/utils';

export function ComparePill() {
  const { selectedCards, clearAll } = useComparison();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (selectedCards.length > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [selectedCards]);

  useEffect(() => {
    const handleOpen = () => setIsPanelOpen(true);
    window.addEventListener('openComparison', handleOpen);
    return () => window.removeEventListener('openComparison', handleOpen);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div 
        className={cn(
          "fixed bottom-6 right-6 z-40 animate-slide-in-right",
          "md:bottom-8 md:right-8"
        )}
      >
        <div className="bg-card border-2 border-primary/20 rounded-full shadow-2xl p-2 flex items-center gap-3 pr-4 backdrop-blur-md">
          {/* Card Thumbnails */}
          <div className="flex -space-x-2">
            {selectedCards.slice(0, 3).map((card, idx) => (
              <div 
                key={card.id || idx}
                className="w-10 h-10 rounded-full bg-muted border-2 border-background overflow-hidden flex items-center justify-center"
              >
                <img 
                  src={card.card_bg_image || card.image || '/placeholder.svg'} 
                  alt={card.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
              </div>
            ))}
          </div>

          {/* Count and Actions */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">
              Compare {selectedCards.length} card{selectedCards.length > 1 ? 's' : ''}
            </span>
            
            <Button 
              size="sm"
              onClick={() => setIsPanelOpen(true)}
              className="gap-2 shadow-md"
            >
              <ArrowRightLeft className="w-4 h-4" />
              Compare
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={clearAll}
              className="w-8 h-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <ComparePanel 
        open={isPanelOpen}
        onOpenChange={setIsPanelOpen}
      />
    </>
  );
}
