import { useState, useEffect, useRef } from 'react';

/**
 * Retorna `true` sempre que `loading` é `true`,
 * e também por pelo menos `minDuration` ms depois que `loading` vira `false`.
 */
export function useDelayedLoading(loading: boolean, minDuration: number = 1500): boolean {
  const [delayed, setDelayed] = useState(false);
  const startRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Quando começa a carregar, liga o spinner imediatamente
    if (loading) {
      // limpieza de timeouts anteriores
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      startRef.current = Date.now();
      setDelayed(true);
    } else if (startRef.current !== null) {
      // Quando termina o loading, calcula tempo restante
      const elapsed = Date.now() - startRef.current;
      const remaining = minDuration - elapsed;
      if (remaining <= 0) {
        // já passou do mínimo, desliga direito
        setDelayed(false);
        startRef.current = null;
      } else {
        // espera o restante antes de desligar
        timeoutRef.current = setTimeout(() => {
          setDelayed(false);
          startRef.current = null;
        }, remaining);
      }
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [loading, minDuration]);

  return delayed;
}
