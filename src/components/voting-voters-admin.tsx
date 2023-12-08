
import { CommonDialog } from "./common-dialog";
import { FileUp } from "lucide-react";
import { GetVoterForm } from "./get-voter-form";
import { GetVotedVoterForm } from "./get-voted-voter-form";

interface VotingVotersAdminProps {
 disabled: boolean;
}

export const VotingVotersAdmin = () => {

 return (
  <div className="p-4 bg-violet-950 rounded-3xl w-full flex flex-col gap-4">
   <h1 className='text-white font-bold text-xl text-center'>Electeurs</h1>
   <CommonDialog component={<GetVoterForm />} text="Get registered voter" title="Get registered voter" icon={<FileUp className='h-5 w-5' />} size="lg" variant="customPositive" />
   <CommonDialog component={<GetVotedVoterForm />} text="Get voted voter" title="Get voted voter" icon={<FileUp className='h-5 w-5' />} size="lg" variant="customPositive" />
  </div>
 )
};