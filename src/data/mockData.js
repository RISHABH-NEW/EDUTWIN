// Centralized mock data for EduTwin
// All pages reference this data for consistency

export const studentProfile = {
  name: 'Priyanshu Singh',
  age: 20,
  course: 'Computer Science',
  class: 'B.Tech 3rd Year',
  email: 'priyanshu@edutwin.ai',
  avatar: null,
  learningGoals: 'Master DSA and crack product-based company interviews',
  preferredLanguage: 'English',
  difficulty: 'Adaptive',
  notifications: {
    studyReminders: true,
    quizReminders: true,
    progressUpdates: true,
  },
};

export const overviewStats = {
  overallMastery: 78,
  currentStreak: 12,
  topicsMastered: 24,
  learningHours: 38.5,
};

export const subjects = [
  {
    id: 'math',
    name: 'Mathematics',
    mastery: 72,
    color: '#6366F1',
    icon: 'Calculator',
    topics: [
      { id: 'algebra', name: 'Algebra', mastery: 65, difficulty: 'Medium', time: '2 hrs', status: 'In Progress' },
      { id: 'quadratic', name: 'Quadratic Equations', mastery: 48, difficulty: 'Hard', time: '3 hrs', status: 'Needs Revision' },
      { id: 'calculus', name: 'Calculus', mastery: 55, difficulty: 'Hard', time: '4 hrs', status: 'In Progress' },
      { id: 'probability', name: 'Probability', mastery: 82, difficulty: 'Medium', time: '2 hrs', status: 'Mastered' },
      { id: 'matrices', name: 'Matrices', mastery: 78, difficulty: 'Medium', time: '2.5 hrs', status: 'Almost Done' },
      { id: 'trigonometry', name: 'Trigonometry', mastery: 88, difficulty: 'Easy', time: '1.5 hrs', status: 'Mastered' },
    ],
  },
  {
    id: 'physics',
    name: 'Physics',
    mastery: 81,
    color: '#14B8A6',
    icon: 'Atom',
    topics: [
      { id: 'mechanics', name: 'Mechanics', mastery: 85, difficulty: 'Medium', time: '3 hrs', status: 'Mastered' },
      { id: 'motion', name: 'Laws of Motion', mastery: 78, difficulty: 'Medium', time: '2 hrs', status: 'Almost Done' },
      { id: 'thermodynamics', name: 'Thermodynamics', mastery: 72, difficulty: 'Hard', time: '3.5 hrs', status: 'In Progress' },
      { id: 'waves', name: 'Waves & Optics', mastery: 88, difficulty: 'Easy', time: '2 hrs', status: 'Mastered' },
      { id: 'electrostatics', name: 'Electrostatics', mastery: 76, difficulty: 'Hard', time: '3 hrs', status: 'In Progress' },
    ],
  },
  {
    id: 'cs',
    name: 'Computer Science',
    mastery: 89,
    color: '#F59E0B',
    icon: 'Code2',
    topics: [
      { id: 'arrays', name: 'Arrays & Strings', mastery: 92, difficulty: 'Easy', time: '1.5 hrs', status: 'Mastered' },
      { id: 'binary-trees', name: 'Binary Trees', mastery: 75, difficulty: 'Hard', time: '4 hrs', status: 'In Progress' },
      { id: 'sorting', name: 'Sorting Algorithms', mastery: 95, difficulty: 'Medium', time: '2 hrs', status: 'Mastered' },
      { id: 'recursion', name: 'Recursion', mastery: 68, difficulty: 'Hard', time: '3 hrs', status: 'Needs Revision' },
      { id: 'graphs', name: 'Graphs', mastery: 60, difficulty: 'Hard', time: '5 hrs', status: 'In Progress' },
      { id: 'dp', name: 'Dynamic Programming', mastery: 55, difficulty: 'Hard', time: '5 hrs', status: 'In Progress' },
      { id: 'oop', name: 'OOP Concepts', mastery: 90, difficulty: 'Easy', time: '1.5 hrs', status: 'Mastered' },
    ],
  },
  {
    id: 'english',
    name: 'English',
    mastery: 76,
    color: '#EC4899',
    icon: 'BookOpen',
    topics: [
      { id: 'grammar', name: 'Grammar', mastery: 80, difficulty: 'Easy', time: '1 hr', status: 'Almost Done' },
      { id: 'vocabulary', name: 'Vocabulary', mastery: 72, difficulty: 'Medium', time: '1.5 hrs', status: 'In Progress' },
      { id: 'comprehension', name: 'Reading Comprehension', mastery: 78, difficulty: 'Medium', time: '2 hrs', status: 'In Progress' },
      { id: 'writing', name: 'Technical Writing', mastery: 70, difficulty: 'Hard', time: '3 hrs', status: 'In Progress' },
    ],
  },
  {
    id: 'programming',
    name: 'Programming',
    mastery: 85,
    color: '#8B5CF6',
    icon: 'Terminal',
    topics: [
      { id: 'python', name: 'Python', mastery: 90, difficulty: 'Easy', time: '2 hrs', status: 'Mastered' },
      { id: 'javascript', name: 'JavaScript', mastery: 82, difficulty: 'Medium', time: '3 hrs', status: 'Almost Done' },
      { id: 'cpp', name: 'C++', mastery: 78, difficulty: 'Hard', time: '4 hrs', status: 'In Progress' },
      { id: 'sql', name: 'SQL', mastery: 85, difficulty: 'Medium', time: '2 hrs', status: 'Mastered' },
    ],
  },
  {
    id: 'gk',
    name: 'General Knowledge',
    mastery: 70,
    color: '#06B6D4',
    icon: 'Globe',
    topics: [
      { id: 'current-affairs', name: 'Current Affairs', mastery: 65, difficulty: 'Medium', time: '1 hr', status: 'In Progress' },
      { id: 'history', name: 'Modern History', mastery: 72, difficulty: 'Medium', time: '2 hrs', status: 'In Progress' },
      { id: 'geography', name: 'Geography', mastery: 75, difficulty: 'Easy', time: '1.5 hrs', status: 'Almost Done' },
    ],
  },
];

