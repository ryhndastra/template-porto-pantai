import { useState, useCallback } from 'react';

export function useClipboard(resetDelay: number = 2000) {
  const [copied, setCopied] = useState<boolean>(false);

  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, resetDelay);
    });
  }, [resetDelay]);

  return { copied, copy };
}
