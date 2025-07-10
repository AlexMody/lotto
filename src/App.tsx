import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import RegistrationForm from './components/RegistrationForm';
import CitiesTable from './components/CitiesTable';
import CityGallery from './components/CityGallery';
import Testimonials from './components/Testimonials';
import Partners from './components/Partners';
import Footer from './components/Footer';
import Navigation from './components/Navigation';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation isScrolled={isScrolled} />
      
      <Hero onEnterLottery={() => setShowForm(true)} />
      
      {showForm && (
        <RegistrationForm onClose={() => setShowForm(false)} />
      )}
      
      <section id="cities">
        <CitiesTable />
      </section>
      
      <section id="gallery">
        <CityGallery />
      </section>
      
      <section id="testimonials">
        <Testimonials />
      </section>
      
      <Partners />
      
      <Footer />
    </div>
  );
}

export default App;