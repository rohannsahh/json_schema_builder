import React from "react"
import { Trash2, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SchemaBuilder } from "./SchemaBuilder"
import type { FieldRowProps, SchemaField } from "../types/schema"

export const FieldRow: React.FC<FieldRowProps> = ({ index, field, onChange, onDelete, depth = 0 }) => {
  const [isExpanded, setIsExpanded] = React.useState(true)

  const handleNameChange = (value: string) => {
    onChange(index, { ...field, name: value })
  }

  const handleTypeChange = (newType: SchemaField["type"]) => {
    let updatedField: SchemaField = { ...field, type: newType }

    if (newType === "nested" && !field.fields) {
      updatedField.fields = []
    } else if (newType !== "nested" && field.fields) {
      const { fields, ...rest } = updatedField
      updatedField = rest
    }

    onChange(index, updatedField)
  }

 
  const handleNestedFieldsChange = (nestedFields: SchemaField[]) => {

  const fieldsWithIds = nestedFields.map((nestedField) => ({
    ...nestedField,
    id: nestedField.id || `field_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
  }))

  const updatedField: SchemaField = { ...field, fields: fieldsWithIds } 
  onChange(index, updatedField)
}

  const getTypeColor = (type: string) => {
    switch (type) {
      case "string":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "number":
        return "bg-green-100 text-green-800 border-green-200"
      case "boolean":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "nested":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className={`mb-1 ${depth > 0 ? "ml-6 border-l-4 border-l-muted" : ""}`}>
      <CardContent className="p-1">
        <div className="flex items-center gap-3 mb-3">
          {field.type === "nested" && (
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="p-1 h-6 w-6">
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          )}

          <div className="flex-1">
            <Input
              type="text"
              placeholder="Field name"
              value={field.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="font-medium"
            />
          </div>

          <Select value={field.type} onValueChange={handleTypeChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="string">String</SelectItem>
              <SelectItem value="number">Number</SelectItem>
              <SelectItem value="boolean">Boolean</SelectItem>
              <SelectItem value="objectid">ObjectId</SelectItem>
              <SelectItem value="float">Float</SelectItem>
              <SelectItem value="nested">Nested</SelectItem>
            </SelectContent>
          </Select>

          <Badge className={getTypeColor(field.type)}>{field.type}</Badge>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(index)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {field.type === "nested" && isExpanded && (
          <div className="mt-4 p-4 bg-muted/30 rounded-lg border">
            <div className="mb-3">
              <h4 className="text-sm font-medium text-muted-foreground">
                Nested Fields for "{field.name || "Unnamed"}"
              </h4>
            </div>
            <SchemaBuilder fields={field.fields || []} onChange={handleNestedFieldsChange} depth={depth + 1} />
          </div>
        )}
      </CardContent>
    </div>
  )
}
