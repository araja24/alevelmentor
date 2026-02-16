export interface User {
  id: string;
  email: string;
  created_at: string;
  year_group: number | null;
  subjects: string[];
  exam_board: string | null;
  exam_date: string | null;
  target_grade: string | null;
  primary_obstacle: string | null;
  weekly_revision_hours: number | null;
  onboarding_completed: boolean;
}

export type YearGroup = 12 | 13;

export type ExamBoard = 'Edexcel' | 'AQA' | 'OCR';

export type TargetGrade = 'A*' | 'A' | 'B' | 'C';

export type PrimaryObstacle =
  | 'Procrastination'
  | 'Lack of structure'
  | 'Poor revision techniques'
  | 'Time management'
  | 'Burnout';

export interface OnboardingData {
  year_group: YearGroup | null;
  subjects: string[];
  exam_board: ExamBoard | null;
  exam_date: string | null;
  target_grade: TargetGrade | null;
  primary_obstacle: PrimaryObstacle | null;
  weekly_revision_hours: number;
}
