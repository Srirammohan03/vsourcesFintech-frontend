import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  DollarSign, 
  Building2, 
  CreditCard,
  ArrowRight,
  MapPin
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const countries = [
  {
    name: 'United States',
    flag: '🇺🇸',
    description: 'Home to world-renowned universities and diverse academic programs',
    avgCost: '$50,000 - $80,000',
    topUniversities: ['Harvard', 'MIT', 'Stanford', 'Yale'],
    loanOptions: 'Federal & Private loans available',
    path: '/country/usa'
  },
  {
    name: 'United Kingdom',
    flag: '🇬🇧',
    description: 'Rich academic heritage with shorter degree programs',
    avgCost: '£20,000 - £35,000',
    topUniversities: ['Oxford', 'Cambridge', 'Imperial College', 'UCL'],
    loanOptions: 'Government & bank loans',
    path: '/country/uk'
  },
  {
    name: 'Canada',
    flag: '🇨🇦',
    description: 'High-quality education with post-study work opportunities',
    avgCost: 'CAD 25,000 - 45,000',
    topUniversities: ['University of Toronto', 'UBC', 'McGill', 'Waterloo'],
    loanOptions: 'Provincial & private loans',
    path: '/country/canada'
  },
  {
    name: 'Australia',
    flag: '🇦🇺',
    description: 'World-class education in a multicultural environment',
    avgCost: 'AUD 30,000 - 50,000',
    topUniversities: ['Melbourne', 'ANU', 'Sydney', 'UNSW'],
    loanOptions: 'HECS-HELP & private loans',
    path: '/country/australia'
  },
  {
    name: 'Germany',
    flag: '🇩🇪',
    description: 'Quality education with low or no tuition fees',
    avgCost: '€10,000 - €20,000',
    topUniversities: ['TUM', 'Heidelberg', 'LMU Munich', 'RWTH Aachen'],
    loanOptions: 'BAföG & bank loans',
    path: '/country/germany'
  },
  {
    name: 'France',
    flag: '🇫🇷',
    description: 'Excellence in research and innovation',
    avgCost: '€15,000 - €25,000',
    topUniversities: ['Sorbonne', 'ENS Paris', 'École Polytechnique', 'Sciences Po'],
    loanOptions: 'Student loans & grants',
    path: '/country/france'
  }
];

const popularPrograms = [
  { program: 'Computer Science', countries: ['USA', 'Canada', 'UK'] },
  { program: 'Business Administration', countries: ['USA', 'UK', 'France'] },
  { program: 'Engineering', countries: ['Germany', 'USA', 'Canada'] },
  { program: 'Medicine', countries: ['UK', 'Australia', 'Germany'] },
  { program: 'Data Science', countries: ['USA', 'Canada', 'UK'] },
  { program: 'Design', countries: ['UK', 'USA', 'France'] }
];

export default function Country() {
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
              Study Abroad Destinations
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
              Explore top destinations for international education and find the perfect country for your academic journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Popular Study Destinations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from top countries offering world-class education and excellent career opportunities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {countries.map((country, index) => (
              <motion.div
                key={country.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-elegant transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-4xl">{country.flag}</span>
                      <CardTitle className="text-2xl">{country.name}</CardTitle>
                    </div>
                    <p className="text-muted-foreground">{country.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span className="text-sm">Annual Cost: {country.avgCost}</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Building2 className="h-4 w-4 text-primary mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Top Universities:</p>
                        <p className="text-muted-foreground">{country.topUniversities.join(', ')}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-primary" />
                      <span className="text-sm">{country.loanOptions}</span>
                    </div>
                    <Button asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                      <Link to={country.path}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Programs */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Popular Programs by Country
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover which countries excel in your field of interest
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularPrograms.map((program, index) => (
              <motion.div
                key={program.program}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-card transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <span>{program.program}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Best in: {program.countries.join(', ')}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-primary text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Choose Your Destination?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get personalized guidance on the best country for your academic and career goals
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 h-14 px-8">
              <Link to="/contact">
                Get Country Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}