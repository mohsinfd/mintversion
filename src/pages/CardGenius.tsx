import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SpendingInput } from "@/components/ui/spending-input";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

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
  { field: 'other_offline_spends', question: 'How much do you spend at local shops monthly?', emoji: '🏪', min: 0, max: 100000, step: 1000 },
  { field: 'grocery_spends_online', question: 'How much do you spend on groceries (Blinkit, Zepto)?', emoji: '🥦', min: 0, max: 50000, step: 500 },
  { field: 'online_food_ordering', question: 'How much do you spend on food delivery in a month?', emoji: '🛵', min: 0, max: 30000, step: 500 },
  { field: 'fuel', question: 'How much do you spend on fuel monthly?', emoji: '⛽', min: 0, max: 20000, step: 500 },
  { field: 'dining_or_going_out', question: 'How much do you spend on dining out?', emoji: '🥗', min: 0, max: 30000, step: 500 },
];

const CardGenius = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleValueChange = (value: number) => {
    setResponses(prev => ({ ...prev, [currentQuestion.field]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate and show results
      console.log('Final responses:', responses);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
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
                Answer a few quick questions about your spending habits, and we'll recommend the best cards for you.
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
