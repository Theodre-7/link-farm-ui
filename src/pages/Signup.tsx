
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Tractor, ShoppingCart } from 'lucide-react';
import AnimatedLogo from '@/components/AnimatedLogo';
import FloatingInput from '@/components/FloatingInput';
import LanguageSelector from '@/components/LanguageSelector';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'farmer' | 'buyer'>('farmer');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [validFields, setValidFields] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string) => {
    let error = '';
    let isValid = false;

    switch (name) {
      case 'fullName':
        if (!value) {
          error = 'Full name is required';
        } else if (value.length < 2) {
          error = 'Name must be at least 2 characters';
        } else {
          isValid = true;
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          error = 'Email is required';
        } else if (!emailRegex.test(value)) {
          error = 'Please enter a valid email';
        } else {
          isValid = true;
        }
        break;
      case 'phone':
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        if (!value) {
          error = 'Phone number is required';
        } else if (!phoneRegex.test(value)) {
          error = 'Please enter a valid phone number';
        } else {
          isValid = true;
        }
        break;
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          error = 'Password must contain uppercase, lowercase, and number';
        } else {
          isValid = true;
        }
        break;
      case 'confirmPassword':
        if (!value) {
          error = 'Please confirm your password';
        } else if (value !== formData.password) {
          error = 'Passwords do not match';
        } else {
          isValid = true;
        }
        break;
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    setValidFields(prev => ({ ...prev, [name]: isValid }));
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      validateField(name, value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    Object.keys(formData).forEach(key => {
      validateField(key, formData[key as keyof typeof formData]);
    });

    // Check if form is valid
    const hasErrors = Object.values(errors).some(error => error);
    const allFieldsValid = Object.values(validFields).every(valid => valid);

    if (!hasErrors && allFieldsValid) {
      console.log('Signup submitted:', { ...formData, role: activeTab });
      // Handle signup logic here
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-cream via-agri-blue/10 to-agri-green/10">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <button
          onClick={() => navigate('/role')}
          className="flex items-center gap-2 text-gray-600 hover:text-agri-green transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <LanguageSelector />
      </div>

      {/* Main content */}
      <div className="flex items-center justify-center min-h-[80vh] px-6">
        <div className="w-full max-w-md">
          {/* Logo and title */}
          <div className="text-center mb-8 animate-fade-up">
            <div className="mb-6">
              <AnimatedLogo size={80} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Join AgriLink</h1>
            <p className="text-gray-600">Create your account to get started</p>
          </div>

          {/* Signup form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
            {/* Role tabs */}
            <div className="relative mb-8">
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('farmer')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === 'farmer' 
                      ? 'bg-white text-agri-green shadow-md' 
                      : 'text-gray-600 hover:text-agri-green'
                  }`}
                >
                  <Tractor className="w-4 h-4" />
                  <span className="font-medium">Farmer</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('buyer')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === 'buyer' 
                      ? 'bg-white text-agri-brown shadow-md' 
                      : 'text-gray-600 hover:text-agri-brown'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="font-medium">Buyer</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <FloatingInput
                label="Full Name"
                value={formData.fullName}
                onChange={(value) => handleInputChange('fullName', value)}
                onBlur={() => validateField('fullName', formData.fullName)}
                error={errors.fullName}
                isValid={validFields.fullName}
              />

              <FloatingInput
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
                onBlur={() => validateField('email', formData.email)}
                error={errors.email}
                isValid={validFields.email}
              />

              <FloatingInput
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(value) => handleInputChange('phone', value)}
                onBlur={() => validateField('phone', formData.phone)}
                error={errors.phone}
                isValid={validFields.phone}
              />

              <div className="relative">
                <FloatingInput
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(value) => handleInputChange('password', value)}
                  onBlur={() => validateField('password', formData.password)}
                  error={errors.password}
                  isValid={validFields.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-agri-green transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="relative">
                <FloatingInput
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(value) => handleInputChange('confirmPassword', value)}
                  onBlur={() => validateField('confirmPassword', formData.confirmPassword)}
                  error={errors.confirmPassword}
                  isValid={validFields.confirmPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-agri-green transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3 rounded border-gray-300 text-agri-green focus:ring-agri-green" />
                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                  <button type="button" className="text-agri-green hover:text-agri-green/80 transition-colors">
                    Terms of Service
                  </button>
                  {' '}and{' '}
                  <button type="button" className="text-agri-green hover:text-agri-green/80 transition-colors">
                    Privacy Policy
                  </button>
                </span>
              </div>

              <button
                type="submit"
                className={`w-full text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 ${
                  activeTab === 'farmer' 
                    ? 'bg-gradient-to-r from-agri-green to-agri-blue' 
                    : 'bg-gradient-to-r from-agri-orange to-agri-brown'
                }`}
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-agri-green font-semibold hover:text-agri-green/80 transition-colors"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
