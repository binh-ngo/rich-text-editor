import React from 'react';
import { Editor } from './Editor';

import './style.css';
export default function App() {
  return (
    <div>
      <h1 className="text-center mt-2">
        Rich Text Editor
      </h1>
      <div className="max-w-[900px] mx-4 mt-8 mb-4">
        <Editor />
      </div>
    </div>
  );
}
