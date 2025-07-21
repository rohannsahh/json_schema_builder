"use client"

import type React from "react"
import { Copy, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SchemaField } from "../types/schema"
import { toast } from "sonner"
interface JsonPreviewProps {
  fields: SchemaField[]
}

export const JsonPreview: React.FC<JsonPreviewProps> = ({ fields }) => {

  const generateSchema = (fields: SchemaField[]): Record<string, any> => {
    const schema: Record<string, any> = {}

    fields.forEach((field) => {
      if (!field.name) return

      if (field.type === "nested") {
        schema[field.name] = generateSchema(field.fields || [])
      } else {
        switch (field.type) {
          case "string":
            schema[field.name] = "STRING"
            break
          case "number":
            schema[field.name] = "NUMBER"
            break
          case "boolean":
            schema[field.name] = "BOOLEAN"
            break
          default:
            schema[field.name] = (field.type as string).toUpperCase()
        }
      }
    })

    return schema
  }

  const schemaJson = generateSchema(fields)
  const jsonString = JSON.stringify(schemaJson, null, 2)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonString)
      toast(
       "Copied!",
        {description: "JSON schema copied to clipboard",

        }
      )
    } catch (err) {
      toast(
        "Error",
        {description: "Failed to copy to clipboard",
        
      })
    }
  }

  const downloadJson = () => {
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "schema.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast(
      "Downloaded!",
     { description: "JSON schema downloaded successfully",
    })
  }

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">JSON Schema Preview</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              disabled={!jsonString.trim() || jsonString === "{}"}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadJson}
              disabled={!jsonString.trim() || jsonString === "{}"}
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto max-h-[600px] border">
            <code className="text-muted-foreground">{jsonString || "{\n  // Add fields to see JSON preview\n}"}</code>
          </pre>
        </div>

        {Object.keys(schemaJson).length > 0 && (
          <div className="mt-3 text-xs text-muted-foreground">
            Fields: {Object.keys(schemaJson).length} | Size: {new Blob([jsonString]).size} bytes
          </div>
        )}
      </CardContent>
    </Card>
  )
}
