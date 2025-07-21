export interface SchemaField {
  id: string
  name: string
  type: "string" | "number" | "boolean" | "nested"
  fields?: SchemaField[]
}

export interface FieldRowProps {
  index: number
  field: SchemaField
  onChange: (index: number, field: SchemaField) => void
  onDelete: (index: number) => void
  depth?: number
}

export interface SchemaBuilderProps {
  fields: SchemaField[]
  onChange: (fields: SchemaField[]) => void
  depth?: number
}
