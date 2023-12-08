import React from 'react'
import { CommonDialog } from './common-dialog';
import { GetVoterVoterForm } from './get-voter-voter-form';
import { GetVotedVoterVoterForm } from './get-voted-voter-voter-form';
import { GetCurrentVoteCommonForm } from './get-current-vote-common-form';
import { GetVoteCommonForm } from './get-vote-common-form';
import { FileUp } from 'lucide-react';
import { Card } from './ui/card';

export const CommonGetters = () => {
 return (
  <Card className="flex items-center justify-between gap-4 w-full h-full bg-violet-200/80 dark:bg-violet-900/20 min-w-[80vw] py-4 px-6 rounded-lg shadow-lg">
   <div className="mx-auto w-full">
    <CommonDialog component={<GetVoterVoterForm />} text="Get registered voter" title="Get registered voter" icon={<FileUp className='h-5 w-5' />} size="lg" variant="customPositive" />
   </div>
   <div className="mx-auto w-full">
    <CommonDialog component={<GetVotedVoterVoterForm />} text="Get voted voter" title="Get voted voter" icon={<FileUp className='h-5 w-5' />} size="lg" variant="customPositive" />
   </div>
   <div className="mx-auto w-full">
    <CommonDialog component={<GetCurrentVoteCommonForm />} text="Get current vote" title="Get current vote" icon={<FileUp className='h-5 w-5' />} size="lg" variant="customPositive" />
   </div>
   <div className="mx-auto w-full">
    <CommonDialog component={<GetVoteCommonForm />} text="Get vote by id" title="Get vote by id" icon={<FileUp className='h-5 w-5' />} size="lg" variant="customPositive" />
   </div>
  </Card>
 )
};