import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';

function App() {
  return (
    <div className="app-container">
      <div className="app-sidebar">
        <PipelineToolbar />
      </div>
      <div className="app-main">
        <PipelineUI />
      </div>
    </div>
  );
}

export default App;
