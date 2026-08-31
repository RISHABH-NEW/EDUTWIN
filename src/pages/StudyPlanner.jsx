import { useState } from 'react';
import {
  Calendar, Plus, Trash2, Check, X, Clock,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const subjectOptions = ['Mathematics', 'Computer Science', 'Physics', 'English', 'Programming', 'Revision'];
const difficultyOptions = ['Easy', 'Medium', 'Hard'];

const dayColors = {
  Monday: 'border-l-primary-500',
  Tuesday: 'border-l-accent-500',
  Wednesday: 'border-l-amber-500',
  Thursday: 'border-l-pink-500',
  Friday: 'border-l-violet-500',
  Saturday: 'border-l-emerald-500',
  Sunday: 'border-l-orange-500',
};

export default function StudyPlanner() {
  const { studyPlan, toggleStudyTask, addStudyTask, deleteStudyTask } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({
    day: 'Monday', subject: 'Mathematics', topic: '', time: '2 hrs', difficulty: 'Medium',
  });

  const handleAdd = () => {
    if (!newTask.topic.trim()) return;
    addStudyTask({ ...newTask, completed: false });
    setNewTask({ day: 'Monday', subject: 'Mathematics', topic: '', time: '2 hrs', difficulty: 'Medium' });
    setShowAddForm(false);
  };

  const completedCount = studyPlan.filter(t => t.completed).length;
  const totalTasks = studyPlan.length;
  const completionRate = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary-500" /> Study Planner
          </h1>
          <p className="text-surface-500 dark:text-surface-400 mt-1">Organize your week for maximum learning efficiency.</p>
        </div>
        <button onClick={() => setShowAddForm(true)} className="btn-primary text-sm flex items-center gap-1.5 shadow-sm">
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </div>

      {/* Progress */}
      <div className="card flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Weekly Progress</span>
            <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{completedCount}/{totalTasks}</span>
          </div>
          <div className="w-full bg-surface-100 dark:bg-surface-700 rounded-full h-2">
            <div className="h-full bg-primary-500 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }} />
          </div>
        </div>
        <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{completionRate}%</p>
      </div>

      {/* Add Task Form */}
      {showAddForm && (
        <div className="card border-primary-200 dark:border-primary-800/60 bg-primary-50/20 dark:bg-primary-950/30 animate-scale-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-surface-800 dark:text-surface-100">Add New Task</h3>
            <button onClick={() => setShowAddForm(false)} className="p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-400 dark:text-surface-500">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <select
              value={newTask.day}
              onChange={(e) => setNewTask(p => ({ ...p, day: e.target.value }))}
              className="input-field text-sm"
            >
              {days.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select
              value={newTask.subject}
              onChange={(e) => setNewTask(p => ({ ...p, subject: e.target.value }))}
              className="input-field text-sm"
            >
              {subjectOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <input
              type="text"
              placeholder="Topic name"
              value={newTask.topic}
              onChange={(e) => setNewTask(p => ({ ...p, topic: e.target.value }))}
              className="input-field text-sm"
            />
            <input
              type="text"
              placeholder="e.g., 2 hrs"
              value={newTask.time}
              onChange={(e) => setNewTask(p => ({ ...p, time: e.target.value }))}
              className="input-field text-sm"
            />
            <select
              value={newTask.difficulty}
              onChange={(e) => setNewTask(p => ({ ...p, difficulty: e.target.value }))}
              className="input-field text-sm"
            >
              {difficultyOptions.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <button onClick={handleAdd} className="btn-primary text-sm mt-3 w-full sm:w-auto shadow-sm">
            Add to Planner
          </button>
        </div>
      )}

      {/* Weekly Plan */}
      <div className="space-y-3">
        {days.map((day) => {
          const dayTasks = studyPlan.filter(t => t.day === day);
          if (dayTasks.length === 0) return null;

          return (
            <div key={day}>
              <h3 className="text-sm font-semibold text-surface-600 dark:text-surface-300 mb-2">{day}</h3>
              <div className="space-y-2">
                {dayTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`card !p-3.5 flex items-center gap-3 border-l-4 transition-all duration-200
                      ${dayColors[day] || 'border-l-surface-300 dark:border-l-surface-600'}
                      ${task.completed ? 'opacity-60' : ''}
                    `}
                  >
                    <button
                      onClick={() => toggleStudyTask(task.id)}
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all
                        ${task.completed
                          ? 'bg-emerald-500 border-emerald-500'
                          : 'border-surface-300 dark:border-surface-600 hover:border-primary-400'
                        }`}
                      aria-label="Toggle task completion"
                    >
                      {task.completed && <Check className="w-3 h-3 text-white" />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${task.completed ? 'line-through text-surface-400 dark:text-surface-500' : 'text-surface-800 dark:text-surface-100'}`}>
                        {task.topic}
                      </p>
                      <div className="flex items-center gap-3 mt-0.5 text-xs text-surface-400 dark:text-surface-500">
                        <span>{task.subject}</span>
                        <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{task.time}</span>
                        <span className={`badge text-[10px] ${
                          task.difficulty === 'Hard' ? 'badge-danger' :
                          task.difficulty === 'Medium' ? 'badge-warning' : 'badge-success'
                        }`}>{task.difficulty}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteStudyTask(task.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 text-surface-300 dark:text-surface-600 hover:text-red-500 dark:hover:text-red-400 transition-colors flex-shrink-0"
                      aria-label="Delete task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {studyPlan.length === 0 && (
          <div className="card text-center py-12">
            <Calendar className="w-10 h-10 text-surface-300 dark:text-surface-600 mx-auto mb-3" />
            <p className="text-surface-500 dark:text-surface-400 text-sm">No tasks yet. Add your first study task!</p>
          </div>
        )}
      </div>
    </div>
  );
}
