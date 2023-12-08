import { CommonProfile } from "@/components/common-profile";
import { CommonProfileTallyVote } from "@/components/common-profile-tally-vote";
import { getRequireNextAuthSession } from "@/lib/utils";
import { IVote } from "@/models/common.model";
import { getEnabledVoteFromDb } from "@/server-actions/votes";

const ProfilePage = async () => {

  const session = await getRequireNextAuthSession();

  // Load active vote to display 
  const enabledVote = await getEnabledVoteFromDb();

  return (
    <div className="flex flex-col gap-20 items-center justify-center" >
      <p className="text-2xl italic font-bold whitespace-nowrap">{
        (session && session.user)
        &&
        <>
          Bonjour <span className="text-primary">{session.user?.firstName} {session.user?.lastName}</span>, veuillez procéder au referendum municipale ci-dessous;
        </>
      }
      </p>

      <div className="flex flex-col md:flex-row-reverse items-start justify-center gap-10">
        {enabledVote && enabledVote.flag ?
          <CommonProfile enabledVote={enabledVote.data as IVote} />
          :
          <CommonProfileTallyVote />
        }
      </div>
    </div>
  );
};

export default ProfilePage;
