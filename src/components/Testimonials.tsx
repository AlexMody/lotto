import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  quote: string;
  destination: string;
  year: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'New York, USA',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    quote: 'This trip was absolutely unreal – 5 stars all around! The entire experience from booking to the actual trip was seamless. Every detail was perfectly planned.',
    destination: 'Santorini, Greece',
    year: '2023'
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'Toronto, Canada',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    quote: 'Booking.com, Airbnb, and the experience team made everything seamless. I never imagined I could win such an incredible trip to Tokyo!',
    destination: 'Tokyo, Japan',
    year: '2023'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    location: 'Barcelona, Spain',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    quote: 'I was skeptical at first, but this lottery is completely legitimate. Won a trip to Dubai and it exceeded all my expectations!',
    destination: 'Dubai, UAE',
    year: '2023'
  },
  {
    id: 4,
    name: 'David Thompson',
    location: 'London, UK',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    quote: 'The whole process was professional and transparent. Venice was a dream come true, and the accommodations were luxury level.',
    destination: 'Venice, Italy',
    year: '2023'
  },
  {
    id: 5,
    name: 'Lisa Park',
    location: 'Seoul, South Korea',
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    quote: 'From the moment I got the notification that I won, everything was handled professionally. Paris was magical!',
    destination: 'Paris, France',
    year: '2023'
  }
];

const Testimonials: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-gold fill-current' : 'text-gray-600'}
      />
    ));
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gold to-silver bg-clip-text text-transparent">
            Winner Stories
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear from our amazing winners who turned their dreams into reality
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <div 
            className="bg-black/50 backdrop-blur-lg rounded-2xl border border-gold/20 p-8 md:p-12 relative overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 opacity-20">
              <Quote size={64} className="text-gold" />
            </div>
            
            {/* Testimonial Content */}
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <img
                    src={testimonials[currentSlide].avatar}
                    alt={testimonials[currentSlide].name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-gold/30"
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  {/* Rating */}
                  <div className="flex justify-center md:justify-start items-center space-x-1 mb-4">
                    {renderStars(testimonials[currentSlide].rating)}
                  </div>
                  
                  {/* Quote */}
                  <p className="text-xl md:text-2xl text-white leading-relaxed mb-6 font-light">
                    "{testimonials[currentSlide].quote}"
                  </p>
                  
                  {/* Author Info */}
                  <div>
                    <h4 className="text-xl font-bold text-gold mb-1">
                      {testimonials[currentSlide].name}
                    </h4>
                    <p className="text-gray-400 mb-2">
                      {testimonials[currentSlide].location}
                    </p>
                    <div className="flex justify-center md:justify-start items-center space-x-4 text-sm text-gray-500">
                      <span>Won trip to {testimonials[currentSlide].destination}</span>
                      <span>•</span>
                      <span>{testimonials[currentSlide].year}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
              <button
                onClick={prevSlide}
                className="w-12 h-12 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gold/20 hover:text-gold transition-all pointer-events-auto"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gold/20 hover:text-gold transition-all pointer-events-auto"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
          
          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-gradient-to-r from-gold to-silver w-8'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
          
          {/* Thumbnail Navigation */}
          <div className="flex justify-center space-x-4 mt-8 overflow-x-auto pb-4">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 p-3 rounded-xl border-2 transition-all duration-300 ${
                  index === currentSlide
                    ? 'border-gold bg-gold/10'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {testimonial.destination}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-xl text-gray-300 mb-6">
            Ready to become our next winner?
          </p>
          <button className="bg-gradient-to-r from-gold to-silver text-black px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 transform hover:scale-105">
            Enter the Lottery Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;