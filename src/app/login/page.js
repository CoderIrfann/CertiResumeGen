"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, Download, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ResumeData = {
  fullName: string;
  email: string;
  phone: string;
  summary: string;
  skills: string[];
  experience: string;
  education: string;
};

const initialResumeData: ResumeData = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  summary: "Experienced professional with a strong background in...",
  skills: ["JavaScript", "React", "Node.js", "Python"],
  experience: "Software Engineer at Tech Co. (2018-Present)\n- Developed...\n\nJunior Developer at Startup Inc. (2016-2018)\n- Assisted...",
  education: "Bachelor of Science in Computer Science\nUniversity of Technology (2012-2016)",
};

const resumeTemplates = [
  { id: "modern", name: "Modern" },
  { id: "classic", name: "Classic" },
  { id: "creative", name: "Creative" },
];

export default function GenerateResumePage() {
  const [darkMode, setDarkMode] = useState(false)
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)
  const [selectedTemplate, setSelectedTemplate] = useState("modern")
  const [isGenerating, setIsGenerating] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setResumeData(prev => ({ ...prev, [name]: value }))
  }

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim())
    setResumeData(prev => ({ ...prev, skills }))
  }

  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value)
  }

  const handleGenerateResume = () => {
    setIsGenerating(true)
    // Simulate resume generation
    setTimeout(() => {
      setIsGenerating(false)
      // In a real application, you would handle the resume generation here
      console.log("Generating resume with data:", resumeData, "and template:", selectedTemplate)
    }, 2000)
  }

  const handleDownloadResume = () => {
    // In a real application, you would handle the resume download here
    console.log("Downloading resume")
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
        <nav className="fixed w-full z-50 bg-white dark:bg-gray-900 shadow-md">
          <div className="container mx-auto px-6 py-3 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
              CertiResumeGenerator
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-sm hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300">
                Dashboard
              </Link>
              <div className="flex items-center space-x-2">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <Switch
                  checked={darkMode}
                  onCheckedChange={toggleDarkMode}
                  className="data-[state=checked]:bg-black dark:data-[state=checked]:bg-white"
                />
              </div>
            </div>
          </div>
        </nav>

        <main className="pt-20 pb-8">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-3xl font-bold mb-6 text-center">Generate Your Resume</h1>
              
              <Tabs defaultValue="edit" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="edit">Edit Resume</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="edit">
                  <Card>
                    <CardContent className="space-y-6 mt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input id="fullName" name="fullName" value={resumeData.fullName} onChange={handleInputChange} />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" name="email" type="email" value={resumeData.email} onChange={handleInputChange} />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" name="phone" value={resumeData.phone} onChange={handleInputChange} />
                        </div>
                        <div>
                          <Label htmlFor="skills">Skills (comma-separated)</Label>
                          <Input id="skills" name="skills" value={resumeData.skills.join(', ')} onChange={handleSkillsChange} />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="summary">Professional Summary</Label>
                        <Textarea id="summary" name="summary" value={resumeData.summary} onChange={handleInputChange} rows={4} />
                      </div>
                      <div>
                        <Label htmlFor="experience">Work Experience</Label>
                        <Textarea id="experience" name="experience" value={resumeData.experience} onChange={handleInputChange} rows={6} />
                      </div>
                      <div>
                        <Label htmlFor="education">Education</Label>
                        <Textarea id="education" name="education" value={resumeData.education} onChange={handleInputChange} rows={4} />
                      </div>
                      <div>
                        <Label htmlFor="template">Resume Template</Label>
                        <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                          <SelectTrigger id="template">
                            <SelectValue placeholder="Select a template" />
                          </SelectTrigger>
                          <SelectContent>
                            {resumeTemplates.map(template => (
                              <SelectItem key={template.id} value={template.id}>{template.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleGenerateResume} disabled={isGenerating} className="w-full">
                        {isGenerating ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Generating Resume...
                          </>
                        ) : (
                          'Generate Resume'
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="preview">
                  <Card>
                    <CardContent className="mt-6">
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700 min-h-[600px]">
                        <h2 className="text-2xl font-bold mb-4">{resumeData.fullName}</h2>
                        <p className="text-sm mb-2">{resumeData.email} | {resumeData.phone}</p>
                        <h3 className="text-lg font-semibold mt-4 mb-2">Professional Summary</h3>
                        <p className="text-sm mb-4">{resumeData.summary}</p>
                        <h3 className="text-lg font-semibold mb-2">Skills</h3>
                        <p className="text-sm mb-4">{resumeData.skills.join(', ')}</p>
                        <h3 className="text-lg font-semibold mb-2">Work Experience</h3>
                        <pre className="text-sm mb-4 whitespace-pre-wrap">{resumeData.experience}</pre>
                        <h3 className="text-lg font-semibold mb-2">Education</h3>
                        <pre className="text-sm whitespace-pre-wrap">{resumeData.education}</pre>
                      </div>
                      <div className="mt-6 flex justify-end">
                        <Button onClick={handleDownloadResume} className="flex items-center">
                          <Download className="mr-2 h-4 w-4" />
                          Download Resume
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </main>

        <footer className="bg-gray-200 dark:bg-gray-800 py-6">
          <div className="container mx-auto px-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              &copy; {new Date().getFullYear()} CertiResumeGenerator. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}