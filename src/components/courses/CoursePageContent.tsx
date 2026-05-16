"use client";

import { useState, useEffect, useRef } from 'react';
import { PortableText } from '@portabletext/react';

interface CourseData {
  title: string;
  category?: string;
  thumbnail?: { asset: { url: string } };
  description?: any[];
  topics: {
    _id: string;
    title: string;
    questions: {
      _id: string;
      question: string;
      answer: any[];
    }[];
  }[];
}

interface CoursePageContentProps {
  course: CourseData;
}

function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [buttonText, setButtonText] = useState('Copy')
  const codeRef = useRef<HTMLElement>(null)

  const handleCopy = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(code).then(() => {
        setButtonText('Copied!')
        setTimeout(() => setButtonText('Copy'), 1000)
      })
    }
  }

  return (
    <div className="relative overflow-hidden rounded-lg bg-slate-900 my-4">
      <div className="flex items-center justify-between bg-slate-800 px-4 py-2">
        <span className="text-xs font-medium text-emerald-400">{language || 'javascript'}</span>
        <button
          onClick={handleCopy}
          className="text-xs text-slate-400 hover:text-white transition-colors"
        >
          {buttonText}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm text-slate-300">
        <code ref={codeRef}>{code}</code>
      </pre>
    </div>
  )
}

const portableTextComponents = {
  types: {
    code: ({ value }: any) => {
      if (!value) return null;
      let codeContent = '';
      let lang = 'javascript';
      if (typeof value === 'string') {
        codeContent = value;
      } else if (typeof value === 'object') {
        codeContent = value?.code || value?.sourceCode || value?.content || '';
        lang = value?.language || value?.programmingLanguage || 'javascript';
      }
      return codeContent ? <CodeBlock code={codeContent} language={lang} /> : null;
    },
    image: ({ value }: any) => {
      if (!value?.asset?.url) return null;
      return (
        <img 
          src={value.asset.url} 
          alt={value.alt || ''} 
          className="my-4 rounded-lg max-w-full"
        />
      );
    },
  },
  block: {
    normal: ({ children }: { children: any }) => <p className="my-2">{children}</p>,
    h1: ({ children }: { children: any }) => <h1 className="text-2xl font-bold my-4">{children}</h1>,
    h2: ({ children }: { children: any }) => <h2 className="text-xl font-semibold my-3">{children}</h2>,
    h3: ({ children }: { children: any }) => <h3 className="text-lg font-medium my-2">{children}</h3>,
  },
  list: {
    bullet: ({ children }: { children: any }) => <ul className="list-disc ml-6 my-2">{children}</ul>,
    number: ({ children }: { children: any }) => <ol className="list-decimal ml-6 my-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: { children: any }) => <li className="my-1">{children}</li>,
    number: ({ children }: { children: any }) => <li className="my-1">{children}</li>,
  },
}

