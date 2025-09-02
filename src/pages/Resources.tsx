import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, HelpCircle, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    title: 'Complete Guide to Education Loans for Studying Abroad',
    excerpt: 'Everything you need to know about securing an education loan for international studies.',
    date: '2024-01-15',
    category: 'Loans'
  },
  {
    title: 'Top Scholarships for International Students in 2024',
    excerpt: 'Discover the best scholarship opportunities available for students planning to study abroad.',
    date: '2024-01-10',
    category: 'Scholarships'
  },
  {
    title: 'How to Calculate Your ROI for International Education',
    excerpt: 'Learn how to calculate the return on investment for your education abroad.',
    date: '2024-01-05',
    category: 'Planning'
  }
];

const resources = [
  {
    title: 'Education Loan Application Checklist',
    description: 'Complete checklist of documents needed for your loan application',
    type: 'PDF',
    size: '2.5 MB'
  },
  {
    title: 'Country-wise Cost of Study Guide',
    description: 'Detailed breakdown of education and living costs by country',
    type: 'PDF',
    size: '5.2 MB'
  },
  {
    title: 'Scholarship Application Templates',
    description: 'Ready-to-use templates for scholarship applications',
    type: 'ZIP',
    size: '1.8 MB'
  }
];

const faqs = [
  {
    question: 'What is the maximum amount I can borrow for education loan?',
    answer: 'The maximum loan amount varies by lender and can range from ₹10 lakhs to ₹1.5 crores depending on the course and institution.'
  },
  {
    question: 'Do I need collateral for an education loan?',
    answer: 'For loans up to ₹7.5 lakhs, collateral is typically not required. For higher amounts, collateral may be needed.'
  },
  {
    question: 'What is the typical interest rate for education loans?',
    answer: 'Interest rates typically range from 8.5% to 15% per annum, depending on the lender and loan amount.'
  },
  {
    question: 'Can I get a loan for studying in any country?',
    answer: 'Most lenders provide loans for studying in popular destinations like USA, UK, Canada, Australia, and many European countries.'
  }
];

export default function Resources() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-secondary text-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              Resources & Guides
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
              Access comprehensive guides, downloadable resources, and answers to frequently asked questions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Latest Guides & Articles
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest information on education loans, scholarships, and studying abroad
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </div>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <Button variant="outline" className="w-full">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloadable Resources */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Downloadable Resources
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Free resources to help you through your education loan and study abroad journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                            {resource.type}
                          </span>
                          <span className="text-xs text-muted-foreground">{resource.size}</span>
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{resource.description}</p>
                    <Button className="w-full bg-gradient-primary hover:opacity-90">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Get answers to the most common questions about education loans
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-start space-x-3 text-lg">
                      <HelpCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{faq.question}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground pl-8">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}