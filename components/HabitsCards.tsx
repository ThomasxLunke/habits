"use client"

import { Habit } from '@/global-type'
import React from 'react'

type HabitsCardsProps = {
  habits: Habit[]
}

const HabitsCards = ({ habits }: HabitsCardsProps) => {
  console.log(habits)
  return (
    <div>
      {
        habits.map((habit) => (
          <p key={habit.id}>{habit.name}</p>
        ))
      }
    </div>
  );
};

export default HabitsCards;