export const recommendations = [
  {
    id: 1,
    title: 'Revise Quadratic Equations',
    subject: 'Mathematics',
    reason: 'Mastery at 48% — needs immediate attention',
    type: 'revision',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Practice Binary Trees',
    subject: 'Computer Science',
    reason: 'Strengthen tree traversal skills',
    type: 'practice',
    priority: 'medium',
  },
  {
    id: 3,
    title: 'Laws of Motion Quiz',
    subject: 'Physics',
    reason: 'Test your understanding before moving ahead',
    type: 'quiz',
    priority: 'medium',
  },
  {
    id: 4,
    title: "Complete Today's Revision",
    subject: 'Mixed',
    reason: 'AI-curated revision of weak topics',
    type: 'revision',
    priority: 'low',
  },
];

export const aiInsight = {
  text: 'Your performance in Mathematics has improved by 12% over the last three assessments. Your main remaining gap is Quadratic Equations — focused practice here could bring your overall Math mastery above 80%.',
  action1: 'Review Topic',
  action2: 'Practice Now',
};

export const performanceHistory = [
  { week: 'Week 1', math: 58, physics: 65, cs: 72, english: 60 },
  { week: 'Week 2', math: 60, physics: 68, cs: 75, english: 63 },
  { week: 'Week 3', math: 62, physics: 72, cs: 78, english: 66 },
  { week: 'Week 4', math: 65, physics: 74, cs: 80, english: 68 },
  { week: 'Week 5', math: 64, physics: 76, cs: 82, english: 70 },
  { week: 'Week 6', math: 67, physics: 78, cs: 84, english: 72 },
  { week: 'Week 7', math: 68, physics: 79, cs: 86, english: 73 },
  { week: 'Week 8', math: 70, physics: 80, cs: 87, english: 75 },
  { week: 'Week 9', math: 72, physics: 81, cs: 89, english: 76 },
];

export const weeklyActivity = [
  { day: 'Mon', hours: 3.5 },
  { day: 'Tue', hours: 2.0 },
  { day: 'Wed', hours: 4.0 },
  { day: 'Thu', hours: 1.5 },
  { day: 'Fri', hours: 3.0 },
  { day: 'Sat', hours: 5.0 },
  { day: 'Sun', hours: 2.5 },
];

export const quizzes = [
  {
    id: 'dsa-fundamentals',
    title: 'DSA Fundamentals',
    subject: 'Computer Science',
    questions: 10,
    duration: 15,
    difficulty: 'Medium',
    status: 'available',
  },
  {
    id: 'math-calculus',
    title: 'Calculus Basics',
    subject: 'Mathematics',
    questions: 8,
    duration: 12,
    difficulty: 'Hard',
    status: 'available',
  },
  {
    id: 'physics-motion',
    title: 'Laws of Motion',
    subject: 'Physics',
    questions: 10,
    duration: 15,
    difficulty: 'Medium',
    status: 'available',
  },
];

export const quizQuestions = {
  'dsa-fundamentals': [
    {
      id: 1,
      question: 'What is the time complexity of binary search?',
      options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
      correct: 1,
      explanation: 'Binary search divides the search space in half at each step, resulting in O(log n) time complexity.',
    },
    {
      id: 2,
      question: 'Which data structure uses LIFO (Last In, First Out)?',
      options: ['Queue', 'Stack', 'Array', 'Linked List'],
      correct: 1,
      explanation: 'A Stack follows the LIFO principle where the last element added is the first to be removed.',
    },
    {
      id: 3,
      question: 'What is the worst-case time complexity of QuickSort?',
      options: ['O(n log n)', 'O(n)', 'O(n²)', 'O(log n)'],
      correct: 2,
      explanation: 'QuickSort\'s worst case occurs when the pivot is always the smallest or largest element, leading to O(n²).',
    },
    {
      id: 4,
      question: 'Which traversal of a BST gives elements in sorted order?',
      options: ['Preorder', 'Inorder', 'Postorder', 'Level Order'],
      correct: 1,
      explanation: 'Inorder traversal (Left → Root → Right) of a BST always yields elements in ascending sorted order.',
    },
    {
      id: 5,
      question: 'What is a hash collision?',
      options: [
        'When two keys have the same hash value',
        'When a hash table is full',
        'When a key cannot be hashed',
        'When the hash function fails',
      ],
      correct: 0,
      explanation: 'A hash collision occurs when two different keys produce the same hash value, requiring collision resolution.',
    },
    {
      id: 6,
      question: 'What is the space complexity of Merge Sort?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correct: 2,
      explanation: 'Merge Sort requires O(n) additional space for the temporary arrays used during merging.',
    },
    {
      id: 7,
      question: 'Which data structure is used for BFS traversal?',
      options: ['Stack', 'Queue', 'Priority Queue', 'Deque'],
      correct: 1,
      explanation: 'BFS uses a Queue to process nodes level by level in FIFO order.',
    },
    {
      id: 8,
      question: 'What is the maximum number of nodes in a binary tree of height h?',
      options: ['2h', '2^h - 1', '2^(h+1) - 1', 'h²'],
      correct: 2,
      explanation: 'A complete binary tree of height h can have at most 2^(h+1) - 1 nodes.',
    },
    {
      id: 9,
      question: 'Which algorithm is used to find the shortest path in a weighted graph?',
      options: ['DFS', 'BFS', 'Dijkstra\'s Algorithm', 'Kruskal\'s Algorithm'],
      correct: 2,
      explanation: 'Dijkstra\'s algorithm finds the shortest path from a source to all other vertices in a weighted graph with non-negative weights.',
    },
    {
      id: 10,
      question: 'What is the time complexity of inserting an element at the beginning of a linked list?',
      options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
      correct: 2,
      explanation: 'Inserting at the beginning of a linked list is O(1) as we only need to update the head pointer.',
    },
  ],
  'math-calculus': [
    {
      id: 1,
      question: 'What is the derivative of x²?',
      options: ['x', '2x', '2x²', 'x/2'],
      correct: 1,
      explanation: 'Using the power rule: d/dx(xⁿ) = nxⁿ⁻¹, so d/dx(x²) = 2x.',
    },
    {
      id: 2,
      question: 'What is ∫ 2x dx?',
      options: ['x²', 'x² + C', '2x²', '2x² + C'],
      correct: 1,
      explanation: 'The integral of 2x is x² + C (constant of integration).',
    },
    {
      id: 3,
      question: 'What is the derivative of sin(x)?',
      options: ['cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'],
      correct: 0,
      explanation: 'The derivative of sin(x) is cos(x).',
    },
    {
      id: 4,
      question: 'The limit of (sin x)/x as x → 0 is:',
      options: ['0', '1', '∞', 'Does not exist'],
      correct: 1,
      explanation: 'This is a fundamental limit in calculus. lim(x→0) sin(x)/x = 1.',
    },
    {
      id: 5,
      question: 'What is the derivative of eˣ?',
      options: ['xeˣ⁻¹', 'eˣ', 'eˣ⁺¹', 'ln(x)'],
      correct: 1,
      explanation: 'The exponential function eˣ is its own derivative: d/dx(eˣ) = eˣ.',
    },
    {
      id: 6,
      question: 'What does the second derivative test determine?',
      options: ['Slope', 'Concavity', 'Area under curve', 'Rate of change'],
      correct: 1,
      explanation: 'The second derivative determines the concavity of a function — whether it curves up or down.',
    },
    {
      id: 7,
      question: '∫₀¹ x² dx equals:',
      options: ['1/2', '1/3', '1/4', '1'],
      correct: 1,
      explanation: '∫₀¹ x² dx = [x³/3]₀¹ = 1/3 - 0 = 1/3.',
    },
    {
      id: 8,
      question: 'What is the chain rule used for?',
      options: [
        'Adding derivatives',
        'Differentiating composite functions',
        'Integrating products',
        'Finding limits',
      ],
      correct: 1,
      explanation: 'The chain rule is used to differentiate composite functions: d/dx[f(g(x))] = f\'(g(x))·g\'(x).',
    },
  ],
  'physics-motion': [
    {
      id: 1,
      question: "Newton's First Law is also known as:",
      options: ['Law of Acceleration', 'Law of Inertia', 'Law of Action-Reaction', 'Law of Gravity'],
      correct: 1,
      explanation: "Newton's First Law states that an object remains at rest or in uniform motion unless acted upon by a force — the Law of Inertia.",
    },
    {
      id: 2,
      question: 'F = ma represents which of Newton\'s laws?',
      options: ['First Law', 'Second Law', 'Third Law', 'Law of Gravitation'],
      correct: 1,
      explanation: "Newton's Second Law states that Force equals mass times acceleration (F = ma).",
    },
    {
      id: 3,
      question: 'What is the SI unit of force?',
      options: ['Joule', 'Watt', 'Newton', 'Pascal'],
      correct: 2,
      explanation: 'The SI unit of force is the Newton (N), which equals kg·m/s².',
    },
    {
      id: 4,
      question: 'A 5 kg object accelerates at 3 m/s². What is the net force?',
      options: ['8 N', '15 N', '1.67 N', '2 N'],
      correct: 1,
      explanation: 'Using F = ma: F = 5 kg × 3 m/s² = 15 N.',
    },
    {
      id: 5,
      question: 'In free fall, what is the acceleration due to gravity (approx)?',
      options: ['8.9 m/s²', '9.8 m/s²', '10.8 m/s²', '11.2 m/s²'],
      correct: 1,
      explanation: 'The standard acceleration due to gravity on Earth is approximately 9.8 m/s².',
    },
    {
      id: 6,
      question: 'What happens to friction when an object moves on a surface?',
      options: [
        'It helps the motion',
        'It opposes the motion',
        'It has no effect',
        'It increases speed',
      ],
      correct: 1,
      explanation: 'Friction always opposes the relative motion of an object on a surface.',
    },
    {
      id: 7,
      question: 'The momentum of an object is:',
      options: ['Force × time', 'Mass × velocity', 'Mass × acceleration', 'Force × distance'],
      correct: 1,
      explanation: 'Momentum (p) is defined as mass × velocity (p = mv).',
    },
    {
      id: 8,
      question: "Newton's Third Law states:",
      options: [
        'Force equals mass times acceleration',
        'Every action has an equal and opposite reaction',
        'An object at rest stays at rest',
        'Force is proportional to distance',
      ],
      correct: 1,
      explanation: "Newton's Third Law: For every action, there is an equal and opposite reaction.",
    },
    {
      id: 9,
      question: 'What type of motion does a pendulum exhibit?',
      options: ['Linear', 'Circular', 'Oscillatory', 'Random'],
      correct: 2,
      explanation: 'A pendulum exhibits oscillatory (periodic) motion, swinging back and forth around an equilibrium position.',
    },
    {
      id: 10,
      question: 'The work done when force is perpendicular to displacement is:',
      options: ['Maximum', 'Minimum', 'Zero', 'Infinite'],
      correct: 2,
      explanation: 'Work = F·d·cos(θ). When θ = 90°, cos(90°) = 0, so work done is zero.',
    },
  ],
};

