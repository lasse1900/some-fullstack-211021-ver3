import React from "react";

export const Course = ({ courses }) => {
  return (
    <div>
      <Header name={courses.name} />
      <Content parts={courses.parts} />
      <Total exercises={courses.parts.map((part) => part.exercises)} />
    </div>
  );
};

export const Header = ({ name }) => {
  console.log("Header", name);
  return (
    <div>
      <b>{name}</b>
    </div>
  );
};

export const Content = ({ parts }) => {
  console.log("--->", parts);
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

export const Part = ({ part }) => {
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  );
};

export const Total = ({ exercises }) => {
  const total = exercises.reduce(function (sum, exercise) {
    return sum + exercise;
  }, 0);
  return (
    <div>
      <p>
        <i><b>Yhteensä:</b> {total} harjoitusta</i>
      </p>
    </div>
  );
};
