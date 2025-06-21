"use client"

import { useState } from "react"
import { ArrowLeft, Plus, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Header from "../components/header"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  TextField,
  Select,
  MenuItem,
  Chip,
  Grid,
  InputLabel,
  FormControl,
} from "@mui/material"

export default function CreatePostPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    budget: "",
    duration: "",
    experienceLevel: "Beginner",
    description: "",
    skills: [""],
    location: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSkillChange = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill, i) => (i === index ? value : skill)),
    }))
  }

  const addSkill = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, ""],
    }))
  }

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const filteredSkills = formData.skills.filter((skill) => skill.trim() !== "")
    const projectPost = {
      ...formData,
      skills: filteredSkills,
      postedTime: "Just now",
      clientRating: "New",
      proposals: "0",
      id: Date.now(),
    }
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Project post created:", projectPost)
    router.push("/consultant/home")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-blue-100 to-blue-300">
      <Header />
      <Box maxWidth="lg" mx="auto" px={2} py={6}>
        <Link href="/consultant/home" passHref>
          <Button 
            startIcon={<ArrowLeft />} 
            sx={{ 
              mb: 3,
              color: "#1e40af",
              '&:hover': {
                backgroundColor: "rgba(30, 64, 175, 0.1)"
              }
            }}
          >
            Back to Dashboard
          </Button>
        </Link>

        <Typography variant="h4" fontWeight="bold" mb={2} color="#1e3a8a">
          Create New Project Post
        </Typography>
        <Typography variant="body1" color="#3b82f6" mb={4}>
          Post a new project to find the perfect consultant
        </Typography>

        <Card sx={{ 
          borderRadius: 3,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "rgba(255, 255, 255, 0.9)"
        }}>
          <CardHeader 
            title="Project Details" 
            sx={{ 
              backgroundColor: "#1e40af",
              color: "white",
              borderTopLeftRadius: "12px !important",
              borderTopRightRadius: "12px !important"
            }} 
          />
          <CardContent>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                label="Project Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                margin="normal"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#93c5fd',
                    },
                    '&:hover fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
              />

              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    margin="normal"
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#93c5fd',
                        },
                        '&:hover fieldset': {
                          borderColor: '#3b82f6',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    margin="normal"
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#93c5fd',
                        },
                        '&:hover fieldset': {
                          borderColor: '#3b82f6',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth margin="normal" required>
                    <InputLabel>Experience Level</InputLabel>
                    <Select
                      value={formData.experienceLevel}
                      onChange={(e) => handleSelectChange("experienceLevel", e.target.value)}
                      label="Experience Level"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#93c5fd',
                          },
                          '&:hover fieldset': {
                            borderColor: '#3b82f6',
                          },
                        },
                      }}
                    >
                      <MenuItem value="Beginner">Beginner</MenuItem>
                      <MenuItem value="Intermediate">Intermediate</MenuItem>
                      <MenuItem value="Expert">Expert</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <TextField
                fullWidth
                label="Project Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                margin="normal"
                multiline
                minRows={4}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#93c5fd',
                    },
                    '&:hover fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
              />

              <Box my={2}>
                <Typography variant="subtitle1" gutterBottom color="#1e3a8a">
                  Required Skills
                </Typography>
                {formData.skills.map((skill, index) => (
                  <Box display="flex" gap={1} alignItems="center" key={index} mb={1}>
                    <TextField
                      value={skill}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      placeholder="e.g., Business Strategy"
                      fullWidth
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#93c5fd',
                          },
                          '&:hover fieldset': {
                            borderColor: '#3b82f6',
                          },
                        },
                      }}
                    />
                    {formData.skills.length > 1 && (
                      <Button 
                        onClick={() => removeSkill(index)} 
                        variant="outlined"
                        sx={{
                          color: "#ef4444",
                          borderColor: "#ef4444",
                          '&:hover': {
                            backgroundColor: "rgba(239, 68, 68, 0.1)",
                            borderColor: "#dc2626"
                          }
                        }}
                      >
                        <X fontSize={16} />
                      </Button>
                    )}
                  </Box>
                ))}
                <Button 
                  onClick={addSkill} 
                  variant="outlined" 
                  startIcon={<Plus />}
                  sx={{
                    color: "#1e40af",
                    borderColor: "#1e40af",
                    '&:hover': {
                      backgroundColor: "rgba(30, 64, 175, 0.1)",
                      borderColor: "#1e3a8a"
                    }
                  }}
                >
                  Add Skill
                </Button>
              </Box>

              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                margin="normal"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#93c5fd',
                    },
                    '&:hover fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
              />

              {formData.title && (
                <Box 
                  mt={4} 
                  borderRadius={2} 
                  border={1} 
                  borderColor="#93c5fd" 
                  p={2} 
                  bgcolor="rgba(255, 255, 255, 0.7)"
                >
                  <Typography variant="h6" gutterBottom color="#1e3a8a">
                    Preview
                  </Typography>
                  <Typography variant="caption" color="#3b82f6">
                    Posted just now
                  </Typography>
                  <Typography variant="h6" color="#1e40af" mt={1}>
                    {formData.title}
                  </Typography>
                  <Typography variant="body2" color="#3b82f6" gutterBottom>
                    {formData.budget} &bull; {formData.duration} &bull; {formData.experienceLevel}
                  </Typography>
                  <Typography variant="body1" mt={1} color="#1e3a8a">
                    {formData.description}
                  </Typography>
                  <Box mt={1} display="flex" gap={1} flexWrap="wrap">
                    {formData.skills.filter((s) => s.trim() !== "").map((skill, idx) => (
                      <Chip 
                        key={idx} 
                        label={skill} 
                        size="small" 
                        sx={{
                          backgroundColor: "#dbeafe",
                          color: "#1e40af"
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              <CardActions sx={{ justifyContent: "flex-end", mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#1e40af",
                    '&:hover': {
                      backgroundColor: "#1e3a8a"
                    }
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Post..." : "Create Project Post"}
                </Button>
              </CardActions>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  )
}