export const studyPlanDefault = [
  { id: 1, day: 'Monday', subject: 'Mathematics', topic: 'Quadratic Equations', time: '2 hrs', difficulty: 'Hard', completed: false },
  { id: 2, day: 'Tuesday', subject: 'Computer Science', topic: 'Binary Trees', time: '2.5 hrs', difficulty: 'Hard', completed: false },
  { id: 3, day: 'Wednesday', subject: 'Physics', topic: 'Laws of Motion', time: '2 hrs', difficulty: 'Medium', completed: true },
  { id: 4, day: 'Thursday', subject: 'English', topic: 'Technical Writing', time: '1.5 hrs', difficulty: 'Medium', completed: false },
  { id: 5, day: 'Friday', subject: 'Computer Science', topic: 'Recursion', time: '2 hrs', difficulty: 'Hard', completed: false },
  { id: 6, day: 'Saturday', subject: 'Mathematics', topic: 'Calculus', time: '3 hrs', difficulty: 'Hard', completed: false },
  { id: 7, day: 'Sunday', subject: 'Revision', topic: 'Weekly Review', time: '2 hrs', difficulty: 'Medium', completed: false },
];

export const achievementsList = [
  { id: 'streak-7', title: '7-Day Learning Streak', icon: '🏆', description: 'Study for 7 consecutive days', unlocked: true, date: '2026-08-12' },
  { id: 'quiz-10', title: '10 Quizzes Completed', icon: '🎯', description: 'Complete 10 assessment quizzes', unlocked: true, date: '2026-08-15' },
  { id: 'first-mastery', title: 'First Topic Mastered', icon: '🚀', description: 'Achieve 90%+ mastery in any topic', unlocked: true, date: '2026-08-05' },
  { id: 'questions-50', title: '50 Questions Solved', icon: '💡', description: 'Answer 50 practice questions', unlocked: true, date: '2026-08-18' },
  { id: 'streak-30', title: '30-Day Learner', icon: '🔥', description: 'Study for 30 consecutive days', unlocked: false, date: null },
  { id: 'perfect-quiz', title: 'Perfect Score', icon: '⭐', description: 'Get 100% on any quiz', unlocked: false, date: null },
  { id: 'all-subjects', title: 'Well Rounded', icon: '🌟', description: 'Score 70%+ in all subjects', unlocked: true, date: '2026-08-16' },
  { id: 'speed-demon', title: 'Speed Demon', icon: '⚡', description: 'Complete a quiz in under 5 minutes', unlocked: false, date: null },
  { id: 'night-owl', title: 'Night Owl', icon: '🦉', description: 'Study after 10 PM for 5 days', unlocked: true, date: '2026-08-10' },
  { id: 'early-bird', title: 'Early Bird', icon: '🌅', description: 'Study before 7 AM for 5 days', unlocked: false, date: null },
  { id: 'helper', title: 'Knowledge Seeker', icon: '📚', description: 'Use AI Tutor 20 times', unlocked: false, date: null },
  { id: 'marathon', title: 'Study Marathon', icon: '🏃', description: 'Study for 5+ hours in a single day', unlocked: true, date: '2026-08-14' },
];

