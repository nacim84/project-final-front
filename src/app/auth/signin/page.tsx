"use client"

import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { SiweMessage } from "siwe";
import { useAccount, useNetwork, useSignMessage } from "wagmi";
import { useEffect, useState } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { ButtonWithPending } from "@/components/ui/button-with-pending";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import SuccessIcon from "../../../../public/svg/success-icon.svg";
import FailureIcon from "../../../../public/svg/failure-icon.svg";
import Image from "next/image";

export default function SignInPage() {
  const { data: session } = useSession();
  console.log("Session : " + JSON.stringify(session))
  const [mounted, setMounted] = useState(false);
  const { address, isConnecting, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { signMessageAsync } = useSignMessage();
  const [hasSigned, setHasSigned] = useState(false);
  const { open } = useWeb3Modal();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => setMounted(true), []);

  const handleSignIn = async () => {
    try {
      const message = new SiweMessage({
        domain: window.location.host,
        uri: window.location.origin,
        version: "1",
        address: address,
        statement: process.env.NEXT_PUBLIC_SIGNIN_MESSAGE,
        nonce: await getCsrfToken(),
        chainId: chain!.id,
      });

      const signedMessage = await signMessageAsync({
        message: message.prepareMessage(),
      });

      setHasSigned(true);

      await signIn("EthWeb3", {
        message: JSON.stringify(message),
        signedMessage,
        redirect: true,
        callbackUrl: searchParams.get("callbackUrl") || "/"
      });
      // if (response) {
      //   toast({
      //     description: "Auth successfully.",
      //     children: <Image src={SuccessIcon} className="w-6 h-6" alt="success" />,
      //   });
      // } else {
      //   console.log("Error occured:", response.error);
      //   toast({
      //     description: response.error,
      //     children: <Image src={FailureIcon} className="w-6 h-6" alt="failure" />,
      //   })
      // }
    } catch (error) {
      console.log("Error Occured", error);
    }
  };

  return (
    <>{
      mounted
        ?
        <div className="flex flex-col items-center justify-center gap-6">
          <h3 className='text-2xl font-semibold'>Sign-in</h3>
          <div className="flex flex-col items-center justify-center max-w-3xl">
            <ul className="space-y-10 list-none bg-violet-200/80 dark:bg-violet-900/40 min-w-[30vw] min-h-[10vw] p-10 rounded-lg shadow-lg">
              <li className="flex bg-white p-2 rounded-full items-center justify-end w-[500px]">
                {isConnected && <span className="text-sm text-primary truncate max-w-[380px] italic font-semibold">Address : {address}</span>}
                <ButtonWithPending
                  className={cn("rounded-full w-[200px] font-semibold", !isConnected && "w-full")}
                  onClick={() => open()}
                  pending={isConnecting}
                >
                  {!isConnected ? "Connect Wallet" : "Disconnect"}
                </ButtonWithPending>
              </li>

              <li className="flex items-center bg-white p-2 rounded-full w-full">
                <ButtonWithPending
                  className="w-full rounded-full font-semibold"
                  onClick={handleSignIn}
                  pending={hasSigned}
                  disabled={!isConnected}
                >
                  Sign-in
                </ButtonWithPending>
              </li>
            </ul>
          </div>
        </div>
        :
        null
    }
    </>
  );
}