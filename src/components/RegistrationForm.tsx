import React, { useState } from 'react';
import { X, Upload, Check, AlertCircle } from 'lucide-react';

interface RegistrationFormProps {
  onClose: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    dateOfBirth: '',
    agreeToTerms: false
  });

  const [files, setFiles] = useState({
    passport: null as File | null,
    driverLicense: null as File | null
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'passport' | 'driverLicense') => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, [fileType]: 'Please upload JPG, PNG, or PDF files only' }));
        return;
      }
      
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, [fileType]: 'File size must be less than 5MB' }));
        return;
      }
      
      setFiles(prev => ({ ...prev, [fileType]: file }));
      setErrors(prev => ({ ...prev, [fileType]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
    if (!files.passport) newErrors.passport = 'Passport or ID is required';
    if (!files.driverLicense) newErrors.driverLicense = 'Driver\'s license is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Age validation (must be 18+)
    if (formData.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(formData.dateOfBirth);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        if (age - 1 < 18) newErrors.dateOfBirth = 'You must be 18 or older to participate';
      } else if (age < 18) {
        newErrors.dateOfBirth = 'You must be 18 or older to participate';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    // Prepare form data for multipart/form-data
    const form = new FormData();
    form.append('fullName', formData.fullName);
    form.append('email', formData.email);
    form.append('phone', formData.phone);
    form.append('country', formData.country);
    form.append('dateOfBirth', formData.dateOfBirth);
    if (files.passport) form.append('passport', files.passport);
    if (files.driverLicense) form.append('driverLicense', files.driverLicense);

    try {
      const response = await fetch('http://localhost:4000/submit', {
        method: 'POST',
        body: form
      });
      if (response.ok) {
        alert('Registration successful! Your data has been saved.');
        setIsSubmitting(false);
        onClose();
      } else {
        const data = await response.json();
        alert('Submission failed: ' + (data.error || 'Unknown error'));
        setIsSubmitting(false);
      }
    } catch (err) {
      alert('Submission failed: ' + err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-gold/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gold to-silver bg-clip-text text-transparent">
              Enter the Lottery
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-black/50 border ${errors.fullName ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="mt-1 text-red-400 text-sm flex items-center space-x-1">
                  <AlertCircle size={16} />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>
            
            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-black/50 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-red-400 text-sm flex items-center space-x-1">
                    <AlertCircle size={16} />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-black/50 border ${errors.phone ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <p className="mt-1 text-red-400 text-sm flex items-center space-x-1">
                    <AlertCircle size={16} />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>
            </div>
            
            {/* Country and Date of Birth */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Country *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-black/50 border ${errors.country ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all`}
                >
                  <option value="">Select your country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                  <option value="JP">Japan</option>
                  <option value="AU">Australia</option>
                  <option value="BR">Brazil</option>
                  <option value="other">Other</option>
                </select>
                {errors.country && (
                  <p className="mt-1 text-red-400 text-sm flex items-center space-x-1">
                    <AlertCircle size={16} />
                    <span>{errors.country}</span>
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-black/50 border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all`}
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-red-400 text-sm flex items-center space-x-1">
                    <AlertCircle size={16} />
                    <span>{errors.dateOfBirth}</span>
                  </p>
                )}
              </div>
            </div>
            
            {/* File Uploads */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Passport or ID *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileChange(e, 'passport')}
                    className="hidden"
                    id="passport-upload"
                  />
                  <label
                    htmlFor="passport-upload"
                    className={`w-full px-4 py-3 border-2 border-dashed ${errors.passport ? 'border-red-500' : 'border-gray-600'} rounded-lg cursor-pointer hover:border-gold transition-colors flex items-center justify-center space-x-2`}
                  >
                    {files.passport ? (
                      <>
                        <Check size={20} className="text-green-400" />
                        <span className="text-green-400">{files.passport.name}</span>
                      </>
                    ) : (
                      <>
                        <Upload size={20} className="text-gray-400" />
                        <span className="text-gray-400">Click to upload passport or ID</span>
                      </>
                    )}
                  </label>
                  {errors.passport && (
                    <p className="mt-1 text-red-400 text-sm flex items-center space-x-1">
                      <AlertCircle size={16} />
                      <span>{errors.passport}</span>
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Driver's License *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileChange(e, 'driverLicense')}
                    className="hidden"
                    id="license-upload"
                  />
                  <label
                    htmlFor="license-upload"
                    className={`w-full px-4 py-3 border-2 border-dashed ${errors.driverLicense ? 'border-red-500' : 'border-gray-600'} rounded-lg cursor-pointer hover:border-gold transition-colors flex items-center justify-center space-x-2`}
                  >
                    {files.driverLicense ? (
                      <>
                        <Check size={20} className="text-green-400" />
                        <span className="text-green-400">{files.driverLicense.name}</span>
                      </>
                    ) : (
                      <>
                        <Upload size={20} className="text-gray-400" />
                        <span className="text-gray-400">Click to upload driver's license</span>
                      </>
                    )}
                  </label>
                  {errors.driverLicense && (
                    <p className="mt-1 text-red-400 text-sm flex items-center space-x-1">
                      <AlertCircle size={16} />
                      <span>{errors.driverLicense}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Terms Checkbox */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 text-gold focus:ring-gold border-gray-600 rounded"
              />
              <label htmlFor="agreeToTerms" className="text-sm text-gray-300">
                I confirm I am 18+ and agree to the GDPR-compliant data handling. 
                <span className="text-gold"> Read our Privacy Policy.</span>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-400 text-sm flex items-center space-x-1">
                <AlertCircle size={16} />
                <span>{errors.agreeToTerms}</span>
              </p>
            )}
            
            {/* GDPR Notice */}
            <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-300">
                <strong>GDPR Notice:</strong> All personal data is protected under GDPR. 
                We do not share your documents with third parties. Your information is used 
                solely for lottery administration and prize fulfillment.
              </p>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-gold to-silver text-black py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-gold/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Submit Entry</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;