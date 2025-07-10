import React from 'react';
import { Globe, Mail, Phone, MapPin, Shield, FileText, Users, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gold/20">
      {/* Legal Notice Banner */}
      <div className="bg-gradient-to-r from-gold/10 to-silver/10 border-b border-gold/20 py-4 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-8 text-center">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gold" />
              <span className="text-sm text-gray-300">Applicants must be 18+</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-gold" />
              <span className="text-sm text-gray-300">Valid ID required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gold" />
              <span className="text-sm text-gray-300">No purchase necessary</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Globe className="h-8 w-8 text-gold" />
                <span className="text-xl font-bold bg-gradient-to-r from-gold to-silver bg-clip-text text-transparent">
                  Travel Lottery
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Making dream vacations a reality through our global travel lottery program. 
                Partnered with industry leaders to provide unforgettable experiences.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-gold/20 to-silver/20 rounded-full flex items-center justify-center border border-gold/30 hover:border-gold transition-colors cursor-pointer">
                  <span className="text-gold font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-gold/20 to-silver/20 rounded-full flex items-center justify-center border border-gold/30 hover:border-gold transition-colors cursor-pointer">
                  <span className="text-gold font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-gold/20 to-silver/20 rounded-full flex items-center justify-center border border-gold/30 hover:border-gold transition-colors cursor-pointer">
                  <span className="text-gold font-bold">in</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-gold transition-colors">How It Works</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gold transition-colors">Destinations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gold transition-colors">Winners</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gold transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gold transition-colors">Contact</a></li>
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Legal & Privacy</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-gold transition-colors flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>Terms & Conditions</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-gold transition-colors flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>Privacy Policy</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-gold transition-colors flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Age Verification</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                    GDPR Compliance
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gold" />
                  <span className="text-gray-400">support@travellottery.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gold" />
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gold" />
                  <span className="text-gray-400">Global Operations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gold" />
                  <span className="text-gray-400">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* GDPR Notice */}
          <div className="mt-12 p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-500/30">
            <div className="flex items-start space-x-3">
              <Shield className="h-6 w-6 text-blue-400 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-blue-300 mb-2">GDPR Data Protection</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  We are committed to protecting your personal data in accordance with GDPR regulations. 
                  All information collected is used solely for lottery administration and prize fulfillment. 
                  Your data is never shared with third parties without explicit consent. You have the right 
                  to access, modify, or delete your personal information at any time.
                </p>
                <div className="mt-4">
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
                    Learn more about your data rights →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-gold/20 py-6 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 Travel Lottery. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Operated under international lottery regulations</span>
              <span>•</span>
              <span>Licensed & Insured</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;