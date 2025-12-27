/**
 * AI Education Platform - Smart Mock AI Service
 * No external API required - all intelligence built-in
 */

/**
 * Generate personalized study plan
 */
export const generateStudyPlan = async (studentData) => {
  return generateMockStudyPlan(studentData);
};

/**
 * Answer doubt queries
 */
export const answerDoubt = async (question, subject) => {
  return generateMockDoubtAnswer(question, subject);
};

/**
 * Evaluate assignment
 */
export const evaluateAssignment = async (assignmentData) => {
  return generateMockAssignmentEvaluation(assignmentData);
};

/**
 * Predict student performance
 */
export const predictPerformance = async (performanceHistory) => {
  return generateMockPerformancePrediction(performanceHistory);
};

// ============================================================================
// Smart Mock AI Generators - Contextual and Intelligent
// ============================================================================

function generateMockStudyPlan(studentData) {
  const subjects = Array.isArray(studentData.subjects) && studentData.subjects.length > 0 
    ? studentData.subjects 
    : ['Mathematics', 'Science'];
  const weakTopics = Array.isArray(studentData.weakTopics) && studentData.weakTopics.length > 0
    ? studentData.weakTopics
    : ['Algebra', 'Geometry'];
  
  // Calculate days until exam
  const examDate = studentData.examDate ? new Date(studentData.examDate) : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
  const today = new Date();
  const daysUntilExam = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));
  const weeksToStudy = Math.max(1, Math.floor(daysUntilExam / 7));
  
  // Create personalized daily schedule
  const schedule = [];
  let dayCounter = 1;
  
  // First 2 days: Focus on weakest topics
  weakTopics.slice(0, 2).forEach((topic, idx) => {
    schedule.push({
      day: dayCounter++,
      topics: [topic + ' - Foundation & Basics'],
      duration: '2-3 hours',
      focus: `Master ${topic} fundamentals`
    });
  });
  
  // Next days: Cycle through all subjects
  subjects.forEach((subject, idx) => {
    schedule.push({
      day: dayCounter++,
      topics: [subject + ' - Core Concepts'],
      duration: '2 hours',
      focus: `Learn ${subject} key topics`
    });
  });
  
  // Add weak topics practice
  if (weakTopics.length > 0) {
    schedule.push({
      day: dayCounter++,
      topics: weakTopics.map(t => t + ' Practice'),
      duration: '3 hours',
      focus: 'Strengthen weak areas'
    });
  }
  
  // Add mixed revision day
  schedule.push({
    day: dayCounter++,
    topics: subjects.map(s => s + ' Revision'),
    duration: '2-3 hours',
    focus: 'Review all subjects'
  });
  
  // Add practice test day
  schedule.push({
    day: dayCounter++,
    topics: ['Full Practice Test - All Subjects'],
    duration: '3-4 hours',
    focus: 'Timed practice exam'
  });
  
  // Final mock exam
  schedule.push({
    day: dayCounter++,
    topics: ['Mock Exam Simulation'],
    duration: '3-4 hours',
    focus: 'Complete mock under exam conditions'
  });
  
  // Generate subject-specific resources
  const resources = [];
  subjects.forEach(subject => {
    const subjectLower = subject.toLowerCase();
    if (subjectLower.includes('math')) {
      resources.push(
        { type: 'video', title: `Khan Academy ${subject} Full Course`, url: 'https://khanacademy.org/math' },
        { type: 'practice', title: `${subject} Practice Problems with Solutions`, url: 'https://mathway.com' }
      );
    } else if (subjectLower.includes('science') || subjectLower.includes('physics') || subjectLower.includes('chemistry')) {
      resources.push(
        { type: 'video', title: `Crash Course ${subject} Series`, url: 'https://crashcourse.com' },
        { type: 'notes', title: `${subject} Concept Notes PDF`, url: 'https://example.com/notes' }
      );
    } else if (subjectLower.includes('english')) {
      resources.push(
        { type: 'notes', title: `${subject} Grammar Guide`, url: 'https://grammarly.com' },
        { type: 'practice', title: `Writing Practice Exercises`, url: 'https://example.com/writing' }
      );
    } else {
      resources.push(
        { type: 'video', title: `Learn ${subject} - Video Lectures`, url: 'https://youtube.com' },
        { type: 'notes', title: `${subject} Study Notes`, url: 'https://example.com' }
      );
    }
  });
  
  // Add resources for weak topics
  weakTopics.forEach(topic => {
    resources.push({
      type: 'practice',
      title: `${topic} - Targeted Practice Questions`,
      url: 'https://example.com/practice'
    });
  });
  
  // Generate contextual practice questions
  const practiceQuestions = [];
  weakTopics.slice(0, 3).forEach(topic => {
    practiceQuestions.push({
      question: `Solve 5 practice problems on ${topic} focusing on common mistakes`,
      difficulty: 'medium'
    });
  });
  
  subjects.forEach(subject => {
    practiceQuestions.push({
      question: `Complete a chapter test for ${subject} covering recent topics`,
      difficulty: 'medium'
    });
  });
  
  // Long-term planning phases
  const longTermPlan = {
    phase1: {
      name: 'Foundation Building',
      duration: `Weeks 1-${Math.ceil(weeksToStudy * 0.4)}`,
      focus: 'Master basics and fundamentals',
      activities: [
        `Study all ${subjects.join(', ')} core concepts`,
        `Focus heavily on weak topics: ${weakTopics.join(', ')}`,
        'Complete chapter-wise exercises',
        'Watch video lectures and take detailed notes'
      ]
    },
    phase2: {
      name: 'Practice & Application',
      duration: `Weeks ${Math.ceil(weeksToStudy * 0.4) + 1}-${Math.ceil(weeksToStudy * 0.7)}`,
      focus: 'Apply concepts through problem-solving',
      activities: [
        'Solve previous year question papers (last 5 years)',
        'Work on numerical problems and case studies',
        'Create formula and concept flashcards',
        'Join study groups or discussion forums'
      ]
    },
    phase3: {
      name: 'Revision & Mock Tests',
      duration: `Weeks ${Math.ceil(weeksToStudy * 0.7) + 1}-${weeksToStudy} (Final weeks)`,
      focus: 'Intensive revision and exam simulation',
      activities: [
        'Attempt full-length mock tests weekly',
        'Revise using flashcards and summary notes',
        'Focus on time management and speed',
        'Review mistakes and strengthen weak areas'
      ]
    }
  };

  // Exam alignment strategy
  const examAlignment = {
    timeline: `${daysUntilExam} days until exam (${examDate.toLocaleDateString()})`,
    milestones: [
      { day: Math.ceil(daysUntilExam * 0.3), goal: 'Complete all foundational topics' },
      { day: Math.ceil(daysUntilExam * 0.6), goal: 'Finish at least 5 previous year papers' },
      { day: Math.ceil(daysUntilExam * 0.85), goal: 'Complete 3 full-length mock tests' },
      { day: daysUntilExam - 2, goal: 'Final revision using flashcards only' }
    ],
    weekly_targets: subjects.map(subject => ({
      subject,
      chapters_per_week: 2,
      practice_problems: '50+ per week',
      mock_tests: 'One subject test per week'
    }))
  };

  // Enhanced revision strategy with spaced repetition
  const revisionStrategy = {
    technique: 'Spaced Repetition + Active Recall',
    intervals: [
      { period: 'Day 7', activity: 'First review after learning - Revise all topics covered in week 1' },
      { period: 'Day 14', activity: 'Second review - Test yourself on week 1 & 2 material' },
      { period: 'Day 30', activity: 'Third review - Comprehensive revision of entire syllabus' }
    ],
    tools: [
      {
        name: 'Formula & Concept Flashcards',
        description: `Create flashcards for key formulas in ${subjects.join(', ')}`,
        topics: [
          ...subjects.map(s => `All important ${s} formulas and theorems`),
          ...weakTopics.map(t => `${t} - Key concepts and problem-solving steps`)
        ],
        usage: 'Review flashcards daily for 15-20 minutes'
      },
      {
        name: 'Previous Year Questions (PYQs)',
        description: 'Solve papers from last 5-10 years',
        subjects: subjects.map(s => ({
          subject: s,
          papers_to_solve: '5-10 years',
          priority: weakTopics.some(t => t.toLowerCase().includes(s.toLowerCase().substring(0, 4))) ? 'High' : 'Medium'
        })),
        weekly_target: '2-3 full papers per week',
        analysis: 'Mark weak areas and revise immediately'
      }
    ],
    daily_routine: [
      '7:00-8:00 AM: Review flashcards (formulas & concepts)',
      '9:00-12:00 PM: Learn new topics or solve PYQs',
      '2:00-4:00 PM: Practice problems on weak topics',
      '5:00-6:00 PM: Create summary notes & flashcards',
      '8:00-9:00 PM: Quick revision using flashcards'
    ],
    tips: [
      `🎯 Priority: Master ${weakTopics.slice(0, 2).join(' and ')} first - these need most attention`,
      `📚 Study ${Math.ceil(daysUntilExam / 7)} topics per week to cover entire syllabus`,
      '🔄 Follow spaced repetition: Review after 7 days, 14 days, and 30 days',
      '📝 Create flashcards for EVERY formula and concept - review daily',
      '📋 Solve at least 50% of previous year questions before exam',
      `⏰ ${daysUntilExam} days remaining - allocate ${Math.ceil(daysUntilExam * 0.3)} days for practice, ${Math.ceil(daysUntilExam * 0.2)} days for revision`,
      '🧠 Use active recall: Test yourself before looking at notes'
    ]
  };

  return {
    daily_schedule: schedule.slice(0, 7), // First week schedule
    long_term_plan: longTermPlan,
    exam_alignment: examAlignment,
    difficulty_breakdown: {
      easy: weakTopics.length > 2 ? 40 : 30,
      medium: 45,
      hard: weakTopics.length > 2 ? 15 : 25
    },
    recommended_resources: resources.slice(0, 6),
    revision_strategy: revisionStrategy,
    practice_questions: practiceQuestions.slice(0, 5)
  };
}

