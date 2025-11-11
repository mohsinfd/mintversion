import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SpendingInput } from "@/components/ui/spending-input";
import { ArrowLeft, ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { cardService } from "@/services/cardService";
import type { SpendingData } from "@/services/cardService";
import { useToast } from "@/hooks/use-toast";

interface SpendingQuestion {
  field: string;
  question: string;
  emoji: string;
  min: number;
  max: number;
  step: number;
}

const questions: SpendingQuestion[] = [
  { field: 'amazon_spends', question: 'How much do you spend on Amazon in a month?', emoji: '🛍️', min: 0, max: 100000, step: 500 },
  { field: 'flipkart_spends', question: 'How much do you spend on Flipkart in a month?', emoji: '📦', min: 0, max: 100000, step: 500 },
  { field: 'other_online_spends', question: 'How much do you spend on other online shopping?', emoji: '💸', min: 0, max: 50000, step: 500 },
  { field: 'other_offline_spends', question: 'How much do you spend at local shops or offline stores monthly?', emoji: '🏪', min: 0, max: 100000, step: 1000 },
  { field: 'grocery_spends_online', question: 'How much do you spend on groceries (Blinkit, Zepto etc.) every month?', emoji: '🥦', min: 0, max: 50000, step: 500 },
  { field: 'online_food_ordering', question: 'How much do you spend on food delivery apps in a month?', emoji: '🛵🍜', min: 0, max: 30000, step: 500 },
  { field: 'fuel', question: 'How much do you spend on fuel in a month?', emoji: '⛽', min: 0, max: 20000, step: 500 },
  { field: 'dining_or_going_out', question: 'How much do you spend on dining out in a month?', emoji: '🥗', min: 0, max: 30000, step: 500 },
  { field: 'flights_annual', question: 'How much do you spend on flights in a year?', emoji: '✈️', min: 0, max: 500000, step: 5000 },
  { field: 'hotels_annual', question: 'How much do you spend on hotel stays in a year?', emoji: '🛌', min: 0, max: 300000, step: 5000 },
  { field: 'domestic_lounge_usage_quarterly', question: 'How often do you visit domestic airport lounges in a year?', emoji: '🇮🇳', min: 0, max: 50, step: 1 },
  { field: 'international_lounge_usage_quarterly', question: 'Plus, what about international airport lounges?', emoji: '🌎', min: 0, max: 50, step: 1 },
  { field: 'mobile_phone_bills', question: 'How much do you spend on recharging your mobile or Wi-Fi monthly?', emoji: '📱', min: 0, max: 10000, step: 100 },
  { field: 'electricity_bills', question: "What's your average monthly electricity bill?", emoji: '⚡️', min: 0, max: 20000, step: 500 },
  { field: 'water_bills', question: 'And what about your monthly water bill?', emoji: '💧', min: 0, max: 5000, step: 100 },
  { field: 'insurance_health_annual', question: 'How much do you pay for health or term insurance annually?', emoji: '🛡️', min: 0, max: 100000, step: 1000 },
  { field: 'insurance_car_or_bike_annual', question: 'How much do you pay for car or bike insurance annually?', emoji: '🚗', min: 0, max: 50000, step: 1000 },
  { field: 'rent', question: 'How much do you pay for house rent every month?', emoji: '🏠', min: 0, max: 100000, step: 1000 },
  { field: 'school_fees', question: 'How much do you pay in school fees monthly?', emoji: '🎓', min: 0, max: 50000, step: 1000 },
];

const funFacts = [
  "Did you know? The first credit card reward program started in 1981!",
  "Indians saved over ₹2,000 crores in credit card rewards last year!",
  "Premium cards often pay for themselves through lounge access alone.",
  "The average credit card user has 3.2 cards but only maximizes 1.",
  "Cashback is instant gratification, but reward points can be worth 3x more!",
  "Your credit score can improve by 50+ points in just 6 months with the right habits.",
  "Travel cards can get you business class flights at economy prices!",
  "Most people don't know: You can negotiate credit card annual fees.",
  "The difference between 1% and 5% cashback? ₹40,000 annually on ₹10L spending!",
  "Airport lounge access isn't just for the rich—many mid-tier cards offer it.",
  "Co-branded cards often give better value than generic reward cards.",
  "Banks make money when you carry a balance—always pay in full!",
  "Welcome bonuses are often worth more than a year's rewards combined.",
  "The best credit card isn't the fanciest—it's the one matching your spending.",
  "Fuel surcharge waivers can save you ₹5,000+ annually if you drive daily.",
  "Credit cards are tools, not free money. Use them wisely!",
  "The right card for dining out can give you 10x more value than a regular card.",
  "Your spending pattern changes every year—your cards should too!",
  "Most premium cards offer complimentary insurance worth lakhs.",
  "Smart card users earn while they spend. Average users just spend."
];

interface CardResult {
  card_name: string;
  card_bg_image?: string;
  joining_fees: number;
  total_savings: number;
  total_savings_yearly: number;
  spending_breakdown: {
    [key: string]: {
      spend: number;
      points_earned: number;
      savings: number;
      cashback_percentage?: number;
    };
  };
}


const CardGenius = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [results, setResults] = useState<CardResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleValueChange = (value: number) => {
    setResponses(prev => ({ ...prev, [currentQuestion.field]: value }));
  };

  const handleNext = async () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate and show results
      await calculateResults();
    }
  };

  const calculateResults = async () => {
    setIsCalculating(true);
    
    // Start rotating fun facts
    const factInterval = setInterval(() => {
      setCurrentFactIndex(prev => (prev + 1) % funFacts.length);
    }, 3000);

    try {
      // Prepare payload
      const payload: SpendingData = {};
      questions.forEach(q => {
        payload[q.field as keyof SpendingData] = responses[q.field] || 0;
      });

      const response = await cardService.calculateCardGenius(payload);
      
      if (response.data && response.data.savings && Array.isArray(response.data.savings)) {
        // Sort by total_savings_yearly
        const sortedSavings = response.data.savings
          .sort((a: any, b: any) => (b.total_savings_yearly || 0) - (a.total_savings_yearly || 0))
          .slice(0, 3);

        // Fetch card details for each
        const cardsWithDetails = await Promise.all(
          sortedSavings.map(async (saving: any) => {
            try {
              const cardDetails = await cardService.getCardDetails(saving.card_alias);
              return {
                card_name: cardDetails.data?.card_name || saving.card_alias,
                card_bg_image: cardDetails.data?.card_bg_image,
                joining_fees: cardDetails.data?.annual_fees || 0,
                total_savings: saving.total_savings || 0,
                total_savings_yearly: saving.total_savings_yearly || 0,
                spending_breakdown: saving.spending_breakdown || {}
              };
            } catch (error) {
              console.error(`Error fetching details for ${saving.card_alias}:`, error);
              return {
                card_name: saving.card_alias,
                joining_fees: 0,
                total_savings: saving.total_savings || 0,
                total_savings_yearly: saving.total_savings_yearly || 0,
                spending_breakdown: saving.spending_breakdown || {}
              };
            }
          })
        );

        setResults(cardsWithDetails);
        setShowResults(true);
      } else {
        toast({
          title: "No results found",
          description: "Please try adjusting your spending amounts.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error calculating results:', error);
      toast({
        title: "Calculation failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      clearInterval(factInterval);
      setIsCalculating(false);
    }
  };

  const toggleCardExpansion = (index: number) => {
    setExpandedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };


  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-primary">
        {/* Header */}
        <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-charcoal-100 z-50">
          <div className="container mx-auto px-4 py-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-charcoal-700 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Home</span>
            </button>
          </div>
        </header>

        {/* Results */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-charcoal-900 mb-4">
                Your Perfect Cards Are Here! 🎉
              </h1>
              <p className="text-xl text-charcoal-700">
                Based on your spending, here are the top 3 cards that'll save you the most money
              </p>
            </div>

            <div className="space-y-6">
              {results.map((card, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-charcoal-200">
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Card Image */}
                      {card.card_bg_image && (
                        <div className="flex-shrink-0">
                          <img
                            src={card.card_bg_image}
                            alt={card.card_name}
                            className="w-full md:w-64 h-40 object-contain rounded-lg"
                          />
                        </div>
                      )}

                      {/* Card Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-charcoal-900 mb-2">
                              {card.card_name}
                            </h3>
                            <p className="text-charcoal-600">
                              Annual Fee: ₹{card.joining_fees.toLocaleString()}
                            </p>
                          </div>
                          <div className="bg-primary/10 px-4 py-2 rounded-full">
                            <span className="text-sm font-semibold text-primary">
                              #{index + 1} Best Match
                            </span>
                          </div>
                        </div>

                        {/* Savings Highlight */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl mb-4">
                          <div className="text-center">
                            <p className="text-sm text-charcoal-600 mb-1">You could save</p>
                            <p className="text-4xl font-bold text-green-600 mb-1">
                              ₹{card.total_savings_yearly.toLocaleString()}
                            </p>
                            <p className="text-lg text-charcoal-700">
                              per year (₹{Math.round(card.total_savings_yearly / 12).toLocaleString()}/month)
                            </p>
                          </div>
                        </div>

                        {/* Breakdown Toggle */}
                        <button
                          onClick={() => toggleCardExpansion(index)}
                          className="w-full flex items-center justify-between p-4 bg-charcoal-50 rounded-lg hover:bg-charcoal-100 transition-colors"
                        >
                          <span className="font-semibold text-charcoal-900">
                            See detailed savings breakdown
                          </span>
                          <ChevronDown 
                            className={`w-5 h-5 text-charcoal-600 transition-transform ${
                              expandedCards.includes(index) ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {/* Expanded Breakdown */}
                        {expandedCards.includes(index) && (
                          <div className="mt-4 space-y-3 animate-fade-in">
                            {Object.entries(card.spending_breakdown || {}).map(([category, details]) => {
                              // Safety checks for details
                              if (!details || typeof details !== 'object' || !details.spend || details.spend === 0) {
                                return null;
                              }
                              
                              return (
                                <div key={category} className="p-4 bg-white border border-charcoal-200 rounded-lg">
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <p className="font-semibold text-charcoal-900 capitalize">
                                        {category.replace(/_/g, ' ')}
                                      </p>
                                      <p className="text-sm text-charcoal-600">
                                        Monthly Spend: ₹{(details.spend || 0).toLocaleString()}
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-bold text-green-600">
                                        ₹{(details.savings || 0).toLocaleString()}
                                      </p>
                                      <p className="text-xs text-charcoal-500">savings</p>
                                    </div>
                                  </div>
                                  <div className="flex gap-4 text-sm text-charcoal-600">
                                    <span>Points: {(details.points_earned || 0).toLocaleString()}</span>
                                    {details.cashback_percentage && (
                                      <span>Cashback: {details.cashback_percentage}%</span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <Button
                size="lg"
                onClick={() => {
                  setShowResults(false);
                  setCurrentStep(0);
                  setResponses({});
                  setResults([]);
                }}
                variant="outline"
              >
                Start Over
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Loading State */}
      {isCalculating && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-charcoal-900 mb-2">
              Finding Your Perfect Cards...
            </h3>
            <p className="text-charcoal-600 mb-4">
              This will just take a moment
            </p>
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="text-sm text-charcoal-700 italic">
                💡 {funFacts[currentFactIndex]}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-charcoal-100 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-charcoal-700 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Home</span>
            </button>
            
            <div className="flex items-center gap-2 text-charcoal-600">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-semibold">Card Genius</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="sticky top-[73px] bg-white border-b border-charcoal-100 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-charcoal-700">
              Question {currentStep + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full h-2 bg-charcoal-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-accent transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Welcome Message */}
          {currentStep === 0 && (
            <div className="mb-8 text-center animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-charcoal-900 mb-4">
                Let's Find Your Perfect Card
              </h1>
              <p className="text-xl text-charcoal-700">
                Answer {questions.length} quick questions about your spending habits, and we'll recommend the best cards for you.
              </p>
            </div>
          )}

          {/* Question Card */}
          <div className="animate-fade-in">
            <SpendingInput
              question={currentQuestion.question}
              emoji={currentQuestion.emoji}
              value={responses[currentQuestion.field] || 0}
              onChange={handleValueChange}
              min={currentQuestion.min}
              max={currentQuestion.max}
              step={currentQuestion.step}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex-1"
            >
              <ArrowLeft className="mr-2" />
              Previous
            </Button>
            <Button
              size="lg"
              onClick={handleNext}
              className="flex-1"
            >
              {currentStep === questions.length - 1 ? (
                <>
                  Show My Results
                  <Sparkles className="ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* Skip Option */}
          <div className="text-center mt-6">
            <button
              onClick={handleNext}
              className="text-charcoal-500 hover:text-primary font-medium transition-colors"
            >
              Skip this question →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CardGenius;
