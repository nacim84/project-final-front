"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "./ui/use-toast";
import Image from "next/image";
import FailureIcon from "../../public/svg/failure-icon.svg";
import { ButtonWithPending } from "./ui/button-with-pending"
import { readContract } from '@wagmi/core';
import { useState } from "react"
import { contractAddress, resolutionsVotingAbi } from "@/constants/common.constants"
import { IVoteContract } from "@/models/common.model"
import { convertToDate } from "@/lib/utils"
import { useAccount } from "wagmi"

const formSchema = z.object({
 voteId: z.number().min(1, {
  message: "Vote id must be greater than 1.",
 })
})

export const GetVoteCommonForm = () => {

 const [foundVote, setFoundVote] = useState<IVoteContract | null>(null);
 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   voteId: 1
  },
 });
 const pending = form.formState.isSubmitting;
 const { toast } = useToast();
 const account = useAccount();

 const getVoteByIdVoteHandler = async (values: z.infer<typeof formSchema>) => {
  try {
   const vote = await readContract({
    address: contractAddress as `0x${string}`,
    abi: resolutionsVotingAbi,
    functionName: 'getVote',
    account: account.address,
    args: [BigInt(values.voteId)]
   });

   const foundVote = vote as IVoteContract;
   setFoundVote(foundVote);
  } catch (err) {
   const error = err as Error;
   console.log(error.message)
   toast({
    description: error.message,
    children: <Image src={FailureIcon} className="w-6 h-6" alt="failure" />,
   })
  }
 };

 return (
  <div className="bg-transparent h-full w-full m-auto flex flex-col gap-10">
   <Form {...form}>
    <form onSubmit={form.handleSubmit(getVoteByIdVoteHandler)} className="space-y-4">
     <FormField
      control={form.control}
      name="voteId"
      render={({ field }) => (
       <FormItem>
        <FormControl>
         <Input placeholder="Vote id" className="rounded-lg" {...field} />
        </FormControl>
        <FormMessage />
       </FormItem>
      )}
     />
     <ButtonWithPending size="sm" disabled={pending} className="w-full bg-fuchsia-400/40 rounded-full transition duration-150 hover:bg-fuchsia-300/40" pending={pending}>Submit</ButtonWithPending>
    </form>
   </Form>
   {
    foundVote
    &&
    <div className="text-white text-base flex flex-col items-start justify-center">
     <p className="truncate max-w-[25vw]">HashDescription : <strong className="text-fuchsia-300">{String(foundVote.hashDescription)}</strong></p>
     <span>StartDate: <strong className="text-fuchsia-300">{convertToDate(Number(foundVote.startDate))}</strong></span>
     <span>EndDate: <strong className="text-fuchsia-300">{convertToDate(Number(foundVote.endDate))}</strong></span>
     <span>IsEnabled: <strong className="text-fuchsia-300">{String(foundVote.isEnabled)}</strong></span>
    </div>
   }
  </div>
 )
};