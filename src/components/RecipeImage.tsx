import React from 'react';
import { ChefHat } from 'lucide-react';

interface RecipeImageProps {
  title: string;
  categoryId: string;
  imageUrl?: string;
  className?: string;
}

export const RecipeImage: React.FC<RecipeImageProps> = ({ title, categoryId, imageUrl, className = '' }) => {
  const getUniqueRecipeImage = (recipeTitle: string): string => {
    const t = recipeTitle.toLowerCase();

    // Comprehensive granular dish dictionary
    if (t.includes('carbonara')) return 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=600&h=400';
    if (t.includes('bolognaise') || t.includes('bolognese')) return 'https://images.unsplash.com/photo-1621996346565-e3d5d6283296?auto=format&fit=crop&q=80&w=600&h=400';
    if (t.includes('lasagne') || t.includes('lasagna')) return 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&q=80&w=600&h=400';
    if (t.includes('poulet rôti') || t.includes('roast chicken')) return 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&q=80&w=600&h=400';
    if (t.includes('poulet') || t.includes('chicken')) return 'https://images.unsplash.com/photo-1604908176997-125f2596f3d8?auto=format&fit=crop&q=80&w=600&h=400';
    if (t.includes('burger') || t.includes('cheeseburger') || t.includes('hamburger')) return 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600&h=400';
    if (t.includes('pizza')) return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600&h=400';
    if (t.includes('salade césar') || t.includes('caesar')) return 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=600&h=400';
    if (t.includes('salade') || t.includes('poke')) return 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600&h=400';
    if (t.includes('saumon') || t.includes('salmon')) return 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600&h=400';
    if (t.includes('soupe') || t.includes('velouté')) return 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600&h=400';
    if (t.includes('steak') || t.includes('entrecôte') || t.includes('bœuf') || t.includes('boeuf')) return 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=600&h=400';
    if (t.includes('risotto')) return 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&q=80&w=600&h=400';
    if (t.includes('curry')) return 'https://images.unsplash.com/photo-1455619452474-d2be8b1e7cdcd?auto=format&fit=crop&q=80&w=600&h=400';
    if (t.includes('quiche') || t.includes('tarte salée')) return 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&q=80&w=600&h=400';
    if (t.includes('chocolat') || t.includes('fondant') || t.includes('brownie')) return 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600&h=400';
    if (t.includes('gâteau') || t.includes('cake') || t.includes('pâtisserie')) return 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600&h=400';
    if (t.includes('crêpes') || t.includes('pancakes')) return 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=600&h=400';
    if (t.includes('omelette') || t.includes('œufs') || t.includes('oeufs')) return 'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&q=80&w=600&h=400';
    if (t.includes('gratin')) return 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600&h=400';
    if (t.includes('tartiflette') || t.includes('raclette')) return 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=600&h=400';
    if (t.includes('couscous')) return 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=600&h=400';
    if (t.includes('paella')) return 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=600&h=400';
    if (t.includes('tacos') || t.includes('fajitas')) return 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=600&h=400';
    if (t.includes('sushi') || t.includes('maki')) return 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=600&h=400';

    // Fallback: Deterministic hash-based unique high-res food photo
    const foodPhotos = [
      'https://images.unsplash.com/photo-1540420773420-3366772f4999',
      'https://images.unsplash.com/photo-1544025162-d76694265947',
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
      'https://images.unsplash.com/photo-1621996346565-e3d5d6283296',
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352',
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327',
      'https://images.unsplash.com/photo-1543339308-43e59d6b73a6',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
      'https://images.unsplash.com/photo-1565299585323-38d6b0865b47'
    ];
    let hash = 0;
    for (let i = 0; i < recipeTitle.length; i++) {
      hash = recipeTitle.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % foodPhotos.length;
    return `${foodPhotos[index]}?auto=format&fit=crop&q=80&w=600&h=400`;
  };

  const sourceUrl = imageUrl || getUniqueRecipeImage(title);
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
        <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 p-4 text-center bg-slate-200 dark:bg-slate-700">
          <ChefHat className="w-8 h-8 mb-1 opacity-70" />
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">{title}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50" />
    </div>
  );
};
