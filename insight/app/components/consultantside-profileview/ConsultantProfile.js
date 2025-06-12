"use client"

import { useState } from "react"
import "./ConsultantProfile.css"

const ConsultantProfile = () => {
  const [activeTab, setActiveTab] = useState("overview")

  const skills = [
    "Strategic Planning",
    "Business Development",
    "Market Research",
    "Financial Modeling",
    "Competitive Analysis",
  ]

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < rating ? "filled" : ""}`}>
        ★
      </span>
    ))
  }

  return (
    <div className="consultant-profile">
      <div className="profile-card">
        {/* Header Section */}
        <div className="profile-header">
          <div className="profile-info">
            <div className="avatar">
              <span>JM</span>
            </div>
            <div className="details">
              <div className="name-section">
                <h1>John Mitchell</h1>
                <span className="badge">Top Rated Plus</span>
              </div>
              <p className="title">Strategic Business Consultant & Growth Specialist</p>

              <div className="meta-info">
                <div className="rating">
                  <div className="stars">{renderStars(5)}</div>
                  <span className="rating-text">5 (110 reviews)</span>
                </div>
                <div className="location">
                  <span className="icon">📍</span>
                  <span>Boston, MA</span>
                </div>
                <div className="response-time">
                  <span className="icon">🕐</span>
                  <span>Responds in 1 hour</span>
                </div>
              </div>
            </div>
          </div>
          <button className="save-btn">
            <span className="heart">♡</span>
            Save
          </button>
        </div>

        {/* Skills Section */}
        <div className="skills-section">
          {skills.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>

        {/* Pricing */}
        <div className="pricing">
          <span className="price">$150</span>
          <span className="period">/hour</span>
        </div>

        {/* Tabs Navigation */}
        <div className="tabs-container">
          <div className="tabs-nav">
            <button
              className={`tab ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`tab ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews (110)
            </button>
            <button
              className={`tab ${activeTab === "portfolio" ? "active" : ""}`}
              onClick={() => setActiveTab("portfolio")}
            >
              Portfolio
            </button>
            <button className={`tab ${activeTab === "faq" ? "active" : ""}`} onClick={() => setActiveTab("faq")}>
              FAQ
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === "overview" && (
              <div className="overview-content">
                <div className="about-section">
                  <h2>About this consultant</h2>
                  <p>
                    I'm a senior strategy consultant with over 8 years of experience helping businesses scale and grow.
                    I've worked with Fortune 500 companies and startups alike, developing comprehensive business
                    strategies that drive results. My approach combines data-driven insights with creative problem-
                    solving to deliver actionable plans that your team can implement immediately.
                  </p>
                </div>

                <div className="education-section">
                  <h2>Education & Certifications</h2>

                  <div className="education-subsection">
                    <h3>Education</h3>
                    <div className="education-item">
                      <div className="bullet">•</div>
                      <div className="education-details">
                        <div className="degree">MBA in Strategy</div>
                        <div className="school">Harvard Business School, 2018</div>
                      </div>
                    </div>
                    <div className="education-item">
                      <div className="bullet">•</div>
                      <div className="education-details">
                        <div className="degree">BS in Economics</div>
                        <div className="school">MIT, 2014</div>
                      </div>
                    </div>
                  </div>

                  <div className="certifications-subsection">
                    <h3>Certifications</h3>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="reviews-content">
                <h3>Client Reviews</h3>
                <p>110 five-star reviews from satisfied clients</p>
              </div>
            )}

            {activeTab === "portfolio" && (
              <div className="portfolio-content">
                <h3>Portfolio</h3>
                <p>View examples of successful projects and case studies</p>
              </div>
            )}

            {activeTab === "faq" && (
              <div className="faq-content">
                <h3>Frequently Asked Questions</h3>
                <p>Common questions about services and process</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsultantProfile
