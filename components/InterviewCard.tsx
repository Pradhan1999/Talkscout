import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

import { Button } from "./ui/button";
import DisplayTechIcons from "./DisplayTechIcons";

import { cn, getRandomInterviewCover } from "@/lib/utils";
import { getFeedbackByInterviewId } from "@/lib/actions/general.action";

const InterviewCard = async ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback =
    userId && interviewId
      ? await getFeedbackByInterviewId({ interviewId, userId })
      : null;

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  /* badge uses saturated Neo-Brutalist accent colours */
  const badge =
    {
      Behavioral: { bg: "bg-nb-teal",   text: "text-nb-white" },
      Mixed:      { bg: "bg-nb-purple", text: "text-nb-white" },
      Technical:  { bg: "bg-nb-pink",   text: "text-nb-white" },
    }[normalizedType] ?? { bg: "bg-nb-yellow", text: "text-nb-black" };

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <div className="w-[360px] max-sm:w-full min-h-96 bg-nb-white border-[3px] border-nb-black rounded-2xl shadow-[6px_6px_0px_#111111] overflow-hidden flex flex-col">
      <div className="flex flex-col p-6 gap-6 flex-1 relative">

        {/* ── type badge ── */}
        <div className={cn(
          "absolute top-0 right-0 px-4 py-2 rounded-bl-2xl rounded-tr-xl border-l-[3px] border-b-[3px] border-nb-black",
          badge.bg
        )}>
          <p className={cn("text-xs font-black uppercase tracking-wider", badge.text)}>
            {normalizedType}
          </p>
        </div>

        {/* ── cover image ── */}
        <div className="border-[3px] border-nb-black shadow-[3px_3px_0px_#F5C800] rounded-xl overflow-hidden w-fit">
          <Image
            src={getRandomInterviewCover()}
            alt="cover"
            width={80}
            height={80}
            className="object-cover size-[80px]"
          />
        </div>

        {/* ── role ── */}
        <h3 className="capitalize text-nb-black leading-tight mt-1">
          {role} Interview
        </h3>

        {/* ── meta row ── */}
        <div className="flex flex-row gap-5">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-nb-cream border-[2px] border-nb-black rounded-lg shadow-[2px_2px_0px_#111111]">
            <Image src="/calendar.svg" width={14} height={14} alt="date" />
            <span className="text-xs font-bold text-nb-black">{formattedDate}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-nb-cream border-[2px] border-nb-black rounded-lg shadow-[2px_2px_0px_#111111]">
            <Image src="/star.svg" width={14} height={14} alt="score" />
            <span className="text-xs font-bold text-nb-black">
              {feedback?.totalScore ?? "---"}/100
            </span>
          </div>
        </div>

        {/* ── assessment blurb ── */}
        <p className="line-clamp-2 text-sm text-nb-black/65 leading-relaxed flex-1">
          {feedback?.finalAssessment ||
            "You haven't taken this interview yet. Take it now to improve your skills."}
        </p>

        {/* ── footer ── */}
        <div className="flex flex-row justify-between items-center pt-2 border-t-[2px] border-nb-black/10">
          <DisplayTechIcons techStack={techstack} />

          <Button asChild variant="default" size="sm">
            <Link
              href={
                feedback
                  ? `/interview/${interviewId}/feedback`
                  : `/interview/${interviewId}`
              }
            >
              {feedback ? "Check Feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
