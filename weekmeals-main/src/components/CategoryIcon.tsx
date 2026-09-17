import React from 'react';
import { 
  Apple, 
  Fish, 
  Milk, 
  Croissant, 
  Sparkles, 
  Wheat, 
  Archive, 
  Droplets, 
  Snowflake, 
  Cookie, 
  Soup, 
  Drumstick, 
  Utensils, 
  Salad, 
  Zap, 
  Carrot, 
  Cake, 
  ShoppingBag,
  Flame,
  Coffee,
  Pizza,
  LucideProps
} from 'lucide-react';

const ICON_MAP: Record<string, React.FC<LucideProps>> = {
  Apple,
  Fish,
  Milk,
  Croissant,
  Sparkles,
  Wheat,
  Archive,
  Droplets,
  Snowflake,
  Cookie,
  Soup,
  Drumstick,
  Utensils,
  Salad,
  Zap,
  Carrot,
  Cake,
  ShoppingBag,
  Flame,
  Coffee,
  Pizza,
};

interface CategoryIconProps extends LucideProps {
  name: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, ...props }) => {
  const Component = ICON_MAP[name] || ShoppingBag;
  return <Component {...props} />;
};
