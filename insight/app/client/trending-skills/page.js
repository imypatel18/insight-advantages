'use client';

import React from 'react';
import TrendingSkills from '@/app/client/trending-skills/TrendingSkills'; 
import ClientNavbar from '@/app/components/client/navbar-client'; 

export default function TrendingSkillsPage() {
  return (
    <>
      <ClientNavbar />
      <div className="mt-4">
        <TrendingSkills />
      </div>
    </>
  );
}