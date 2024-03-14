import { useState } from 'react'


const Statistics = (props) => {

  return (
    <>
      <div style={{ display: "inline-flex" }}>
        <button onClick={props.handleClick}>{props.name}  </button>


      </div >
    </>)
}

const App = (props) => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [avgScore, setAvgScore] = useState([])
  const [totalAvgScore, setTotalAvgScore] = useState(0)

  const handleGood = () => {
    avgScore.push(1);
    setAvgScore(avgScore);
    setTotalAvgScore(totalAvgScore + 1)
    setGood(good + 1);
    console.log(totalAvgScore)
  }
  const handleNeutral = () => {
    avgScore.push(0);
    setAvgScore(avgScore);
    setTotalAvgScore(totalAvgScore + 0)
    setNeutral(neutral + 1);
  }

  const handleBad = () => {
    avgScore.push(-1);
    setAvgScore(avgScore);
    setTotalAvgScore(totalAvgScore - 1)
    setBad(bad + 1)

  }
  if (avgScore.length > 0) {
    return (
      <div>
        <h1>Give Feedback</h1>
        <Statistics handleClick={handleGood} name="good" value={good} />
        <Statistics handleClick={handleNeutral} name="neutral" value={neutral} />
        <Statistics handleClick={handleBad} name="bad" value={bad} />

        <h1>Statistics</h1>
        <table>

          <tr>   good
            <td>{good}</td>
          </tr>
          <tr>   neutral
            <td>{neutral}</td>
          </tr>

          <tr>   bad
            <td>{bad}</td>
          </tr>
          <tr>   all
            <td> {avgScore.length}</td>
          </tr>
          <tr>   average
            <td>{totalAvgScore / avgScore.length}</td>
          </tr>
          <tr>   positive
            <td> {good / avgScore.length}%</td>
          </tr>

        </table>
      </div>


    )
  } else {
    return (
      <div>
        <h1>Give Feedback</h1>
        <Statistics handleClick={handleGood} name="good" value={good} />
        <Statistics handleClick={handleNeutral} name="neutral" value={neutral} />
        <Statistics handleClick={handleBad} name="bad" value={bad} />

        <p> No feedback Given</p>
      </div>
    )
  }
}

export default App