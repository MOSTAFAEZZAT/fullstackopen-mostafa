
const Header = ({ courseName }: { courseName: string }) => {
  return <h1>{courseName}</h1>;
}

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </div>
  );
};


const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return  (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p>{part.description}</p>
        </div>
      )
    case "group":
     return(
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>Group project count: {part.groupProjectCount}</p>
         </div>
     )
    case "background":
     return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>{part.description}</p>
          <p>Background material: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a></p>
         </div>
      )
    case "special":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>{part.description}</p>
          <p>Requirements: {part.requirements.join(", ")}</p>
         </div>
      )
     default:
      return assertNever(part);
  }
   
}
const assertNever = (value: never): never => {
  throw new Error(`Unhandled case: ${JSON.stringify(value)}`);
};

const TotalExercises = ({ parts }: { parts: CoursePart[] }): number => {
  return parts.reduce((sum, part) => sum + part.exerciseCount, 0);
}
 
const App = () => {
 const courseName = "Half Stack application development";
 interface CoursePartBase {
  name: string;
  exerciseCount: number;
  kind: string;
}

interface CoursePartBasic extends CourseDescription {
  // description: string;
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CourseDescription   {
  // description: string;
  backgroundMaterial: string;
  kind: "background"
}
interface CourseDescription extends CoursePartBase {
  description: string;
}
interface CoursePartSpecial extends CourseDescription {
  name: string;
  description: string;
  exerciseCount: number;
  requirements: string[];
  kind: "special"
}
type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
  name: "Backend development",
  exerciseCount: 21,
  description: "Typing the backend",
  requirements: ["nodejs", "jest"],
  kind: "special"
  }
];

 
  return (
    <div>
      {/* <h1>{courseName}</h1> */}
      <Header courseName={courseName} />
      <Content parts={courseParts} />
      <p>Total exercises: {TotalExercises({ parts: courseParts })}</p>
    </div>
  );
};

export default App;