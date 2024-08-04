import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Upsert HabitTypes one by one
  const habitTypeReading = await prisma.habitType.upsert({
    where: { id: 'READING' },
    update: {},
    create: { id: 'READING' },
  });
  console.log('Upserted HabitType:', habitTypeReading);

  const habitTypeCoding = await prisma.habitType.upsert({
    where: { id: 'CODING' },
    update: {},
    create: { id: 'CODING' },
  });
  console.log('Upserted HabitType:', habitTypeCoding);

  const habitTypeExercising = await prisma.habitType.upsert({
    where: { id: 'EXERCISING' },
    update: {},
    create: { id: 'EXERCISING' },
  });
  console.log('Upserted HabitType:', habitTypeExercising);

  const habitTypeDieting = await prisma.habitType.upsert({
    where: { id: 'DIETING' },
    update: {},
    create: { id: 'DIETING' },
  });
  console.log('Upserted HabitType:', habitTypeDieting);

  // Upsert HabitRythms one by one
  const habitRythmEveryday = await prisma.habitRythm.upsert({
    where: { id: 'EVERYDAY' },
    update: {},
    create: { id: 'EVERYDAY' },
  });
  console.log('Upserted HabitRythm:', habitRythmEveryday);

  const habitRythmEveryweek = await prisma.habitRythm.upsert({
    where: { id: 'EVERYWEEK' },
    update: {},
    create: { id: 'EVERYWEEK' },
  });
  console.log('Upserted HabitRythm:', habitRythmEveryweek);

  const habitRythmEverymonth = await prisma.habitRythm.upsert({
    where: { id: 'EVERYMONTH' },
    update: {},
    create: { id: 'EVERYMONTH' },
  });
  console.log('Upserted HabitRythm:', habitRythmEverymonth);

  // Upsert User
  const user = await prisma.user.upsert({
    where: { email: 'test@gmail.com' },
    update: {},
    create: {
      email: 'test@gmail.com',
      name: 'Thomas',
      password: '$2b$10$f6l4RsViFOI0.qzj6yIYCut4aBJbSdsZcS.zSnP37bMTBn8Wre1.S',
    },
  });

  console.log('Upserted User:', user);

  // Create Habits one by one
  const habitReadABook = await prisma.habit.create({
    data: {
      name: 'Read a book',
      typeId: 'READING',
      rythmId: 'EVERYDAY',
      userId: user.id
    }
  });
  console.log('Created Habit:', habitReadABook);

  const habitWriteCode = await prisma.habit.create({
    
    data: {
      name: 'Write code',
      typeId: 'CODING',
      rythmId: 'EVERYWEEK',
      userId: user.id,
    },
  });
  console.log('Created Habit:', habitWriteCode);

  const habitGoForRun = await prisma.habit.create({
    
    data: {
      name: 'Go for a run',
      typeId: 'EXERCISING',
      rythmId: 'EVERYMONTH',
      userId: user.id,
    },
  });
  console.log('Created Habit:', habitGoForRun);

  const habitFollowDiet = await prisma.habit.create({
    data: {
      name: 'Follow a diet',
      typeId: 'DIETING',
      rythmId: 'EVERYDAY',
      userId: user.id,
    },
  });
  console.log('Created Habit:', habitFollowDiet);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });