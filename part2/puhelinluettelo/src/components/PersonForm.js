import React from 'react';

const PersonForm = ({ id, name, number, removePerson }) => (
  <div>
    <li className='person'>
      {name}{' '}
      {number}{' '}
      <button onClick={() => removePerson({ id, name })}>delete</button>
    </li>
  </div>
);


export default PersonForm;