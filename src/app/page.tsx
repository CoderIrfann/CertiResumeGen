"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Facebook, Linkedin, Twitter, Upload, FileText, Search, Award, Clock, Users, Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export default function Page() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const certificatePage = () => {
    router.push("/certificateUpload")
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
        {/* Navigation Bar */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white dark:bg-gray-900 shadow-md' : 'bg-transparent'}`}>
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-3xl font-bold hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
              CertiResumeGenerator
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              {[
                { name: "Features", href: "#features" },
                { name: "How It Works", href: "#how-it-works" },
                { name: "Testimonials", href: "#testimonials" },
                { name: "Contact", href: "#contact" },
                { name: "Login", href: "/login" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg font-semibold text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
                >
                  {item.name}
                </Link>
              ))}
              <Button variant="outline" asChild className="border-2 border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300">
                <Link href="/register">Register</Link>
              </Button>
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

        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              Transform Your Certificates into a Stellar Resume
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl font-light mb-8"
            >
              Leverage AI to create a professional resume that showcases your skills and achievements
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button size="lg" onClick={certificatePage} className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 text-lg font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                Start Generating Your Resume
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Brief Description Section */}
        <section className="py-20 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-xl text-center max-w-3xl mx-auto leading-relaxed"
            >
              CertiResumeGenerator harnesses the power of AI to transform your certificates and achievements into a polished, professional resume. Our platform offers a seamless experience, from certificate upload to resume generation, ensuring your skills and qualifications shine through in every application.
            </motion.p>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose CertiResumeGenerator?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "AI-Powered Resume Creation", description: "Our advanced AI analyzes your certificates and creates tailored, professional resumes in minutes.", icon: <FileText className="w-12 h-12" /> },
                { title: "Multiple Resume Templates", description: "Choose from a wide range of modern, ATS-friendly templates to suit your industry and style.", icon: <Search className="w-12 h-12" /> },
                { title: "OCR-Powered Data Extraction", description: "Our cutting-edge OCR technology accurately extracts information from your certificates, saving you time and effort.", icon: <Upload className="w-12 h-12" /> },
                { title: "Skills Highlighting", description: "Automatically identify and highlight key skills from your certificates to match job requirements.", icon: <Award className="w-12 h-12" /> },
                { title: "Quick Turnaround", description: "Generate your professional resume in less than 5 minutes, perfect for last-minute applications.", icon: <Clock className="w-12 h-12" /> },
                { title: "ATS Optimization", description: "Ensure your resume passes Applicant Tracking Systems with our optimized formatting and keyword suggestions.", icon: <Users className="w-12 h-12" /> },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: 1, title: "Upload Certificates", description: "Simply upload your certificates and academic documents to our secure platform." },
                { step: 2, title: "AI Analysis", description: "Our AI analyzes your certificates, extracting key information and identifying relevant skills." },
                { step: 3, title: "Choose Template", description: "Select from our range of professional templates that best suit your industry and style." },
                { step: 4, title: "Generate & Download", description: "Review your AI-generated resume, make any final adjustments, and download your polished CV." },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Shakshi", role: " Lpu Student", quote: "This website help me to complete my resume with best template." },
                { name: "Arpit.", role: "Lpu Student", quote: "I was amazed at how quickly I could create a professional resume." },
                { name: "Rohan.", role: "Lpu Student", quote: "As a fresh graduate, I was unsure how to present my limited experience." },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Create Your Professional Resume?</h2>
            <p className="text-xl mb-8">Join thousands of job seekers who have boosted their career prospects with CertiResumeGenerator</p>
            <Button size="lg" variant="secondary" onClick={certificatePage} className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 text-lg font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
              Get Started Now
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-200 dark:bg-gray-800 py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">CertiResumeGenerator</h3>
                <p className="text-gray-600 dark:text-gray-300">Empowering careers through AI-driven resume creation.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><Link href="#features" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Features</Link></li>
                  <li><Link href="#how-it-works" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">How It Works</Link></li>
                  <li><Link href="#testimonials" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Testimonials</Link></li>
                  <li><Link href="#contact" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><Link href="/privacy" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Terms of Service</Link></li>
                  <li><Link href="/cookies" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Cookie Policy</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-700 text-center text-gray-600 dark:text-gray-300">
              <p>&copy; {new Date().getFullYear()} CertiResumeGenerator. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}