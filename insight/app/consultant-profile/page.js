"use client"

import { useState } from "react"
import { Card, CardContent, Button, Chip, Tabs, Tab, Box, Typography, Avatar, Rating } from "@mui/material"
import { LocationOn, AccessTime, FavoriteBorder } from "@mui/icons-material"

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export default function ConsultantProfile() {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const skills = [
    "Strategic Planning",
    "Business Development",
    "Market Research",
    "Financial Modeling",
    "Competitive Analysis",
  ]

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 2, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Card sx={{ boxShadow: 1 }}>
        <CardContent sx={{ p: 4 }}>
          {/* Header Section */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 4 }}>
            <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                JM
              </Avatar>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                  <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", color: "#1a1a1a" }}>
                    John Mitchell
                  </Typography>
                  <Chip
                    label="Top Rated Plus"
                    size="small"
                    sx={{
                      bgcolor: "#e8f5e8",
                      color: "#2e7d32",
                      border: "1px solid #c8e6c9",
                      fontWeight: 500,
                    }}
                  />
                </Box>
                <Typography variant="h6" sx={{ color: "#666", mb: 2 }}>
                  Strategic Business Consultant & Growth Specialist
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 3, fontSize: "0.875rem" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Rating value={5} readOnly size="small" />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                      5 (110 reviews)
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#666" }}>
                    <LocationOn fontSize="small" />
                    <Typography variant="body2">Boston, MA</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#666" }}>
                    <AccessTime fontSize="small" />
                    <Typography variant="body2">Responds in 1 hour</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Button variant="outlined" startIcon={<FavoriteBorder />} sx={{ textTransform: "none" }}>
              Save
            </Button>
          </Box>

          {/* Skills Tags */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
            {skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                variant="outlined"
                sx={{
                  bgcolor: "#e3f2fd",
                  color: "#1565c0",
                  border: "1px solid #bbdefb",
                  "&:hover": {
                    bgcolor: "#bbdefb",
                  },
                }}
              />
            ))}
          </Box>

          {/* Pricing */}
          <Box sx={{ mb: 4 }}>
            <Typography component="span" sx={{ fontSize: "2rem", fontWeight: "bold", color: "#1a1a1a" }}>
              $150
            </Typography>
            <Typography component="span" sx={{ fontSize: "1.125rem", color: "#666", ml: 0.5 }}>
              /hour
            </Typography>
          </Box>

          {/* Tabs Navigation */}
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="consultant profile tabs"
                sx={{
                  "& .MuiTab-root": {
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 500,
                  },
                }}
              >
                <Tab label="Overview" />
                <Tab label="Reviews (110)" />
                <Tab label="Portfolio" />
                <Tab label="FAQ" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <Box sx={{ py: 2 }}>
                {/* About Section */}
                <Box sx={{ mb: 6 }}>
                  <Typography variant="h5" component="h2" sx={{ fontWeight: "bold", color: "#1a1a1a", mb: 3 }}>
                    About this consultant
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#555", lineHeight: 1.7 }}>
                    I'm a senior strategy consultant with over 8 years of experience helping businesses scale and grow.
                    I've worked with Fortune 500 companies and startups alike, developing comprehensive business
                    strategies that drive results. My approach combines data-driven insights with creative problem-
                    solving to deliver actionable plans that your team can implement immediately.
                  </Typography>
                </Box>

                {/* Education & Certifications */}
                <Box>
                  <Typography variant="h5" component="h2" sx={{ fontWeight: "bold", color: "#1a1a1a", mb: 3 }}>
                    Education & Certifications
                  </Typography>

                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600, color: "#1a1a1a", mb: 2 }}>
                      Education
                    </Typography>
                    <Box sx={{ pl: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            bgcolor: "#1a1a1a",
                            borderRadius: "50%",
                            mt: 1,
                          }}
                        />
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                            MBA in Strategy
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#666" }}>
                            Harvard Business School, 2018
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            bgcolor: "#1a1a1a",
                            borderRadius: "50%",
                            mt: 1,
                          }}
                        />
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                            BS in Economics
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#666" }}>
                            MIT, 2014
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                      Certifications
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Client Reviews
                </Typography>
                <Typography variant="body1" sx={{ color: "#666" }}>
                  110 five-star reviews from satisfied clients
                </Typography>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Portfolio
                </Typography>
                <Typography variant="body1" sx={{ color: "#666" }}>
                  View examples of successful projects and case studies
                </Typography>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Frequently Asked Questions
                </Typography>
                <Typography variant="body1" sx={{ color: "#666" }}>
                  Common questions about services and process
                </Typography>
              </Box>
            </TabPanel>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
