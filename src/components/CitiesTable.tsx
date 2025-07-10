import React, { useState } from 'react';
import { MapPin, Star, Users, Camera } from 'lucide-react';

interface City {
  rank: number;
  name: string;
  country: string;
  famousFor: string;
  image: string;
  rating: number;
  visitors: string;
}

const cities: City[] = [
  {
    rank: 1,
    name: 'Paris',
    country: 'France',
    famousFor: 'Eiffel Tower, Art',
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.9,
    visitors: '30M+'
  },
  {
    rank: 2,
    name: 'Tokyo',
    country: 'Japan',
    famousFor: 'Technology, Culture',
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.8,
    visitors: '25M+'
  },
  {
    rank: 3,
    name: 'Venice',
    country: 'Italy',
    famousFor: 'Water canals, Romance',
    image: 'https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.7,
    visitors: '20M+'
  },
  {
    rank: 4,
    name: 'Santorini',
    country: 'Greece',
    famousFor: 'Sunsets, Architecture',
    image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.9,
    visitors: '15M+'
  },
  {
    rank: 5,
    name: 'Dubai',
    country: 'UAE',
    famousFor: 'Luxury, Skyscrapers',
    image: 'https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.6,
    visitors: '18M+'
  },
  {
    rank: 6,
    name: 'Prague',
    country: 'Czech Republic',
    famousFor: 'Castle, Beer',
    image: 'https://images.pexels.com/photos/1845534/pexels-photo-1845534.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.8,
    visitors: '12M+'
  },
  {
    rank: 7,
    name: 'Barcelona',
    country: 'Spain',
    famousFor: 'Gaudí, Beaches',
    image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.7,
    visitors: '22M+'
  },
  {
    rank: 8,
    name: 'Cape Town',
    country: 'South Africa',
    famousFor: 'Table Mountain, Wine',
    image: 'https://images.pexels.com/photos/1804177/pexels-photo-1804177.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.8,
    visitors: '8M+'
  }
];

const CitiesTable: React.FC = () => {
  const [hoveredCity, setHoveredCity] = useState<City | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gold to-silver bg-clip-text text-transparent">
            Most Beautiful Cities
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the world's most stunning destinations where your dream vacation awaits
          </p>
        </div>
        
        <div className="bg-black/50 backdrop-blur-lg rounded-2xl border border-gold/20 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-gold/20 to-silver/20 p-6 border-b border-gold/30">
            <div className="grid grid-cols-12 gap-4 items-center font-semibold text-gold">
              <div className="col-span-1">Rank</div>
              <div className="col-span-3">City</div>
              <div className="col-span-2">Country</div>
              <div className="col-span-3">Famous For</div>
              <div className="col-span-1">Rating</div>
              <div className="col-span-1">Visitors</div>
              <div className="col-span-1">Preview</div>
            </div>
          </div>
          
          {/* Table Body */}
          <div className="divide-y divide-gray-800">
            {cities.map((city) => (
              <div
                key={city.rank}
                className="p-6 hover:bg-gradient-to-r hover:from-gold/10 hover:to-silver/10 transition-all duration-300 cursor-pointer group"
                onMouseEnter={() => setHoveredCity(city)}
                onMouseLeave={() => setHoveredCity(null)}
                onMouseMove={handleMouseMove}
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-1">
                    <div className="w-8 h-8 bg-gradient-to-r from-gold to-silver rounded-full flex items-center justify-center text-black font-bold">
                      {city.rank}
                    </div>
                  </div>
                  
                  <div className="col-span-3">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-gold" />
                      <span className="text-xl font-semibold text-white group-hover:text-gold transition-colors">
                        {city.name}
                      </span>
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <span className="text-gray-300">{city.country}</span>
                  </div>
                  
                  <div className="col-span-3">
                    <span className="text-gray-300">{city.famousFor}</span>
                  </div>
                  
                  <div className="col-span-1">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-gold fill-current" />
                      <span className="text-white font-semibold">{city.rating}</span>
                    </div>
                  </div>
                  
                  <div className="col-span-1">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-silver" />
                      <span className="text-gray-300">{city.visitors}</span>
                    </div>
                  </div>
                  
                  <div className="col-span-1">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-gold/30 group-hover:border-gold transition-colors">
                      <img
                        src={city.image}
                        alt={city.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Floating Preview */}
        {hoveredCity && (
          <div
            className="fixed z-50 pointer-events-none"
            style={{
              left: mousePosition.x + 20,
              top: mousePosition.y - 100,
              transform: 'translate(0, -50%)'
            }}
          >
            <div className="bg-black/90 backdrop-blur-xl rounded-xl border border-gold/30 p-4 shadow-2xl">
              <div className="w-64 h-40 rounded-lg overflow-hidden mb-3">
                <img
                  src={hoveredCity.image}
                  alt={hoveredCity.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gold mb-1">{hoveredCity.name}</h3>
                <p className="text-gray-300 text-sm mb-2">{hoveredCity.country}</p>
                <div className="flex items-center justify-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-gold fill-current" />
                    <span className="text-white">{hoveredCity.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-silver" />
                    <span className="text-gray-300">{hoveredCity.visitors}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CitiesTable;