import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Percent, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(12);
  const [loanTenure, setLoanTenure] = useState<number>(10);
  const [emi, setEmi] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure]);

  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / (12 * 100);
    const numberOfPayments = loanTenure * 12;

    if (monthlyRate === 0) {
      const calculatedEmi = principal / numberOfPayments;
      setEmi(calculatedEmi);
      setTotalPayment(principal);
      setTotalInterest(0);
    } else {
      const calculatedEmi = 
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      
      const calculatedTotalPayment = calculatedEmi * numberOfPayments;
      const calculatedTotalInterest = calculatedTotalPayment - principal;

      setEmi(calculatedEmi);
      setTotalPayment(calculatedTotalPayment);
      setTotalInterest(calculatedTotalInterest);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

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
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <Calculator className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              Education Loan EMI Calculator
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
              Calculate your monthly EMI, total interest, and plan your education loan repayment
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Loan Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      placeholder="Enter loan amount"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interestRate">Interest Rate (% per annum)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      placeholder="Enter interest rate"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loanTenure">Loan Tenure (Years)</Label>
                    <Input
                      id="loanTenure"
                      type="number"
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(Number(e.target.value))}
                      placeholder="Enter loan tenure"
                    />
                  </div>

                  <Button 
                    onClick={calculateEMI} 
                    className="w-full bg-gradient-primary hover:opacity-90"
                    size="lg"
                  >
                    Calculate EMI
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">EMI Calculation Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-gradient-primary text-white p-6 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <DollarSign className="h-6 w-6" />
                        <span className="text-lg font-medium">Monthly EMI</span>
                      </div>
                      <p className="text-3xl font-bold">{formatCurrency(emi)}</p>
                    </div>

                    <div className="bg-gradient-secondary text-white p-6 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <Calendar className="h-6 w-6" />
                        <span className="text-lg font-medium">Total Amount Payable</span>
                      </div>
                      <p className="text-3xl font-bold">{formatCurrency(totalPayment)}</p>
                    </div>

                    <div className="bg-gradient-to-r from-accent to-highlight text-white p-6 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <Percent className="h-6 w-6" />
                        <span className="text-lg font-medium">Total Interest</span>
                      </div>
                      <p className="text-3xl font-bold">{formatCurrency(totalInterest)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Loan Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Principal Amount:</span>
                      <span className="font-semibold">{formatCurrency(loanAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Interest Rate:</span>
                      <span className="font-semibold">{interestRate}% per annum</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Loan Tenure:</span>
                      <span className="font-semibold">{loanTenure} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Number of EMIs:</span>
                      <span className="font-semibold">{loanTenure * 12}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Tips for Education Loan EMI Planning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <span className="text-primary">•</span>
                    <span>Consider the moratorium period during your studies when no EMI payments are required</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary">•</span>
                    <span>Factor in potential income growth when choosing loan tenure</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary">•</span>
                    <span>Compare interest rates from multiple lenders before finalizing</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary">•</span>
                    <span>Remember that longer tenure means lower EMI but higher total interest</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary">•</span>
                    <span>Explore partial prepayment options to reduce total interest burden</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}