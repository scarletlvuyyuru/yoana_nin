import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Assessment.module.css';
import SEO from '../../components/SEO/SEO';

interface Question {
  id: number;
  prompt: string;
  example: string;
}

interface ScoreRange {
  min: number;
  max: number;
  suggestion: string;
  nextStep: string;
}

const SCALE_LABELS = ['Rarely / Never', 'Occasionally', 'Sometimes', 'Often', 'Almost Always'];

const QUESTIONS: Question[] = [
  {
    id: 1,
    prompt: 'I struggle to START tasks, even ones I know are important for my business.',
    example: 'Sending proposals, making calls, posting content, following up with leads.'
  },
  {
    id: 2,
    prompt: 'I have great business ideas but rarely follow through to completion.',
    example: 'Launching offers, finishing a course, building a system.'
  },
  {
    id: 3,
    prompt: "I feel overwhelmed by my to-do list and don't know where to begin.",
    example: 'Paralysis when facing multiple priorities at once.'
  },
  {
    id: 4,
    prompt: 'I procrastinate on revenue-generating activities (sales, outreach, marketing).',
    example: 'Avoiding the tasks that directly bring in money.'
  },
  {
    id: 5,
    prompt: 'I lose track of time and miss deadlines or appointments.',
    example: 'Underestimating how long tasks take, being late to meetings.'
  },
  {
    id: 6,
    prompt: "I feel like I'm always busy but not making real progress in my business.",
    example: 'Doing low-priority tasks while avoiding high-impact ones.'
  },
  {
    id: 7,
    prompt: 'I experience emotional highs and lows that affect my productivity and consistency.',
    example: 'Rejection sensitivity, frustration, sudden bursts of motivation followed by crashes.'
  },
  {
    id: 8,
    prompt: 'I have difficulty maintaining routines or systems in my business.',
    example: 'Inconsistent posting, irregular client follow-up, disorganized finances.'
  },
  {
    id: 9,
    prompt: "I feel like I'm working harder than my peers but earning less.",
    example: "Effort doesn't seem to translate into results or income."
  },
  {
    id: 10,
    prompt: 'I believe that with the right support and structure, I could significantly grow my business.',
    example: 'You know the potential is there, you just need help unlocking it.'
  }
];

const SCORE_RANGES: ScoreRange[] = [
  {
    min: 10,
    max: 20,
    suggestion: 'Mild impact on your business',
    nextStep: 'Explore ADHD-aware productivity strategies.'
  },
  {
    min: 21,
    max: 35,
    suggestion: 'Moderate impact, patterns are showing',
    nextStep: 'A coaching consultation can create clarity fast.'
  },
  {
    min: 36,
    max: 50,
    suggestion: 'Significant impact on income and growth',
    nextStep: 'ADHD-focused coaching can be a game-changer for you.'
  }
];

const Assessment: React.FC = () => {
  const [answers, setAnswers] = useState<number[]>(Array(QUESTIONS.length).fill(0));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [resultsConsent, setResultsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formLoadTime] = useState(Date.now());

  const totalScore = useMemo(() => answers.reduce((sum, value) => sum + value, 0), [answers]);
  const answeredCount = useMemo(() => answers.filter((value) => value > 0).length, [answers]);
  const progressPercent = Math.round((answeredCount / QUESTIONS.length) * 100);

  const activeRange = useMemo(
    () => SCORE_RANGES.find((range) => totalScore >= range.min && totalScore <= range.max),
    [totalScore]
  );

  const answersSummary = useMemo(
    () => answers.map((value, index) => `Q${index + 1}:${value}`).join(', '),
    [answers]
  );

  const handleAnswerSelect = (value: number) => {
    const nextAnswers = [...answers];
    nextAnswers[currentQuestion] = value;
    setAnswers(nextAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      return;
    }

    if (answers.every((value) => value > 0)) {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  const restartAssessment = () => {
    setAnswers(Array(QUESTIONS.length).fill(0));
    setCurrentQuestion(0);
    setShowResults(false);
    setShowEmailForm(false);
    setEmail('');
    setResultsConsent(false);
    setMarketingConsent(false);
    setEmailSubmitted(false);
    setIsSubmitting(false);
    setSubmitError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const sanitizeInput = (input: string): string =>
      input
        .trim()
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<[^>]*>/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .substring(0, 2000);

    const submittedEmail = formData.get('email')?.toString().trim() || '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!resultsConsent || !submittedEmail) {
      setSubmitError('Please enter your email and agree to receive your results.');
      return;
    }

    if (!emailRegex.test(submittedEmail)) {
      setSubmitError('Please enter a valid email address.');
      return;
    }

    const sanitizedFormData = new FormData();
    for (const [key, value] of formData.entries()) {
      sanitizedFormData.append(
        key,
        value instanceof File ? value : sanitizeInput(value.toString())
      );
    }

    if (sanitizedFormData.get('bot-field')) {
      return;
    }

    const submitTime = Date.now();
    const timestampValue = sanitizedFormData.get('form-timestamp');
    const timestamp = timestampValue ? parseInt(timestampValue.toString(), 10) : 0;
    if (!timestamp || submitTime - timestamp < 5000) {
      setSubmitError('Please take a moment to review your results before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const netlifyResponse = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(
          Array.from(sanitizedFormData.entries()).map(([key, value]) => [
            key,
            value.toString(),
          ])
        ).toString(),
      });

      if (!netlifyResponse.ok) {
        throw new Error('Lead capture failed');
      }

      const emailResponse = await fetch('/.netlify/functions/assessment-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: submittedEmail,
          totalScore,
          scoreRange: activeRange ? `${activeRange.min}-${activeRange.max}` : 'Not scored',
          scoreSuggestion: activeRange?.suggestion || '',
          nextStep: activeRange?.nextStep || '',
          answers: answersSummary,
          marketingConsent,
          resultsConsent,
        }),
      });

      if (!emailResponse.ok) {
        let functionError = 'Results email failed';
        try {
          const errorPayload = await emailResponse.json();
          if (errorPayload?.error) {
            functionError = errorPayload.error;
          }
        } catch {
          // Keep generic fallback if response body is not JSON.
        }
        throw new Error(functionError);
      }

      setEmailSubmitted(true);
    } catch (error: unknown) {
      const defaultError = 'There was a problem sending your results. Please try again in a moment.';
      const message = error instanceof Error ? error.message : defaultError;
      setSubmitError(message || defaultError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <SEO
        title="ADHD Self-Assessment for Women Entrepreneurs | Yoana Nin Coaching"
        description="Take Yoana Nin's ADHD self-assessment to understand how ADHD patterns may be affecting your business growth and discover your next best step."
        url="https://yoananincoaching.com/assessment"
      />

      <div className={styles.container}>
        <section className={styles.heroCard}>
          <p className={styles.kicker}>Yoana Nin Coaching</p>
          <h1 className={styles.title}>ADHD Self-Assessment for Women Entrepreneurs</h1>
          <p className={styles.subtitle}>Discover how ADHD may be affecting your business growth.</p>
          <p className={styles.description}>
            As a woman entrepreneur, you wear many hats. If ADHD is part of your story, starting tasks,
            staying consistent, and turning ideas into income can feel harder than it should. This self-assessment
            gives you a clearer starting point.
          </p>

          <div className={styles.scaleLegend}>
            {SCALE_LABELS.map((label, index) => (
              <div key={label} className={styles.scaleLegendItem}>
                <span className={styles.scaleNumber}>{index + 1}</span>
                <span className={styles.scaleLabel}>{label}</span>
              </div>
            ))}
          </div>

          <p className={styles.helperText}>
            Rate each statement from 1 to 5. Add your total score at the end and review what your range suggests.
          </p>
        </section>

        {!showResults ? (
          <section className={styles.quizCard}>
            <div className={styles.quizTopBar}>
              <p className={styles.questionCount}>
                Question {currentQuestion + 1} of {QUESTIONS.length}
              </p>
              <p className={styles.answeredCount}>{answeredCount} answered</p>
            </div>

            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
            </div>

            <h2 className={styles.questionTitle}>Question {QUESTIONS[currentQuestion].id}</h2>
            <p className={styles.questionPrompt}>{QUESTIONS[currentQuestion].prompt}</p>
            <p className={styles.questionExample}>Example: {QUESTIONS[currentQuestion].example}</p>

            <div className={styles.answerGrid} role="radiogroup" aria-label={`Question ${QUESTIONS[currentQuestion].id} responses`}>
              {SCALE_LABELS.map((label, index) => {
                const value = index + 1;
                const selected = answers[currentQuestion] === value;

                return (
                  <button
                    key={label}
                    type="button"
                    className={`${styles.answerButton} ${selected ? styles.answerButtonSelected : ''}`}
                    onClick={() => handleAnswerSelect(value)}
                    aria-pressed={selected}
                  >
                    <span className={styles.answerValue}>{value}</span>
                    <span className={styles.answerText}>{label}</span>
                  </button>
                );
              })}
            </div>

            <div className={styles.navigationRow}>
              <button
                type="button"
                className={`${styles.navButton} ${styles.secondaryButton}`}
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
              <button
                type="button"
                className={`${styles.navButton} ${styles.primaryButton}`}
                onClick={handleNext}
                disabled={answers[currentQuestion] === 0}
              >
                {currentQuestion === QUESTIONS.length - 1 ? 'See My Results' : 'Next'}
              </button>
            </div>
          </section>
        ) : (
          <section className={styles.resultsCard}>
            <h2 className={styles.resultsTitle}>Your Score: {totalScore} / 50</h2>
            <p className={styles.resultsSubtitle}>Here is what your score range suggests right now.</p>

            <div className={styles.rangeList}>
              {SCORE_RANGES.map((range) => {
                const isActive = totalScore >= range.min && totalScore <= range.max;

                return (
                  <article
                    key={`${range.min}-${range.max}`}
                    className={`${styles.rangeCard} ${isActive ? styles.activeRangeCard : ''}`}
                  >
                    <p className={styles.rangeScore}>
                      {range.min} - {range.max}
                    </p>
                    <p className={styles.rangeSuggestion}>{range.suggestion}</p>
                    <p className={styles.rangeNextStep}>{range.nextStep}</p>
                  </article>
                );
              })}
            </div>

            {activeRange && (
              <div className={styles.recommendationBox}>
                <p className={styles.recommendationLabel}>Recommended Next Step</p>
                <p className={styles.recommendationText}>{activeRange.nextStep}</p>
              </div>
            )}

            <div className={styles.emailResultsSection}>
              <button
                type="button"
                className={styles.emailResultsToggle}
                onClick={() => setShowEmailForm((prev) => !prev)}
                aria-expanded={showEmailForm}
                aria-controls="assessment-email-form"
              >
                <span>Email My Results</span>
                <span
                  className={`${styles.emailResultsArrow} ${showEmailForm ? styles.emailResultsArrowOpen : ''}`}
                  aria-hidden="true"
                >
                  ›
                </span>
              </button>

              {showEmailForm && (
                <div id="assessment-email-form" className={styles.emailResultsPanel}>
                  {!emailSubmitted ? (
                    <form
                      name="assessment-results"
                      method="POST"
                      data-netlify="true"
                      data-netlify-honeypot="bot-field"
                      className={styles.emailForm}
                      onSubmit={handleEmailSubmit}
                    >
                      <input type="hidden" name="form-name" value="assessment-results" />
                      <input type="hidden" name="subject" value="New ADHD Assessment Result - Yoana Nin" />
                      <input type="hidden" name="form-timestamp" value={formLoadTime.toString()} />
                      <input type="hidden" name="totalScore" value={totalScore.toString()} />
                      <input type="hidden" name="scoreRange" value={activeRange ? `${activeRange.min}-${activeRange.max}` : 'Not scored'} />
                      <input type="hidden" name="scoreSuggestion" value={activeRange?.suggestion || ''} />
                      <input type="hidden" name="nextStep" value={activeRange?.nextStep || ''} />
                      <input type="hidden" name="answersSummary" value={answersSummary} />
                      <input type="hidden" name="marketingConsent" value={marketingConsent ? 'yes' : 'no'} />
                      <input type="hidden" name="resultsConsent" value={resultsConsent ? 'yes' : 'no'} />

                      <div className={styles.honeypotField}>
                        <label htmlFor="assessment-bot-field">Do not fill this out if you're human</label>
                        <input id="assessment-bot-field" type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
                      </div>

                      <div className={styles.formIntro}>
                        <h3 className={styles.formTitle}>Send my results to my inbox</h3>
                        <p className={styles.formCopy}>
                          Get your score and next step by email, plus one follow-up email from Yoana related to your results.
                        </p>
                      </div>

                      <label className={styles.fieldLabel} htmlFor="assessment-email">
                        Email address
                      </label>
                      <input
                        id="assessment-email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className={styles.emailInput}
                        placeholder="you@example.com"
                        required
                      />

                      <label className={styles.checkboxRow}>
                        <input
                          type="checkbox"
                          checked={resultsConsent}
                          onChange={(event) => setResultsConsent(event.target.checked)}
                          required
                        />
                        <span>
                          I agree to receive my results email and one follow-up email related to my results.
                        </span>
                      </label>

                      <label className={styles.checkboxRow}>
                        <input
                          type="checkbox"
                          checked={marketingConsent}
                          onChange={(event) => setMarketingConsent(event.target.checked)}
                        />
                        <span>
                          I’d also like ongoing tips, updates, and offers from Yoana.
                        </span>
                      </label>

                      <p className={styles.formLegal}>
                        Unsubscribe anytime. See <Link to="/privacy">Privacy Policy</Link>.
                      </p>

                      {submitError && <p className={styles.formError}>{submitError}</p>}

                      <button
                        type="submit"
                        className={`${styles.navButton} ${styles.primaryButton} ${styles.submitButton}`}
                        disabled={!email.trim() || !resultsConsent || isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send My Results'}
                      </button>
                    </form>
                  ) : (
                    <div className={styles.emailSuccess}>
                      <h3 className={styles.formTitle}>You’re on the list for your results.</h3>
                      <p className={styles.formCopy}>
                        {marketingConsent
                          ? 'Your assessment results are on the way, and you opted in for future updates and offers.'
                          : 'Your assessment results are on the way, along with one follow-up email related to your results.'}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className={styles.ctaRow}>
              <Link
                to="/contact"
                className={`btn btn-primary ${styles.ctaButton}`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Book Your Free Discovery Call
              </Link>
              <button type="button" onClick={restartAssessment} className={`${styles.navButton} ${styles.secondaryButton}`}>
                Retake Assessment
              </button>
            </div>
          </section>
        )}

        <p className={styles.disclaimer}>
          ADHD-focused life coaching for women entrepreneurs. This assessment is for coaching and self-reflection only,
          not therapy or medical advice.
        </p>
      </div>
    </div>
  );
};

export default Assessment;