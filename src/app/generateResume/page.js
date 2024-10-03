"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Download, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Button component
const Button = ({ onClick, children, disabled, className }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ${className}`}
  >
    {children}
  </button>
);

// Switch component
const Switch = ({ checked, onCheckedChange, className }) => (
  <label className={`flex items-center cursor-pointer ${className}`}>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className="hidden"
    />
    <div className="relative">
      <div className={`block bg-gray-600 w-10 h-6 rounded-full transition ${checked ? 'bg-green-400' : ''}`}></div>
      <div
        className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full transition-transform ${checked ? 'transform translate-x-4' : ''}`}
      ></div>
    </div>
  </label>
);

// Card component
const Card = ({ children }) => (
  <div className="border rounded-lg shadow-md bg-white p-6">{children}</div>
);

// CardContent component
const CardContent = ({ children }) => (
  <div className="space-y-4">{children}</div>
);

// Tabs component
const Tabs = ({ children }) => (
  <div className="mt-4">{children}</div>
);

// TabsList component
const TabsList = ({ children }) => (
  <div className="flex border-b">{children}</div>
);

// TabsTrigger component
const TabsTrigger = ({ value, children, onClick }) => (
  <button
    onClick={() => onClick(value)}
    className="py-2 px-4 text-gray-600 hover:text-blue-600 transition-colors duration-300 focus:outline-none"
  >
    {children}
  </button>
);

// TabsContent component
const TabsContent = ({ value, children }) => (
  <div className="pt-4">{children}</div>
);

const initialResumeData = {
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

export default function Page() {
  const [darkMode, setDarkMode] = useState(false);
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResumeData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setResumeData(prev => ({ ...prev, skills }));
  };

  const handleTemplateChange = (value) => {
    setSelectedTemplate(value);
  };

  const handleGenerateResume = () => {
    setIsGenerating(true);
    // Simulate resume generation
    setTimeout(() => {
      setIsGenerating(false);
      console.log("Generating resume with data:", resumeData, "and template:", selectedTemplate);
    }, 2000);
  };

  const handleDownloadResume = () => {
    console.log("Downloading resume");
  };

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

              <Tabs>
                <TabsList>
                  <TabsTrigger value="edit" onClick={handleTemplateChange}>Edit Resume</TabsTrigger>
                  <TabsTrigger value="preview" onClick={handleTemplateChange}>Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="edit">
                  <Card>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="fullName" className="block text-sm font-medium">Full Name</label>
                          <input id="fullName" name="fullName" value={resumeData.fullName} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md" />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium">Email</label>
                          <input id="email" name="email" type="email" value={resumeData.email} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md" />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
                          <input id="phone" name="phone" value={resumeData.phone} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md" />
                        </div>
                        <div>
                          <label htmlFor="skills" className="block text-sm font-medium">Skills (comma-separated)</label>
                          <input id="skills" name="skills" value={resumeData.skills.join(', ')} onChange={handleSkillsChange} className="mt-1 block w-full border border-gray-300 rounded-md" />
                        </div>
                        <div>
                          <label htmlFor="summary" className="block text-sm font-medium">Summary</label>
                          <textarea id="summary" name="summary" value={resumeData.summary} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md" />
                        </div>
                        <div>
                          <label htmlFor="experience" className="block text-sm font-medium">Experience</label>
                          <textarea id="experience" name="experience" value={resumeData.experience} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md" />
                        </div>
                        <div>
                          <label htmlFor="education" className="block text-sm font-medium">Education</label>
                          <textarea id="education" name="education" value={resumeData.education} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md" />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label htmlFor="template" className="block text-sm font-medium">Select Template</label>
                        <select id="template" value={selectedTemplate} onChange={(e) => handleTemplateChange(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md">
                          {resumeTemplates.map(template => (
                            <option key={template.id} value={template.id}>{template.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex justify-between mt-4">
                        <Button onClick={handleGenerateResume} disabled={isGenerating} className="flex items-center">
                          {isGenerating ? <RefreshCw className="animate-spin" /> : <Download className="mr-2" />}
                          {isGenerating ? 'Generating...' : 'Generate Resume'}
                        </Button>
                        <Button onClick={handleDownloadResume} className="flex items-center">
                          <Download className="mr-2" />
                          Download Resume
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="preview">
                  <h2 className="text-lg font-bold mb-4">Preview</h2>
                  <div className="border rounded-md p-4 bg-gray-100">
                    <h3 className="text-xl font-semibold">{resumeData.fullName}</h3>
                    <p>{resumeData.email} | {resumeData.phone}</p>
                    <p className="mt-2">{resumeData.summary}</p>
                    <h4 className="mt-4 font-bold">Skills</h4>
                    <p>{resumeData.skills.join(', ')}</p>
                    <h4 className="mt-4 font-bold">Experience</h4>
                    <p>{resumeData.experience}</p>
                    <h4 className="mt-4 font-bold">Education</h4>
                    <p>{resumeData.education}</p>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
