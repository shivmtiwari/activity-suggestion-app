
import React, { useState, useEffect } from 'react';
import SwipeableCard from './SwipeableCard';
import './App.css';

const App = () => {
  const [activity, setActivity] = useState(null);
  const [previousActivities, setPreviousActivities] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState();

//get activity data from API
  const fetchActivity = async () => {
    try {
      const response = await fetch('https://www.boredapi.com/api/activity');
      const data = await response.json();
      setActivity(data);
      setBackgroundColor(generateRandomColor());
    } catch (error) {
      console.log('Error fetching activity:', error);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, []);

   // function to remember previous acvities 
  const rememberActivity = () => {
    if (activity) {
      setPreviousActivities(prevActivities => [activity, ...prevActivities]);
    }
    fetchActivity();
  };

  // function to handle left swipe
  const handleSwipeLeft = () => {
    rememberActivity();
    console.log('Swiped left');
  };

// function to handle right swipe
  const handleSwipeRight = () => {
    if (previousActivities.length > 0) {
      const lastActivity = previousActivities[0];
      setPreviousActivities(prevActivities => prevActivities.slice(1));
      setActivity(lastActivity);
      setBackgroundColor(generateRandomColor());
      console.log('Swiped right');
    }
  };



// function to generate backgroudnd color
  function generateRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 20) + 30; // Adjust saturation range
    const lightness = Math.floor(Math.random() * 10) + 80; // Adjust lightness range
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  return (
    <>
    <div className="App">
    <h2>Activity Suggestion App</h2>
      <SwipeableCard activity={activity} backgroundColor={backgroundColor} onSwipeRight={handleSwipeRight} onSwipeLeft={handleSwipeLeft} />
    </div>
    </>
  );
};

export default App;
