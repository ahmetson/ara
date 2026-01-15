'use client';

import * as React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/components/animate-ui/components/radix/accordion';

interface FAQItem {
    question: string;
    answer: string;
}

const faqItems: FAQItem[] = [
    {
        question: 'What if maintainers just pocket the money and ignore requests?',
        answer:
            "You fund specific outcomes, not vague promises. If a maintainer accepts funding for a feature and doesn't deliver within the agreed timeline, funds can be reallocated. The system only works if maintainers actually maintain.",
    },
    {
        question: "Isn't this just creating a two-tier open source ecosystem?",
        answer:
            'Open source already has tiers: projects with corporate backing vs. everything else. Ara makes that relationship explicit and accessible to companies of any size. The alternative is the current system where most projects get nothing.',
    },
    {
        question: 'Why not just hire the maintainer?',
        answer:
            'Because you need influence over 15 dependencies, not full-time control of one. Ara scales what you actually need: small, directed funding across your entire stack.',
    },
    {
        question: 'How much does this cost?',
        answer:
            "Less than one engineer's salary, distributed across all the projects keeping your infrastructure running. Pricing is transparent and scales with company size.",
    },
];

export default function FAQ() {
    return (
        <div className="w-full">
            <Accordion type="single" collapsible={true} className="w-full">
                {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger className="text-left text-lg md:text-xl text-slate-800 dark:text-slate-200 py-4 cursor-pointer">
                            {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-base md:text-lg text-slate-700 dark:text-slate-300">
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}

