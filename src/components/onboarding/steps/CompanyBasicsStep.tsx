'use client'

import { useState } from 'react'
import type { CompanyBasicsData } from '@/types/onboarding'
import FormNavigation from '../FormNavigation'

interface CompanyBasicsStepProps {
  initialData?: CompanyBasicsData
  onNext: (data: CompanyBasicsData) => void
  onBack: () => void
}

export default function CompanyBasicsStep({ initialData, onNext, onBack }: CompanyBasicsStepProps) {
  const [formData, setFormData] = useState<CompanyBasicsData>(
    initialData || {
      company_name: '',
    }
  )
  const [email, setEmail] = useState((initialData as any)?.email || '')
  const [password, setPassword] = useState((initialData as any)?.password || '')
  const [confirmPassword, setConfirmPassword] = useState((initialData as any)?.password || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    if (password.length < 8) {
      alert('Password must be at least 8 characters')
      return
    }
    // Pass auth data along with company data
    onNext({
      ...formData,
      email,
      password,
    } as any)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'founded' || name === 'team_size' ? parseInt(value) || undefined : value,
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">Company Basics</h2>

      <div className="space-y-4">
        {/* Account Creation */}
        <div className="bg-brand-yellow bg-opacity-10 p-4 border-l-4 border-brand-yellow mb-6">
          <h3 className="font-anton text-lg uppercase mb-2">Create Your Account</h3>
          <p className="text-sm text-gray-700 mb-4">This will be used to log in and access your dashboard.</p>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  minLength={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  minLength={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Company Name *
          </label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            required
            value={formData.company_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Website URL
          </label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url || ''}
            onChange={handleChange}
            placeholder="https://example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label htmlFor="industry_niche" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Industry / Niche
          </label>
          <input
            type="text"
            id="industry_niche"
            name="industry_niche"
            value={formData.industry_niche || ''}
            onChange={handleChange}
            placeholder="e.g., SaaS, E-commerce, B2B Services"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="hq_location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              HQ Location
            </label>
            <input
              type="text"
              id="hq_location"
              name="hq_location"
              value={formData.hq_location || ''}
              onChange={handleChange}
              placeholder="City, State/Country"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label htmlFor="founded" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Year Founded
            </label>
            <input
              type="number"
              id="founded"
              name="founded"
              value={formData.founded || ''}
              onChange={handleChange}
              placeholder="2020"
              min="1900"
              max={new Date().getFullYear()}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="team_size" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Team Size
            </label>
            <input
              type="number"
              id="team_size"
              name="team_size"
              value={formData.team_size || ''}
              onChange={handleChange}
              placeholder="10"
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label htmlFor="revenue_range" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Revenue Range
            </label>
            <select
              id="revenue_range"
              name="revenue_range"
              value={formData.revenue_range || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">Select range</option>
              <option value="Under $500k">Under $500k</option>
              <option value="$500k-$1M">$500k-$1M</option>
              <option value="$1M-$2M">$1M-$2M</option>
              <option value="$2M-$5M">$2M-$5M</option>
              <option value="$5M-$10M">$5M-$10M</option>
              <option value="$10M+">$10M+</option>
            </select>
          </div>
        </div>
      </div>

      <FormNavigation
        onBack={onBack}
        showBack={false}
        nextDisabled={!formData.company_name || !email || !password || !confirmPassword || password.length < 8}
      />
    </form>
  )
}
