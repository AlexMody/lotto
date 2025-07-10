import React from 'react';
import { Menu, X, Globe } from 'lucide-react';

interface NavigationProps {
  isScrolled: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-lg border-b border-gold/20' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-gold" />
            <span className="text-xl font-bold bg-gradient-to-r from-gold to-silver bg-clip-text text-transparent">
              Travel Lottery
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('cities')}
              className="text-white hover:text-gold transition-colors"
            >
              Cities
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="text-white hover:text-gold transition-colors"
            >
              Gallery
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-white hover:text-gold transition-colors"
            >
              Testimonials
            </button>
            <button className="bg-gradient-to-r from-gold to-silver text-black px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-gold/30 transition-all">
              Enter Now
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gold/20">
            <div className="flex flex-col space-y-4 mt-4">
              <button 
                onClick={() => scrollToSection('cities')}
                className="text-white hover:text-gold transition-colors text-left"
              >
                Cities
              </button>
              <button 
                onClick={() => scrollToSection('gallery')}
                className="text-white hover:text-gold transition-colors text-left"
              >
                Gallery
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-white hover:text-gold transition-colors text-left"
              >
                Testimonials
              </button>
              <button className="bg-gradient-to-r from-gold to-silver text-black px-6 py-2 rounded-full font-semibold w-fit">
                Enter Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;