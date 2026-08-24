import SceneCard from "./SceneCard";
import MilestoneBar from "./MilestoneBar";
import DimensionSelect from "./DimensionSelect";
import {
  openingStatement,
  identityStatement,
  perceptionStatement,
  arrivalStatement,
  eyeStatement,
  logoStatement,
} from "@/data/portfolio";

export default function Journey() {
  return (
    <>
      {/* S1 — WHO I AM */}
      <SceneCard index={0} heightClass="h-[150vh]">
        <div className="flex h-full flex-col justify-center">
          <p data-fade className="mb-6 font-mono text-[11px] uppercase tracking-[0.5em] text-cyber">
            {openingStatement.kicker}
          </p>
          <h1 className="serif max-w-4xl text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.95] text-paper">
            <span data-fade className="statement-line">Designing the</span>
            <span data-fade className="serif-italic statement-line text-cyber text-glow-cyan">
              intelligent
            </span>
            <span data-fade className="statement-line">
              interface.
            </span>
          </h1>
          <p data-fade className="mt-8 font-mono text-xs uppercase tracking-[0.35em] text-ghost">
            {openingStatement.meta}
          </p>
          <p data-fade className="mt-6 max-w-md text-sm leading-7 text-ghost">
            {openingStatement.description}
          </p>
          <div data-fade className="mt-12 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.35em] text-faint">
            <span className="scroll-hint-line w-24" />
            <span>the bird will guide you</span>
          </div>
        </div>
      </SceneCard>

      {/* S2 — BIRD LANDS ON THE NAME */}
      <SceneCard index={1} heightClass="h-[150vh]">
        <div className="flex h-full flex-col justify-center">
          <p data-fade className="mb-6 font-mono text-[11px] uppercase tracking-[0.5em] text-ghost">
            {identityStatement.label}
          </p>
          <h2
            data-fade
            className="glitch serif text-[clamp(5rem,20vw,15rem)] font-normal leading-none text-paper"
            data-glitch={identityStatement.name}
          >
            {identityStatement.name}
          </h2>
          <p data-fade className="serif-italic mt-8 max-w-lg text-xl leading-8 text-ghost md:text-2xl">
            {identityStatement.line}
          </p>
        </div>
      </SceneCard>

      {/* S3 — ENTER PERCEPTION (tunnel) */}
      <SceneCard index={2} heightClass="h-[280vh]" align="center">
        <div className="flex h-full flex-col items-center justify-center">
          <p data-fade className="font-mono text-[11px] uppercase tracking-[0.5em] text-cyber">
            {perceptionStatement.label}
          </p>
          <h2
            data-fade
            className="serif mt-6 text-center text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.95] text-paper"
          >
            {perceptionStatement.line}
          </h2>
          <p data-fade className="mt-6 max-w-md text-center text-sm leading-7 text-ghost">
            {perceptionStatement.detail}
          </p>
        </div>
      </SceneCard>

      {/* S4 — DEEPER PERSPECTIVE */}
      <SceneCard index={3} heightClass="h-[150vh]" align="center">
        <div className="flex h-full flex-col items-center justify-center">
          <p data-fade className="serif-italic max-w-lg text-center text-2xl leading-9 text-ghost md:text-3xl">
            “Perception is the journey.
            <br />
            Every idea begins somewhere in here.”
          </p>
        </div>
      </SceneCard>

      {/* S5 — ARRIVAL PLATFORM */}
      <SceneCard index={4} heightClass="h-[150vh]" align="center">
        <div className="flex h-full flex-col items-center justify-center">
          <p data-fade className="font-mono text-[11px] uppercase tracking-[0.5em] text-volt">
            {arrivalStatement.label}
          </p>
          <h2
            data-fade
            className="serif mt-6 text-center text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.95] text-paper"
          >
            {arrivalStatement.line}
          </h2>
          <p data-fade className="mt-6 max-w-md text-center text-sm leading-7 text-ghost">
            {arrivalStatement.detail}
          </p>
        </div>
      </SceneCard>

      {/* S6 — TIMELINE */}
      <SceneCard index={5} heightClass="h-[260vh]" align="center" id="timeline">
        <div className="flex h-full flex-col items-center justify-center">
          <p data-fade className="mb-4 font-mono text-[11px] uppercase tracking-[0.5em] text-ghost">
            THE JOURNEY SO FAR
          </p>
          <h2
            data-fade
            className="serif mb-16 text-center text-[clamp(2.4rem,7vw,5rem)] leading-[0.95] text-paper"
          >
            Seven years, <span className="serif-italic text-cyber text-glow-cyan">four mindsets.</span>
          </h2>
          <MilestoneBar />
        </div>
      </SceneCard>

      {/* S7 — FOUR DIMENSIONS */}
      <SceneCard index={6} heightClass="h-[260vh]" align="center" id="dimensions">
        <div className="flex h-full flex-col items-center justify-center">
          <p data-fade className="mb-4 font-mono text-[11px] uppercase tracking-[0.5em] text-ghost">
            FOUR WORLDS
          </p>
          <h2
            data-fade
            className="serif mb-16 text-center text-[clamp(2.4rem,7vw,5rem)] leading-[0.95] text-paper"
          >
            Every discipline is a{" "}
            <span className="serif-italic text-neon text-glow-neon">dimension</span> you can enter.
          </h2>
          <DimensionSelect />
        </div>
      </SceneCard>

      {/* S8 — INTO THE EYE */}
      <SceneCard index={7} heightClass="h-[140vh]" align="center">
        <div className="flex h-full flex-col items-center justify-center">
          <p data-fade className="serif-italic text-2xl text-ghost md:text-3xl">
            Look closer.
          </p>
        </div>
      </SceneCard>

      {/* S9 — SENTIENT EYE */}
      <SceneCard index={8} heightClass="h-[140vh]" align="center">
        <div className="flex h-full flex-col items-center justify-center">
          <p data-fade className="font-mono text-[11px] uppercase tracking-[0.5em] text-cyber">
            {eyeStatement.label}
          </p>
          <h2
            data-fade
            className="serif mt-6 text-center text-[clamp(2.4rem,7vw,5rem)] leading-[0.95] text-paper"
          >
            {eyeStatement.line}
          </h2>
          <p data-fade className="mt-6 font-mono text-xs tracking-[0.3em] text-ghost">
            {eyeStatement.detail}
          </p>
        </div>
      </SceneCard>

      {/* S10 — LOGO EMERGES / IDENTITY */}
      <SceneCard index={9} heightClass="h-[130vh]">
        <div className="flex h-full flex-col justify-center">
          <p data-fade className="mb-6 font-mono text-[11px] uppercase tracking-[0.5em] text-volt">
            {logoStatement.label}
          </p>
          <h2 className="serif max-w-3xl text-[clamp(2.6rem,7.5vw,6rem)] leading-[0.95] text-paper">
            <span data-fade className="statement-line">{logoStatement.line}</span>
            <span data-fade className="statement-line">
              {logoStatement.line2}
            </span>
            <span data-fade className="serif-italic statement-line text-cyber text-glow-cyan">
              {logoStatement.line3}
            </span>
          </h2>
          <p data-fade className="mt-8 font-mono text-xs uppercase tracking-[0.35em] text-ghost">
            {logoStatement.kicker} · {logoStatement.meta}
          </p>
          <a
            data-fade
            href="#world"
            className="hover-line mt-10 inline-flex w-fit items-center gap-3 font-mono text-sm uppercase tracking-[0.3em] text-cyber"
          >
            {logoStatement.cta}
            <span aria-hidden>→</span>
          </a>
        </div>
      </SceneCard>
    </>
  );
}
