import React from 'react'
import { motion } from 'framer-motion'
import { useRole } from '@/contexts/RoleContext'
import { AuthPage } from './AuthPage'
import { Train } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { selectedRole, loading } = useRole()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="bg-gradient-primary p-6 rounded-2xl shadow-railway mb-4 mx-auto w-fit">
            <Train className="w-16 h-16 text-white animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            FitTrack
          </h2>
          <p className="text-muted-foreground mb-4">Loading your dashboard...</p>
          
          {/* Loading animation */}
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </motion.div>
      </div>
    )
  }

  if (!selectedRole) {
    return <AuthPage />
  }

  return <>{children}</>
}