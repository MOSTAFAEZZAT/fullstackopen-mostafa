const getNonSensitiveEntries =
  (): Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>[] => {
    // ...
  }
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;