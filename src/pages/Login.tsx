
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import AnimatedLogo from '@/components/AnimatedLogo';
import FloatingInput from '@/components/FloatingInput';
import LanguageSelector from '@/components/LanguageSelector';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [validFields, setValidFields] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string) => {
    let error = '';
    let isValid = false;

    switch (name) {
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
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters';
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
      console.log('Login submitted:', formData);
      // Handle login logic here
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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your AgriLink account</p>
          </div>

          {/* Login form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <FloatingInput
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
                onBlur={() => validateField('email', formData.email)}
                error={errors.email}
                isValid={validFields.email}
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

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 rounded border-gray-300 text-agri-green focus:ring-agri-green" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-agri-green hover:text-agri-green/80 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-agri-green to-agri-blue text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/signup')}
                  className="text-agri-green font-semibold hover:text-agri-green/80 transition-colors"
                >
                  Sign up here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
