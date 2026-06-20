/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import Image from "next/image";

import InterviewCard from "@/components/InterviewCard";
import InterviewButton from "@/components/InterviewButton";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <div className="flex flex-col gap-12">

      {/* ── Hero CTA ── */}
      <section className="card-cta">
        <div className="flex flex-col gap-5 max-w-lg">
          <p className="text-nb-black/60 font-bold text-sm uppercase tracking-widest">
            AI-Powered Platform
          </p>
          <h2 className="text-5xl leading-[1.05] max-sm:text-3xl">
            Ace Your Next<br />Interview.
          </h2>
          <p className="text-nb-black/70 text-base font-medium leading-relaxed">
            Practice with our AI interviewer and get instant, detailed feedback
            to land your dream job.
          </p>
          <div className="mt-2">
            <InterviewButton />
          </div>
        </div>

        <div className="relative max-sm:hidden">
          {/* decorative teal sticker behind robot */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-nb-teal border-[3px] border-nb-black rounded-2xl shadow-[4px_4px_0px_#111111] -z-10" />
          {/* decorative pink sticker */}
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-nb-pink border-[3px] border-nb-black rounded-2xl shadow-[4px_4px_0px_#111111] -z-10" />
          <div className="border-[3px] border-nb-black shadow-[6px_6px_0px_#111111] rounded-2xl overflow-hidden bg-nb-cream">
            <Image
              src="/robot.png"
              alt="AI Interview Bot"
              width={320}
              height={320}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Your Interviews ── */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <h2 className="text-nb-black shrink-0">Your Interviews</h2>
          {/* neo-brutalist divider */}
          <div className="flex-1 h-[3px] bg-nb-black/15 rounded-full" />
          {hasPastInterviews && (
            <span className="shrink-0 inline-flex items-center justify-center h-8 px-3 bg-nb-teal text-nb-white text-xs font-black uppercase tracking-wide border-[2px] border-nb-black rounded-lg shadow-[2px_2px_0px_#111111]">
              {userInterviews?.length}
            </span>
          )}
        </div>

        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <div className="flex items-center gap-3 px-5 py-4 bg-nb-white border-[3px] border-nb-black rounded-xl shadow-[3px_3px_0px_#111111]">
              <span className="text-2xl">📋</span>
              <p className="font-bold text-nb-black/70">
                You haven&apos;t taken any interviews yet — start one above!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Take Interviews ── */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <h2 className="text-nb-black shrink-0">Take Interviews</h2>
          <div className="flex-1 h-[3px] bg-nb-black/15 rounded-full" />
          {hasUpcomingInterviews && (
            <span className="shrink-0 inline-flex items-center justify-center h-8 px-3 bg-nb-pink text-nb-white text-xs font-black uppercase tracking-wide border-[2px] border-nb-black rounded-lg shadow-[2px_2px_0px_#111111]">
              {allInterview?.length}
            </span>
          )}
        </div>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <div className="flex items-center gap-3 px-5 py-4 bg-nb-white border-[3px] border-nb-black rounded-xl shadow-[3px_3px_0px_#111111]">
              <span className="text-2xl">🚀</span>
              <p className="font-bold text-nb-black/70">
                No interviews available right now — check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

export default Home;
