'use client';

import { useEffect, useState } from 'react';
import { Download, X, Maximize2, Minimize2 } from 'lucide-react';
import { log, type LogEntry } from '@/lib/utils/logger';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function LogViewer() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const updateLogs = () => {
      setLogs(log.getLogs());
    };

    updateLogs();
    const interval = setInterval(updateLogs, 1000);

    return () => clearInterval(interval);
  }, []);

  function exportLogs() {
    const json = log.export();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sop-logs-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function clearLogs() {
    log.clear();
    setLogs([]);
  }

  const levelColors = {
    debug: 'text-gray-400',
    info: 'text-cyan-400',
    warn: 'text-yellow-400',
    error: 'text-red-400',
  };

  // Count errors and warnings for badge
  const errorCount = logs.filter(l => l.level === 'error').length;
  const warnCount = logs.filter(l => l.level === 'warn').length;

  // Collapsed view - just a small button
  if (isCollapsed) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsCollapsed(false)}
          variant="outline"
          size="sm"
          className="gap-2 bg-slate-900/90 border-cyan-500/50 hover:bg-slate-800"
        >
          <Maximize2 className="h-4 w-4" />
          <span className="text-xs">Logs</span>
          {(errorCount > 0 || warnCount > 0) && (
            <Badge variant="destructive" className="ml-1 h-4 px-1.5 text-[10px]">
              {errorCount + warnCount}
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  // Expanded view
  return (
    <div className="fixed bottom-4 right-4 w-96 max-h-[80vh] bg-slate-900/95 border border-slate-700 rounded-lg shadow-lg flex flex-col z-50 backdrop-blur-sm">
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground">Logs</h3>
          {logs.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {logs.length}
            </Badge>
          )}
          {(errorCount > 0 || warnCount > 0) && (
            <Badge variant="destructive" className="text-xs">
              {errorCount}E {warnCount}W
            </Badge>
          )}
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={exportLogs}
            className="h-7 w-7 p-0"
            title="Export logs"
          >
            <Download className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearLogs}
            className="h-7 w-7 p-0"
            title="Clear logs"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(true)}
            className="h-7 w-7 p-0"
            title="Minimize"
          >
            <Minimize2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Logs content */}
      <div className="flex-1 overflow-y-auto p-3 text-xs font-mono space-y-1">
        {logs.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No logs yet</p>
        ) : (
          logs.slice(-50).map((entry, idx) => (
            <div key={idx} className="border-b border-slate-800 pb-2 last:border-0">
              <div className="flex gap-2 items-center">
                <span className={`${levelColors[entry.level]} font-semibold`}>
                  [{entry.level.toUpperCase()}]
                </span>
                <span className="text-muted-foreground">{entry.category}</span>
                <span className="text-muted-foreground/50 text-[10px] ml-auto">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="text-foreground/90 mt-1 break-words">{entry.message}</div>
              {entry.data && (
                <div className="text-muted-foreground mt-1 text-[10px] bg-slate-950/50 p-2 rounded overflow-x-auto">
                  <pre className="whitespace-pre-wrap">{JSON.stringify(entry.data, null, 2)}</pre>
                </div>
              )}
              {entry.error && (
                <div className="text-red-400 mt-1 text-[10px] bg-red-950/20 p-2 rounded">
                  <div className="font-semibold">{entry.error.name}</div>
                  <div>{entry.error.message}</div>
                  {entry.error.stack && (
                    <div className="mt-1 opacity-70 text-[9px]">
                      {entry.error.stack.split('\n').slice(0, 3).join('\n')}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}