export const notifications = [
  { id: 1, text: 'Your Mathematics mastery increased to 72%.', time: '2 hours ago', read: false, type: 'success' },
  { id: 2, text: 'New personalized quiz available: DSA Fundamentals.', time: '3 hours ago', read: false, type: 'info' },
  { id: 3, text: 'Your 12-day learning streak is active! 🔥', time: '5 hours ago', read: true, type: 'achievement' },
  { id: 4, text: 'Weekly progress report is ready.', time: '1 day ago', read: true, type: 'info' },
  { id: 5, text: 'Physics: Laws of Motion quiz scored 85%.', time: '2 days ago', read: true, type: 'success' },
];

export const careerPaths = [
  {
    id: 'swe',
    title: 'Software Engineer',
    match: 87,
    description: 'Design, develop, and maintain software systems at scale.',
    skills: [
      { name: 'Programming', level: 89 },
      { name: 'Data Structures & Algorithms', level: 76 },
      { name: 'Databases', level: 68 },
      { name: 'System Design', level: 42 },
      { name: 'Problem Solving', level: 85 },
    ],
    roadmap: [
      { step: 'Programming Fundamentals', status: 'completed' },
      { step: 'Data Structures', status: 'in-progress' },
      { step: 'Algorithms', status: 'in-progress' },
      { step: 'Databases', status: 'upcoming' },
      { step: 'Projects & Portfolio', status: 'upcoming' },
      { step: 'Advanced Development', status: 'upcoming' },
    ],
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    match: 72,
    description: 'Analyze complex data to drive insights and decisions.',
    skills: [
      { name: 'Statistics', level: 65 },
      { name: 'Python', level: 90 },
      { name: 'Machine Learning', level: 45 },
      { name: 'Data Visualization', level: 60 },
      { name: 'Mathematics', level: 72 },
    ],
    roadmap: [
      { step: 'Statistics & Probability', status: 'in-progress' },
      { step: 'Python for Data Science', status: 'completed' },
      { step: 'Machine Learning Basics', status: 'upcoming' },
      { step: 'Deep Learning', status: 'upcoming' },
      { step: 'Data Engineering', status: 'upcoming' },
      { step: 'Real-World Projects', status: 'upcoming' },
    ],
  },
];

