'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function CodeSubmissionForm() {
    const [language, setLanguage] = useState('javascript') // Default language
    const [code, setCode] = useState('')

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log('Language:', language)
        console.log('Code:', code)
        // You can send the data to your server or handle it as needed
    }

    return (
        <div className="w-full max-w-2xl mx-auto py-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">Submit Your Code</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="language" className="text-sm font-medium">
                                Select Code Language
                            </Label>
                            
                            <Select
                                value={language}
                                onValueChange={(value) => setLanguage(value)}
                            >
                                <SelectTrigger className="mt-2">
                                    <SelectValue placeholder="Select a language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="python">Python</SelectItem>
                                    <SelectItem value="cpp">C++</SelectItem>
                                    <SelectItem value="javascript">JavaScript</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Code textarea */}
                        <div>
                            <Label htmlFor="code" className="text-sm font-medium">
                                Write Your Code
                            </Label>
                            <Textarea
                                id="code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                rows={10}
                                placeholder="Write your code here..."
                                className="mt-2"
                            />
                        </div>

                        {/* Submit button */}
                        <Button type="submit" className="w-full">
                            Submit Code
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
