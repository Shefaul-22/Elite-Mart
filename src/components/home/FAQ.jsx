"use client";
import { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        question: "Is every product at Elite Mart 100% authentic?",
        answer: "Absolutely. We pride ourselves on offering only genuine products. Every item is sourced directly from authorized distributors and premium global brands. We never compromise on quality or authenticity."
    },
    {
        question: "How long does the premium delivery take?",
        answer: "For orders within the city, we deliver within 24-48 hours. Nationwide delivery typically takes 3-5 business days. Our Elite Members enjoy complimentary 'Priority Shipping' on every order."
    },
    {
        question: "Can I inspect the product before accepting the delivery?",
        answer: "Yes, we support 'Open Box Delivery.' You can inspect the product in the presence of the delivery partner. If you find any issues, you can initiate an immediate exchange or return on the spot."
    },
    {
        question: "What is your exchange policy for size or fit issues?",
        answer: "We offer a seamless 7-day exchange policy. If an item doesn't fit perfectly, you can request an exchange as long as the original tags and premium packaging are intact."
    },
    {
        question: "What are the exclusive benefits of Elite Membership?",
        answer: "Elite Members receive free shipping on all orders, priority access to exclusive flash sales, and special birthday rewards. You also get 24/7 access to our dedicated customer concierge support."
    },
    {
        question: "Is my payment information secure on your platform?",
        answer: "Your security is our priority. We use industry-standard 256-bit SSL encryption to protect your data. You can pay safely via Credit/Debit cards, digital wallets, or Cash on Delivery."
    },

    {
        question: "How can I track my order in real-time?",
        answer: "Once your order is dispatched, you will receive a tracking link via SMS and email. You can also monitor your order status directly from the 'My Orders' section in your dashboard."
    },
    {
        question: "Do you offer international shipping?",
        answer: "Currently, we specialize in nationwide delivery, but we are expanding our logistics to support international shipping soon. Stay tuned for updates on our global reach."
    },
    {
        question: "What should I do if I receive a damaged item?",
        answer: "In the rare event of receiving a damaged item, please contact our support team immediately or report it via the app within 24 hours. We will arrange a priority replacement at no extra cost."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className=" bg-transparent">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-2 ring-1 ring-primary/20">
                        <Sparkles size={14} className="animate-pulse" />
                        <span>Support Center</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-none">
                        Got <span className="text-primary italic">Questions?</span>
                    </h2>
                    <p className="text-muted-foreground font-medium max-w-lg mx-auto leading-relaxed mt-4">
                        Find everything you need to know about our premium services and elite shopping experience.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                  
                    {
                        faqs.map((faq, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <div
                                    key={index}
                                    className={`group border-2 transition-all duration-500 rounded-[2rem] overflow-hidden ${isOpen
                                        ? "border-primary/40 bg-card shadow-2xl shadow-primary/5"
                                        : "border-border bg-transparent hover:border-primary/20"
                                        }`}
                                >
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full flex justify-between items-center p-6 md:p-8 text-left transition-all"
                                    >
                                        <span className={`text-lg md:text-xl font-black tracking-tight transition-colors duration-300 ${isOpen ? "text-primary" : "text-foreground"
                                            }`}>
                                            {faq.question}
                                        </span>

                                        <div className={`p-2 rounded-full transition-all duration-500 flex-shrink-0 ${isOpen ? "bg-primary text-white rotate-180 shadow-lg" : "bg-secondary text-muted-foreground"
                                            }`}>
                                            <ChevronDown size={20} strokeWidth={3} />
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                            >
                                                <div className="px-6 md:px-8 pb-8">
                                                    <div className="pt-6 border-t border-border">
                                                        <p className="text-muted-foreground font-medium leading-relaxed">
                                                            {faq.answer}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <div className="inline-block p-1 rounded-full bg-secondary/50 backdrop-blur-sm border border-border">
                        <p className="px-6 py-2 text-[10px] md:text-xs font-black text-muted-foreground uppercase tracking-widest">
                            Still have questions? <Link href="/contact" className="text-primary cursor-pointer hover:underline underline-offset-4 decoration-2">Contact Concierge</Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;