"use clinet"
export const fetchTask = async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`)
    if (!response.ok) {
      throw new Error("Failed to fetch task")
    }
    return response.json()
  }
  