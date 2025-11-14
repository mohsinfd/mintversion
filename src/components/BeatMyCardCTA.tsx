import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Swords, ArrowRight } from "lucide-react";

const BeatMyCardCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 md:p-12 border border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
              <Swords className="w-8 h-8 text-secondary" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              Beat My Card
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6">
              Test our Card Genius AI v/s Your Card. See the magic!
            </p>
            
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/beat-my-card')}
              className="group shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Challenge Card Genius
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <p className="mt-4 text-sm text-muted-foreground">
              Find out if there's a better card for your spending
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeatMyCardCTA;
