"use client"

import React, { useState } from 'react';
import { 
  ArrowRight, ArrowLeft, CheckCircle, Clock, Target, 
  User, Briefcase, Plus, X, Send, Sparkles, Star
} from 'lucide-react';

const PostRequestForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    skillsRequired: [],
    budgetType: 'fixed',
    budgetAmount: '',
    budgetMin: '',
    budgetMax: '',
    duration: '',
    experienceLevel: '',
    location: '',
    deadline: ''
  });
  const [skillInput, setSkillInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const categories = [
    'Marketing & Sales',
    'Finance & Accounting',
    'Software Development',
    'Design & Creative',
    'Business Strategy',
    'Data & Analytics'
  ];

  const experienceLevels = ['Beginner', 'Intermediate', 'Expert'];
  const durations = ['1 week', '2 weeks', '1 month', '3 months', '6+ months'];

  const steps = [
    { title: 'Project Details', icon: Briefcase },
    { title: 'Category & Skills', icon: Target },
    { title: 'Timeline & Budget', icon: Clock },
    { title: 'Final Details', icon: User }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkillAdd = (skill) => {
    if (skill && !formData.skillsRequired.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skillsRequired: [...prev.skillsRequired, skill]
      }));
      setSkillInput('');
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skillsRequired: prev.skillsRequired.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitSuccess(true);
    setIsSubmitting(false);
  };

  const isStepValid = (step) => {
    switch (step) {
      case 0: return formData.title && formData.description;
      case 1: return formData.category && formData.skillsRequired.length > 0;
      case 2: return formData.duration && formData.experienceLevel;
      case 3: return true;
      default: return false;
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border border-blue-100 relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-cyan-100/20 rounded-2xl"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
          
          <div className="relative z-10">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-blue-900 mb-3">Request Posted!</h2>
            <p className="text-blue-600 mb-8 text-lg">Your service request is now live and ready to attract top talent.</p>
            
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-8 text-left border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-3 text-lg">"{formData.title}"</h3>
              <div className="text-sm text-blue-700 space-y-2">
                <p><span className="font-semibold">Category:</span> {formData.category}</p>
                <p><span className="font-semibold">Duration:</span> {formData.duration}</p>
                <p><span className="font-semibold">Experience:</span> {formData.experienceLevel}</p>
              </div>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold text-lg"
            >
              Post Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Post a Service Request
          </h1>
          <p className="text-blue-600 text-xl">Find the perfect consultant for your project</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div key={index} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                      isCompleted ? 'bg-gradient-to-r from-blue-500 to-cyan-500 scale-110' :
                      isActive ? 'bg-gradient-to-r from-blue-400 to-cyan-400 scale-105' : 
                      'bg-gray-300'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <Icon className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <p className={`text-sm mt-3 font-medium transition-colors ${
                      isActive ? 'text-blue-700' : 'text-blue-500'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-20 h-2 mx-4 rounded-full transition-all duration-300 ${
                      isCompleted ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
          <div className="p-8">
            {/* Step 0: Project Details */}
            {currentStep === 0 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-4">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-blue-900 mb-3">Project Details</h2>
                  <p className="text-blue-600 text-lg">Tell us about your amazing project</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-blue-900 mb-3">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Build an E-commerce Website"
                      className="w-full px-5 py-4 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-blue-900 placeholder-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-blue-900 mb-3">
                      Project Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={6}
                      placeholder="Describe your project goals, requirements, and vision..."
                      className="w-full px-5 py-4 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200 text-blue-900 placeholder-blue-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Category & Skills */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-4">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-blue-900 mb-3">Category & Skills</h2>
                  <p className="text-blue-600 text-lg">What expertise do you need?</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-4">
                    Select Category *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setFormData(prev => ({ ...prev, category: cat }))}
                        className={`p-5 text-left border-2 rounded-xl transition-all duration-200 hover:shadow-lg ${
                          formData.category === cat
                            ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 shadow-lg scale-105'
                            : 'border-blue-200 hover:border-blue-300 text-blue-700'
                        }`}
                      >
                        <p className="font-semibold text-lg">{cat}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-4">
                    Required Skills *
                  </label>
                  
                  <div className="flex flex-wrap gap-3 mb-4">
                    {formData.skillsRequired.map((skill) => (
                      <span
                        key={skill}
                        className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 px-4 py-2 rounded-full text-sm flex items-center gap-2 border border-blue-200 shadow-sm"
                      >
                        {skill}
                        <button
                          onClick={() => handleSkillRemove(skill)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-200 rounded-full p-1 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSkillAdd(skillInput.trim())}
                      placeholder="Add a skill (e.g., React, Python, Design)"
                      className="flex-1 px-5 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-blue-900 placeholder-blue-400"
                    />
                    <button
                      onClick={() => handleSkillAdd(skillInput.trim())}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Timeline & Budget */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-4">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-blue-900 mb-3">Timeline & Budget</h2>
                  <p className="text-blue-600 text-lg">When and how much?</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-4">
                    Project Duration *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {durations.map((dur) => (
                      <button
                        key={dur}
                        onClick={() => setFormData(prev => ({ ...prev, duration: dur }))}
                        className={`p-4 text-center border-2 rounded-xl transition-all duration-200 hover:shadow-lg ${
                          formData.duration === dur
                            ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 shadow-lg scale-105'
                            : 'border-blue-200 hover:border-blue-300 text-blue-700'
                        }`}
                      >
                        <p className="font-semibold">{dur}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-4">
                    Experience Level *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {experienceLevels.map((exp, index) => (
                      <button
                        key={exp}
                        onClick={() => setFormData(prev => ({ ...prev, experienceLevel: exp }))}
                        className={`p-5 text-center border-2 rounded-xl transition-all duration-200 hover:shadow-lg relative ${
                          formData.experienceLevel === exp
                            ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 shadow-lg scale-105'
                            : 'border-blue-200 hover:border-blue-300 text-blue-700'
                        }`}
                      >
                        <div className="flex items-center justify-center mb-2">
                          {[...Array(index + 1)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-blue-500 fill-current" />
                          ))}
                        </div>
                        <p className="font-semibold">{exp}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-4">
                    Budget (Optional)
                  </label>
                  <div className="space-y-4">
                    <div className="flex gap-6">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="budgetType"
                          value="fixed"
                          checked={formData.budgetType === 'fixed'}
                          onChange={(e) => setFormData(prev => ({ ...prev, budgetType: e.target.value }))}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-blue-700 font-medium">Fixed Budget</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="budgetType"
                          value="range"
                          checked={formData.budgetType === 'range'}
                          onChange={(e) => setFormData(prev => ({ ...prev, budgetType: e.target.value }))}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-blue-700 font-medium">Budget Range</span>
                      </label>
                    </div>

                    {formData.budgetType === 'fixed' ? (
                      <input
                        type="number"
                        value={formData.budgetAmount}
                        onChange={(e) => setFormData(prev => ({ ...prev, budgetAmount: e.target.value }))}
                        placeholder="Enter budget amount ($)"
                        className="w-full px-5 py-4 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-blue-900 placeholder-blue-400"
                      />
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="number"
                          value={formData.budgetMin}
                          onChange={(e) => setFormData(prev => ({ ...prev, budgetMin: e.target.value }))}
                          placeholder="Min budget ($)"
                          className="px-5 py-4 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-blue-900 placeholder-blue-400"
                        />
                        <input
                          type="number"
                          value={formData.budgetMax}
                          onChange={(e) => setFormData(prev => ({ ...prev, budgetMax: e.target.value }))}
                          placeholder="Max budget ($)"
                          className="px-5 py-4 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-blue-900 placeholder-blue-400"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Final Details */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-4">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-blue-900 mb-3">Final Details</h2>
                  <p className="text-blue-600 text-lg">Location and preferences</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-blue-900 mb-3">
                      Location Preference
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Remote, New York, London..."
                      className="w-full px-5 py-4 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-blue-900 placeholder-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-blue-900 mb-3">
                      Response Deadline
                    </label>
                    <input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                      className="w-full px-5 py-4 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-blue-900"
                    />
                  </div>
                </div>

                {/* Project Summary */}
                <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-100">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Summary Preview
                  </h3>
                  <div className="space-y-2 text-blue-700">
                    <p><strong>Title:</strong> {formData.title || 'N/A'}</p>
                    <p><strong>Category:</strong> {formData.category || 'N/A'}</p>
                    <p><strong>Skills:</strong> {formData.skillsRequired.join(', ') || 'N/A'}</p>
                    <p><strong>Duration:</strong> {formData.duration || 'N/A'}</p>
                    <p><strong>Experience Level:</strong> {formData.experienceLevel || 'N/A'}</p>
                    {formData.budgetType === 'fixed' ? (
                      <p><strong>Budget:</strong> ${formData.budgetAmount || 'N/A'}</p>
                    ) : (
                      <p><strong>Budget Range:</strong> ${formData.budgetMin || 'N/A'} - ${formData.budgetMax || 'N/A'}</p>
                    )}
                    <p><strong>Location:</strong> {formData.location || 'N/A'}</p>
                    <p><strong>Response Deadline:</strong> {formData.deadline || 'N/A'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-10">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all duration-200 ${
                  currentStep === 0
                    ? 'cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200'
                    : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-50 hover:border-blue-400 shadow-lg hover:shadow-xl'
                }`}
              >
                <ArrowLeft className="inline-block w-4 h-4 mr-2" />
                Back
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={!isStepValid(currentStep)}
                  className={`px-6 py-3 rounded-xl text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl ${
                    isStepValid(currentStep)
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  Next
                  <ArrowRight className="inline-block w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-xl text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 flex items-center gap-2 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Post Request
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostRequestForm;