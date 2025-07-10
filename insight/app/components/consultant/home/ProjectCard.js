// components/ProjectCard.jsx

import { Heart, Clock, MapPin, Star } from 'lucide-react';
import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-blue-800 mb-1">{project.job_title}</h3>
          <p className="text-gray-600 text-sm mb-2">{project.description}</p>
          <div className="flex gap-2 flex-wrap text-sm text-gray-500 mb-3">
            {project.tags.split(',').map((tag, idx) => (
              <span key={idx} className="bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
        <button className="text-gray-400 hover:text-red-500">
          <Heart className="w-5 h-5" />
        </button>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" /> {project.location}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" /> {project.duration}
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-500" /> {project.company_rating}
        </div>
        <div className="text-blue-600 font-semibold">
          ${project.hourly_rate_min} - ${project.hourly_rate_max}/hr
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;