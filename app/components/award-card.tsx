import React from 'react';
import Card from './vote-card';

interface AwardCardProps {
  title: string;
  nominees: string[];
}

const AwardCard: React.FC<AwardCardProps> = ({ title, nominees }) => {
  return (
    <Card title={title}>
      <ul>
        {nominees.map((nominee, index) => (
          <li key={index}>{nominee}</li>
        ))}
      </ul>
    </Card>
  );
};

export default AwardCard;
