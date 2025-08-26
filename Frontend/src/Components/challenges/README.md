# Challenge Components

This directory contains React components converted from the SwiftUI challenge code. These components provide a fun, interactive way for users to complete eco-friendly challenges and earn points.

## Components Overview

### 1. ChallengesView
The main container component that displays all challenges with category filtering.

**Props:**
- `challenges`: Array of challenge objects
- `onChallengeUpdated`: Callback function when a challenge is completed

**Features:**
- Horizontal category filter (All, Water, Energy, Recycling, Transportation, Nature)
- Responsive grid layout
- Empty state handling

### 2. ChallengeCard
Individual challenge card component that displays challenge information.

**Props:**
- `challenge`: Challenge object
- `onPress`: Callback function when card is tapped

**Features:**
- Image display with fallback
- Challenge status (completed/not started)
- Hover effects and animations

### 3. ChallengeDetailView
Modal component that shows detailed challenge information and allows completion.

**Props:**
- `challenge`: Challenge object to display
- `onChallengeUpdated`: Callback when challenge is completed
- `onClose`: Callback to close the modal

**Features:**
- Full challenge description
- Benefits explanation
- Challenge instructions
- Completion button

### 4. CongratulationsView
Celebration modal shown when a challenge is completed.

**Props:**
- `challengeTitle`: Title of the completed challenge
- `onDismiss`: Callback to close the modal

**Features:**
- Congratulations message
- Points earned display
- Back to challenges button

### 5. ChallengeImage
Smart image component with fallback handling.

**Props:**
- `imageName`: Name of the image file
- `title`: Challenge title for fallback
- `className`: CSS classes for styling

**Features:**
- Automatic fallback to placeholder if image fails to load
- Category-based icon selection
- Loading states

### 6. useChallengesViewModel
Custom hook that manages challenge state and logic.

**Returns:**
- `challenges`: Array of all challenges
- `activeChallenges`: Array of completed challenges
- `points`: Total points earned
- `startChallenge`: Function to complete a challenge
- `resetChallenges`: Function to reset all challenges

## Usage Example

```jsx
import React from 'react';
import { ChallengesView, useChallengesViewModel } from '../Components/challenges';

const FunChallengesPage = () => {
  const { challenges, startChallenge, points, activeChallenges } = useChallengesViewModel();

  const handleChallengeUpdated = (updatedChallenge) => {
    startChallenge(updatedChallenge);
  };

  return (
    <div>
      <h1>Fun Challenges</h1>
      <p>Points: {points}</p>
      <p>Completed: {activeChallenges.length}</p>
      
      <ChallengesView 
        challenges={challenges}
        onChallengeUpdated={handleChallengeUpdated}
      />
    </div>
  );
};
```

## Challenge Data Structure

Each challenge object should have:

```javascript
{
  id: 'unique-id',
  imageName: 'image-filename',
  title: 'Challenge Title',
  isSystemImage: false,
  category: 'water|energy|recycling|transportation|nature',
  description: 'Full challenge description',
  benefits: 'Why this challenge helps the planet',
  kidChallenge: 'Specific instructions for kids',
  isStarted: false
}
```

## Categories

- **Water**: Water conservation challenges
- **Energy**: Energy saving challenges  
- **Recycling**: Waste reduction and recycling
- **Transportation**: Eco-friendly travel
- **Nature**: Gardening and nature activities

## Styling

Components use Tailwind CSS for styling and include:
- Responsive design
- Smooth animations and transitions
- Hover effects
- Modern card-based layout
- Gradient backgrounds
- Shadow effects

## Image Requirements

- Place challenge images in `/public/images/` directory
- Use JPG format with descriptive names
- Recommended size: 400x300 pixels minimum
- Images should be eco-friendly and kid-appropriate

## Points System

- Each completed challenge awards 50 points
- Points are tracked in the view model
- Points persist during the session
- Reset function available to clear all progress
