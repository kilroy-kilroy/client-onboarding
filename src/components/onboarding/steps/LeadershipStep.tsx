'use client'

import { useState } from 'react'
import type { LeadershipData } from '@/types/onboarding'
import FormNavigation from '../FormNavigation'

interface LeadershipStepProps {
  initialData?: LeadershipData
  onNext: (data: LeadershipData) => void
  onBack: () => void
}

const ROLE_OPTIONS = ['CEO', 'Founder', 'Co-Founder', 'CRO', 'COO', 'CMO', 'Partner', 'VP Sales', 'VP Operations', 'Other']

export default function LeadershipStep({ initialData, onNext, onBack }: LeadershipStepProps) {
  const [contacts, setContacts] = useState(
    initialData?.contacts || [{ full_name: '', role: 'CEO', email: '', linkedin_url: '', is_decision_maker: true }]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ contacts: contacts.filter(c => c.full_name.trim() !== '') })
  }

  const addContact = () => {
    setContacts([...contacts, { full_name: '', role: 'Other', email: '', linkedin_url: '', is_decision_maker: false }])
  }

  const removeContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index))
  }

  const updateContact = (index: number, field: string, value: any) => {
    const updated = [...contacts]
    updated[index] = { ...updated[index], [field]: value }
    setContacts(updated)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">Leadership Team</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Add the key decision makers and stakeholders in your agency.
      </p>

      <div className="space-y-6">
        {contacts.map((contact, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Contact {index + 1}</h3>
              {contacts.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeContact(index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={contact.full_name}
                  onChange={(e) => updateContact(index, 'full_name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role *
                </label>
                <select
                  value={contact.role}
                  onChange={(e) => updateContact(index, 'role', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  required
                >
                  {ROLE_OPTIONS.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => updateContact(index, 'email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={contact.linkedin_url}
                  onChange={(e) => updateContact(index, 'linkedin_url', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={contact.is_decision_maker || false}
                  onChange={(e) => updateContact(index, 'is_decision_maker', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Primary Decision Maker</span>
              </label>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addContact}
          className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-500"
        >
          + Add Another Contact
        </button>
      </div>

      <FormNavigation onBack={onBack} nextDisabled={contacts.filter(c => c.full_name.trim() !== '').length === 0} />
    </form>
  )
}
