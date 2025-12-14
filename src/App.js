import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className='m-2 rounded-md border border-[rgba(0,0,0,0.2)] bg-white'>
      <PipelineToolbar />
      <PipelineUI />
    </div>
  );
}

export default App;
