import { useState } from 'react';
import { BookOpen, Clock, BarChart3, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { topicContent } from '../data/mockData';
import Modal from '../components/ui/Modal';

function TopicCard({ topic, subjectColor, onStart }) {
  const statusStyles = {
    'Mastered': 'badge-success',
    'Almost Done': 'badge-primary',
    'In Progress': 'badge-warning',
    'Needs Revision': 'badge-danger',
  };

  return (
    <div className="card hover-lift group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-semibold text-surface-800 dark:text-surface-100">{topic.name}</h3>
        <span className={`badge text-[10px] ${statusStyles[topic.status] || 'badge-warning'}`}>
          {topic.status}
        </span>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-xs text-surface-500 dark:text-surface-400">
          <BarChart3 className="w-3 h-3" />
          <span>Mastery: {topic.mastery}%</span>
        </div>
        <div className="w-full bg-surface-100 dark:bg-surface-700 rounded-full h-1.5">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${topic.mastery}%`, backgroundColor: subjectColor }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-surface-400 dark:text-surface-500">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{topic.time}</span>
          <span>{topic.difficulty}</span>
        </div>
      </div>
      <button onClick={onStart} className="btn-primary w-full text-xs py-2 shadow-sm">
        Start Learning
      </button>
    </div>
  );
}

function TopicLearningView({ topic, subjectId }) {
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);
  const { updateTopicMastery, addToast } = useApp();

  const content = topicContent[topic.id] || topicContent.quadratic;
  const pq = content.practiceQuestion;

  const handleCheck = () => {
    if (selected === null) return;
    const isCorrect = selected === pq.correct;
    if (isCorrect) {
      updateTopicMastery(subjectId, topic.id, 5);
      addToast('Correct! Your mastery has increased.', 'success');
    } else {
      addToast('Not quite right. Review the explanation below.', 'info');
    }
    setAnswered(true);
  };

  return (
    <div className="space-y-6">
      {/* Concept */}
      <div>
        <h3 className="text-sm font-semibold text-surface-800 dark:text-surface-100 mb-2 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary-500" /> Concept
        </h3>
        <div className="p-4 bg-surface-50 dark:bg-surface-750 border border-surface-200/50 dark:border-surface-700 rounded-xl text-sm text-surface-700 dark:text-surface-200 whitespace-pre-line leading-relaxed">
          {content.concept}
        </div>
      </div>

      {/* Example */}
      <div>
        <h3 className="text-sm font-semibold text-surface-800 dark:text-surface-100 mb-2">Worked Example</h3>
        <div className="p-4 bg-primary-50/50 dark:bg-primary-950/40 border border-primary-100/50 dark:border-primary-900/40 rounded-xl text-sm text-surface-700 dark:text-surface-200 whitespace-pre-line leading-relaxed font-mono">
          {content.example}
        </div>
      </div>

      {/* Key Formulas */}
      <div>
        <h3 className="text-sm font-semibold text-surface-800 dark:text-surface-100 mb-2">Key Formulas</h3>
        <div className="space-y-1.5">
          {content.formulas.map((f, i) => (
            <div key={i} className="flex items-center gap-2 p-2.5 bg-accent-50 dark:bg-accent-950/40 border border-accent-100/50 dark:border-accent-900/40 rounded-lg">
              <CheckCircle className="w-3.5 h-3.5 text-accent-600 dark:text-accent-400 flex-shrink-0" />
              <span className="text-sm text-surface-700 dark:text-surface-200 font-mono">{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Practice Question */}
      <div className="border-t border-surface-200 dark:border-surface-700 pt-5">
        <h3 className="text-sm font-semibold text-surface-800 dark:text-surface-100 mb-3">Practice Question</h3>
        <p className="text-sm text-surface-700 dark:text-surface-200 mb-4">{pq.question}</p>
        <div className="space-y-2 mb-4">
          {pq.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => { if (!answered) setSelected(i); }}
              disabled={answered}
              className={`w-full text-left p-3 rounded-xl text-sm border transition-all duration-200
                ${answered && i === pq.correct
                  ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200'
                  : answered && i === selected && i !== pq.correct
                    ? 'bg-red-50 dark:bg-red-950/70 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200'
                    : selected === i
                      ? 'bg-primary-50 dark:bg-primary-950/70 border-primary-300 dark:border-primary-600 text-primary-800 dark:text-primary-200'
                      : 'bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-200 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50/30 dark:hover:bg-primary-950/30'
                }
              `}
            >
              <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          ))}
        </div>
        {!answered ? (
          <button onClick={handleCheck} disabled={selected === null} className="btn-primary w-full">
            Check Answer
          </button>
        ) : (
          <div className={`p-4 rounded-xl text-sm ${
            selected === pq.correct
              ? 'bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
              : 'bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200'
          }`}>
            <p className="font-semibold mb-1">
              {selected === pq.correct ? '✅ Correct!' : '❌ Not quite right'}
            </p>
            <p className="leading-relaxed">
              {selected === pq.correct ? pq.explanation : pq.misconception}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Learn() {
  const { subjects } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);

  const filteredSubjects = activeCategory === 'all'
    ? subjects
    : subjects.filter(s => s.id === activeCategory);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary-500" /> Learn
        </h1>
        <p className="text-surface-500 dark:text-surface-400 mt-1">Explore topics and build mastery at your own pace.</p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200
            ${activeCategory === 'all'
              ? 'bg-primary-600 text-white shadow-sm'
              : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-300 border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-750'
            }`}
        >
          All Subjects
        </button>
        {subjects.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveCategory(s.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200
              ${activeCategory === s.id
                ? 'text-white shadow-sm'
                : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-300 border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-750'
              }`}
            style={activeCategory === s.id ? { backgroundColor: s.color } : {}}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Topics Grid */}
      {filteredSubjects.map((subject) => (
        <div key={subject.id}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }} />
            <h2 className="text-base font-semibold text-surface-800 dark:text-surface-100">{subject.name}</h2>
            <span className="text-xs text-surface-400 dark:text-surface-500">({subject.mastery}% mastery)</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {subject.topics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                subjectColor={subject.color}
                onStart={() => { setSelectedTopic(topic); setSelectedSubjectId(subject.id); }}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Topic Learning Modal */}
      <Modal
        isOpen={!!selectedTopic}
        onClose={() => { setSelectedTopic(null); setSelectedSubjectId(null); }}
        title={selectedTopic?.name || 'Learn'}
        size="lg"
      >
        {selectedTopic && (
          <TopicLearningView
            topic={selectedTopic}
            subjectId={selectedSubjectId}
            onClose={() => { setSelectedTopic(null); setSelectedSubjectId(null); }}
          />
        )}
      </Modal>
    </div>
  );
}
