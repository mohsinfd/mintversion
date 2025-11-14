import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Sparkles, ArrowRight, Zap, TrendingUp, Shield } from "lucide-react";
import cardGeniusHero from "@/assets/card-genius-hero.png";

const CardGeniusCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 bg-gradient-to-br from-mc-green-50 via-background to-charcoal-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">AI-Powered Intelligence</span>
              </div>
              
              {/* Heading */}
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-primary via-mc-green-600 to-primary bg-clip-text text-transparent animate-gradient">
                  Super Card Genius
                </span>
              </h2>
              
              {/* Subheading */}
              <p className="text-xl md:text-2xl text-charcoal-700 mb-8 leading-relaxed">
                AI Powered tool to find the best card for{" "}
                <span className="font-bold text-primary relative inline-block">
                  YOU!
                  <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                    <path d="M0,7 Q50,0 100,7" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/30" />
                  </svg>
                </span>
              </p>

              {/* Features */}
              <div className="grid sm:grid-cols-3 gap-4 mb-10">
                <div className="flex items-center gap-3 bg-background/50 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-sm">Instant Match</div>
                    <div className="text-xs text-muted-foreground">2 min setup</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-background/50 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-sm">Max Rewards</div>
                    <div className="text-xs text-muted-foreground">Top savings</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-background/50 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-sm">100% Free</div>
                    <div className="text-xs text-muted-foreground">No hidden fees</div>
                  </div>
                </div>
              </div>
              
              {/* CTA Button */}
              <Button
                size="lg"
                onClick={() => navigate('/card-genius')}
                className="group text-lg px-10 py-7 h-auto shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Try Card Genius Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
              
              {/* Trust indicator */}
              <p className="mt-6 text-sm text-muted-foreground flex items-center justify-center lg:justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Get personalized recommendations in under 2 minutes
              </p>
            </div>

            {/* Right: Hero Image */}
            <div className="order-1 lg:order-2 flex items-center justify-center">
              <div className="relative w-full max-w-2xl animate-fade-in">
                <img 
                  src={cardGeniusHero} 
                  alt="AI-Powered Card Genius" 
                  className="w-full h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg animate-bounce">
                  <span className="font-bold text-lg">Smart AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardGeniusCTA;