export const topicContent = {
  quadratic: {
    title: 'Quadratic Equations',
    concept: `A quadratic equation is a polynomial equation of degree 2. It has the general form:

ax² + bx + c = 0

where a ≠ 0, and a, b, c are constants.

The solutions (roots) of this equation can be found using the Quadratic Formula:

x = (-b ± √(b² - 4ac)) / 2a

The expression b² - 4ac is called the Discriminant (D):
• If D > 0 → Two distinct real roots
• If D = 0 → One repeated real root
• If D < 0 → Two complex (imaginary) roots`,
    example: `Example: Solve x² - 5x + 6 = 0

Here, a = 1, b = -5, c = 6

Using the quadratic formula:
x = (5 ± √(25 - 24)) / 2
x = (5 ± 1) / 2

x₁ = (5 + 1)/2 = 3
x₂ = (5 - 1)/2 = 2

The roots are x = 3 and x = 2.

Verification: (x-3)(x-2) = x² - 5x + 6 ✓`,
    formulas: [
      'ax² + bx + c = 0 (Standard Form)',
      'x = (-b ± √(b² - 4ac)) / 2a (Quadratic Formula)',
      'D = b² - 4ac (Discriminant)',
      'Sum of roots = -b/a',
      'Product of roots = c/a',
    ],
    practiceQuestion: {
      question: 'Solve: x² - 7x + 12 = 0. What are the roots?',
      options: ['x = 2, x = 6', 'x = 3, x = 4', 'x = 1, x = 12', 'x = -3, x = -4'],
      correct: 1,
      explanation: 'Using the quadratic formula or factoring: x² - 7x + 12 = (x-3)(x-4) = 0, so x = 3 and x = 4.',
      misconception: 'Remember to factor correctly. Look for two numbers that multiply to give c (12) and add to give -b (7). Those numbers are 3 and 4.',
    },
  },
  recursion: {
    title: 'Recursion',
    concept: `Recursion is a programming technique where a function calls itself to solve a problem by breaking it into smaller subproblems.

Every recursive function needs:
1. Base Case — The condition to stop recursion
2. Recursive Case — The function calling itself with a smaller input

Without a base case, recursion leads to infinite loops and stack overflow.

Think of it like Russian nesting dolls — each doll contains a smaller version of itself, until you reach the smallest one (base case).`,
    example: `Example: Factorial using recursion

function factorial(n) {
  // Base case
  if (n <= 1) return 1;
  
  // Recursive case
  return n * factorial(n - 1);
}

Trace for factorial(4):
factorial(4) = 4 × factorial(3)
             = 4 × 3 × factorial(2)
             = 4 × 3 × 2 × factorial(1)
             = 4 × 3 × 2 × 1
             = 24`,
    formulas: [
      'Base Case: The terminating condition',
      'Recursive Case: f(n) calls f(smaller input)',
      'Stack Depth = Number of recursive calls',
      'Time Complexity often: O(2ⁿ) or O(n)',
      'Can be converted to iteration (and vice versa)',
    ],
    practiceQuestion: {
      question: 'What is the output of factorial(5) using the recursive function above?',
      options: ['25', '120', '60', '720'],
      correct: 1,
      explanation: 'factorial(5) = 5 × 4 × 3 × 2 × 1 = 120.',
      misconception: 'Don\'t multiply n by itself. Factorial multiplies n by every positive integer below it down to 1.',
    },
  },
};

