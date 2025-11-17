'use client'

import { useState } from 'react'
import type { TeamData } from '@/types/onboarding'
import FormNavigation from '../FormNavigation'

interface TeamStepProps {
  initialData?: TeamData
  onNext: (data: TeamData) => void
  onBack: () => void
}

const ROLE_OPTIONS = [
  'Account Manager',
  'Media Buyer',
  'Designer',
  'Developer',
  'Copywriter',
  'Strategist',
  'Project Manager',
  'Analytics Specialist',
  'SEO Specialist',
  'Social Media Manager',
  'Other'
]

export default function TeamStep({ initialData, onNext, onBack }: TeamStepProps) {
  const [members, setMembers] = useState(initialData?.members || [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ members: members.filter(m => m.name.trim() !== '') })
  }

  const addMember = () => {
    setMembers([...members, { name: '', role: 'Other' }])
  }

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index))
  }

  const updateMember = (index: number, field: string, value: any) => {
    const updated = [...members]
    updated[index] = { ...updated[index], [field]: value }
    setMembers(updated)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">Team Members</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Add your team members and their roles. You can skip this step if you prefer to add them later.
      </p>

      <div className="space-y-4">
        {members.map((member, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Team Member {index + 1}</h3>
              <button
                type="button"
                onClick={() => removeMember(index)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => updateMember(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role *
                </label>
                <select
                  value={member.role}
                  onChange={(e) => updateMember(index, 'role', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  required
                >
                  {ROLE_OPTIONS.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addMember}
          className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-500"
        >
          + Add Team Member
        </button>
      </div>

      <FormNavigation onBack={onBack} />
    </form>
  )
}
