
import { NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

export async function POST(request) {
  try {
    const formData = await request.formData()

    // Extract profile data
    const profileData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      bio: formData.get("bio"),
      skills: formData.get("skills"),
    }

    // Handle file uploads
    const uploadDir = path.join(process.cwd(), "public/uploads")

    // Ensure upload directory exists
    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (error) {
      // Directory might already exist
    }

    const uploadedFiles = {
      resume: null,
      certificates: [],
      projects: [],
    }

    // Process resume
    const resume = formData.get("resume")
    if (resume && resume.size > 0) {
      const resumeBuffer = Buffer.from(await resume.arrayBuffer())
      const resumeFilename = `resume_${Date.now()}_${resume.name}`
      const resumePath = path.join(uploadDir, resumeFilename)

      await writeFile(resumePath, resumeBuffer)
      uploadedFiles.resume = `/uploads/${resumeFilename}`
    }

    // Process certificates
    let certIndex = 0
    while (formData.get(`certificate_${certIndex}`)) {
      const cert = formData.get(`certificate_${certIndex}`)
      if (cert && cert.size > 0) {
        const certBuffer = Buffer.from(await cert.arrayBuffer())
        const certFilename = `cert_${Date.now()}_${certIndex}_${cert.name}`
        const certPath = path.join(uploadDir, certFilename)

        await writeFile(certPath, certBuffer)
        uploadedFiles.certificates.push(`/uploads/${certFilename}`)
      }
      certIndex++
    }

    // Process projects
    let projectIndex = 0
    while (formData.get(`project_${projectIndex}`)) {
      const project = formData.get(`project_${projectIndex}`)
      if (project && project.size > 0) {
        const projectBuffer = Buffer.from(await project.arrayBuffer())
        const projectFilename = `project_${Date.now()}_${projectIndex}_${project.name}`
        const projectPath = path.join(uploadDir, projectFilename)

        await writeFile(projectPath, projectBuffer)
        uploadedFiles.projects.push(`/uploads/${projectFilename}`)
      }
      projectIndex++
    }

    // Here you would typically save to your database
    // For now, we'll just return the data
    const result = {
      profile: profileData,
      files: uploadedFiles,
      message: "Profile updated successfully",
    }

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
