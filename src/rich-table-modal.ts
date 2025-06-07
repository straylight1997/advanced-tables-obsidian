import { Modal, App } from 'obsidian';
import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { RichTableEditor, RichTableEditorProps } from './rich-table-editor';

export class RichTableModal extends Modal {
  private data: string[][];
  private colWidths?: number[];
  private onSubmit: (data: string[][], colWidths: number[]) => void;

  constructor(app: App, data: string[][], colWidths: number[] | undefined, onSubmit: (data: string[][], colWidths: number[]) => void) {
    super(app);
    this.data = data;
    this.colWidths = colWidths;
    this.onSubmit = onSubmit;
  }

  private reactRoot: ReactDOMClient.Root | null = null;

  onOpen() {
    const { contentEl } = this;
    this.reactRoot = ReactDOMClient.createRoot(contentEl);
    this.reactRoot.render(
      React.createElement(RichTableEditor, {
        data: this.data,
        colWidths: this.colWidths,
        onSave: (updatedData, updatedWidths) => {
          this.onSubmit(updatedData, updatedWidths);
          this.close();
        },
        onCancel: () => this.close(),
      } as RichTableEditorProps)
    );
  }

  onClose() {
    if (this.reactRoot) {
      this.reactRoot.unmount();
      this.reactRoot = null;
    }
    this.contentEl.empty();
  }
}
