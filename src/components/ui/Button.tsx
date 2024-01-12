import React, { ReactNode } from 'react';

type ButtonProps = {
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
  variant?: 'basic' | 'primary' | 'secondary' | 'accent' | 'success' | 'danger';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  iconOnly?: boolean;
  label?: string;
  fullWidth?: boolean;
};

export const Button = ({
  onClick,
  size = 'medium',
  variant = 'basic',
  icon,
  iconPosition = 'left',
  iconOnly = false,
  label,
  fullWidth = false,
}:ButtonProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-2 py-1 text-sm';
      case 'medium':
        return 'px-3 py-2 text-base';
      case 'large':
        return 'px-4 py-2 text-lg';
    }
  };

  const getStatusClasses = () => {
    console.log(variant);
    switch (variant) {
      case 'basic':
        return 'border-gray-400 text-text hover:bg-gray-200 hover:text-black';
      case 'primary':
        return `border-primary text-text hover:bg-primary hover:text-black`;
      case 'secondary':
        return `border-secondary text-text hover:bg-secondary hover:text-black`;
      case 'accent':
        return `border-accent text-text hover:bg-accent hover:text-black`;
      case 'success':
        return 'bg-green-600 text-text border-green-500 hover:bg-green-500 hover:text-text';
      case 'danger':
        return 'bg-red-600 text-text border-red-500 hover:bg-red-500 hover:text-text';
    }
  };

  const getIconClasses = () => {
    if (iconOnly) {
      return 'mr-2';
    } else {
      return iconPosition === 'left' ? 'mr-2' : 'ml-2';
    }
  };

  return (
    <button
    className={`inline-flex items-center border ${getSizeClasses()} ${getStatusClasses()} justify-center rounded-md ${fullWidth ? 'w-full' : ''}`}
      onClick={onClick}
    >
      {icon && iconPosition === 'left' && <span className={getIconClasses()}>{icon}</span>}
      {!iconOnly && label}
      {icon && iconPosition === 'right' && <span className={getIconClasses()}>{icon}</span>}
    </button>
  );
};