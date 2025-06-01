import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  link: string;
  color?: string;
}

const ServiceCard = ({ title, description, icon, link, color = 'bg-primary-50 text-primary-600' }: ServiceCardProps) => {
  return (
    <Link to={link} className="block">
      <div className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all p-5 h-full">
        <div className={`${color} inline-flex p-3 rounded-lg mb-4`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </Link>
  );
};

export default ServiceCard;
