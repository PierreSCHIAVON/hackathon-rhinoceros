import React from 'react';
import IActivity from '../interfaces/IActivity';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';

const ActivityCard: React.FC<{ activity: IActivity }> = ({ activity }) => {
  

  return (
    <Card className="w-full">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          { activity.title }
        </Typography>
        <Typography variant='small'>Lieu : { activity.Zone.name }</Typography>
        <Typography variant='paragraph'>{ activity.description }</Typography>
      </CardBody>
      {/* <CardFooter className="pt-0">
        <Button>Read More</Button>
      </CardFooter> */}
    </Card>
  );
};

export default ActivityCard;
