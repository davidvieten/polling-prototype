import React from 'react';
import Card from './Card';

interface AllStarTeamCardProps {
  forwards: string[];
  defensemen: string[];
  goalie: string;
}

const AllStarTeamCard: React.FC<AllStarTeamCardProps> = ({ forwards, defensemen, goalie }) => {
  return (
    <Card title="All-Star Team">
      <h3>Forwards</h3>
      <ul>
        {forwards.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
      <h3>Defensemen</h3>
      <ul>
        {defensemen.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
      <h3>Goalie</h3>
      <p>{goalie}</p>
    </Card>
  );
};

export default AllStarTeamCard;
