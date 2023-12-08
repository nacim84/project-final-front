"use client"

import React from 'react'
import SuccessIcon from "../../public/svg/success-icon.svg"
import FailureIcon from "../../public/svg/failure-icon.svg";
import { Card } from './ui/card';
import CommonDialogVote from './common-dialog-vote';
import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core';
import { VotedEvent, contractAddress, resolutionsVotingAbi } from '@/constants/common.constants';
import { BlockTag, parseAbiItem } from 'viem';
import { usePublicClient } from 'wagmi';
import { useToast } from './ui/use-toast';
import Image from "next/image";
import { CommonGetters } from './common-getters';
import { IVote } from '@/models/common.model';
import { decryptAES, encryptAES } from '@/lib/utils';

interface CommonProfileProps {
  enabledVote: IVote;
}

export const CommonProfile = ({ enabledVote }: CommonProfileProps) => {
  const client = usePublicClient();
  const { toast } = useToast();

  const voteChoiceHandler = async (choice: string) => {
    try {
      const encryptChoice = encryptAES(choice);
      const { request } = await prepareWriteContract({
        address: contractAddress as `0x${string}`,
        abi: resolutionsVotingAbi,
        functionName: 'setVoteChoice',
        args: [encryptChoice]
      });
      const { hash } = await writeContract(request);

      await waitForTransaction({ hash: hash });
      const events = await getEvents();

      toast({
        description: `Voted successfully : ${events.map(
          e =>
            `VoterAddress : ${e.voterAddress},
              voteChoice : ${decryptAES(e.voteChoice)},
              VoteId : ${e.voteId}.`
        )}`,
        children: <Image src={SuccessIcon} className="w-6 h-6" alt="success" />,
      });
    } catch (err) {
      console.log((err as Error).message)
      toast({
        description: (err as Error).message,
        children: <Image src={FailureIcon} className="w-6 h-6" alt="failure" />,
      })
    };
  };

  const spanVoteItems = [
    { text: "Pour", className: "bg-green-400", action: voteChoiceHandler },
    { text: "Abstention", className: "bg-gray-400", action: voteChoiceHandler },
    { text: "Contre", className: "bg-red-400", action: voteChoiceHandler }
  ];

  const getEvents = async () => {
    const depositLogs = await client.getLogs({
      address: contractAddress as `0x${string}`,
      event: parseAbiItem(VotedEvent),
      fromBlock: "latest" as BlockTag,
      toBlock: 'latest' as BlockTag
    });
    const events = depositLogs.map(
      log => ({
        voterAddress: log.args.voterAddress,
        voteChoice: log.args.voteChoice,
        voteId: log.args.voteId
      })
    );
    return events;
  };
  return (
    <div className='flex flex-col gap-10 w-full'>
      <CommonGetters />
      <Card className="space-y-6 w-full h-full bg-violet-200/80 dark:bg-violet-900/20 min-w-[80vw] p-10 rounded-lg shadow-lg">
        <div className='flex flex-col items-center justify-center mx-auto gap-16'>
          <div className='flex flex-col gap-1 items-center justify-center'>
            <h1 className='text-2xl font-semibold'>Referendum municipale</h1>
            <p className='italic text-sm'>{`Date de début : ${enabledVote.startDate}.`}</p>
            <p className='italic text-sm'>{`Date de fin : ${enabledVote.endDate}.`}</p>
          </div>
          <div className='flex flex-col gap-20'>
            <p className='text-center text-lg italic font-normal'>
              {enabledVote.description}
            </p>
            <div className='flex items-center justify-center gap-8 sm:gap-12 md:gap-28'>
              {
                spanVoteItems.map(
                  (item, idx) =>
                    <CommonDialogVote key={idx} text={item.text} className={item.className} action={item.action} />
                )
              }
            </div>
          </div>
        </div>
      </Card>
    </div>)
};