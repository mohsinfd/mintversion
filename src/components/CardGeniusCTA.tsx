import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

const CardGeniusCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 md:p-12 border border-primary/10 relative overflow-hidden">
          {/* Subtle decorative element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Super Card Genius
            </h2>
            
            {/* Subheading */}
            <p className="text-lg text-muted-foreground mb-6">
              AI Powered tool to find the best card for <span className="text-primary font-semibold">YOU!</span>
            </p>
            
            {/* CTA Button */}
            <Button
              size="lg"
              onClick={() => navigate('/card-genius')}
              className="group shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Try Card Genius
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            {/* Trust indicator */}
            <p className="mt-4 text-sm text-muted-foreground">
              Get personalized recommendations in under 2 minutes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardGeniusCTA;
