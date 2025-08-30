import { useState } from 'react';
import { Sidebar } from '@/components/ui/Sidebar';
import { TemplateCard } from '@/components/TemplateCard';
import { TemplateModal } from '@/components/TemplateModal';
import { SearchInput, StatusFilter } from '@/components/ui';
import { BookIcon, MessageIcon, GoogleIcon } from '@/components/ui/Icons';
import styles from './TemplatesPage.module.css';

interface Template {
  id: number;
  title: string;
  description: string;
  icons: React.ReactNode[];
}

const templates: Template[] = [
  {
    id: 1,
    title: "🎓 Изучите основы API с помощью интерактивного практического учебного курса",
    description: "Если вы хотите, чтобы ваши отправленные анкеты Typeform сохранялись в таблице Google, этот шаблон для вас. Этот шаблон поможет вам сделать именно это, а также использовать OpenAI для описания отправленной анкеты и отправки электронного письма с этим описанием.",
    icons: [<BookIcon key="book" />, <MessageIcon key="message" />, <GoogleIcon key="google" />]
  },
  {
    id: 2,
    title: "🎓 Изучите основы API с помощью интерактивного практического учебного курса",
    description: "Если вы хотите, чтобы ваши отправленные анкеты Typeform сохранялись в таблице Google, этот шаблон для вас. Этот шаблон поможет вам сделать именно это, а также использовать OpenAI для описания отправленной анкеты и отправки электронного письма с этим описанием.",
    icons: [<BookIcon key="book" />, <MessageIcon key="message" />, <GoogleIcon key="google" />]
  },
  {
    id: 3,
    title: "🎓 Изучите основы API с помощью интерактивного практического учебного курса",
    description: "Если вы хотите, чтобы ваши отправленные анкеты Typeform сохранялись в таблице Google, этот шаблон для вас. Этот шаблон поможет вам сделать именно это, а также использовать OpenAI для описания отправленной анкеты и отправки электронного письма с этим описанием.",
    icons: [<BookIcon key="book" />, <MessageIcon key="message" />, <GoogleIcon key="google" />]
  },
  {
    id: 4,
    title: "🎓 Изучите основы API с помощью интерактивного практического учебного курса",
    description: "Если вы хотите, чтобы ваши отправленные анкеты Typeform сохранялись в таблице Google, этот шаблон для вас. Этот шаблон поможет вам сделать именно это, а также использовать OpenAI для описания отправленной анкеты и отправки электронного письма с этим описанием.",
    icons: [<BookIcon key="book" />, <MessageIcon key="message" />, <GoogleIcon key="google" />]
  },
  {
    id: 5,
    title: "🎓 Изучите основы API с помощью интерактивного практического учебного курса",
    description: "Если вы хотите, чтобы ваши отправленные анкеты Typeform сохранялись в таблице Google, этот шаблон для вас. Этот шаблон поможет вам сделать именно это, а также использовать OpenAI для описания отправленной анкеты и отправки электронного письма с этим описанием.",
    icons: [<BookIcon key="book" />, <MessageIcon key="message" />, <GoogleIcon key="google" />]
  },
  {
    id: 6,
    title: "🎓 Изучите основы API с помощью интерактивного практического учебного курса",
    description: "Если вы хотите, чтобы ваши отправленные анкеты Typeform сохранялись в таблице Google, этот шаблон для вас. Этот шаблон поможет вам сделать именно это, а также использовать OpenAI для описания отправленной анкеты и отправки электронного письма с этим описанием.",
    icons: [<BookIcon key="book" />, <MessageIcon key="message" />, <GoogleIcon key="google" />]
  },
  {
    id: 7,
    title: "🎓 Изучите основы API с помощью интерактивного практического учебного курса",
    description: "Если вы хотите, чтобы ваши отправленные анкеты Typeform сохранялись в таблице Google, этот шаблон для вас. Этот шаблон поможет вам сделать именно это, а также использовать OpenAI для описания отправленной анкеты и отправки электронного письма с этим описанием.",
    icons: [<BookIcon key="book" />, <MessageIcon key="message" />, <GoogleIcon key="google" />]
  },
  {
    id: 8,
    title: "🎓 Изучите основы API с помощью интерактивного практического учебного курса",
    description: "Если вы хотите, чтобы ваши отправленные анкеты Typeform сохранялись в таблице Google, этот шаблон для вас. Этот шаблон поможет вам сделать именно это, а также использовать OpenAI для описания отправленной анкеты и отправки электронного письма с этим описанием.",
    icons: [<BookIcon key="book" />, <MessageIcon key="message" />, <GoogleIcon key="google" />]
  },
  {
    id: 9,
    title: "🎓 Изучите основы API с помощью интерактивного практического учебного курса",
    description: "Если вы хотите, чтобы ваши отправленные анкеты Typeform сохранялись в таблице Google, этот шаблон для вас. Этот шаблон поможет вам сделать именно это, а также использовать OpenAI для описания отправленной анкеты и отправки электронного письма с этим описанием.",
    icons: [<BookIcon key="book" />, <MessageIcon key="message" />, <GoogleIcon key="google" />]
  },
  {
    id: 10,
    title: "🎓 Изучите основы API с помощью интерактивного практического учебного курса",
    description: "Если вы хотите, чтобы ваши отправленные анкеты Typeform сохранялись в таблице Google, этот шаблон для вас. Этот шаблон поможет вам сделать именно это, а также использовать OpenAI для описания отправленной анкеты и отправки электронного письма с этим описанием.",
    icons: [<BookIcon key="book" />, <MessageIcon key="message" />, <GoogleIcon key="google" />]
  }
];

export const TemplatesPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);


  const handleInfoClick = (template: Template) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleUseClick = (_template: Template) => {
    // Здесь будет логика использования шаблона
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryFilterChange = (filters: string[]) => {
    setCategoryFilters(filters);
  };

  // Опции для фильтра категорий
  const categoryOptions = [
    { value: 'api', label: 'API' },
    { value: 'automation', label: 'Автоматизация' },
    { value: 'integration', label: 'Интеграция' },
    { value: 'workflow', label: 'Рабочий процесс' }
  ];

  // Фильтрация шаблонов
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = searchQuery === '' || 
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilters.length === 0 || 
      categoryFilters.some(filter => template.title.toLowerCase().includes(filter.toLowerCase()));
    
    return matchesSearch && matchesCategory;
  });

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
              onSearch={handleSearch}
              placeholder="Поиск шаблонов..."
              className={styles.searchInput}
            />
            <StatusFilter
              onFilterChange={handleCategoryFilterChange}
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
