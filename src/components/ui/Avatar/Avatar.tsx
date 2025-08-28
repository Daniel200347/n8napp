import React from 'react';
import styles from './Avatar.module.css';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt, 
  fallback = 'U', 
  size = 'md',
  className 
}) => {
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={`${styles.avatar} ${styles[size]} ${className || ''}`}>
      {src && !imageError ? (
        <img 
          src={src} 
          alt={alt || 'Avatar'} 
          onError={handleImageError}
          className={styles.avatarImage}
        />
      ) : (
        <span className={styles.avatarFallback}>
          {fallback}
        </span>
      )}
    </div>
  );
};
