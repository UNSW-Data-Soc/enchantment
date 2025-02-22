import Image from "next/image";

import DataSocTimeline from "./timeline";

const arcLogo = "/arc.png";
const book = "/book.png";
const bulletinBoard = "/bulletin_board.png";
const coffee = "/coffee.png";
const graphicDesign = "/graphic_design.png";
const lightBulbIdea = "/lightbulb_idea.png";
const sunglasses = "/sunglasses.png";
const thumbsUp = "/thumbs_up.png";
const unswMathsLogo = "/unswmaths.png";
const zoom = "/zoom.png";

export default function About() {
  return (
    <div className="bg-white">
      <header className="flex flex-col gap-4 bg-[#4799d1] p-8 text-white sm:p-12">
        <h1 className="text-3xl font-semibold">About Us</h1>
        <p>
          What we really do. Learn about the society that continually seeks the
          best for students.
        </p>
      </header>
      <main className="mx-auto flex max-w-4xl flex-col gap-8 px-8 py-8 sm:py-14 lg:px-20">
        <p className="border-l-5 pl-4 font-light sm:text-xl">
          Uniting mathematicians, econometricians and computer scientists, UNSW
          DataSoc seeks to empower our members with knowledge and skills of data
          science, machine learning and artificial intelligence.
        </p>
        <section className="flex flex-col gap-3 sm:gap-8">
          <SectionHeading>Affiliated with</SectionHeading>
          <div className="flex w-full flex-col items-center gap-5 md:flex-row md:justify-between">
            <Image
              src={unswMathsLogo}
              width={500}
              height={100}
              alt="UNSW Maths Logo"
            />
            <Image src={arcLogo} width={100} height={100} alt="Arc Logo" />
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <SectionHeading>Our Goals</SectionHeading>
          <SectionList>
            <SectionListItem>
              <ListItemIconWrapper>
                <Image
                  src={lightBulbIdea}
                  width={100}
                  height={100}
                  alt="Light Bulb Idea"
                />
              </ListItemIconWrapper>
              <ListItemText>
                DataSoc aims to become Australia&apos;s leading student run
                society platform in assisting students on achieving their data
                science career goals.
              </ListItemText>
            </SectionListItem>
            <SectionListItem>
              <ListItemIconWrapper>
                <Image
                  src={bulletinBoard}
                  width={100}
                  height={100}
                  alt="Bulletin Board"
                />
              </ListItemIconWrapper>
              <ListItemText>
                We strive to create the data science related opportunities for
                students in their studies and careers alike. We host information
                sessions, networking evenings, and many more career-focused
                events that could help open new pathways for students.
              </ListItemText>
            </SectionListItem>
            <SectionListItem>
              <ListItemIconWrapper>
                <Image
                  src={graphicDesign}
                  width={100}
                  height={100}
                  alt="Graphic Design"
                />
              </ListItemIconWrapper>
              <ListItemText>
                We aim to enrich students&apos; lives with a sense of community
                and diversity among UNSW data science students. We host a list
                of various social activities such as BBQs, competitions, etc.
                that welcome everyone to attend and meet like minded people.
              </ListItemText>
            </SectionListItem>
            <SectionListItem>
              <ListItemIconWrapper>
                <Image src={zoom} width={100} height={100} alt="Zoom" />
              </ListItemIconWrapper>
              <ListItemText>
                We want to support data science students in their studies with
                DataSoc&apos;s help sessions, workshops and peer supporters.
              </ListItemText>
            </SectionListItem>
          </SectionList>
        </section>
        <section className="flex flex-col gap-8">
          <p className="text-center font-semibold">
            With this, DataSoc aims to make your university experience even more
            fun and fulfilling, whilst maximizing your employment opportunity
            and career progression in data science.
          </p>
          <h2 className="py-4 text-center text-2xl font-semibold sm:text-3xl">
            &quot;Opportunities don&apos;t happen. You create them.&quot;
          </h2>
        </section>
        <section className="flex flex-col gap-3 sm:gap-8">
          <SectionHeading>Our Values</SectionHeading>
          <p>
            Our successes to date could not have be achieved without our
            thriving subcommittee teams year after year. Here are our core
            values that persists amongst all portfolios:
          </p>
          <SectionList>
            <SectionListItem>
              <ListItemIconWrapper>
                <Image src={book} width={100} height={100} alt="Book Icon" />
              </ListItemIconWrapper>
              <div>
                <strong>Learn continuously and effectively</strong>
                <ListItemText>
                  We seek to provide innovative and meaningful experiences for
                  students, adapting to change and committing to ongoing
                  development. We highly encourage you to actively seek ways to
                  improve and find new ways to solve problems.
                </ListItemText>
              </div>
            </SectionListItem>
            <SectionListItem>
              <ListItemIconWrapper>
                <Image
                  src={coffee}
                  width={100}
                  height={100}
                  alt="Coffee Icon"
                />
              </ListItemIconWrapper>
              <ListItemText>
                <strong>Have a good time</strong>
                <br />
                At DataSoc, it is important to us that every experience here is
                a constructive and positive one. After every event and every
                meeting, we want you all to be leaving with a smile and a new
                friend!
              </ListItemText>
            </SectionListItem>
            <SectionListItem>
              <ListItemIconWrapper>
                <Image
                  src={thumbsUp}
                  className="object-contain"
                  width={100}
                  height={100}
                  alt="Thumbs Up Icon"
                />
              </ListItemIconWrapper>
              <ListItemText>
                <strong>Be the best at what you do</strong>
                <br />
                What distinguishes DataSoc members from others, despite having
                all different areas and expertise? It&apos;s the passion that we
                bring to everything we do. We approach every task with
                confidence, seize all opportunities and never settle for
                &quot;acceptable&quot;.
              </ListItemText>
            </SectionListItem>
            <SectionListItem>
              <ListItemIconWrapper>
                <Image
                  src={sunglasses}
                  className="object-contain"
                  width={100}
                  height={100}
                  alt="Sunglasses Icon"
                />
              </ListItemIconWrapper>
              <ListItemText>
                <strong>Take ownership and be transparent</strong>
                <br />
                As the DataSoc team, we celebrate the individual work and
                achievement of others, but must also be accountable for the
                tasks to which we have committed and see through what we
                started.
              </ListItemText>
            </SectionListItem>
          </SectionList>
        </section>
        <section className="flex flex-col gap-5">
          <SectionHeading>Our History</SectionHeading>
          <DataSocTimeline />
        </section>
      </main>
    </div>
  );
}

function SectionHeading({ children }: { children?: React.ReactNode }) {
  return <h2 className="text-3xl font-semibold sm:text-4xl">{children}</h2>;
}

function SectionList({ children }: { children?: React.ReactNode }) {
  return <ul className="flex flex-col gap-4">{children}</ul>;
}

function SectionListItem({ children }: { children?: React.ReactNode }) {
  return (
    <li className="flex flex-row-reverse items-center gap-4 sm:flex-row">
      {children}
    </li>
  );
}

function ListItemIconWrapper({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex flex-shrink-0 flex-grow-0 basis-16 items-center justify-center sm:basis-16">
      {children}
    </div>
  );
}

function ListItemText({ children }: { children?: React.ReactNode }) {
  return <p className="text-start sm:text-justify">{children}</p>;
}