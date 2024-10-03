'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, Upload, X, Check, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export default function Page() {
  const [darkMode, setDarkMode] = useState(false)
  const [certificates, setCertificates] = useState([])
  const [dragActive, setDragActive] = useState(false)
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

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      const newCertificate = {
        id: Date.now().toString() + i,
        name: files[i].name,
        status: 'uploading',
        progress: 0,
      }
      setCertificates(prev => [...prev, newCertificate])
      simulateUpload(newCertificate.id)
    }
  }

  const simulateUpload = (id) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setCertificates(prev => 
        prev.map(cert => 
          cert.id === id ? { ...cert, progress } : cert
        )
      )
      if (progress >= 100) {
        clearInterval(interval)
        setCertificates(prev => 
          prev.map(cert => 
            cert.id === id ? { ...cert, status: 'processing' } : cert
          )
        )
        setTimeout(() => {
          setCertificates(prev => 
            prev.map(cert => 
              cert.id === id ? { ...cert, status: 'completed' } : cert
            )
          )
        }, 1500)
      }
    }, 300)
  }

  const removeCertificate = (id) => {
    setCertificates(prev => prev.filter(cert => cert.id !== id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Certificates submitted:', certificates)
    router.push('/generateResume')
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
              className="max-w-2xl mx-auto bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg"
            >
              <h1 className="text-3xl font-bold mb-6 text-center">Upload Your Certificates</h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center ${
                    dragActive ? 'border-black dark:border-white' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    Drag and drop your certificates here, or
                  </p>
                  <label htmlFor="file-upload" className="mt-2 cursor-pointer text-sm font-medium text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
                    click to select files
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={handleChange}
                  />
                </div>

                {certificates.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Uploaded Certificates</h2>
                    {certificates.map(cert => (
                      <div key={cert.id} className="flex items-center justify-between bg-white dark:bg-gray-700 p-3 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {cert.status === 'uploading' && <Loader2 className="h-5 w-5 animate-spin" />}
                          {cert.status === 'processing' && <Loader2 className="h-5 w-5 animate-spin text-yellow-500" />}
                          {cert.status === 'completed' && <Check className="h-5 w-5 text-green-500" />}
                          {cert.status === 'error' && <X className="h-5 w-5 text-red-500" />}
                          <span className="text-sm truncate max-w-xs">{cert.name}</span>
                        </div>
                        {cert.status === 'uploading' && (
                          <progress 
                            value={cert.progress} 
                            max="100" 
                            className="w-24 h-2 bg-gray-200 rounded"
                          />
                        )}
                        {cert.status !== 'uploading' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCertificate(cert.id)}
                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={certificates.length === 0}
                >
                  Submit Certificates
                </Button>
              </form>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
