import React, { useState } from 'react';
import IActivity from '../interfaces/IActivity';
import ActivityCard from './activityCard';
import { Typography } from '@material-tailwind/react';
import axios, { AxiosResponse } from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Activities: React.FC = () => {
  const activitiesEndpoint = import.meta.env.VITE_API_URL + '/activities';

  const [activities, setActivities] = useState<IActivity[]>([]);
  
  axios.get(activitiesEndpoint)
    .then((res: AxiosResponse<IActivity[]>) => {      
      setActivities(res.data);
    })
    .catch(() => toast.error('Une erreur est survenue lors de la récupération des données'));

  console.log(activities)

  return (
    <div className='p-4 bg-gray-100'>
      <Toaster />
      <Typography variant='h2' className='mb-4'>Activités</Typography>
      <div className='flex flex-col gap-4'>
        { activities.map((activity: IActivity) => {
          return <ActivityCard key={ activity.id } activity={ activity } />
        }) }
      </div>
    </div>
  );
};

export default Activities;