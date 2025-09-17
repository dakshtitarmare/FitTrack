import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'
import { RoleSelection } from './RoleSelection'
import { Train, Zap, Shield, ArrowRight } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import railwayHero from '@/assets/railway-hero.jpg'

type AuthStep = 'login' | 'signup' | 'role-selection'

export const AuthPage = () => {
  const [currentStep, setCurrentStep] = useState<AuthStep>('login')
  const [signupData, setSignupData] = useState<{
    email: string
    password: string
    fullName: string
  } | null>(null)
  const navigate = useNavigate()

  const handleSignupSuccess = (data: { email: string; password: string; fullName: string }) => {
    setSignupData(data)
    setCurrentStep('role-selection')
  }

  const handleRoleSelect = () => {
    navigate('/home')
  }

  const handleDemoLogin = () => {
    toast.info('This is just a Demo. Use the Quick Login Tab.', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    })
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background to-muted/20">
      {/* Toast Container */}
      <ToastContainer />

      {/* Animated Background */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(255, 107, 53, 0.03) 0%, rgba(78, 205, 196, 0.03) 100%), url(${railwayHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay'
          }}
        />
        
        {/* Railway tracks animation */}
        <div className="absolute bottom-0 left-0 right-0 h-2">
          <div className="track-shimmer h-full bg-track-gray/20" />
        </div>
        
        {/* Animated train */}
        <motion.div
          initial={{ x: '-100vw' }}
          animate={{ x: '100vw' }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "loop",
            ease: "linear"
          }}
          className="absolute bottom-4 z-10"
        >
          <Train className="w-8 h-8 text-primary" />
        </motion.div>
      </motion.div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            delay: 0
          }}
          className="absolute top-20 left-10"
        >
          <Zap className="w-6 h-6 text-primary/40" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            delay: 1
          }}
          className="absolute top-40 right-20"
        >
          <Shield className="w-8 h-8 text-accent/40" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-6xl"
        >
          {/* Logo and Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-primary p-4 rounded-2xl shadow-railway">
                <Train className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              FitTrack
            </h1>
            <p className="text-white text-lg drop-shadow">
              Railway Track Fitting Management System (RTMS) 
            </p>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Login/Signup */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="glass rounded-2xl p-8 shadow-strong border backdrop-blur-md h-full max-h-[70vh] overflow-auto">
                <div className="text-center mb-6 sticky top-0 bg-transparent">
                  {/* <h2 className="text-2xl font-bold mb-2">Sign In</h2>
                  <p className="text-muted-foreground">Access your account</p> */}
                </div>
                
                <AnimatePresence mode="wait">
                  {currentStep === 'login' && (
                    <motion.div
                      key="login"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <LoginForm 
                        onSwitchToSignup={() => setCurrentStep('signup')} 
                        //onLogin={handleDemoLogin} 
                      />
                    </motion.div>
                  )}
                  
                  {currentStep === 'signup' && (
                    <motion.div
                      key="signup"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <SignupForm 
                        onSwitchToLogin={() => setCurrentStep('login')}
                        onSignupSuccess={handleSignupSuccess}
                      />
                    </motion.div>
                  )}
                  
                  {currentStep === 'role-selection' && signupData && (
                    <motion.div
                      key="role-selection"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <RoleSelection 
                        onRoleSelect={() => setCurrentStep('login')}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right Column - Quick Access Demo */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="glass rounded-2xl p-8 shadow-strong border backdrop-blur-md h-full max-h-[70vh] overflow-auto">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl">
                      <ArrowRight className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Quick Access Demo</h2>
                  <p className="text-muted-foreground">Try the system with different roles</p>
                </div>
                
                <RoleSelection onRoleSelect={handleRoleSelect} />
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div 
            className="text-center mt-8 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p>© 2024 Indian Railways. All rights reserved.</p>
            <p className="mt-1">Secured by FitTrack Technology</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}