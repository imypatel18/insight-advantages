// components/PostRequestForm.jsx

"use client";

import React, { useState } from "react";
import axios from "axios";
import { ArrowLeft, ArrowRight, Clock, Send, Building, MapPin, DollarSign, User, FileText, Star, Tag, CheckCircle } from "lucide-react";


const PostRequestForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    job_title: "",
    company_name: "",
    company_rating: 0,
    hourly_rate_min: "",
    hourly_rate_max: "",
    duration: "",
    experience_level: "",
    description: "",
    tags: "",
    location: "",
    proposals: 0,
    posted_time: new Date().toISOString(),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const steps = ["Job Details", "Budget & Experience"];

  const isStepValid = (step) => {
    switch (step) {
      case 0:
        return (
          formData.job_title &&
          formData.company_name &&
          formData.company_rating > 0 &&
          formData.description &&
          formData.tags &&
          formData.location
        );
      case 1:
        return (
          formData.hourly_rate_min &&
          formData.hourly_rate_max &&
          formData.duration &&
          formData.experience_level
        );
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:5000/api/jobs", formData);
      setResponseMessage(response.data.message);
      setSubmitSuccess(true);
    } catch (err) {
      console.error(err);
      setResponseMessage("Failed to post request");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-xl text-center">
          <div className="text-green-600 mb-4">
            <CheckCircle className="w-12 h-12 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Success!</h2>
          <p className="text-blue-700">{responseMessage}</p>
          <div className="mt-6">
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => window.location.reload()}
            >
              Post Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
  <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-xl border border-blue-100 space-y-8">
  {/* Header */}
  <div className="text-center space-y-2">
    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
      <Building className="w-8 h-8 text-white" />
    </div>
    <h1 className="text-3xl font-bold text-blue-900">Post Job Request</h1>
    <p className="text-blue-600">Find the perfect candidate for your position</p>
  </div>

  {/* Progress Bar */}
  <div className="w-full bg-blue-100 rounded-full h-2 mb-8">
    <div 
      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
      style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
    ></div>
  </div>

  {/* Step 1: Job Details */}
  {currentStep === 0 && (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-blue-800 flex items-center gap-2 mb-6">
        <FileText className="w-5 h-5" />
        Job Details
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-blue-700 flex items-center gap-2">
            <User className="w-4 h-4" />
            Job Title
          </label>
          <input
            type="text"
            placeholder="e.g., Senior Frontend Developer"
            value={formData.job_title}
            onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
            className="w-full border-2 border-blue-200 px-4 py-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-blue-700 flex items-center gap-2">
            <Building className="w-4 h-4" />
            Company Name
          </label>
          <input
            type="text"
            placeholder="Your company name"
            value={formData.company_name}
            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
            className="w-full border-2 border-blue-200 px-4 py-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-blue-700 flex items-center gap-2">
            <Star className="w-4 h-4" />
            Company Rating
          </label>
          <input
                      className="w-full border-2 border-blue-200 px-4 py-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white"

  type="number"
  placeholder="0 - 5"
  min="0"
  max="5"
  value={formData.company_rating === '' ? '' : String(formData.company_rating)}
  onChange={(e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      company_rating: value === '' ? '' : parseInt(value),
    });
  }}
/>
          {/* <input
            type="number"
            placeholder="0 - 5"
            min="0"
            max="5"
            step="0.1"
            value={formData.company_rating}
            onChange={(e) => setFormData({ ...formData, company_rating: parseFloat(e.target.value) })}
            className="w-full border-2 border-blue-200 px-4 py-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white"
          /> */}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-blue-700 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location
          </label>
          <input
            type="text"
            placeholder="e.g., New York, NY or Remote"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full border-2 border-blue-200 px-4 py-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-blue-700 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Job Description
        </label>
        <textarea
          placeholder="Describe the role, responsibilities, and requirements..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full border-2 border-blue-200 px-4 py-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white resize-none"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-blue-700 flex items-center gap-2">
          <Tag className="w-4 h-4" />
          Skills & Tags
        </label>
        <input
          type="text"
          placeholder="e.g., React, Node.js, TypeScript (comma separated)"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          className="w-full border-2 border-blue-200 px-4 py-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white"
        />
      </div>
    </div>
  )}

  {/* Step 2: Compensation & Requirements */}
  {currentStep === 1 && (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-blue-800 flex items-center gap-2 mb-6">
        <DollarSign className="w-5 h-5" />
        Compensation & Requirements
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-blue-700 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Hourly Rate (Min)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-blue-600">$</span>
            <input
              type="number"
              placeholder="50"
              value={formData.hourly_rate_min}
              onChange={(e) => setFormData({ ...formData, hourly_rate_min: e.target.value })}
              className="w-full border-2 border-blue-200 pl-8 pr-4 py-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-blue-700 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Hourly Rate (Max)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-blue-600">$</span>
            <input
              type="number"
              placeholder="100"
              value={formData.hourly_rate_max}
              onChange={(e) => setFormData({ ...formData, hourly_rate_max: e.target.value })}
              className="w-full border-2 border-blue-200 pl-8 pr-4 py-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-blue-700 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Duration
          </label>
          <input
            type="text"
            placeholder="e.g., 3-6 months"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className="w-full border-2 border-blue-200 px-4 py-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-blue-700 flex items-center gap-2">
            <User className="w-4 h-4" />
            Experience Level
          </label>
          <input
            type="text"
            placeholder="e.g., Senior, Mid-level, Junior"
            value={formData.experience_level}
            onChange={(e) => setFormData({ ...formData, experience_level: e.target.value })}
            className="w-full border-2 border-blue-200 px-4 py-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white"
          />
        </div>
      </div>
    </div>
  )}

  {/* Navigation Buttons */}
  <div className="flex justify-between items-center pt-6 border-t border-blue-100">
    <button
      disabled={currentStep === 0}
      onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
      className="flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
    >
      <ArrowLeft className="w-4 h-4" /> Back
    </button>

    {currentStep < steps.length - 1 ? (
      <button
        disabled={!isStepValid(currentStep)}
        onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg"
      >
        Next <ArrowRight className="w-4 h-4" />
      </button>
    ) : (
      <button
        onClick={handleSubmit}
        disabled={isSubmitting || !isStepValid(currentStep)}
        className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg"
      >
        {isSubmitting ? (
          <>
            <Clock className="w-4 h-4 animate-spin" /> Submitting...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" /> Submit Job Request
          </>
        )}
      </button>
    )}
  </div>
</div>
  );
};

export default PostRequestForm;
