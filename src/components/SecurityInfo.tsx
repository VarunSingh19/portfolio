'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Lock, Eye, AlertTriangle } from 'lucide-react'

const SecurityInfo = () => {
  return (
    <Card className="mb-6 border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-yellow-800 dark:text-yellow-200">
          <Shield className="w-5 h-5" />
          <span>Security Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Lock className="w-4 h-4 mt-1 text-green-600" />
            <div>
              <p className="font-medium text-sm">Blog Protection Active</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Only blogs authored by "Varun Singh" can be modified or deleted.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Eye className="w-4 h-4 mt-1 text-blue-600" />
            <div>
              <p className="font-medium text-sm">Activity Monitoring</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                All blog modification attempts are logged with IP and user agent information.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-4 h-4 mt-1 text-orange-600" />
            <div>
              <p className="font-medium text-sm">Security Headers</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Enhanced security headers are applied to all admin API responses.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="outline" className="text-xs">
              Author Validation
            </Badge>
            <Badge variant="outline" className="text-xs">
              Request Logging
            </Badge>
            <Badge variant="outline" className="text-xs">
              XSS Protection
            </Badge>
            <Badge variant="outline" className="text-xs">
              CSRF Prevention
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SecurityInfo
