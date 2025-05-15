import { useEffect, useState } from 'react';
import { SpinnerWrapper, Loader } from './SpinnerStyles';

export default function Spinner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <SpinnerWrapper>
      <Loader />
    </SpinnerWrapper>
  );
}
