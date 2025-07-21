// import React, { useState } from 'react';
// import FieldRow from './FieldRow';
// import SchemaBuilder from './SchemaBuilder'; 

// const SchemaBuilderWrapper = () => {
//   const [fields, setFields] = useState([]);

//   const generateSchema = (fields) => {
//     const schema = {};
//     fields.forEach(field => {
//       if (field.type === 'nested') {
//         schema[field.name] = 
        
//        generateSchema(field.fields || [])
       
//       } else {
//         schema[field.name] = field.type.toUpperCase();
//       }
//     });
//     return schema;
//   };

//   return (
//     <div style={{ display: 'flex', gap: '40px' }}>
   
//       <div>
//         <h2>Schema Builder</h2>
//         <SchemaBuilder fields={fields} onChange={setFields} />
//       </div>

  
//       <div>
//         <h2> JSON Schema Preview</h2>
//         <pre
//           style={{
//             background: '#f4f4f4',
//             padding: '10px',
//             borderRadius: '6px',
//             maxHeight: '600px',
//             overflow: 'auto',
//           }}
//         >
//           {JSON.stringify(generateSchema(fields), null, 2)}
//         </pre>
//       </div>
//     </div>
//   );
// };

// export default SchemaBuilderWrapper;

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
