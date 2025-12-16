import React, { useState, useEffect, useRef } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-javascript';

// Import Prism CSS - using inline styles instead to avoid CSS import issues

interface EditableCodeBlockProps {
  code: string;
  language?: string;
  onCodeChange: (code: string) => void;
  onApply: (code: string) => void;
}

const EditableCodeBlock: React.FC<EditableCodeBlockProps> = ({
  code,
  language = 'javascript',
  onCodeChange,
  onApply,
}) => {
  const [editedCode, setEditedCode] = useState(code);
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditedCode(code);
  }, [code]);

  const handleValueChange = (value: string) => {
    setEditedCode(value);
    // Don't call onCodeChange here - only update local state
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editedCode !== code) {
      onCodeChange(editedCode);
      onApply(editedCode);
    }
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  const highlightCode = (code: string) => {
    try {
      return highlight(code, languages.javascript, 'javascript');
    } catch (error) {
      return code;
    }
  };

  return (
    <div className="relative editable-code-block">
      <div
        ref={editorRef}
        className="max-h-96 overflow-y-auto rounded-lg border border-blue-500/30 bg-slate-900/90 backdrop-blur-sm"
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '13px',
        }}
      >
        <Editor
          value={editedCode}
          onValueChange={handleValueChange}
          highlight={highlightCode}
          onBlur={handleBlur}
          onFocus={handleFocus}
          padding={12}
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '13px',
            outline: 'none',
            minHeight: '200px',
            color: '#e2e8f0',
            backgroundColor: 'transparent',
          }}
          textareaClassName="outline-none resize-none scrollbar-thin scrollbar-thumb-blue-500/30 scrollbar-track-transparent"
          preClassName="m-0"
        />
      </div>
      <style>{`
        .editable-code-block .token.comment,
        .editable-code-block .token.prolog,
        .editable-code-block .token.doctype,
        .editable-code-block .token.cdata {
          color: #6272a4;
        }
        .editable-code-block .token.punctuation {
          color: #f8f8f2;
        }
        .editable-code-block .token.property,
        .editable-code-block .token.tag,
        .editable-code-block .token.constant,
        .editable-code-block .token.symbol,
        .editable-code-block .token.deleted {
          color: #ff79c6;
        }
        .editable-code-block .token.boolean,
        .editable-code-block .token.number {
          color: #bd93f9;
        }
        .editable-code-block .token.selector,
        .editable-code-block .token.attr-name,
        .editable-code-block .token.string,
        .editable-code-block .token.char,
        .editable-code-block .token.builtin,
        .editable-code-block .token.inserted {
          color: #f1fa8c;
        }
        .editable-code-block .token.operator,
        .editable-code-block .token.entity,
        .editable-code-block .token.url,
        .editable-code-block .language-css .token.string,
        .editable-code-block .style .token.string {
          color: #ff79c6;
        }
        .editable-code-block .token.atrule,
        .editable-code-block .token.attr-value,
        .editable-code-block .token.keyword {
          color: #8be9fd;
        }
        .editable-code-block .token.function,
        .editable-code-block .token.class-name {
          color: #50fa7b;
        }
        .editable-code-block .token.regex,
        .editable-code-block .token.important,
        .editable-code-block .token.variable {
          color: #ffb86c;
        }
      `}</style>
    </div>
  );
};

export default EditableCodeBlock;
