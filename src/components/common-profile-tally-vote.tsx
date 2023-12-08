"use client"

import { Card } from './ui/card';
import { MoveRight, Plus } from 'lucide-react';
import { buttonVariants } from './ui/button';
import Link from 'next/link';
import { VotedEvent, adminVotePath, contractAddress, reportPath, resolutionsVotingAbi } from '@/constants/common.constants';
import { CommonGetters } from './common-getters';
import { useSession } from 'next-auth/react';
import { usePublicClient } from 'wagmi';
import { BlockTag, parseAbiItem } from 'viem';
import { useEffect, useState } from 'react';
import { decryptAES } from '@/lib/utils';
import { readContract } from '@wagmi/core';

export const CommonProfileTallyVote = () => {
  const { data: session } = useSession();
  const client = usePublicClient();
  const [tallyVotePour, setTallyVotePour] = useState<string[]>([]);
  const [tallyVoteContre, setTallyVoteContre] = useState<string[]>([]);
  const [tallyVoteAbstention, setTallyVoteAbstention] = useState<string[]>([]);
  const [foundVoteId, setFoundVoteId] = useState<number>(0);

  const getVoteId = async () => {
    try {
      const voteId = await readContract({
        address: contractAddress as `0x${string}`,
        abi: resolutionsVotingAbi,
        functionName: 'voteId'
      });
      setFoundVoteId(Number(voteId));
    } catch (err) {
      const error = err as Error;
      console.log(error.message)
    }
  };

  const getResults = async () => {
    const events = await getEvents();
    events.map(item => {
      switch (decryptAES(item.voteChoice)) {
        case "POUR":
          setTallyVotePour([...tallyVotePour, item.voteChoice]);
          break;
        case "CONTRE":
          setTallyVoteContre([...tallyVoteContre, item.voteChoice]);
          break;
        case "ABSTENTION":
          setTallyVoteAbstention([...tallyVoteAbstention, item.voteChoice]);
          break;
        default:
          break;
      }
    });
  }

  const getEvents = async () => {
    const depositLogs = await client.getLogs({
      address: contractAddress as `0x${string}`,
      event: parseAbiItem(VotedEvent),
      fromBlock: BigInt(0),
      toBlock: 'latest' as BlockTag
    });
    const events = depositLogs.map(
      log => ({
        voteId: log.args.voteId,
        voterAddress: log.args.voterAddress,
        isRegistered: log.args.isRegistered,
        role: log.args.role,
        voteChoice: log.args.voteChoice
      })
    );
    return events;
  };

  useEffect(() => {
    getVoteId();
    getResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex flex-col gap-10 w-full'>
      <CommonGetters />
      <Card className="space-y-6 w-full h-full bg-violet-200/80 dark:bg-violet-900/20 min-w-[80vw] min-h-max p-10 rounded-lg shadow-lg">
        <div className='flex flex-col items-center justify-center mx-auto gap-16'>
          <div className='flex flex-col gap-20'>
            <p className='flex flex-col items-center justify-center text-lg italic font-normal'>
              <span>Aucun scrutin en cours.</span>
              {foundVoteId ? <span>Veuillez-trouver ci-dessous les resultas du derrnier scrutin;</span> : null}
            </p>
            {
              foundVoteId
                ?
                <div className='flex items-center justify-center gap-8 sm:gap-12 md:gap-28'>
                  <div className='p-1 flex flex-col items-center justify-center rounded-full w-36 h-36 shadow-lg bg-green-400'>
                    <span>Pour</span>
                    <strong className='text-2xl font-bold'>{tallyVotePour.length}</strong>
                  </div>
                  <div className='p-1 flex flex-col items-center justify-center rounded-full w-36 h-36 shadow-lg bg-gray-400'>
                    <span>Abstention</span>
                    <strong className='text-2xl font-bold'>{tallyVoteAbstention.length}</strong>
                  </div>
                  <div className='p-1 flex flex-col items-center justify-center rounded-full w-36 h-36 shadow-lg bg-red-400'>
                    <span>Contre</span>
                    <strong className='text-2xl font-bold'>{tallyVoteContre.length}</strong>
                  </div>
                </div>
                :
                null
            }
            <div className='flex gap-6 items-center justify-center'>
              {(session
                &&
                session.user
                &&
                session.user.role === "ADMIN")
                ?
                <div className='flex flex-col gap-2'>
                  <div className="mx-auto">
                    <Link href={adminVotePath} className={buttonVariants({ variant: "default", size: "default", className: "flex items-center justify-center gap-2 rounded-full font-semibold" })}>
                      <span>Créer un scrutin</span>
                      <Plus className='h-5 w-5' />
                    </Link>
                  </div>
                </div>
                :
                null
              }
              <div className='flex flex-col gap-2'>
                <div className="mx-auto">
                  <Link href={reportPath} className={buttonVariants({ variant: "default", size: "default", className: "flex items-center justify-center gap-2 rounded-full font-semibold" })}>
                    <span>Consulter le rapport</span>
                    <MoveRight className='h-5 w-5' />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
};