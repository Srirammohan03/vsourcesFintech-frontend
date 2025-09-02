import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const courseLevels = ['Masters', 'PG', 'Doctorate', 'Bachelor'];
const scholarshipTypes = ['Merit-based', 'Need-based', 'Government', 'University-specific'];
const countries = ['UK', 'USA', 'Canada', 'Ireland', 'France'];

export function SearchHero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [courseLevel, setCourseLevel] = useState('');
  const [scholarshipType, setScholarshipType] = useState('');
  const [country, setCountry] = useState('');

  const handleSearch = () => {
    console.log({ searchQuery, courseLevel, scholarshipType, country });
    // Implement search functionality
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-card rounded-xl shadow-card p-6 border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search Input */}
          <div className="lg:col-span-2">
            <Input
              placeholder="Search for scholarships, get education loan"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12"
            />
          </div>

          {/* Course Level Dropdown */}
          <div className="w-full">
            <Select value={courseLevel} onValueChange={setCourseLevel}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Course Level" />
              </SelectTrigger>
              <SelectContent>
                {courseLevels.map((level) => (
                  <SelectItem key={level} value={level.toLowerCase()}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Scholarship Type Dropdown */}
          <div className="w-full">
            <Select value={scholarshipType} onValueChange={setScholarshipType}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Scholarship Type" />
              </SelectTrigger>
              <SelectContent>
                {scholarshipTypes.map((type) => (
                  <SelectItem key={type} value={type.toLowerCase().replace('-', '_')}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Country Dropdown */}
          <div className="w-full">
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((countryName) => (
                  <SelectItem key={countryName} value={countryName.toLowerCase()}>
                    {countryName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-4 flex justify-center">
          <Button 
            onClick={handleSearch} 
            className="bg-gradient-primary hover:opacity-90 px-8 h-12"
            size="lg"
          >
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}