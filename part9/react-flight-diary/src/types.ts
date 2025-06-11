type DiaryEntry = {
  weather: string;
  visibility: string;
  comment: string;
};

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;