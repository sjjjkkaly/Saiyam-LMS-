import React, { useState, useEffect } from 'react';
import { 
  Award, Clock, CheckCircle2, XCircle, ArrowRight, ArrowLeft, 
  RotateCcw, Sparkles, AlertCircle, HelpCircle, Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QuizView({ quizzes, activeClassLevel }) {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(900); // 15 mins
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Filter quizzes by class
  const filteredQuizzes = activeClassLevel === 'All'
    ? quizzes
    : quizzes.filter(q => q.classLevel === activeClassLevel);

  // Timer countdown hook
  useEffect(() => {
    if (!selectedQuiz || isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [selectedQuiz, isSubmitted]);

  const handleStartQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTimeLeftSeconds((quiz.timeLimitMins || 15) * 60);
    setIsSubmitted(false);
  };

  const handleSelectAnswer = (questionId, optionIndex) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    // Calculate score for celebration
    let correct = 0;
    selectedQuiz.questions.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) correct += 1;
    });
    const percentage = Math.round((correct / selectedQuiz.questions.length) * 100);
    if (percentage >= 70) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore fallback
      }
    }
  };

  // Format countdown mm:ss
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remainderSecs).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      {!selectedQuiz && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading gold-gradient-text">
                Test Series & Speed Practice Quizzes
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Class 11 & 12 Board Exam Pattern Multiple Choice Questions with Instant Step Marking
              </p>
            </div>
            <span className="text-xs bg-amber-500/20 text-amber-400 font-bold px-3 py-1 rounded-full border border-amber-400/30">
              NCERT & CBSE Pattern
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {filteredQuizzes.map(quiz => (
              <div
                key={quiz.id}
                className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between space-y-4 group shadow-xl"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded-lg border border-amber-400/30">
                      Class {quiz.classLevel} {quiz.subject}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center space-x-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{quiz.timeLimitMins} Mins</span>
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-100 group-hover:text-amber-400 transition-colors">
                    {quiz.title}
                  </h3>

                  <p className="text-xs text-slate-400">
                    Total Questions: <strong className="text-white">{quiz.questionsCount}</strong> • Marks: <strong className="text-emerald-400">{quiz.totalMarks}</strong>
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Board Exam Booster</span>
                  <button
                    onClick={() => handleStartQuiz(quiz)}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow transition flex items-center space-x-1.5"
                  >
                    <Award className="w-4 h-4 fill-slate-950" />
                    <span>Start Test Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Quiz Taking Interface */}
      {selectedQuiz && (
        <div className="glass-panel rounded-3xl border border-amber-500/40 overflow-hidden shadow-2xl space-y-0">
          {/* Quiz Top Bar */}
          <div className="p-5 bg-slate-900/90 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-400/30">
                Class {selectedQuiz.classLevel} {selectedQuiz.subject}
              </span>
              <h2 className="font-extrabold text-base text-slate-100 mt-1">{selectedQuiz.title}</h2>
            </div>

            <div className="flex items-center space-x-4">
              {!isSubmitted ? (
                <div className="flex items-center space-x-2 bg-red-950/60 border border-red-500/40 px-3.5 py-1.5 rounded-xl font-mono text-xs text-red-400 font-bold">
                  <Clock className="w-4 h-4 animate-pulse" />
                  <span>Time Left: {formatTime(timeLeftSeconds)}</span>
                </div>
              ) : (
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3.5 py-1.5 rounded-xl font-bold text-xs">
                  Test Completed & Evaluated
                </span>
              )}

              <button
                onClick={() => setSelectedQuiz(null)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition"
              >
                Exit Test
              </button>
            </div>
          </div>

          {/* Quiz Question Body & Navigator */}
          {!isSubmitted ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Question Box */}
              <div className="lg:col-span-8 p-6 lg:p-8 space-y-6 bg-slate-950">
                {selectedQuiz.questions[currentQuestionIndex] && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Question <strong className="text-amber-400">{currentQuestionIndex + 1}</strong> of {selectedQuiz.questions.length}</span>
                      <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 font-bold text-emerald-400">4 Marks</span>
                    </div>

                    <h3 className="font-bold text-base sm:text-lg text-slate-100 leading-relaxed">
                      {selectedQuiz.questions[currentQuestionIndex].question}
                    </h3>

                    {/* Options list */}
                    <div className="space-y-3">
                      {selectedQuiz.questions[currentQuestionIndex].options.map((option, optIdx) => {
                        const isSelected = userAnswers[selectedQuiz.questions[currentQuestionIndex].id] === optIdx;

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(selectedQuiz.questions[currentQuestionIndex].id, optIdx)}
                            className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition flex items-center justify-between ${
                              isSelected
                                ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-lg shadow-amber-500/10'
                                : 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-slate-700'
                            }`}
                          >
                            <span className="flex items-center space-x-3">
                              <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                                isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                              }`}>
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{option}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Prev / Next controls */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                      <button
                        disabled={currentQuestionIndex === 0}
                        onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                        className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold rounded-xl disabled:opacity-40 flex items-center space-x-1"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </button>

                      {currentQuestionIndex < selectedQuiz.questions.length - 1 ? (
                        <button
                          onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                          className="px-5 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow flex items-center space-x-1"
                        >
                          <span>Next Question</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={handleSubmitQuiz}
                          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-600/30 flex items-center space-x-1"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Submit Test & View Results</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Question Navigation Palette Sidebar */}
              <div className="lg:col-span-4 p-6 bg-slate-900/60 border-l border-slate-800 space-y-6">
                <h4 className="font-bold text-sm text-slate-200">Question Palette</h4>
                
                <div className="grid grid-cols-5 gap-2">
                  {selectedQuiz.questions.map((q, idx) => {
                    const isAnswered = userAnswers[q.id] !== undefined;
                    const isCurrent = currentQuestionIndex === idx;

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`w-10 h-10 rounded-xl font-bold text-xs flex items-center justify-center transition border ${
                          isCurrent 
                            ? 'border-amber-400 bg-amber-500 text-slate-950 shadow-lg' 
                            : isAnswered 
                              ? 'bg-emerald-600/30 border-emerald-500/40 text-emerald-400' 
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-2 text-xs text-slate-400 pt-4 border-t border-slate-800">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500/40 border border-emerald-500" />
                    <span>Answered ({Object.keys(userAnswers).length})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-slate-950 border border-slate-800" />
                    <span>Unanswered ({selectedQuiz.questions.length - Object.keys(userAnswers).length})</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Scorecard & Detailed Solution Breakdown */
            <div className="p-8 bg-slate-950 space-y-8">
              {/* Score summary banner */}
              <div className="p-8 rounded-3xl glass-panel-gold border border-amber-500/40 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-500 text-slate-950 mx-auto flex items-center justify-center font-black text-2xl shadow-xl">
                  <Trophy className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-white font-heading">
                  Test Result & Performance Report
                </h3>
                
                {(() => {
                  let correct = 0;
                  selectedQuiz.questions.forEach(q => {
                    if (userAnswers[q.id] === q.correctIndex) correct += 1;
                  });
                  const percentage = Math.round((correct / selectedQuiz.questions.length) * 100);

                  return (
                    <div className="space-y-2">
                      <p className="text-3xl font-black text-emerald-400 font-heading">
                        {correct * 4} / {selectedQuiz.totalMarks} Marks ({percentage}%)
                      </p>
                      <p className="text-xs text-slate-300 max-w-md mx-auto">
                        {percentage >= 80 
                          ? " Outstanding performance! You are fully on track for 100/100 in Board Exams." 
                          : " Good attempt! Review the detailed step-by-step solutions below to strengthen weak concepts."}
                      </p>
                    </div>
                  );
                })()}

                <button
                  onClick={() => handleStartQuiz(selectedQuiz)}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition inline-flex items-center space-x-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Test</span>
                </button>
              </div>

              {/* Detailed Solutions */}
              <div className="space-y-6">
                <h3 className="font-extrabold text-lg font-heading text-slate-100">
                  Detailed Step-by-Step Question Solutions
                </h3>

                {selectedQuiz.questions.map((q, qIdx) => {
                  const userChoice = userAnswers[q.id];
                  const isCorrect = userChoice === q.correctIndex;

                  return (
                    <div key={q.id} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-400">Question {qIdx + 1}</span>
                        {isCorrect ? (
                          <span className="text-xs text-emerald-400 font-bold flex items-center space-x-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Correct (+4 Marks)</span>
                          </span>
                        ) : (
                          <span className="text-xs text-red-400 font-bold flex items-center space-x-1">
                            <XCircle className="w-4 h-4" />
                            <span>Incorrect (0 Marks)</span>
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-sm text-slate-100">{q.question}</h4>

                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => (
                          <div 
                            key={optIdx} 
                            className={`p-3 rounded-xl text-xs font-medium border ${
                              optIdx === q.correctIndex
                                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 font-bold'
                                : optIdx === userChoice
                                  ? 'bg-red-950/40 border-red-500/40 text-red-300'
                                  : 'bg-slate-950 border-slate-800 text-slate-400'
                            }`}
                          >
                            <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                            {optIdx === q.correctIndex && <span className="ml-2 text-[10px] bg-emerald-600 text-white px-1.5 py-0.2 rounded">Correct Answer</span>}
                          </div>
                        ))}
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                        <span className="font-bold text-amber-400 block">Explanation & Formula Step:</span>
                        <p>{q.explanation}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
