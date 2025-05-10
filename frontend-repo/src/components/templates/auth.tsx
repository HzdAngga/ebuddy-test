import type { FC, ReactNode } from "react";

import Image from "next/image";

export interface AuthTemplateProps {
  children?: ReactNode;
  logo?: boolean;
}

export const AuthTemplate: FC<AuthTemplateProps> = ({
  children,
  logo = true,
}) => {
  return (
    <main className='relative z-0 h-dvh w-full bg-black'>
      <div className='flex h-full items-center justify-center bg-black'>
        <div className=' min-h-20 w-full border border-electric-violet-100 bg-white p-2 h-full sm:h-max sm:max-w-[430px] sm:rounded-2xl'>
          <div className='relative h-full w-full rounded-lg bg-white'>
            <div
              aria-hidden='true'
              className='pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_right,#9422ff2e_1px,transparent_1px),linear-gradient(to_bottom,#9422ff2e_1px,#f6f1ff80_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_40%_20%_at_50%_0%,#000_10%,transparent_110%)]'
            />
            <div className='relative z-10 flex h-full flex-col justify-center px-6 pb-6 pt-14'>
              {logo && (
                <div className='flex justify-center mb-10'>
                  <Image
                    src='/next.svg'
                    alt='Next.js logo'
                    width={180}
                    height={38}
                    priority
                  />
                </div>
              )}
              {children}
            </div>
          </div>
        </div>
      </div>
      <div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:56px_56px]'>
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 -z-10 m-auto h-[315px] w-[315px] rounded-full bg-primary opacity-25 blur-[120px]'
        />
      </div>
    </main>
  );
};
