import { useState } from "react";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for all unused items in their original packaging. Simply contact our customer service team to initiate a return.",
    category: "Returns & Refunds",
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 3-5 business days within the continental US. International shipping can take 7-14 business days depending on the destination.",
    category: "Shipping",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can see specific shipping options during checkout.",
    category: "Shipping",
  },
  {
    question: "How can I track my order?",
    answer: "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's website.",
    category: "Orders",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are processed securely.",
    category: "Payment",
  },
  {
    question: "How do I change my password?",
    answer: "You can change your password by going to your account settings and selecting 'Change Password'. Follow the prompts to set a new password.",
    category: "Account",
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = faq.question
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  console.log("Search query:", searchQuery);
  console.log("Selected category:", selectedCategory);
  console.log("Filtered FAQs:", filteredFaqs);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 mb-8">
            Find answers to common questions about our services
          </p>

          <div className="relative max-w-xl mx-auto mb-12">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full h-12 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === null
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all"
            >
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <div>
                  <h3 className="font-medium text-gray-900">{faq.question}</h3>
                  <span className="text-sm text-gray-500">{faq.category}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No matching questions found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;