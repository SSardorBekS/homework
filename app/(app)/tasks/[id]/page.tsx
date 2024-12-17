'use client'

import CodeSubmissionForm from '@/components/CodeSubmissionForm'
import { Button } from '@/components/ui/button'
import { notFound } from 'next/navigation'

type Task = {
  id: string
  title: string
  description: string
  status: 'pending' | 'processing' | 'success' | 'failed'
}

export const fetchTask = async (id: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch task')
  }
  return response.json()
}

// export const generateMetadata = async ({ params }: { params: { id: string } }) => {
//   const task = await fetchTask(params.id)
//   return {
//     title: task.title,
//     description: `Details of task: ${task.title}`,
//   }
// }

export default async function TaskDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const task = await fetchTask(id)

  if (!task) {
    notFound() // Handles the case where the task doesn't exist
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Task Details</h1>
      <div className="space-y-4">
        <div>
          <strong>Title:</strong> <span>{task.title}</span>
        </div>
        <div>
          <strong>Description:</strong> <span>{task.description}</span>
        </div>
        <div>
          <strong>Status:</strong> <span className="capitalize">{task.status}</span>
        </div>
        <Button variant="outline" onClick={() => window.history.back()}>
          Back to Tasks
        </Button>

        <CodeSubmissionForm />
      </div>
    </div>
  )
}
