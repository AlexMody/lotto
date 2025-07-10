import React, { useEffect, useState } from 'react';
import { Play, Globe, Clock, Users } from 'lucide-react';

interface HeroProps {
  onEnterLottery: () => void;
}

const Hero: React.FC<HeroProps> = ({ onEnterLottery }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 14,
    minutes: 29,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let newSeconds = prev.seconds - 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;
        let newDays = prev.days;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes--;
          if (newMinutes < 0) {
            newMinutes = 59;
            newHours--;
            if (newHours < 0) {
              newHours = 23;
              newDays--;
            }
          }
        }

        return {
          days: newDays,
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background Simulation */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gold rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-gold via-silver to-neon bg-clip-text text-transparent animate-gradient">
            Win a Free Trip
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-silver via-gold to-neon bg-clip-text text-transparent">
            to the World's Most Beautiful Cities!
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Flights, Stays, and Ride Experiences — All Covered
          </p>
        </div>
        
        {/* Countdown Timer */}
        <div className="mb-8 p-6 bg-black/50 backdrop-blur-lg rounded-xl border border-gold/20">
          <p className="text-gold font-semibold mb-4">Next Draw In:</p>
          <div className="flex justify-center space-x-4">
            {[
              { label: 'Days', value: timeLeft.days.toString().padStart(2, '0') },
              { label: 'Hours', value: timeLeft.hours.toString().padStart(2, '0') },
              { label: 'Minutes', value: timeLeft.minutes.toString().padStart(2, '0') },
              { label: 'Seconds', value: timeLeft.seconds.toString().padStart(2, '0') }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white bg-gradient-to-r from-gold/20 to-silver/20 rounded-lg px-4 py-2 border border-gold/30">
                  {item.value}
                </div>
                <div className="text-sm text-gray-400 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Button */}
        <button
          onClick={onEnterLottery}
          className="group relative bg-gradient-to-r from-gold to-silver text-black px-12 py-4 rounded-full text-xl font-bold hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300 transform hover:scale-105"
        >
          <span className="relative z-10 flex items-center space-x-3">
            <Globe className="h-6 w-6" />
            <span>Enter the Lottery Now</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-silver to-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
        
        {/* Trust Indicators */}
        <div className="mt-12 flex justify-center space-x-8 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-gold" />
            <span>10,000+ Winners</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4 text-gold" />
            <span>150+ Countries</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gold" />
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gold rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;