function generateMockDoubtAnswer(question, subject) {
  const questionLower = question.toLowerCase();
  
  // Analyze question to provide contextual response
  let explanation = '';
  let concepts = [];
  let examples = [];
  let practice = [];
  let diagram = '';

  // Math-related questions
  if (questionLower.includes('quadratic') || questionLower.includes('x²') || questionLower.includes('equation')) {
    explanation = `To solve "${question}":\n\n**Step 1: Identify the equation type**\nThis is a quadratic equation in the form ax² + bx + c = 0\n\n**Step 2: Choose solving method**\n- Factoring (if easily factorable)\n- Quadratic formula: x = (-b ± √(b²-4ac)) / 2a\n- Completing the square\n\n**Step 3: Apply the formula**\nFor example, if solving x² - 5x + 6 = 0:\na = 1, b = -5, c = 6\n\nUsing quadratic formula:\nx = (5 ± √(25-24)) / 2\nx = (5 ± 1) / 2\nx = 3 or x = 2\n\n**Step 4: Verify**\nCheck: (3)² - 5(3) + 6 = 9 - 15 + 6 = 0 ✓`;
    concepts = ['Quadratic equations', 'Factoring', 'Quadratic formula', 'Roots of equations'];
    examples = [
      { example: 'Solve x² + 7x + 12 = 0', solution: 'Factor: (x + 3)(x + 4) = 0\nSolutions: x = -3 or x = -4' },
      { example: 'Solve 2x² - 8x + 6 = 0', solution: 'Divide by 2: x² - 4x + 3 = 0\nFactor: (x - 1)(x - 3) = 0\nSolutions: x = 1 or x = 3' }
    ];
    practice = [
      { question: 'Solve x² - 9 = 0', difficulty: 'easy' },
      { question: 'Solve x² + 6x + 9 = 0', difficulty: 'medium' },
      { question: 'Solve 3x² - 12x + 9 = 0 using quadratic formula', difficulty: 'hard' }
    ];
    diagram = 'Draw a parabola showing the x-intercepts (roots) where the curve crosses the x-axis.';
  }
  else if (questionLower.includes('pythagoras') || questionLower.includes('triangle') || questionLower.includes('hypotenuse')) {
    explanation = `To solve "${question}":\n\n**Understanding Pythagorean Theorem**\nFor a right triangle: a² + b² = c²\nWhere c is the hypotenuse (longest side)\n\n**Step 1: Identify known values**\n- Which sides are given?\n- Which side needs to be found?\n\n**Step 2: Apply the formula**\nIf finding hypotenuse: c = √(a² + b²)\nIf finding a leg: a = √(c² - b²)\n\n**Step 3: Calculate**\nExample: If a = 3 and b = 4\nc² = 3² + 4² = 9 + 16 = 25\nc = √25 = 5\n\n**Step 4: Check reasonableness**\nThe hypotenuse should always be the longest side.`;
    concepts = ['Right triangles', 'Pythagorean theorem', 'Square roots', 'Triangle properties'];
    examples = [
      { example: 'Find c if a = 5 and b = 12', solution: 'c² = 5² + 12² = 25 + 144 = 169\nc = √169 = 13' },
      { example: 'Find b if a = 8 and c = 10', solution: 'b² = 10² - 8² = 100 - 64 = 36\nb = √36 = 6' }
    ];
    practice = [
      { question: 'Find the hypotenuse if legs are 6 and 8', difficulty: 'easy' },
      { question: 'A ladder 13m long reaches 12m up a wall. How far is the base from the wall?', difficulty: 'medium' }
    ];
    diagram = 'Draw a right triangle, label the sides a, b, and c (hypotenuse). Mark the 90° angle.';
  }
  // Physics questions
  else if (questionLower.includes('force') || questionLower.includes('mass') || questionLower.includes('acceleration') || questionLower.includes('newton')) {
    explanation = `To solve "${question}":\n\n**Newton's Second Law: F = ma**\nForce = Mass × Acceleration\n\n**Step 1: Identify given values**\n- Mass (m) in kilograms (kg)\n- Acceleration (a) in meters per second squared (m/s²)\n- Force (F) in Newtons (N)\n\n**Step 2: Rearrange if needed**\n- To find Force: F = ma\n- To find mass: m = F/a\n- To find acceleration: a = F/m\n\n**Step 3: Substitute and solve**\nExample: m = 20 kg, a = 3 m/s²\nF = 20 × 3 = 60 N\n\n**Step 4: Include units**\nAlways write the answer with proper units (Newtons for force).`;
    concepts = ['Newton\'s laws of motion', 'Force and acceleration', 'Mass vs weight', 'SI units'];
    examples = [
      { example: 'Calculate force when m = 10 kg and a = 2 m/s²', solution: 'F = ma = 10 × 2 = 20 N' },
      { example: 'Find mass if F = 100 N and a = 5 m/s²', solution: 'm = F/a = 100/5 = 20 kg' }
    ];
    practice = [
      { question: 'What force is needed to accelerate a 50 kg object at 4 m/s²?', difficulty: 'easy' },
      { question: 'A 1500 kg car experiences a force of 3000 N. What is its acceleration?', difficulty: 'medium' }
    ];
    diagram = 'Draw a free body diagram with arrows showing direction and magnitude of forces acting on the object.';
  }
  // Chemistry questions
  else if (questionLower.includes('atom') || questionLower.includes('electron') || questionLower.includes('periodic') || questionLower.includes('element')) {
    explanation = `Regarding "${question}":\n\n**Understanding Atomic Structure**\n\n**Step 1: Components of an atom**\n- Protons: Positive charge, in nucleus\n- Neutrons: No charge, in nucleus\n- Electrons: Negative charge, orbit nucleus\n\n**Step 2: Key relationships**\n- Atomic number = number of protons\n- Mass number = protons + neutrons\n- Neutral atom: protons = electrons\n\n**Step 3: Periodic table usage**\n- Groups (columns): Elements with similar properties\n- Periods (rows): Number of electron shells\n- Atomic mass: Average mass of isotopes\n\n**Step 4: Electron configuration**\nElectrons fill shells in order: 2, 8, 8, 18...`;
    concepts = ['Atomic structure', 'Periodic table', 'Protons, neutrons, electrons', 'Electron shells'];
    examples = [
      { example: 'Carbon has 6 protons. How many electrons?', solution: 'In a neutral atom, protons = electrons\nCarbon has 6 electrons\nConfiguration: 2 in first shell, 4 in second shell' },
      { example: 'What is the mass number of an atom with 12 protons and 13 neutrons?', solution: 'Mass number = protons + neutrons = 12 + 13 = 25' }
    ];
    practice = [
      { question: 'Oxygen has 8 protons. What is its atomic number?', difficulty: 'easy' },
      { question: 'An atom has 17 protons, 18 neutrons, and 17 electrons. Identify the element.', difficulty: 'medium' }
    ];
    diagram = 'Draw an atom with nucleus (protons + neutrons) at center and electrons in circular orbits/shells around it.';
  }
  // Biology questions
  else if (questionLower.includes('cell') || questionLower.includes('photosynthesis') || questionLower.includes('mitochondria') || questionLower.includes('dna')) {
    explanation = `About "${question}":\n\n**Understanding Cell Biology**\n\n**Step 1: Cell structure**\nAll living things are made of cells\n- Animal cells: Cell membrane, nucleus, cytoplasm, mitochondria\n- Plant cells: Above + cell wall, chloroplasts, vacuole\n\n**Step 2: Cell functions**\n- Nucleus: Contains DNA, controls cell activities\n- Mitochondria: Powerhouse, produces energy (ATP)\n- Chloroplasts: Photosynthesis (plants only)\n- Cell membrane: Controls what enters/exits\n\n**Step 3: Photosynthesis (plants)**\n6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂\nCarbon dioxide + Water + Light → Glucose + Oxygen\n\n**Step 4: Cell division**\nMitosis: Creates identical cells for growth/repair`;
    concepts = ['Cell structure', 'Cell organelles', 'Plant vs animal cells', 'Life processes'];
    examples = [
      { example: 'Why are mitochondria called powerhouses?', solution: 'Mitochondria convert glucose and oxygen into ATP (energy) through cellular respiration.\nATP powers all cell activities.' },
      { example: 'What do chloroplasts do?', solution: 'Chloroplasts contain chlorophyll which captures sunlight.\nThey perform photosynthesis to make glucose (food) for the plant.' }
    ];
    practice = [
      { question: 'Name 3 differences between plant and animal cells', difficulty: 'easy' },
      { question: 'Explain the process of photosynthesis in your own words', difficulty: 'medium' }
    ];
    diagram = 'Draw a labeled cell diagram showing: nucleus, cell membrane, cytoplasm, mitochondria. Add cell wall, chloroplasts, and vacuole for plant cells.';
  }
  // English/Grammar questions
  else if (questionLower.includes('grammar') || questionLower.includes('verb') || questionLower.includes('noun') || questionLower.includes('sentence')) {
    explanation = `Analyzing "${question}":\n\n**Parts of Speech**\n\n**Step 1: Identify word types**\n- Noun: Person, place, thing, or idea (cat, school, happiness)\n- Verb: Action or state of being (run, is, think)\n- Adjective: Describes a noun (big, blue, happy)\n- Adverb: Describes a verb (quickly, very, always)\n\n**Step 2: Sentence structure**\nBasic pattern: Subject + Verb + Object\nExample: "The cat (subject) ate (verb) the fish (object)"\n\n**Step 3: Common rules**\n- Subject-verb agreement: Singular subject → singular verb\n- Verb tenses: Past, present, future\n- Pronoun usage: I/me, he/him, they/them\n\n**Step 4: Check for errors**\nRead aloud to catch mistakes`;
    concepts = ['Parts of speech', 'Sentence structure', 'Grammar rules', 'Subject-verb agreement'];
    examples = [
      { example: 'Find the verb: "She sings beautifully"', solution: '"Sings" is the verb (action)\n"She" = pronoun/subject\n"Beautifully" = adverb (describes how she sings)' },
      { example: 'Correct: "The students is studying"', solution: 'Error: Plural subject with singular verb\nCorrect: "The students ARE studying"\nRule: Plural subjects need plural verbs' }
    ];
    practice = [
      { question: 'Identify all nouns in: "The teacher gave the students a test"', difficulty: 'easy' },
      { question: 'Write a sentence with a compound subject and past tense verb', difficulty: 'medium' }
    ];
    diagram = 'Create a sentence diagram showing the relationship between subject, verb, and object with lines connecting them.';
  }
  // Computer Science questions
  else if (questionLower.includes('ram') || questionLower.includes('rom') || questionLower.includes('memory') || 
           questionLower.includes('cpu') || questionLower.includes('processor') || questionLower.includes('storage') ||
           questionLower.includes('hardware') || questionLower.includes('software') || questionLower.includes('computer')) {
    
    // Specific RAM vs ROM question
    if (questionLower.includes('ram') || questionLower.includes('rom')) {
      explanation = `Understanding "${question}":\n\n**RAM vs ROM: Key Differences**\n\n**RAM (Random Access Memory)**\n- Temporary/Volatile memory\n- Loses data when power is off\n- Fast read/write speeds\n- Used for: Running programs, active data\n- Example: 8GB, 16GB, 32GB RAM\n- Like your desk workspace - cleared when you leave\n\n**ROM (Read-Only Memory)**\n- Permanent/Non-volatile memory\n- Keeps data when power is off\n- Slower than RAM\n- Used for: BIOS, firmware, boot instructions\n- Example: System startup code\n- Like a reference book - always there\n\n**Key Comparison:**\n\n| Feature | RAM | ROM |\n|---------|-----|-----|\n| Full Form | Random Access Memory | Read Only Memory |\n| Volatility | Volatile (temporary) | Non-volatile (permanent) |\n| Speed | Very fast | Slower |\n| Purpose | Active processing | Permanent instructions |\n| Modifiable | Yes, constantly changing | No, fixed at manufacturing |\n| Cost | More expensive | Less expensive |\n\n**Real-World Analogy:**\n- RAM = Your work desk (temporary space for current tasks)\n- ROM = Instruction manual (permanent reference)\n\n**Why Both Are Needed:**\nYour computer needs ROM to start up (boot process), then loads the operating system into RAM for fast access while you work.`;
      concepts = ['RAM (Random Access Memory)', 'ROM (Read Only Memory)', 'Volatile vs Non-volatile memory', 'Computer memory hierarchy', 'Storage types'];
      examples = [
        { example: 'Why does your computer forget everything when you restart?', solution: 'Programs run in RAM (volatile memory). When power is cut, RAM loses all data. Only data saved to hard drive/SSD (non-volatile) is kept.' },
        { example: 'What happens during computer boot-up?', solution: 'ROM contains BIOS/firmware that runs first. It checks hardware, then loads OS from hard drive into RAM for fast access.' }
      ];
      practice = [
        { question: 'Is RAM or ROM faster? Why?', difficulty: 'easy' },
        { question: 'Which memory type would store your opened browser tabs? Why?', difficulty: 'medium' },
        { question: 'Explain what happens to RAM contents during sleep mode vs shutdown', difficulty: 'hard' }
      ];
      diagram = 'Draw computer memory hierarchy: ROM (bottom/permanent) → RAM (middle/temporary) → CPU Cache (top/fastest). Show data flow between them.';
    }
    // CPU/Processor questions
    else if (questionLower.includes('cpu') || questionLower.includes('processor')) {
      explanation = `About "${question}":\n\n**CPU (Central Processing Unit)**\n\n**What is CPU?**\nThe "brain" of the computer that processes all instructions\n\n**Main Components:**\n1. **ALU (Arithmetic Logic Unit)** - Does math and logic operations\n2. **Control Unit** - Manages instruction flow\n3. **Registers** - Tiny ultra-fast memory inside CPU\n4. **Cache** - Small fast memory for frequently used data\n\n**How CPU Works:**\n1. **Fetch:** Get instruction from RAM\n2. **Decode:** Understand what instruction means\n3. **Execute:** Perform the operation\n4. **Store:** Write result back to memory\n\n**CPU Speed Factors:**\n- Clock Speed (GHz): How many cycles per second (e.g., 3.5 GHz)\n- Cores: Multiple processors (dual-core, quad-core, 8-core)\n- Cache Size: L1, L2, L3 cache (larger = faster)\n- Architecture: How efficiently instructions are processed\n\n**Real-World Example:**\nA 4-core 3.0 GHz CPU can handle 4 tasks simultaneously, each executing 3 billion instructions per second!`;
      concepts = ['CPU architecture', 'Fetch-Decode-Execute cycle', 'Clock speed and cores', 'Cache memory', 'Processor performance'];
      examples = [
        { example: 'Why are multi-core processors better?', solution: 'Each core can handle separate tasks simultaneously. A quad-core can run 4 programs at once, improving multitasking performance.' },
        { example: 'What does 3.5 GHz mean?', solution: '3.5 GHz = 3.5 billion clock cycles per second. More cycles = more instructions processed = faster performance.' }
      ];
      practice = [
        { question: 'What are the 4 steps of the CPU instruction cycle?', difficulty: 'easy' },
        { question: 'Compare a 2-core 3.0 GHz vs 4-core 2.5 GHz processor for multitasking', difficulty: 'medium' }
      ];
      diagram = 'Draw CPU block diagram showing: Control Unit, ALU, Registers, Cache, and connections to RAM via system bus.';
    }
    // Generic computer science
    else {
      explanation = `Understanding "${question}" in Computer Science:\n\n**Fundamental Concepts:**\n\n**Step 1: Break down the topic**\n- What is the core concept being asked?\n- What are the key components involved?\n\n**Step 2: Identify relationships**\n- How do different parts interact?\n- What are the inputs and outputs?\n\n**Step 3: Think systematically**\n- Start with basic definitions\n- Build up to complex interactions\n- Use real-world analogies\n\n**Step 4: Apply to practical scenarios**\nHow is this used in actual computers or software?\n\n**Common Computer Science Topics:**\n- Hardware: CPU, RAM, ROM, Storage, Input/Output devices\n- Software: Operating Systems, Applications, Drivers\n- Data: Binary, files, databases\n- Networks: Internet, protocols, communication`;
      concepts = ['Computer hardware', 'Software systems', 'Data processing', 'Digital logic', 'System architecture'];
      examples = [
        { example: 'Input-Process-Output model', solution: 'Computer takes input (keyboard/mouse) → Processes with CPU/RAM → Produces output (screen/printer)' },
        { example: 'Binary representation', solution: 'Computers use binary (0s and 1s). Example: Letter "A" = 01000001 in ASCII code' }
      ];
      practice = [
        { question: 'Name 3 input devices and 3 output devices', difficulty: 'easy' },
        { question: 'Explain how a computer stores a text file', difficulty: 'medium' }
      ];
      diagram = 'Draw basic computer system: Input devices → CPU/RAM → Output devices. Show storage (hard drive) connected to CPU.';
    }
  }
  // Generic fallback with question context
  else {
    explanation = `Let me help you understand "${question}":\n\n**Approach to solving this:**\n\n**Step 1: Break down the question**\nIdentify what is being asked and what information is provided.\n\n**Step 2: Recall relevant concepts**\nThink about the key principles or formulas related to ${subject} that apply here.\n\n**Step 3: Apply logical reasoning**\n- What do you already know about this topic?\n- What patterns or relationships exist?\n- Can you relate this to something familiar?\n\n**Step 4: Work through systematically**\nShow your work step-by-step to avoid errors.\n\n**Step 5: Verify your answer**\nDoes the answer make sense? Can you check it another way?`;
    concepts = [
      `Core ${subject} principles`,
      'Problem-solving strategies',
      'Logical reasoning',
      'Critical thinking'
    ];
    examples = [
      { 
        example: `Basic ${subject} concept application`, 
        solution: 'Start with what you know, apply the relevant formula or principle, and solve step by step.' 
      },
      { 
        example: `Intermediate ${subject} problem`, 
        solution: 'Break complex problems into smaller parts. Solve each part, then combine the results.' 
      }
    ];
    practice = [
      { question: `Related ${subject} practice question 1`, difficulty: 'easy' },
      { question: `Related ${subject} practice question 2`, difficulty: 'medium' },
      { question: `Challenge ${subject} problem`, difficulty: 'hard' }
    ];
    diagram = `Create visual aids like diagrams, charts, or flowcharts to better understand ${subject} concepts.`;
  }

  return {
    step_by_step_explanation: explanation,
    key_concepts: concepts,
    solved_examples: examples,
    practice_questions: practice,
    diagrams_description: diagram
  };
}

