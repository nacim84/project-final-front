import { buttonVariants } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { CommonDesignBg } from "./common-design-bg";
import Image from "next/image";
import EVote from "../../public/img/e-vote.jpg";

export default function HomePage() {
 return (
  <div className="w-full h-full">
   <div className="flex flex-col items-center h-full p-4 space-y-2">
    <div className="p-10 space-y-5 text-center">
     <h5 className="text-5xl font-bold">
      Welcome to Web3 Voting System App
     </h5>
     <p className="text-base text-gray-700 italic font-semibold">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum dicta
      nostrum perspiciatis blanditiis? Deleniti officia neque ipsam
      consequuntur quaerat reiciendis, consequatur sequi fuga aliquam
      laudantium commodi ad amet illo tenetur.
     </p>
    </div>
    <div className="mx-auto">
     <Link href="/profile" className={buttonVariants({ variant: "default", size: "default", className: "flex items-center justify-center gap-2 rounded-full font-semibold" })}>
      <span>Getting started</span>
      <MoveRight />
     </Link>
    </div>
   </div>
   <div className='mx-auto max-w-6xl px-6 lg:px-8 z-0'>
    <div className='mt-16 sm:mt-24 flex items-center justify-center'>
     <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 max-w-max mx-auto'>
      <Image
       src={EVote}
       alt='e-vote'
       className='w-[50vw] h-[42vh] rounded-md bg-white p-2 shadow-2xl ring-1 ring-gray-900/10'
      />
     </div>
    </div>
   </div>
   <CommonDesignBg />
  </div>
 )
};
