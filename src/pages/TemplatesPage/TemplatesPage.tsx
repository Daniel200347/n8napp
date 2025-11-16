import { useState } from 'react';
import { Sidebar } from '@/components/ui/Sidebar';
import { TemplateCard } from '@/components/TemplateCard';
import { TemplateModal } from '@/components/TemplateModal';
import { SearchInput, StatusFilter } from '@/components/ui';
import { templates, categoryOptions } from './mockData';
import { useTemplateFiltering } from './hooks/useTemplateFiltering';
import styles from './TemplatesPage.module.css';

export const TemplatesPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<(typeof templates)[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { searchQuery, categoryFilters, filteredTemplates, setSearchQuery, setCategoryFilters } =
    useTemplateFiltering(templates);

  const handleInfoClick = (template: typeof templates[0]) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const handleUseClick = (_template: typeof templates[0]) => {
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTemplate(null);
  };

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      handleUseClick(selectedTemplate);
      handleModalClose();
    }
  };

  return (
    <div className={styles.templatesPageContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.contentContainer}>
          <header className={styles.header}>
            <h1 className={styles.title}>Шаблоны</h1>
            <p className={styles.description}>
              Используйте готовые шаблоны, чтобы быстро настроить процессы без необходимости создавать их с нуля
            </p>
          </header>

          <div className={styles.tabButtons}>
            <SearchInput
              onSearch={setSearchQuery}
              placeholder="Поиск шаблонов..."
              className={styles.searchInput}
            />
            <StatusFilter
              onFilterChange={setCategoryFilters}
              options={categoryOptions}
              className={styles.categoryFilter}
            />
          </div>

          <div className={styles.cardContainer}>
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                title={template.title}
                icons={template.icons}
                onInfoClick={() => handleInfoClick(template)}
                onUseClick={() => handleUseClick(template)}
              />
            ))}
          </div>
        </div>
      </main>

      {selectedTemplate && (
        <TemplateModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          template={selectedTemplate}
          onUseTemplate={handleUseTemplate}
        />
      )}
    </div>
  );
};

