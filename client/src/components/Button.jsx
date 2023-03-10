import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const classes = {
  base: 'focus:outline-none transition ease-in-out duration-300',
  disabled: 'opacity-50 cursor-not-allowed',
  pill: 'rounded-full',
  size: {
    small: 'px-2 py-1 text-sm',
    normal: 'px-4 py-2',
    large: 'px-8 py-3 text-lg',
  },
  variant: {
    primary:
      'bg-blue-500 hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white',
    secondary:
      'bg-gray-200 hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-gray-900 hover:text-white',
    danger:
      'bg-red-500 hover:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-white',
    icon:
      'bg-white hover:bg-[#EFF0F0] text-[#3C4043]'
  },
};

const Button = forwardRef(
  (
    {
      children,
      type = 'button',
      className,
      variant = 'primary',
      size = 'normal',
      pill,
      disabled = false,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      disabled={disabled}
      type={type}
      className={`${classes.base} ${classes.size[size]} ${
        classes.variant[variant]
      } ${pill && classes.pill} ${disabled && classes.disabled} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = 'Button';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  submit: PropTypes.oneOf(['submit', 'button']),
  className: PropTypes.string,
  pill: PropTypes.bool,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'icon']),
  size: PropTypes.oneOf(['small', 'normal', 'large']),
};

export default Button;