export const searchableItems = [
  { type: 'Subject', name: 'Mathematics', path: '/learn', icon: 'Calculator' },
  { type: 'Subject', name: 'Physics', path: '/learn', icon: 'Atom' },
  { type: 'Subject', name: 'Computer Science', path: '/learn', icon: 'Code2' },
  { type: 'Subject', name: 'English', path: '/learn', icon: 'BookOpen' },
  { type: 'Subject', name: 'Programming', path: '/learn', icon: 'Terminal' },
  { type: 'Topic', name: 'Quadratic Equations', path: '/learn', icon: 'Calculator' },
  { type: 'Topic', name: 'Binary Trees', path: '/learn', icon: 'Code2' },
  { type: 'Topic', name: 'Recursion', path: '/learn', icon: 'Code2' },
  { type: 'Topic', name: 'Laws of Motion', path: '/learn', icon: 'Atom' },
  { type: 'Topic', name: 'Calculus', path: '/learn', icon: 'Calculator' },
  { type: 'Topic', name: 'Dynamic Programming', path: '/learn', icon: 'Code2' },
  { type: 'Topic', name: 'Sorting Algorithms', path: '/learn', icon: 'Code2' },
  { type: 'Assessment', name: 'DSA Fundamentals Quiz', path: '/assessments', icon: 'FileText' },
  { type: 'Assessment', name: 'Calculus Basics Quiz', path: '/assessments', icon: 'FileText' },
  { type: 'Assessment', name: 'Laws of Motion Quiz', path: '/assessments', icon: 'FileText' },
  { type: 'Feature', name: 'AI Tutor', path: '/tutor', icon: 'Bot' },
  { type: 'Feature', name: 'Study Planner', path: '/planner', icon: 'Calendar' },
  { type: 'Feature', name: 'Career Path', path: '/career', icon: 'Compass' },
  { type: 'Feature', name: 'Progress Analytics', path: '/progress', icon: 'TrendingUp' },
  { type: 'Feature', name: 'Achievements', path: '/achievements', icon: 'Trophy' },
  { type: 'Feature', name: 'Settings', path: '/settings', icon: 'Settings' },
];
