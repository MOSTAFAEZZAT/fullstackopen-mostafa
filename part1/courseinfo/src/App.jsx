import React from "react"

const course = 'Half Stack application development'
const parts = [
  {
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }
]

const Header = (props) => {
  return (
    <h1> {props.course}</h1>
  )

}


const Content = (props) => {
  console.log(props.parts);

  const partele = parts.forEach(element => {
  })
  let ele;
  return (
    <>

      <p>

        {props.parts[0].name}  {props.parts[0].exercises}
      </ p>
      <p>
        {props.parts[1].name}  {props.parts[1].exercises}
      </ p>
      <p>
        {props.parts[2].name}  {props.parts[2].exercises}
      </ p>

    </>
  )

}


const Part = (props) => {

  return (

    <p> {props.part} {props.exercises}</p>


  )
}
const Total = (props) => {
  return (

    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} </p>

  )

}

const App = () => {


  return (
    <div>
      <Header course={course} />

      <Content parts={parts}
      />
      <Total parts={parts} />

    </div>
  )
}

export default App