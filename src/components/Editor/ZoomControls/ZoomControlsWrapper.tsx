import React from 'react';
import { useReactFlow } from 'reactflow';
import { ZoomControls } from './ZoomControls';

interface ZoomControlsWrapperProps {
  onTogglePanMode: () => void;
  isPanMode: boolean;
  isSpacePressed: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
}

export const ZoomControlsWrapper: React.FC<ZoomControlsWrapperProps> = ({
  onTogglePanMode,
  isPanMode,
  isSpacePressed,
  onZoomIn,
  onZoomOut,
  onZoomReset
}) => {
  const { getZoom } = useReactFlow();

  return (
    <ZoomControls 
      onZoomIn={onZoomIn} 
      onZoomOut={onZoomOut} 
      onZoomReset={onZoomReset}
      getZoom={getZoom}
      onTogglePanMode={onTogglePanMode}
      isPanMode={isPanMode}
      isSpacePressed={isSpacePressed}
    />
  );
};
