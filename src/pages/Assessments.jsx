import { useState, useEffect, useCallback } from 'react';
import {
  FileText, Clock, Play, ChevronLeft, ChevronRight, Trophy,
  Target, ArrowRight, CheckCircle, XCircle, Brain,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { quizzes, quizQuestions } from '../data/mockData';

function QuizCard({ quiz, onStart }) {
  return (
    <div className="card hover-lift">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-surface-800 dark:text-surface-100">{quiz.title}</h3>
          <p className="text-xs text-surface-400 dark:text-surface-500 mt-0.5">{quiz.subject}</p>
        </div>
        <span className={`badge text-[10px] ${
          quiz.difficulty === 'Hard' ? 'badge-danger' :
          quiz.difficulty === 'Medium' ? 'badge-warning' : 'badge-success'
        }`}>{quiz.difficulty}</span>
      </div>
      <div className="flex items-center gap-4 text-xs text-surface-500 dark:text-surface-400 mb-4">
        <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{quiz.questions} questions</span>
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{quiz.duration} min</span>
      </div>
      <button onClick={onStart} className="btn-primary w-full text-xs py-2 flex items-center justify-center gap-1.5 shadow-sm">
        <Play className="w-3.5 h-3.5" /> Start Quiz
      </button>
    </div>
  );
}

function QuizEngine({ quizId, onComplete, onBack }) {
  const questions = quizQuestions[quizId] || [];
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(questions.length * 90);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    const score = questions.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0);
    onComplete({ quizId, score, total: questions.length, answers });
  }, [answers, questions, quizId, onComplete]);

  useEffect(() => {
    if (submitted || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => {
      if (t <= 1) { clearInterval(timer); handleSubmit(); return 0; }
      return t - 1;
    }), 1000);
    return () => clearInterval(timer);
  }, [submitted, timeLeft, handleSubmit]);

  const handleSelect = (questionId, optionIdx) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (questions.length === 0) {
    return <div className="card text-center py-12 text-surface-400 dark:text-surface-500">No questions available for this quiz.</div>;
  }

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Quiz Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <button onClick={onBack} className="btn-ghost text-xs py-1.5 px-3">
            <ChevronLeft className="w-3.5 h-3.5 mr-1 inline" /> Exit
          </button>
          <div className={`flex items-center gap-1.5 text-sm font-mono font-semibold
            ${timeLeft < 60 ? 'text-red-600 dark:text-red-400' : 'text-surface-600 dark:text-surface-300'}`}>
            <Clock className="w-4 h-4" /> {formatTime(timeLeft)}
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-surface-400 dark:text-surface-500 mb-1.5">
          <span>Question {current + 1} of {questions.length}</span>
          <span>{Object.keys(answers).length} answered</span>
        </div>
        <div className="w-full bg-surface-100 dark:bg-surface-700 rounded-full h-1.5">
          <div className="h-full bg-primary-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="card">
        <p className="text-base font-semibold text-surface-800 dark:text-surface-100 mb-5 leading-relaxed">{q.question}</p>
        <div className="space-y-2.5">
          {q.options.map((opt, i) => {
            const isSelected = answers[q.id] === i;
            const isCorrect = submitted && i === q.correct;
            const isWrong = submitted && isSelected && i !== q.correct;
            return (
              <button
                key={i}
                onClick={() => handleSelect(q.id, i)}
                disabled={submitted}
                className={`w-full text-left p-4 rounded-xl text-sm border-2 transition-all duration-200
                  ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-400 dark:border-emerald-600 text-emerald-800 dark:text-emerald-200' :
                    isWrong ? 'bg-red-50 dark:bg-red-950/70 border-red-400 dark:border-red-600 text-red-800 dark:text-red-200' :
                    isSelected ? 'bg-primary-50 dark:bg-primary-950/70 border-primary-400 dark:border-primary-500 text-primary-800 dark:text-primary-200' :
                    'bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-200 hover:border-primary-300 dark:hover:border-primary-600'}
                `}
              >
                <span className="font-semibold mr-2">{String.fromCharCode(65 + i)}.</span>
                {opt}
                {isCorrect && <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 float-right mt-0.5" />}
                {isWrong && <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 float-right mt-0.5" />}
              </button>
            );
          })}
        </div>

        {/* Explanation (after submit) */}
        {submitted && (
          <div className="mt-4 p-3.5 bg-surface-50 dark:bg-surface-700/60 rounded-xl text-sm text-surface-600 dark:text-surface-300 border border-surface-200/50 dark:border-surface-700">
            <span className="font-semibold text-surface-800 dark:text-surface-100">Explanation:</span> {q.explanation}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
          className="btn-secondary text-xs py-2 disabled:opacity-40"
        >
          <ChevronLeft className="w-3.5 h-3.5 mr-1 inline" /> Previous
        </button>

        {/* Question dots */}
        <div className="hidden sm:flex gap-1.5">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-7 h-7 rounded-lg text-xs font-medium transition-all
                ${i === current ? 'bg-primary-600 text-white' :
                  answers[questions[i].id] !== undefined ? 'bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800/40' :
                  'bg-surface-100 dark:bg-surface-700 text-surface-500 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600'}
              `}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {current < questions.length - 1 ? (
          <button onClick={() => setCurrent(current + 1)} className="btn-primary text-xs py-2">
            Next <ChevronRight className="w-3.5 h-3.5 ml-1 inline" />
          </button>
        ) : !submitted ? (
          <button onClick={handleSubmit} className="btn-accent text-xs py-2">
            Submit Quiz <ArrowRight className="w-3.5 h-3.5 ml-1 inline" />
          </button>
        ) : null}
      </div>
    </div>
  );
}

function QuizResults({ result, questions, onBack }) {
  const accuracy = Math.round((result.score / result.total) * 100);
  const correct = questions.filter(q => result.answers[q.id] === q.correct);
  const incorrect = questions.filter(q => result.answers[q.id] !== undefined && result.answers[q.id] !== q.correct);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Score */}
      <div className="card text-center py-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-accent-500
          flex items-center justify-center mx-auto mb-4 shadow-md">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Quiz Completed!</h2>
        <div className="flex items-center justify-center gap-8 mt-4">
          <div>
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">{result.score}/{result.total}</p>
            <p className="text-xs text-surface-400 dark:text-surface-500 mt-0.5">Score</p>
          </div>
          <div className="w-px h-10 bg-surface-200 dark:bg-surface-700" />
          <div>
            <p className="text-3xl font-bold text-accent-600 dark:text-accent-400">{accuracy}%</p>
            <p className="text-xs text-surface-400 dark:text-surface-500 mt-0.5">Accuracy</p>
          </div>
        </div>
      </div>

      {/* AI Analysis */}
      <div className="card border-primary-100 dark:border-primary-900/50 bg-gradient-to-br from-primary-50/30 to-accent-50/20 dark:from-primary-950/40 dark:to-accent-950/30">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h3 className="font-semibold text-surface-900 dark:text-surface-100">AI Analysis</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-2">Strong Areas</p>
            <div className="space-y-1">
              {(correct.length > 0 ? correct.slice(0, 3) : [{ question: 'Keep practicing!' }]).map((q, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-surface-700 dark:text-surface-300">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span className="truncate">{q.question?.substring(0, 40)}...</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-2">Areas to Review</p>
            <div className="space-y-1">
              {(incorrect.length > 0 ? incorrect.slice(0, 3) : [{ question: 'Perfect score!' }]).map((q, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-surface-700 dark:text-surface-300">
                  <Target className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  <span className="truncate">{q.question?.substring(0, 40)}...</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {incorrect.length > 0 && (
          <p className="mt-4 text-sm text-surface-600 dark:text-surface-300 bg-white/60 dark:bg-surface-800/80 rounded-lg p-3 border border-surface-100 dark:border-surface-700">
            <span className="font-semibold text-surface-800 dark:text-surface-100">Recommended: </span>
            Review the topics you missed before attempting the next assessment.
          </p>
        )}
      </div>

      <button onClick={onBack} className="btn-primary w-full">
        Back to Assessments
      </button>
    </div>
  );
}

export default function Assessments() {
  const { quizResults, addQuizResult } = useApp();
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizResult, setQuizResult] = useState(null);

  const handleComplete = (result) => {
    setQuizResult(result);
    addQuizResult(result);
  };

  const avgScore = quizResults.length > 0
    ? Math.round(quizResults.reduce((sum, r) => sum + (r.score / r.total) * 100, 0) / quizResults.length)
    : 0;

  if (quizResult) {
    return (
      <QuizResults
        result={quizResult}
        questions={quizQuestions[quizResult.quizId] || []}
        onBack={() => { setQuizResult(null); setActiveQuiz(null); }}
      />
    );
  }

  if (activeQuiz) {
    return (
      <QuizEngine
        quizId={activeQuiz}
        onComplete={handleComplete}
        onBack={() => setActiveQuiz(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100 flex items-center gap-2">
          <FileText className="w-6 h-6 text-primary-500" /> Assessments
        </h1>
        <p className="text-surface-500 dark:text-surface-400 mt-1">Test your knowledge with AI-curated quizzes.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card text-center">
          <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{quizResults.length}</p>
          <p className="text-xs text-surface-400 dark:text-surface-500 mt-0.5">Tests Taken</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-accent-600 dark:text-accent-400">{avgScore}%</p>
          <p className="text-xs text-surface-400 dark:text-surface-500 mt-0.5">Avg Score</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{quizzes.length}</p>
          <p className="text-xs text-surface-400 dark:text-surface-500 mt-0.5">Available</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {quizResults.filter(r => (r.score / r.total) >= 0.8).length}
          </p>
          <p className="text-xs text-surface-400 dark:text-surface-500 mt-0.5">Passed (80%+)</p>
        </div>
      </div>

      {/* Available Quizzes */}
      <div>
        <h2 className="section-title mb-3">Available Quizzes</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} onStart={() => setActiveQuiz(quiz.id)} />
          ))}
        </div>
      </div>

      {/* Recent Results */}
      {quizResults.length > 0 && (
        <div>
          <h2 className="section-title mb-3">Recent Results</h2>
          <div className="space-y-2">
            {quizResults.slice(-5).reverse().map((result, i) => (
              <div key={i} className="card flex items-center justify-between !p-3.5">
                <div>
                  <p className="text-sm font-medium text-surface-800 dark:text-surface-100">
                    {quizzes.find(q => q.id === result.quizId)?.title || result.quizId}
                  </p>
                  <p className="text-xs text-surface-400 dark:text-surface-500">
                    {new Date(result.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary-600 dark:text-primary-400">{result.score}/{result.total}</p>
                  <p className="text-xs text-surface-400 dark:text-surface-500">{Math.round((result.score / result.total) * 100)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
