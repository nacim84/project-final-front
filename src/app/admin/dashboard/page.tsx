import { Card } from '@/components/ui/card';
import React from 'react';
import { TallyVote } from '@/components/tally-vote';
import { VotingVotersAdmin } from '@/components/voting-voters-admin';

const DashboardPage = () => {
 return (
  <div className='flex flex-row-reverse gap-10'>

   <Card className="space-y-6 w-full h-full bg-violet-200/80 dark:bg-violet-900/20 min-w-[30vw] p-10 rounded-lg shadow-lg">
    <div className='flex flex-col items-center gap-20 justify-center'>
     <VotingVotersAdmin />
     <TallyVote />
    </div>
   </Card>

   <Card className="space-y-6 w-full h-full bg-violet-200/80 dark:bg-violet-900/20 min-w-[60vw] p-10 rounded-lg shadow-lg">
    <div className='flex items-center justify-center'>
     <Card className="space-y-6 h-full bg-violet-200/80 dark:bg-violet-900/20 min-w-[55vw] p-10 rounded-lg shadow-lg">
      <div className='flex items-center justify-center'>
       <h1 className='font-bold text-xl text-center'>Votes</h1>
      </div>
     </Card>
    </div>
    <div className='flex items-center justify-center'>
     <Card className="space-y-6 h-full bg-violet-200/80 dark:bg-violet-900/20 min-w-[55vw] p-10 rounded-lg shadow-lg">
      <div className='flex items-center justify-center'>
       <h1 className='font-bold text-xl text-center'>Users</h1>
      </div>
     </Card>
    </div>
   </Card>
  </div>
 )
};

export default DashboardPage;