import { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

const Card = ({ title, children, className = '', icon }: CardProps) => {
  return (
    <div className={`card ${className}`}>
      {(title || icon) && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {icon && <div className="text-primary-600">{icon}</div>}
            {title && <h3 className="text-lg font-medium text-gray-800">{title}</h3>}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
