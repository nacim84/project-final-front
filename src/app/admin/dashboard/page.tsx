"use client"

import { Card } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import { TallyVote } from '@/components/tally-vote';
import { VotingVotersAdmin } from '@/components/voting-voters-admin';
import { getAllUsersFromDb } from '@/server-actions/users';
import { getAllVotesFromDb } from '@/server-actions/votes';
import { IUser, IVote } from '@/models/common.model';
import { AllUsersTable } from '@/components/all-users-table';
import { AllVotesTable } from '@/components/all-votes-table';

const DashboardPage = () => {

 const [users, setUsers] = useState<IUser[]>([]);
 const [votes, setVotes] = useState<IVote[]>([]);

 // Load all users
 const getAllUsers = async () => {
  const response = await getAllUsersFromDb();
  if (response.flag) {
   setUsers(response.data as IUser[]);
  } else {
   console.error("Error Users  : ", response.error);
  }
 }

 // Load all votes
 const getAllVotes = async () => {
  const response = await getAllVotesFromDb();

  if (response.flag) {
   setVotes(response.data as IVote[]);
  } else {
   console.error("Error Votes  : ", response.error);
  }
 }

 useEffect(() => {
  getAllUsers();
  getAllVotes();
 }, []);

 return (
  <div className='flex flex-row-reverse gap-10 max-w-[90vw]'>
   <Card className="space-y-6 w-full h-full bg-primary-foreground min-w-[25vw] p-10 rounded-lg shadow-lg">
    <div className='flex flex-col items-center gap-20 justify-center'>
     <VotingVotersAdmin />
     <TallyVote />
    </div>
   </Card>
   <Card className="space-y-6 w-full h-full bg-primary-foreground min-w-[60vw] p-10 rounded-lg shadow-lg">
    <div className='flex items-center justify-center'>
     <Card className="space-y-6 h-full bg-primary-foreground min-w-[55vw] p-4 rounded-lg shadow-lg">
      <AllUsersTable data={users} />
     </Card>
    </div>
    <div className='flex items-center justify-center'>
     <Card className="space-y-6 h-full bg-primary-foreground min-w-[55vw] p-4 rounded-lg shadow-lg">
      <AllVotesTable data={votes} />
     </Card>
    </div>
   </Card>
  </div>
 )
};

export default DashboardPage;