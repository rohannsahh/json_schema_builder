
import SchemaBuilderWrapper from './components/SchemaBuilderWrapper';
import { Toaster } from 'sonner';
function App() {
  return (
    <div >
      <Toaster position="top-right" richColors />
      <SchemaBuilderWrapper />
    </div>
  );
}

export default App;
