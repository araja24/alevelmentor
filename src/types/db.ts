export type YearGroup = '12' | '13';

export type ExamBoard = 'Edexcel' | 'AQA' | 'OCR';

export type TargetGrade = 'A*' | 'A' | 'B' | 'C';

export type PrimaryStruggle =
  | 'Procrastination'
  | 'Lack of structure'
  | 'Poor revision techniques'
  | 'Time management'
  | 'Burnout';

export interface Profile {
  id: string;
  year_group: YearGroup | null;
  exam_board: string | null;
  subjects: string[];
  exam_dates: Record<string, string>;
  target_grades: Record<string, TargetGrade>;
  primary_struggle: PrimaryStruggle | null;
  weekly_revision_hours: number | null;
  onboarding_completed: boolean;
  created_at: string;
}

export interface OnboardingData {
  year_group: YearGroup | null;
  subjects: string[];
  exam_board: ExamBoard | null;
  exam_dates: Record<string, string>;
  target_grades: Record<string, TargetGrade>;
  primary_struggle: PrimaryStruggle | null;
  weekly_revision_hours: number;
}
