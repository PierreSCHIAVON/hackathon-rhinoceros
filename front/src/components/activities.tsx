import React, { useEffect, useState } from 'react';
import IActivity from '../interfaces/IActivity';
import ActivityCard from './activityCard';
import { Typography, Select, Option, IconButton } from '@material-tailwind/react';
import axios, { AxiosResponse } from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import IZone from '../interfaces/IZone';

const Activities: React.FC = () => {
  const activitiesEndpoint = import.meta.env.VITE_API_URL + '/activities';

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [activitiesZonesList, setActivitiesZonesList] = useState<IZone[]>([]);
  const [currentZoneFilter, setCurrentZoneFilter] = useState<string | undefined>(undefined);

  useEffect(() => {
    axios.get(activitiesEndpoint)
      .then((res: AxiosResponse<IActivity[]>) => {
        const activitiesData = Array.isArray(res.data) ? res.data : [];
        setActivities(activitiesData);

        const zones: IZone[] = [];
        for (const activity of activitiesData) {
          if (!zones.find(z => z.id === activity.Zone.id)) {
            zones.push(activity.Zone);
          }
        }
        setActivitiesZonesList(zones);
      })
      .catch((error) => {
        console.error('Error fetching activities:', error);
        toast.error('Une erreur est survenue lors de la récupération des données');
      });
  }, []);

  const updateFilter = (value: string | undefined) => {
    console.log(value);
    setCurrentZoneFilter(value);
  }

  return (
    <div className='p-4 bg-gray-100'>
      <Toaster />
      <Typography variant='h2' className='mb-4'>Activités</Typography>
      <div className="w-72 mb-4 flex gap-2">
        <Select label="Zone" onChange={updateFilter}>
          { activitiesZonesList.map((zone: IZone) => {
            return <Option key={ zone.id } value={ zone.id.toString() }>{ zone.name }</Option>
          }) }
        </Select>
        { currentZoneFilter && <IconButton onClick={() => setCurrentZoneFilter(undefined)}><i className='fas fa-trash'></i></IconButton> }
      </div>
      <div className='flex flex-col gap-4'>
        { activities.map((activity: IActivity) => {
          return !currentZoneFilter || activity.Zone.id.toString() === currentZoneFilter ? <ActivityCard key={ activity.id } activity={ activity } /> : null
        }) }
      </div>
    </div>
  );
};

export default Activities;