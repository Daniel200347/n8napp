import { useState, useMemo } from 'react';
import type { Template } from '../types';

export const useTemplateFiltering = (templates: Template[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesSearch =
        searchQuery === '' ||
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilters.length === 0 ||
        categoryFilters.some((filter) =>
          template.title.toLowerCase().includes(filter.toLowerCase())
        );

      return matchesSearch && matchesCategory;
    });
  }, [templates, searchQuery, categoryFilters]);

  return {
    searchQuery,
    categoryFilters,
    filteredTemplates,
    setSearchQuery,
    setCategoryFilters,
  };
};

