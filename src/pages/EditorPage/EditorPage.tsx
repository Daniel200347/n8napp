import React from 'react';
import styles from './EditorPage.module.css';
import { Editor } from '@/components/Editor';

export const EditorPage: React.FC = () => {
  return (
    <div className={styles.editorPage}>
      <Editor />
    </div>
  );
};

