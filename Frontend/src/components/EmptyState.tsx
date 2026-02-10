import { LucideIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title: string;
  description: string;
  icon: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
  actionLink?: string;
}

const EmptyState = ({
  title,
  description,
  icon: Icon,
  actionLabel,
  onAction,
  actionLink,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mb-6">
        <Icon size={32} className="text-muted-foreground" />
      </div>
      <h3 className="font-serif text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md mb-8">{description}</p>
      
      {actionLink ? (
        <Link to={actionLink}>
          <Button size="lg" className="luxury-button min-w-[200px]">
            {actionLabel}
          </Button>
        </Link>
      ) : actionLabel && onAction ? (
        <Button onClick={onAction} size="lg" className="luxury-button min-w-[200px]">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
};

export default EmptyState;
