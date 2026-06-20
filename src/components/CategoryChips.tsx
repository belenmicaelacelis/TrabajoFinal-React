import React from 'react';

interface CategoryChipsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categoryTranslations: Record<string, string> = {
  all: 'Todos',
  electronics: 'Electrónica',
  jewelery: 'Joyería',
  "men's clothing": 'Ropa de Hombre',
  "women's clothing": 'Ropa de Mujer',
};

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  // Ensure "all" is always the first item
  const allCategories = ['all', ...categories];

  return (
    <section className="categories-section">
      <div className="categories-container">
        {allCategories.map((category) => {
          const isActive = selectedCategory === category;
          const label = categoryTranslations[category.toLowerCase()] || category;

          return (
            <button
              key={category}
              className={`category-chip ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(category)}
              aria-pressed={isActive}
            >
              {label}
            </button>
          );
        })}
      </div>
    </section>
  );
};
