import React, { useState, useEffect } from 'react';
import { Filter, MapPin, Heart, Eye } from 'lucide-react';

interface GalleryItem {
  id: number;
  city: string;
  country: string;
  continent: string;
  image: string;
  description: string;
  likes: number;
  views: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    city: 'Santorini',
    country: 'Greece',
    continent: 'Europe',
    image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Blue domes and white buildings',
    likes: 12500,
    views: '2.3M'
  },
  {
    id: 2,
    city: 'Dubai',
    country: 'UAE',
    continent: 'Asia',
    image: 'https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Futuristic skyline at night',
    likes: 18900,
    views: '3.1M'
  },
  {
    id: 3,
    city: 'Prague',
    country: 'Czech Republic',
    continent: 'Europe',
    image: 'https://images.pexels.com/photos/1845534/pexels-photo-1845534.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Medieval architecture and castle',
    likes: 9800,
    views: '1.8M'
  },
  {
    id: 4,
    city: 'Barcelona',
    country: 'Spain',
    continent: 'Europe',
    image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Sagrada Familia and Gaudí architecture',
    likes: 15200,
    views: '2.7M'
  },
  {
    id: 5,
    city: 'Cape Town',
    country: 'South Africa',
    continent: 'Africa',
    image: 'https://images.pexels.com/photos/1804177/pexels-photo-1804177.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Table Mountain and coastal views',
    likes: 11300,
    views: '1.9M'
  },
  {
    id: 6,
    city: 'Rio de Janeiro',
    country: 'Brazil',
    continent: 'Americas',
    image: 'https://images.pexels.com/photos/1963622/pexels-photo-1963622.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Christ the Redeemer and beaches',
    likes: 14700,
    views: '2.5M'
  },
  {
    id: 7,
    city: 'Bali',
    country: 'Indonesia',
    continent: 'Asia',
    image: 'https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Tropical paradise and temples',
    likes: 16800,
    views: '3.2M'
  },
  {
    id: 8,
    city: 'New York',
    country: 'United States',
    continent: 'Americas',
    image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Manhattan skyline and Times Square',
    likes: 22100,
    views: '4.1M'
  }
];

const CityGallery: React.FC = () => {
  const [selectedContinent, setSelectedContinent] = useState<string>('All');
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>(galleryItems);
  const [scrollY, setScrollY] = useState(0);

  const continents = ['All', 'Europe', 'Asia', 'Africa', 'Americas'];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (selectedContinent === 'All') {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(galleryItems.filter(item => item.continent === selectedContinent));
    }
  }, [selectedContinent]);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden">
      <div className="container mx-auto">
        {/* Header with Parallax Effect */}
        <div 
          className="text-center mb-16"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`
          }}
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gold to-silver bg-clip-text text-transparent">
            City Gallery
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore breathtaking views from around the world
          </p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {continents.map((continent) => (
            <button
              key={continent}
              onClick={() => setSelectedContinent(continent)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                selectedContinent === continent
                  ? 'bg-gradient-to-r from-gold to-silver text-black shadow-lg shadow-gold/30'
                  : 'bg-black/50 text-white border border-gold/30 hover:border-gold hover:bg-gold/10'
              }`}
            >
              <Filter size={16} />
              <span>{continent}</span>
            </button>
          ))}
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-black/50 backdrop-blur-lg rounded-2xl border border-gold/20 overflow-hidden hover:border-gold/50 transition-all duration-500 transform hover:scale-105"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.8s ease-out forwards'
              }}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.city}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Stats Overlay */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <div className="bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                    <Heart size={14} className="text-red-400" />
                    <span className="text-white text-sm">{formatNumber(item.likes)}</span>
                  </div>
                  <div className="bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                    <Eye size={14} className="text-blue-400" />
                    <span className="text-white text-sm">{item.views}</span>
                  </div>
                </div>
                
                {/* Location Badge */}
                <div className="absolute bottom-4 left-4 bg-gradient-to-r from-gold/90 to-silver/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <MapPin size={14} className="text-black" />
                  <span className="text-black text-sm font-semibold">{item.continent}</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
                  {item.city}
                </h3>
                <p className="text-gray-400 text-sm mb-2">{item.country}</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
              
              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gold/50 transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
        
        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-gold to-silver text-black px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 transform hover:scale-105">
            Load More Destinations
          </button>
        </div>
      </div>
      
      {/* CSS for Animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default CityGallery;