import React from 'react';
import IActivity from '../interfaces/IActivity';
import ActivityCard from './activityCard';
import { Typography, Input } from '@material-tailwind/react';

const Activities: React.FC = () => {
  const activities: IActivity[] = [
    {
      id: 1,
      title: 'Activity 1',
      description: 'Super activity really active',
      type: '',
      zone: {
        id: 1,
        name: 'Zone 1',
      }
    },
    {
      id: 2,
      title: 'Activity 2',
      description: 'Super activity really active',
      type: '',
      zone: {
        id: 1,
        name: 'Zone 1',
      }
    },
    {
      id: 3,
      title: 'Activity 3',
      description: 'Super activity really active',
      type: '',
      zone: {
        id: 2,
        name: 'Zone 2',
      }
    },
    {
      id: 4,
      title: 'Activity 4',
      description: 'Super activity really active',
      type: '',
      zone: {
        id: 4,
        name: 'Zone 4',
      }
    },

  ];

  return (
    <div className='p-4'>
      <Typography variant='h2' className='mb-4'>Activités</Typography>
      <div className='flex flex-col gap-4 px-4'>
        { activities.map((activity: IActivity) => {
          return <ActivityCard key={ activity.id } activity={ activity } />
        }) }
      </div>
    </div>
  );
};

export default Activities;