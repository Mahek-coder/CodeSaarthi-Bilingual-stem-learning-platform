export type Language = 'en' | 'hi' | 'mr' | 'te';

export interface TranslationSet {
  // Common Navbar
  brandName: string;
  homeLink: string;
  coursesLink: string;
  chatLink: string;
  leaderboardLink: string;
  loginButton: string;
  signupButton: string;
  logoutButton: string;

  // Hero Section
  heroBadge: string;
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroTitleSuffix: string;
  heroSubtitle: string;
  ctaGetStarted: string;
  ctaExploreCourses: string;
  studentTrust: string;

  // Stats
  statStudents: string;
  statLanguages: string;
  statCourses: string;
  statRating: string;

  // Interactive sandbox
  sandboxTitle: string;
  sandboxSubtitle: string;
  sandboxLangLabel: string;
  sandboxExplanationTitle: string;
  sandboxRunBtn: string;
  sandboxOutputLabel: string;

  // Features Section
  featuresTitle: string;
  featuresSubtitle: string;
  featBilingualTitle: string;
  featBilingualDesc: string;
  featAiSaarthiTitle: string;
  featAiSaarthiDesc: string;
  featInteractiveTitle: string;
  featInteractiveDesc: string;
  featVoiceTitle: string;
  featVoiceDesc: string;

  // Demo Section (STEM Concept)
  demoTitle: string;
  demoSubtitle: string;
  demoConceptTitle: string;
  demoConceptText: string;
  demoQuestion: string;
  demoA: string;
  demoB: string;
  demoC: string;
  demoD: string;
  demoSubmit: string;
  demoCorrectMsg: string;
  demoFeedbackTitle: string;

  // Login Page
  loginTitle: string;
  loginSubtitle: string;
  emailLabel: string;
  passwordLabel: string;
  forgotPassword: string;
  dontHaveAccount: string;
  alreadyHaveAccount: string;
  fullnameLabel: string;
  termsAgreement: string;
  orContinueWith: string;
  demoAccountBanner: string;
}

export type Translations = Record<Language, TranslationSet>;
