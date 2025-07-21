// import React, { useState } from 'react';
// import FieldRow from './FieldRow';

// const SchemaBuilder = ({ fields = [], onChange }) => {
//   const [localFields, setLocalFields] = useState(fields);

//   const addField = () => {
//     const newFields = [...localFields, { name: '', type: 'string' }];
//     setLocalFields(newFields);
//     onChange?.(newFields);
//   };

//   const updateField = (index, updatedField) => {
//     const updatedFields = [...localFields];
//     updatedFields[index] = updatedField;
//     setLocalFields(updatedFields);
//     onChange?.(updatedFields);
//   };

//   const deleteField = (index) => {
//     const updatedFields = localFields.filter((_, i) => i !== index);
//     setLocalFields(updatedFields);
//     onChange?.(updatedFields);
//   };

//   return (
//     <>
//     <div style={{ paddingLeft: '20px', borderLeft: '2px solid #ccc', marginBottom: '10px' }}>
       
//       {localFields.map((field, index) => (
//         <FieldRow
//           key={index}
//           index={index}
//           field={field}
//           onChange={(i, updated) => updateField(index, updated)}
//           onDelete={deleteField}
//         />
//       ))}
//       <button onClick={addField}>Add Field</button>
//     </div>
//          </>

//   );
// };

// export default SchemaBuilder;




import type React from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FieldRow } from "./FieldRow"
import type { SchemaBuilderProps, SchemaField } from "../types/schema"

export const SchemaBuilder: React.FC<SchemaBuilderProps> = ({ fields, onChange, depth = 0 }) => {
  const addField = () => {
    const newFields: SchemaField[] = [...fields, {
      id: `field_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
       name: "", type: "string" }]
    onChange(newFields)
  }

  const updateField = (index: number, updatedField: SchemaField) => {
    const updatedFields = [...fields]
    updatedFields[index] = updatedField
    onChange(updatedFields)
  }

  const deleteField = (index: number) => {
    const updatedFields = fields.filter((_, i) => i !== index)
    onChange(updatedFields)
  }

  return (
    <div className="space-y-1 ">
      {fields.map((field, index) => (
        <FieldRow
          key={field.id}
          index={index}
          field={field}
          onChange={updateField}
          onDelete={deleteField}
          depth={depth}
        />
      ))}

      <Button
        onClick={addField}
        variant="outline"
        className="w-full border-dashed border-2 hover:border-solid bg-transparent hover:bg-accent hover:text-accent-foreground"
      >
        <Plus className="h-4 w-4 mr-2 " />
        Add Field
      </Button>
    </div>
  )
}