function generateMockAssignmentEvaluation(assignmentData) {
  const wordCount = assignmentData.content.split(' ').length;
  const baseScore = Math.min(Math.floor((wordCount / 50) * 10), assignmentData.maxScore);

  return {
    score: Math.max(baseScore, Math.floor(assignmentData.maxScore * 0.6)),
    grammar_corrections: [
      { error: 'Minor grammatical issue', correction: 'Suggested correction', line: 1 },
      { error: 'Punctuation needed', correction: 'Add comma or period', line: 3 }
    ],
    content_feedback: {
      strengths: ['Clear introduction', 'Good structure', 'Relevant examples'],
      improvements: ['Add more depth to analysis', 'Include citations', 'Expand conclusion']
    },
    structure_feedback: 'The assignment is well-organized with a clear flow of ideas. Consider adding topic sentences to each paragraph.',
    highlighted_mistakes: [
      { type: 'grammar', issue: 'Subject-verb agreement', location: 'Paragraph 2' },
      { type: 'clarity', issue: 'Unclear phrasing', location: 'Paragraph 3' }
    ],
    improvement_tips: [
      'Use more varied vocabulary',
      'Support claims with evidence',
      'Proofread for spelling errors',
      'Strengthen the conclusion',
      'Add transitional phrases'
    ],
    plagiarism_score: Math.floor(Math.random() * 10) + 90
  };
}

function generateMockPerformancePrediction(performanceHistory) {
  const avgScore = performanceHistory.reduce((sum, p) => sum + (p.score / p.max_score) * 100, 0) / performanceHistory.length;
  
  return {
    weak_chapters: ['Algebra', 'Physics - Motion'],
    strong_chapters: ['Grammar', 'History'],
    decline_patterns: {
      observation: 'Scores declining in Math over last 3 tests',
      trend: 'downward',
      subjects_affected: ['Mathematics']
    },
    areas_needing_revision: [
      { topic: 'Linear Equations', priority: 'high', reason: 'Recent test showed 40% score' },
      { topic: 'Newton\'s Laws', priority: 'medium', reason: 'Consistent confusion observed' }
    ],
    risk_level: avgScore < 50 ? 'high' : avgScore < 70 ? 'moderate' : 'low',
    recommendations: [
      'Focus on algebra fundamentals',
      'Practice physics problems daily',
      'Watch video tutorials for weak topics',
      'Join study group for peer learning',
      'Schedule extra tutoring sessions'
    ]
  };
}
