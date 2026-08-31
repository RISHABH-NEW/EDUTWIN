import { useState } from 'react';
import { Compass, CheckCircle2, Circle, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { careerPaths } from '../data/mockData';
import Modal from '../components/ui/Modal';

export default function CareerPath() {
  const [selectedCareer, setSelectedCareer] = useState(careerPaths[0]);
  const [selectedStep, setSelectedStep] = useState(null);

  const getStepIcon = (status) => {
    if (status === 'completed') {
      return <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />;
    }
    if (status === 'in-progress') {
      return <Sparkles className="w-5 h-5 text-primary-500 dark:text-primary-400 flex-shrink-0 animate-pulse" />;
    }
    return <Circle className="w-5 h-5 text-surface-300 dark:text-surface-600 flex-shrink-0" />;
  };

  const getStatusBadge = (status) => {
    if (status === 'completed') return 'badge-success';
    if (status === 'in-progress') return 'badge-primary';
    return 'badge-warning';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Compass className="w-6 h-6 text-primary-500" />
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Your Career Path</h1>
        </div>
        <p className="text-surface-500 dark:text-surface-400">
          AI-curated career trajectory based on your strengths, interests, and mastery profile.
        </p>
      </div>

      {/* Career Selector Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {careerPaths.map((career) => (
          <button
            key={career.id}
            onClick={() => setSelectedCareer(career)}
            className={`px-4 py-3 rounded-2xl text-left border transition-all duration-200 flex-shrink-0 min-w-[200px]
              ${selectedCareer.id === career.id
                ? 'bg-primary-50 dark:bg-primary-950/70 border-primary-300 dark:border-primary-700 shadow-sm'
                : 'bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-750'
              }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-bold text-surface-900 dark:text-surface-100">{career.title}</span>
              <span className="badge-primary text-xs font-bold">{career.match}% Match</span>
            </div>
            <p className="text-xs text-surface-400 dark:text-surface-500 line-clamp-1">{career.description}</p>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left: Skill Requirements */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title">Required Skills</h2>
              <span className="text-xs text-surface-400 dark:text-surface-500">Current vs Required</span>
            </div>
            <div className="space-y-4">
              {selectedCareer.skills.map((skill) => (
                <div key={skill.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-surface-700 dark:text-surface-300">{skill.name}</span>
                    <span className="text-primary-600 dark:text-primary-400 font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-surface-100 dark:bg-surface-700 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        skill.level >= 80 ? 'bg-emerald-500' : skill.level >= 60 ? 'bg-primary-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Career Advice */}
          <div className="card border-primary-100 dark:border-primary-900/50 bg-gradient-to-br from-primary-50/40 to-accent-50/20 dark:from-primary-950/40 dark:to-accent-950/30">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <h3 className="text-sm font-semibold text-surface-900 dark:text-surface-100">AI Recommendation</h3>
            </div>
            <p className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed mb-3">
              You are on track for <strong>{selectedCareer.title}</strong> with an 87% match. Your core strength in programming and problem solving provides a strong foundation. Prioritize system design and database indexing in your next milestones.
            </p>
            <div className="p-3 bg-white/70 dark:bg-surface-800/80 rounded-xl border border-primary-100 dark:border-primary-800/40 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary-500 dark:text-primary-400 flex-shrink-0" />
              <p className="text-xs text-surface-700 dark:text-surface-300 font-medium">Next critical gap: System Design (+18% needed)</p>
            </div>
          </div>
        </div>

        {/* Right: Interactive Roadmap */}
        <div className="lg:col-span-3 card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="section-title">Milestone Roadmap</h2>
              <p className="section-subtitle">Click on any stage to see detailed modules and practice tasks</p>
            </div>
            <span className="badge-primary text-xs">Interactive</span>
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-[19px] before:top-3 before:bottom-3 before:w-[2px] before:bg-surface-200 dark:before:bg-surface-700">
            {selectedCareer.roadmap.map((stage, idx) => (
              <div
                key={stage.step}
                onClick={() => setSelectedStep(stage)}
                className="relative flex items-center justify-between p-3.5 bg-surface-50 dark:bg-surface-750 hover:bg-primary-50/50 dark:hover:bg-primary-950/50
                  border border-surface-200/80 dark:border-surface-700 rounded-2xl cursor-pointer transition-all duration-200 group hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white dark:bg-surface-800 p-1 rounded-full border border-surface-200 dark:border-surface-700 shadow-sm">
                    {getStepIcon(stage.status)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-surface-800 dark:text-surface-100 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                      {idx + 1}. {stage.step}
                    </p>
                    <p className="text-xs text-surface-400 dark:text-surface-500 capitalize">{stage.status.replace('-', ' ')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`badge text-[10px] capitalize ${getStatusBadge(stage.status)}`}>
                    {stage.status}
                  </span>
                  <ArrowRight className="w-4 h-4 text-surface-400 dark:text-surface-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stage Detail Modal */}
      <Modal
        isOpen={!!selectedStep}
        onClose={() => setSelectedStep(null)}
        title={selectedStep ? `Milestone: ${selectedStep.step}` : ''}
        size="md"
      >
        {selectedStep && (
          <div className="space-y-4">
            <div className="p-4 bg-surface-50 dark:bg-surface-750 border border-surface-200/50 dark:border-surface-700 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider">Status</span>
                <span className={`badge text-xs capitalize ${getStatusBadge(selectedStep.status)}`}>
                  {selectedStep.status}
                </span>
              </div>
              <p className="text-sm text-surface-700 dark:text-surface-200 leading-relaxed">
                This stage covers the fundamental and advanced concepts required for mastering {selectedStep.step} in professional industry environments.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-surface-800 dark:text-surface-100 mb-2">Key Learning Objectives</h4>
              <ul className="space-y-2 text-xs text-surface-600 dark:text-surface-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Comprehensive theory & architectural patterns</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Hands-on coding assessments with time complexity validation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Production-ready capstone project implementation</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setSelectedStep(null)}
              className="btn-primary w-full text-xs py-2.5 shadow-sm"
            >
              Continue Learning Path
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
