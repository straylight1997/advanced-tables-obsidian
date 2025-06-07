import * as React from 'react';

/**
 * Props for RichTableEditor
 * - data: initial table data (array of rows, each row is array of strings)
 * - colWidths: initial column widths (optional)
 * - onSave: callback with updated data and colWidths
 * - onCancel: callback for cancel action
 */
export interface RichTableEditorProps {
  data: string[][];
  colWidths?: number[];
  onSave: (data: string[][], colWidths: number[]) => void;
  onCancel: () => void;
}

export const RichTableEditor: React.FC<RichTableEditorProps> = ({ data, colWidths, onSave, onCancel }: RichTableEditorProps) => {
  const [tableData, setTableData] = React.useState<string[][]>(data);
  const [widths, setWidths] = React.useState<number[]>(colWidths || Array(data[0]?.length || 0).fill(120));
  const [dragCol, setDragCol] = React.useState<number | null>(null);
  const [dragStartX, setDragStartX] = React.useState<number>(0);
  const [origWidth, setOrigWidth] = React.useState<number>(0);

  const handleMouseDown = (colIdx: number, e: React.MouseEvent) => {
    setDragCol(colIdx);
    setDragStartX(e.clientX);
    setOrigWidth(widths[colIdx]);
    document.body.style.cursor = 'col-resize';
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragCol !== null) {
      const delta = e.clientX - dragStartX;
      setWidths((prev: number[]) => {
        const newWidths = [...prev];
        newWidths[dragCol!] = Math.max(40, newWidths[dragCol!] + delta);
        return newWidths;
      });
    }
  };

  const handleMouseUp = () => {
    setDragCol(null);
    document.body.style.cursor = '';
  };

  React.useEffect(() => {
    if (dragCol !== null) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragCol]);

  return (
    <div style={{ padding: 16 }}>
      {/* User Instructions */}
      <div style={{
        marginBottom: 16,
        padding: '10px 14px',
        background: '#f8fafc',
        border: '1px solid #dbeafe',
        borderRadius: 6,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        fontSize: 14,
        color: '#222',
      }}>
        <span style={{ fontSize: 18, color: '#3b82f6', marginRight: 6 }}>ℹ️</span>
        <span>
          <b>How to use:</b> <br />
          <ul style={{ margin: '4px 0 0 18px', padding: 0 }}>
            <li>Edit cells by typing directly.</li>
            <li>Resize columns by dragging the vertical handles in the header row.</li>
            <li>Click <b>Save</b> to apply changes, or <b>Cancel</b> to discard.</li>
          </ul>
        </span>
      </div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <colgroup>
          {widths.map((w: number, i: number) => (
            <col key={i} style={{ width: w }} />
          ))}
        </colgroup>
        <tbody>
          {tableData.map((row: string[], rowIdx: number) => (
            <tr key={rowIdx}>
              {row.map((cell: string, colIdx: number) => (
                <td
                  key={colIdx}
                  style={{ border: '1px solid #ccc', padding: 4, position: 'relative' }}
                >
                  <input
                    style={{ width: '100%', border: 'none', background: 'transparent' }}
                    value={cell}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const updated = tableData.map((r: string[]) => [...r]);
                      updated[rowIdx][colIdx] = e.target.value;
                      setTableData(updated);
                    }}
                  />
                  {/* Drag handle (except last column) */}
                  {rowIdx === 0 && colIdx < row.length - 1 && (
                    <div
                      onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => handleMouseDown(colIdx, e)}
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: -4,
                        width: 8,
                        height: '100%',
                        cursor: 'col-resize',
                        zIndex: 2,
                      }}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 16, textAlign: 'right' }}>
        <button onClick={() => onSave(tableData, widths)} style={{ marginRight: 8 }}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};
