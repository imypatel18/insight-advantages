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
    router.push("/consultant-dashboard")
  }

  return (
    <Box minHeight="100vh" bgcolor="#f9fafb">
      <Header />
      <Box maxWidth="lg" mx="auto" px={2} py={6}>
        <Link href="/consultant-dashboard" passHref>
          <Button startIcon={<ArrowLeft />} sx={{ mb: 3 }}>
            Back to Dashboard
          </Button>
        </Link>

        <Typography variant="h4" fontWeight="bold" mb={2}>
          Create New Project Post
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Post a new project to find the perfect consultant
        </Typography>

        <Card>
          <CardHeader title="Project Details" />
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
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth margin="normal" required>
                    <InputLabel>Experience Level</InputLabel>
                    <Select
                      value={formData.experienceLevel}
                      onChange={(e) => handleSelectChange("experienceLevel", e.target.value)}
                      label="Experience Level"
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
              />

              <Box my={2}>
                <Typography variant="subtitle1" gutterBottom>
                  Required Skills
                </Typography>
                {formData.skills.map((skill, index) => (
                  <Box display="flex" gap={1} alignItems="center" key={index} mb={1}>
                    <TextField
                      value={skill}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      placeholder="e.g., Business Strategy"
                      fullWidth
                    />
                    {formData.skills.length > 1 && (
                      <Button onClick={() => removeSkill(index)} variant="outlined">
                        <X fontSize={16} />
                      </Button>
                    )}
                  </Box>
                ))}
                <Button onClick={addSkill} variant="outlined" startIcon={<Plus />}>Add Skill</Button>
              </Box>

              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                margin="normal"
                required
              />

              {formData.title && (
                <Box mt={4} borderRadius={2} border={1} borderColor="grey.300" p={2} bgcolor="#fff">
                  <Typography variant="h6" gutterBottom>
                    Preview
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Posted just now
                  </Typography>
                  <Typography variant="h6" color="primary" mt={1}>
                    {formData.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {formData.budget} &bull; {formData.duration} &bull; {formData.experienceLevel}
                  </Typography>
                  <Typography variant="body1" mt={1}>
                    {formData.description}
                  </Typography>
                  <Box mt={1} display="flex" gap={1} flexWrap="wrap">
                    {formData.skills.filter((s) => s.trim() !== "").map((skill, idx) => (
                      <Chip key={idx} label={skill} size="small" />
                    ))}
                  </Box>
                </Box>
              )}

              <CardActions sx={{ justifyContent: "flex-end", mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Post..." : "Create Project Post"}
                </Button>
              </CardActions>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}