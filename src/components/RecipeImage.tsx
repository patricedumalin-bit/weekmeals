import React from 'react';
import { ChefHat } from 'lucide-react';

interface RecipeImageProps {
  title: string;
  categoryId: string;
  imageUrl?: string;
  className?: string;
}

export const RecipeImage: React.FC<RecipeImageProps> = ({ title, categoryId, imageUrl, className = '' }) => {
  // If no image is provided, use a keyword-based high-quality placeholder from Unsplash
  // or a fallback color pattern.
  const query = encodeURIComponent(title || 'food');
  const fallbackUrl = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=200&h=150`;

  // Map internal categories to Unsplash keywords for better relevance
  const categoryKeywords: Record<string, string> = {
    'rcat-entree': 'starter,salad',
    'rcat-viande': 'meat,beef,steak',
    'rcat-volaille': 'chicken,poultry',
    'rcat-poisson': 'fish,seafood',
    'rcat-legume': 'vegetables,healthy',
    'rcat-pates': 'pasta,rice,italian',
    'rcat-dessert': 'dessert,cake,sweet',
    'rcat-autre': 'food,snack'
  };

  const keyword = categoryKeywords[categoryId] || 'food';
  const sourceUrl = imageUrl || `https://source.unsplash.com/featured/400x300?${keyword},${query}`;

  const [error, setError] = React.useState(false);

  return (
    <div className={`relative overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center ${className}`}>
      {!error ? (
        <img
          src={sourceUrl}
          alt={title}
          onError={() => setError(true)}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-slate-300 dark:text-slate-600 p-4 text-center">
          <ChefHat className="w-8 h-8 mb-1 opacity-50" />
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-30">{title}</span>
        </div>
      )}
      {/* Overlay gradient for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
    </div>
  );
};
