import { useEffect, useRef } from "react";
import { Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const blogs = [
  {
    id: 1,
    title: "5 Hidden Credit Card Tricks That Saved Me ₹80,000 in 2024",
    excerpt: "Most people don't know about these loopholes. Learn how to maximize welcome bonuses, stack offers, and optimize reward redemptions like a pro.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop",
    category: "Savings Tips",
    author: "Vikram Malhotra",
    date: "2 days ago",
    readTime: "8 min read",
    tags: ["Rewards", "Cashback", "Pro Tips"]
  },
  {
    id: 2,
    title: "Travel Cards Decoded: How to Fly Business Class for Free",
    excerpt: "The ultimate guide to earning miles, maximizing lounge access, and converting your everyday spending into dream vacations. Real strategies from frequent flyers.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop",
    category: "Travel Rewards",
    author: "Priya Singh",
    date: "5 days ago",
    readTime: "12 min read",
    tags: ["Travel", "Miles", "Lounge Access"]
  },
  {
    id: 3,
    title: "The Credit Score Masterclass: From 650 to 800 in 6 Months",
    excerpt: "A proven roadmap to building excellent credit. Understand what banks actually look at, which mistakes destroy your score, and the fastest way to rebuild it.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop",
    category: "Credit Building",
    author: "Amit Desai",
    date: "1 week ago",
    readTime: "10 min read",
    tags: ["Credit Score", "Financial Health", "Banking"]
  }
];

const BlogSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (cardsRef.current.length === 0) return;

    // Stagger animation for blog cards
    gsap.fromTo(
      cardsRef.current,
      { 
        opacity: 0, 
        y: 60,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 40%",
          scrub: 1,
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-muted/30 via-background to-accent/10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">Expert Insights</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Master Your Money Game
          </h2>
          <p className="text-xl text-muted-foreground">
            Actionable strategies, insider tips, and real stories from India's smartest credit card users
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {blogs.map((blog, index) => (
            <div
              key={blog.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-border/50 hover:border-primary/30 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Author & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{blog.author}</p>
                    <p className="text-xs text-muted-foreground">Author</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="group-hover:text-primary group-hover:translate-x-1 transition-all"
                  >
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="shadow-lg hover:shadow-xl group"
          >
            Explore All Articles
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
