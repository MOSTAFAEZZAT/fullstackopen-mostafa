import { useEffect, useState } from 'react'
import { getAllDiaries } from './services/diary'
import type { NewDiaryEntry } from './types'
import { addDiary } from './services/diary'

function App() {
  const [diaries, setDiaries] = useState<NewDiaryEntry[]>([])
  const [date, setDate] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [visibility, setVisibility] = useState<string>(''); 
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    console.log('Fetching diaries...');
    getAllDiaries().then(response => {
      setDiaries(response.data)
      console.log('Diaries fetched:', response.data);
    })
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDiaryEntry = {
      date,
      weather,
      visibility,
      comment
    };
    setDiaries([...diaries, newDiaryEntry]);
    addDiary(newDiaryEntry).then(response => {
      console.log('Diary entry added:', response.data);
    }).catch(error => {
      console.error('Error adding diary entry:', error);
    });
    setDate('');
    setWeather('');
    setVisibility('');
    setComment('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>
          Date: <input type="date" name="date" onChange={(e) => setDate(e.target.value)} />
        </p>
        <p>
          Weather:
          <label>
            <input type="radio" name="weather" value="sunny" onChange={(e) => setWeather(e.target.value)} />
            Sunny
          </label>
          <label>
            <input type="radio" name="weather" value="rainy" onChange={(e) => setWeather(e.target.value)} />
            Rainy
          </label>
          <label>
            <input type="radio" name="weather" value="cloudy" onChange={(e) => setWeather(e.target.value)} />
            Cloudy
          </label>
          <label>
            <input type="radio" name="weather" value="stormy" onChange={(e) => setWeather(e.target.value)} />
            Stormy
          </label>
          <label>
            <input type="radio" name="weather" value="windy" onChange={(e) => setWeather(e.target.value)} />
            Windy
          </label>
        </p>
        <p>
          Visibility:
          <label>
            <input type="radio" name="visibility" value="great" onChange={(e) => setVisibility(e.target.value)} />
            Great
          </label>
          <label>
            <input type="radio" name="visibility" value="good" onChange={(e) => setVisibility(e.target.value)} />
            Good
          </label>
          <label>
            <input type="radio" name="visibility" value="ok" onChange={(e) => setVisibility(e.target.value)} />
            Ok
          </label>
          <label>
            <input type="radio" name="visibility" value="poor" onChange={(e) => setVisibility(e.target.value)} />
            Poor
          </label>
        </p>
        <p>
          Comment: <input type="text" name="comment" onChange={(e) => setComment(e.target.value)} />
        </p>
        <button type="submit">Add Diary Entry</button>
      </form>

      <h1>Flight Diary</h1>
      <ul>
        {diaries.map((diary, index) => (
          <li key={index}>
            <h2>{diary.weather}</h2>
            <p>{diary.visibility}</p>
            <p>{diary.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
