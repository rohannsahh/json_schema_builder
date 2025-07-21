
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SchemaBuilder } from "../components/SchemaBuilder"
import { JsonPreview } from "../components/JsonPreview"
import type { SchemaField } from "../types/schema"

export default function SchemaBuilderWrapper() {
  const [fields, setFields] = useState<SchemaField[]>([])

  return (
    <div className="min-h-screen bg-background p-10">
      <div className="max-w-full mx-auto">
        <div className="mb-5">
          <h1 className="text-3xl font-bold tracking-tight">JSON Schema Builder</h1>
         
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Schema Builder
                {fields.length > 0 && (
                  <span className="text-sm font-normal text-muted-foreground">
                    ({fields.length} field{fields.length !== 1 ? "s" : ""})
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SchemaBuilder fields={fields} onChange={setFields} />
            </CardContent>
          </Card>

          <JsonPreview fields={fields} />
        </div>
      </div>
    </div>
  )
}
