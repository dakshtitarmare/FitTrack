import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRole, UserRole, roleLabels, roleDescriptions, dummyUsers } from '@/contexts/RoleContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { 
  HardHat, 
  Wrench, 
  Shield, 
  Computer, 
  Crown, 
  Package, 
  Settings,
  ChevronRight,
  User
} from 'lucide-react'

interface RoleSelectionProps {
  onRoleSelect?: () => void
}

const roleIcons: Record<UserRole, React.ComponentType<any>> = {
  depot_supervisor: HardHat,
  je_se: Wrench,
  sse_pwi: Shield,
  tms_operator: Computer,
  udm_manager: Crown,
  vendor: Package,
  admin: Settings,
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(false)
  const [celebrate, setCelebrate] = useState(false)
  const { selectRole } = useRole()

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
  }

  const handleSubmit = async () => {
    if (!selectedRole) {
      toast.error('Please select a role to continue')
      return
    }

    setLoading(true)
    
    try {
      selectRole(selectedRole)
      setCelebrate(true)
      toast.success(`Welcome, ${dummyUsers[selectedRole].name}!`)
      // Small delay for animation before navigation
      setTimeout(() => {
        onRoleSelect?.()
      }, 800)
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
      setTimeout(() => setCelebrate(false), 1200)
    }
  }

  const roles: UserRole[] = ['depot_supervisor', 'je_se', 'sse_pwi', 'tms_operator', 'udm_manager', 'vendor', 'admin']

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {celebrate && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mb-4 text-center"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs">
            Starting demo experience...
          </div>
        </motion.div>
      )}

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center mb-2">Quick Access Demo</h2>
        <p className="text-muted-foreground text-center">
          Select a role to explore the railway management system
        </p>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {roles.map((role, index) => {
          const Icon = roleIcons[role]
          const isSelected = selectedRole === role
          
          return (
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-200 hover:shadow-medium ${
                  isSelected 
                    ? 'ring-2 ring-primary shadow-railway bg-primary/5' 
                    : 'hover:shadow-soft'
                }`}
                onClick={() => handleRoleSelect(role)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      isSelected 
                        ? 'bg-primary text-white' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold text-sm mb-1 ${
                        isSelected ? 'text-primary' : 'text-foreground'
                      }`}>
                        {roleLabels[role]}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {roleDescriptions[role]}
                      </p>
                      <p className="text-xs text-primary/70 mt-1">
                        Demo User: {dummyUsers[role].name}
                      </p>
                    </div>
                    
                    <div className={`transition-colors ${
                      isSelected ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 space-y-4"
      >
        <Button
          onClick={handleSubmit}
          disabled={!selectedRole || loading}
          className="w-full bg-gradient-primary hover:opacity-90 text-white shadow-railway"
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Entering Demo...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Enter as {selectedRole ? dummyUsers[selectedRole].name : 'User'}</span>
            </div>
          )}
        </Button>
        
        {selectedRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-center text-muted-foreground bg-muted/50 rounded-lg p-3"
          >
            <strong>Selected Role:</strong> {roleLabels[selectedRole]}
            <br />
            <strong>Demo User:</strong> {dummyUsers[selectedRole].name}
            <br />
            {roleDescriptions[selectedRole]}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}