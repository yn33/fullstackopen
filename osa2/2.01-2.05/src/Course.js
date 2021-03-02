import React from 'react'

const Header = (props) => {
    return (
      <>
        <h1>{props.course}</h1>
      </>
    )
  }
  
  const Part = (props) => {
    return (
      <>
        <p>
          {props.part.name} {props.part.exercises}
        </p>
      </>
    )
  }
  
  const Content = (props) => {
    return (
      <>
        {props.parts.map(part => 
        <Part key={part.id} part={part}/>
        )}
      </>
    )
  }
  
  const Total = (props) => {
    return (
      <>
        <b>total of {props.parts.map(part => part.exercises).reduce( (s, p) => s + p)} exercises</b>
      </>
    )
  }
  
  const Course = ({course}) => {
    return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
    )
  }

export default Course