export default function CoursePageContent({ course }: CoursePageContentProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
  const questionRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setActiveQuestion(hash);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveQuestion(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    questionRefs.current.forEach((element, questionId) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeQuestion) {
      course.topics.forEach((topic) => {
        topic.questions.forEach((qa) => {
          if (qa._id === activeQuestion) {
            setExpandedTopics((prev) => new Set(prev).add(topic._id));
          }
        });
      });
    }
  }, [activeQuestion, course.topics]);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        newSet.delete(topicId);
      } else {
        newSet.add(topicId);
      }
      return newSet;
    });
  };

  const handleQuestionClick = (questionId: string) => {
    setSidebarOpen(false);
    setActiveQuestion(questionId);
    setTimeout(() => {
      const element = document.getElementById(questionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <>
      {/* Mobile Toggle Button - Menu Icon */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-20 left-4 z-40 flex items-center justify-center w-9 h-9 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:bg-white hover:shadow-lg transition-all duration-200"
      >
        <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>

      {/* Mobile Topics Panel Toggle Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-40 flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        <span className="text-sm font-medium">Topics</span>
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Panel */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl">
          <div className="flex flex-col h-full">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-sm">Topics</h3>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {course.topics && course.topics.length > 0 ? (
                <ul className="space-y-1">
                  {course.topics.map((topic: any, idx: number) => (
                    <li key={topic._id}>
                      <button
                        onClick={() => toggleTopic(topic._id)}
                        className="flex w-full cursor-pointer items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition text-left"
                      >
                        <span className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded bg-gray-100 text-xs font-medium text-gray-500">
                            {idx + 1}
                          </span>
                          <span className="line-clamp-1">{topic.title}</span>
                        </span>
                        <svg
                          className={`h-4 w-4 text-gray-400 transition ${expandedTopics.has(topic._id) ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {expandedTopics.has(topic._id) && topic.questions && topic.questions.length > 0 && (
                        <ul className="ml-4 mt-1 space-y-1">
                          {topic.questions.map((qa: any) => {
                            const isActive = activeQuestion === qa._id;
                            return (
                              <li key={qa._id}>
                                <button
                                  onClick={() => handleQuestionClick(qa._id)}
                                  className={`block text-xs text-left py-2 px-2 line-clamp-2 w-full rounded-md transition ${
                                    isActive
                                      ? 'bg-blue-600 text-white font-medium'
                                      : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                                  }`}
                                >
                                  {qa.question}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-sm text-gray-500">
                  No topics available.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Layout Container */}
      <div className="flex h-[calc(100vh-12rem)] overflow-hidden">
        {/* Left Topics Sidebar - Scrollable */}
        <div className="hidden lg:block w-72 flex-shrink-0 overflow-hidden">
          <div className="h-full overflow-y-auto bg-white rounded-xl border border-gray-200">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 sticky top-0">
              <h3 className="font-bold text-sm">Topics</h3>
            </div>
            <div className="p-2">
              {course.topics && course.topics.length > 0 ? (
                <ul className="space-y-1">
                  {course.topics.map((topic: any, idx: number) => (
                    <li key={topic._id}>
                      <button
                        onClick={() => toggleTopic(topic._id)}
                        className="flex w-full cursor-pointer items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition text-left"
                      >
                        <span className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded bg-gray-100 text-xs font-medium text-gray-500">
                            {idx + 1}
                          </span>
                          <span className="line-clamp-1">{topic.title}</span>
                        </span>
                        <svg
                          className={`h-4 w-4 text-gray-400 transition ${expandedTopics.has(topic._id) ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {expandedTopics.has(topic._id) && topic.questions && topic.questions.length > 0 && (
                        <ul className="ml-4 mt-1 space-y-1">
                          {topic.questions.map((qa: any) => {
                            const isActive = activeQuestion === qa._id;
                            return (
                              <li key={qa._id}>
                                <button
                                  onClick={() => handleQuestionClick(qa._id)}
                                  className={`block text-xs text-left py-2 px-2 line-clamp-2 w-full rounded-md transition ${
                                    isActive
                                      ? 'bg-blue-600 text-white font-medium'
                                      : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                                  }`}
                                >
                                  {qa.question}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-sm text-gray-500">
                  No topics available.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Answer Content - Scrollable */}
        <div ref={contentRef} className="flex-1 w-full overflow-y-auto overflow-x-auto px-2">
          {course.thumbnail && (
            <div className="relative h-48 w-full rounded-xl  lg:mb-6  mb-3 bg-gray-100 rounded-t-2xl">
              <img
                src={course.thumbnail.asset.url}
                alt={course.title}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h1 className="font-bold text-2xl">{course.title}</h1>
                {course.category && (
                  <span className="inline-block mt-2 rounded-full bg-white/20 px-3 py-1 text-xs">
                    {course.category}
                  </span>
                )}
              </div>
            </div>
          )}

          {course.description && (
            <div className="lg:mb-8 mb-4 lg:p-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-700">
                {course.description[0]?.children?.[0]?.text || ''}
              </p>
            </div>
          )}

          {/* Q&A List */}
          {course.topics && course.topics.length > 0 ? (
            <div className="space-y-6">
              {course.topics.map((topic: any, topicIdx: number) => (
                <div key={topic._id} className="rounded-xl border border-gray-200 overflow-auto">
                  <div className="bg-gray-100 lg:px-6 px-4 lg:py-3 py-2 border-b border-gray-200">
                    <h3 className="font-bold text-gray-800">
                      {topicIdx + 1}. {topic.title}
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {topic.questions && topic.questions.map((qa: any) => {
                      const isActive = activeQuestion === qa._id;
                      return (
                        <div
                          key={qa._id}
                          id={qa._id}
                          ref={(el) => {
                            if (el) questionRefs.current.set(qa._id, el);
                          }}
                          className={`lg:p-6 p-4 transition ${
                            isActive ? 'bg-blue-50' : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex gap-4">
                            <div className="flex-1">
                              <p className="font-semibold text-gray-800 mb-3">
                                {qa.question}
                              </p>
                              <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                  
                                </div>
                                <div className="flex-1 text-gray-600 text-sm">
                                  {qa.answer && (
                                    <PortableText 
                                      value={Array.isArray(qa.answer) ? qa.answer : [qa.answer]} 
                                      components={portableTextComponents as any} 
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-500">No topics available for this note yet.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}