import React, { useCallback, useEffect } from 'react';
import { useReactFlow } from 'reactflow';
import { ZoomControlsWrapper } from './ZoomControls/ZoomControlsWrapper';

interface ZoomControlsProviderProps {
  onTogglePanMode: () => void;
  isPanMode: boolean;
  isSpacePressed: boolean;
  onZoomFunctionsReady?: (functions: {
    handleZoomIn: () => void;
    handleZoomOut: () => void;
    handleZoomReset: () => void;
  }) => void;
}

export const ZoomControlsProvider: React.FC<ZoomControlsProviderProps> = ({
  onTogglePanMode,
  isPanMode,
  isSpacePressed,
  onZoomFunctionsReady
}) => {
  const { zoomTo, getZoom } = useReactFlow();

  useEffect(() => {
    const interval = setInterval(() => {
    }, 1000);

    return () => clearInterval(interval);
  }, [getZoom]);

  const handleZoomIn = useCallback(() => {
    const currentZoom = getZoom();
    const newZoom = Math.min(currentZoom + 0.1, 1);
    zoomTo(newZoom);
  }, [zoomTo, getZoom]);

  const handleZoomOut = useCallback(() => {
    const currentZoom = getZoom();
    const newZoom = Math.max(currentZoom - 0.1, 0.1);
    zoomTo(newZoom);
  }, [zoomTo, getZoom]);

  const handleZoomReset = useCallback(() => {
    zoomTo(1);
  }, [zoomTo]);

  useEffect(() => {
    if (onZoomFunctionsReady) {
      onZoomFunctionsReady({
        handleZoomIn,
        handleZoomOut,
        handleZoomReset
      });
    }
  }, [handleZoomIn, handleZoomOut, handleZoomReset, onZoomFunctionsReady]);

  return (
    <ZoomControlsWrapper
      onTogglePanMode={onTogglePanMode}
      isPanMode={isPanMode}
      isSpacePressed={isSpacePressed}
      onZoomIn={handleZoomIn}
      onZoomOut={handleZoomOut}
      onZoomReset={handleZoomReset}
    />
  );
};
