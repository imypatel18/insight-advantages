'use client';
import { useState } from 'react';
import Navbar from '../../components/navbar';
import { Box, Container, Paper, TextField, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
export default function ConsultantProfilePage() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    fullName: searchParams.get('name') || '',
    email: searchParams.get('email') || '',
    phone: '',
    location: '',
    workType: '',
    workMode: '',
    languages: '',
    specialization: '',
    yearsOfExperience: '',
    education: [{ institution: '', degree: '', year: '' }],
    certificates: [],
    experience: [{ role: '', company: '', years: '' }],
    skills: '',
    services: '',
    hours: '',
    consultingMode: '',
    pricing: '',
    payment: '',
    bio: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  // Handle input change
  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  // Handle dynamic fields
  function handleArrayChange(e, idx, field) {
    const { name, value } = e.target;
    const updated = form[field].map((item, i) =>
      i === idx ? { ...item, [name]: value } : item
    );
    setForm({ ...form, [field]: updated });
  }

  function addArrayItem(field, emptyObj) {
    setForm({ ...form, [field]: [...form[field], emptyObj] });
  }

  function removeArrayItem(field, idx) {
    const updated = form[field].filter((_, i) => i !== idx);
    setForm({ ...form, [field]: updated });
  }

  // Handle certificate file uploads
  function handleCertificateUpload(e) {
    const files = Array.from(e.target.files);
    setForm({ ...form, certificates: files });
  }

  // Basic validation
  function validate() {
    const newErrors = {};
    if (!form.fullName) newErrors.fullName = 'Full name is required';
    if (!form.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email';
    if (!form.phone) newErrors.phone = 'Phone number is required';
    if (!form.specialization) newErrors.specialization = 'Specialization is required';
    if (!form.yearsOfExperience) newErrors.yearsOfExperience = 'Years of experience is required';
    if (!form.bio) newErrors.bio = 'Bio is required';
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      // Submit the form data to your backend here
            router.push('/');

    }
  }

  return (
    <>
    <Navbar />
    <Box sx={{ bgcolor: 'grey.100', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Paper sx={{ p: 4 }}>
        <h1 className="text-3xl font-bold mb-6 text-blue-900">Consultant Profile Registration</h1>
        {submitted ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            Profile submitted successfully!
          </div>
        ) : null}
        <form onSubmit={handleSubmit} noValidate>
          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <TextField
              label="Full Name"
              margin="normal"
              fullWidth
              size="small"
              value={form.fullName}
              disabled
            />
            <TextField
              label="Email"
              margin="normal"
              fullWidth
              size="small"
              value={form.email}
              disabled
            />
            <div>
              <label className="block font-semibold mb-1 text-blue-700">Phone Number *</label>
              <input
                className={`w-full border rounded px-3 py-2 bg-blue-100 ${errors.phone ? 'border-red-500' : 'border-blue-200'}`}
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
            </div>
            <div>
              <label className="block font-semibold mb-1 text-blue-700">Location</label>
              <input
                className="w-full border border-blue-200 rounded px-3 py-2 bg-blue-100"
                name="location"
                value={form.location}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-blue-700">Preferred Work Type</label>
              <select
                className="w-full border border-blue-200 rounded px-3 py-2 bg-blue-100"
                name="workType"
                value={form.workType}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Freelance">Freelance</option>
                <option value="Contract">Contract</option>
                <option value="Full-time">Full-time</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-blue-700">Preferred Work Mode</label>
              <select
                className="w-full border border-blue-200 rounded px-3 py-2 bg-blue-100"
                name="workMode"
                value={form.workMode}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Remote">Remote</option>
                <option value="In-person">In-person</option>
                <option value="Hybrid">Hybrid</option>
                <option value="No preference">No preference</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-blue-700">Languages Spoken</label>
              <input
                className="w-full border border-blue-200 rounded px-3 py-2 bg-blue-100"
                name="languages"
                value={form.languages}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Professional Background */}
          <div className="bg-blue-100 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-1 text-blue-700">Specialization *</label>
                <input
                  className={`w-full border rounded px-3 py-2 bg-white ${errors.specialization ? 'border-red-500' : 'border-blue-200'}`}
                  name="specialization"
                  value={form.specialization}
                  onChange={handleChange}
                  required
                />
                {errors.specialization && <p className="text-red-600 text-sm">{errors.specialization}</p>}
              </div>
              <div>
                <label className="block font-semibold mb-1 text-blue-700">Years of Experience *</label>
                <input
                  type="number"
                  min="0"
                  className={`w-full border rounded px-3 py-2 bg-white ${errors.yearsOfExperience ? 'border-red-500' : 'border-blue-200'}`}
                  name="yearsOfExperience"
                  value={form.yearsOfExperience}
                  onChange={handleChange}
                  required
                />
                {errors.yearsOfExperience && <p className="text-red-600 text-sm">{errors.yearsOfExperience}</p>}
              </div>
            </div>
            {/* Education */}
            <div className="mt-6">
              <label className="block font-semibold mb-2 text-blue-700">Education</label>
              {form.education.map((edu, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    className="border border-blue-200 rounded px-2 py-1 flex-1 bg-white"
                    placeholder="Institution"
                    name="institution"
                    value={edu.institution}
                    onChange={e => handleArrayChange(e, idx, 'education')}
                  />
                  <input
                    className="border border-blue-200 rounded px-2 py-1 flex-1 bg-white"
                    placeholder="Degree"
                    name="degree"
                    value={edu.degree}
                    onChange={e => handleArrayChange(e, idx, 'education')}
                  />
                  <input
                    className="border border-blue-200 rounded px-2 py-1 w-24 bg-white"
                    placeholder="Year"
                    name="year"
                    type="number"
                    value={edu.year}
                    onChange={e => handleArrayChange(e, idx, 'education')}
                  />
                  <button
                    type="button"
                    className="text-red-600 font-bold"
                    onClick={() => removeArrayItem('education', idx)}
                    disabled={form.education.length === 1}
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="mt-2 text-blue-700 underline"
                onClick={() => addArrayItem('education', { institution: '', degree: '', year: '' })}
              >
                + Add Education
              </button>
            </div>
            {/* Certificates */}
            <div className="mt-6">
              <label className="block font-semibold mb-2 text-blue-700">Certificates & Licenses (Upload files)</label>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className="block w-full text-blue-700 bg-white border border-blue-200 rounded px-3 py-2"
                onChange={handleCertificateUpload}
              />
              {form.certificates.length > 0 && (
                <ul className="mt-2 text-blue-800 text-sm list-disc list-inside">
                  {form.certificates.map((file, idx) => (
                    <li key={idx}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>
            {/* Experience */}
            <div className="mt-6">
              <label className="block font-semibold mb-2 text-blue-700">Professional Experience</label>
              {form.experience.map((exp, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    className="border border-blue-200 rounded px-2 py-1 flex-1 bg-white"
                    placeholder="Role/Title"
                    name="role"
                    value={exp.role}
                    onChange={e => handleArrayChange(e, idx, 'experience')}
                  />
                  <input
                    className="border border-blue-200 rounded px-2 py-1 flex-1 bg-white"
                    placeholder="Company"
                    name="company"
                    value={exp.company}
                    onChange={e => handleArrayChange(e, idx, 'experience')}
                  />
                  <input
                    className="border border-blue-200 rounded px-2 py-1 w-24 bg-white"
                    placeholder="Years"
                    name="years"
                    type="number"
                    value={exp.years}
                    onChange={e => handleArrayChange(e, idx, 'experience')}
                  />
                  <button
                    type="button"
                    className="text-red-600 font-bold"
                    onClick={() => removeArrayItem('experience', idx)}
                    disabled={form.experience.length === 1}
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="mt-2 text-blue-700 underline"
                onClick={() => addArrayItem('experience', { role: '', company: '', years: '' })}
              >
                + Add Experience
              </button>
            </div>
          </div>
          {/* Skills and Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-semibold mb-1 text-blue-700">Primary Skills</label>
              <input
                className="w-full border border-blue-200 rounded px-3 py-2 bg-blue-100"
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="e.g. Assessments, TSA, Job Development"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-blue-700">Available Services</label>
              <input
                className="w-full border border-blue-200 rounded px-3 py-2 bg-blue-100"
                name="services"
                value={form.services}
                onChange={handleChange}
                placeholder="e.g. Quality Assurance, Training"
              />
            </div>
          </div>
          {/* Availability & Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-semibold mb-1 text-blue-700">Preferred Working Hours</label>
              <select
                className="w-full border border-blue-200 rounded px-3 py-2 bg-blue-100"
                name="hours"
                value={form.hours}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-blue-700">Consulting Mode</label>
              <select
                className="w-full border border-blue-200 rounded px-3 py-2 bg-blue-100"
                name="consultingMode"
                value={form.consultingMode}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Remote">Remote</option>
                <option value="In-person">In-person</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-blue-700">Pricing Structure</label>
              <input
                className="w-full border border-blue-200 rounded px-3 py-2 bg-blue-100"
                name="pricing"
                value={form.pricing}
                onChange={handleChange}
                placeholder="Hourly, Per Project, Retainer"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-blue-700">Payment Preferences</label>
              <input
                className="w-full border border-blue-200 rounded px-3 py-2 bg-blue-100"
                name="payment"
                value={form.payment}
                onChange={handleChange}
                placeholder="Bank Transfer, Cheque, Credit Card"
              />
            </div>
          </div>
          {/* Bio */}
          <div className="mb-6">
            <label className="block font-semibold mb-1 text-blue-700">Brief Bio *</label>
            <textarea
              className={`w-full border rounded px-3 py-2 bg-blue-100 ${errors.bio ? 'border-red-500' : 'border-blue-200'}`}
              name="bio"
              rows={4}
              value={form.bio}
              onChange={handleChange}
              required
            />
            {errors.bio && <p className="text-red-600 text-sm">{errors.bio}</p>}
          </div>
          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white font-semibold py-3 rounded hover:bg-blue-800 transition"
          >
            Submit Profile
          </button>
        </form>
        </Paper>
      </Container>
    </Box>
    </>
  );
}
