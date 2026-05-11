"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  LinearDashboardIssue,
  LinearDashboardProject,
  LinearDashboardResult,
} from "@/lib/linear-dashboard";

type IssueGroup = {
  name: string;
  issues: LinearDashboardIssue[];
};

function formatDate(value: string | null) {
  if (!value) {
    return "No date";
  }

  const date = new Date(value.includes("T") ? value : `${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatRelativeDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value || "Recently";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function formatProgress(value: number) {
  const normalized = value > 1 ? value : value * 100;
  return `${Math.round(Math.max(0, Math.min(100, normalized)))}%`;
}

function titleCase(value: string) {
  return value
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getPriorityLabel(priority: number) {
  switch (priority) {
    case 1:
      return "Urgent";
    case 2:
      return "High";
    case 3:
      return "Medium";
    case 4:
      return "Low";
    default:
      return "No priority";
  }
}

function groupIssuesByStatus(issues: LinearDashboardIssue[]): IssueGroup[] {
  const groups = new Map<string, LinearDashboardIssue[]>();

  for (const issue of issues) {
    const status = issue.state?.name || "No status";
    groups.set(status, [...(groups.get(status) || []), issue]);
  }

  return Array.from(groups.entries())
    .map(([name, groupedIssues]) => ({ name, issues: groupedIssues }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="rounded-lg border border-dashed border-white/15 bg-white/[0.03] p-6 text-center">
      <p className="text-base font-black text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-stone-400">{message}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-stone-900/75 p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-stone-500">{label}</p>
      <p className="mt-2 text-2xl font-black text-white">{value}</p>
    </div>
  );
}

function StatusPill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "good" | "warn" | "danger" }) {
  const toneClass = {
    neutral: "border-white/10 bg-white/5 text-stone-300",
    good: "border-emerald-300/20 bg-emerald-400/10 text-emerald-200",
    warn: "border-amber-300/20 bg-amber-400/10 text-amber-100",
    danger: "border-red-300/20 bg-red-400/10 text-red-100",
  }[tone];

  return <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.16em] ${toneClass}`}>{children}</span>;
}

function IssueRow({ issue }: { issue: LinearDashboardIssue }) {
  const hasAttention = issue.attentionReasons.length > 0;

  return (
    <a href={issue.url} target="_blank" rel="noreferrer" className="block rounded-lg border border-white/10 bg-stone-950/65 p-4 transition hover:border-orange-300/35 hover:bg-white/[0.06]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-black text-orange-200">{issue.identifier}</span>
            <StatusPill tone={hasAttention ? "warn" : "neutral"}>{getPriorityLabel(issue.priority)}</StatusPill>
          </div>
          <p className="mt-2 text-sm font-bold leading-6 text-white">{issue.title}</p>
        </div>
        <span className="text-xs font-bold text-stone-500">{formatRelativeDate(issue.updatedAt)}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-xs text-stone-400">
        <span>{issue.assignee?.displayName || "Unassigned"}</span>
        {issue.dueDate ? <span>Due {formatDate(issue.dueDate)}</span> : null}
        {issue.estimate ? <span>{issue.estimate} pts</span> : null}
      </div>

      {issue.agentHints.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {issue.agentHints.map((hint) => (
            <span key={hint} className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-xs font-bold text-cyan-100">
              {hint}
            </span>
          ))}
        </div>
      ) : null}
    </a>
  );
}

function ProjectSidebarItem({
  project,
  selected,
  onSelect,
}: {
  project: LinearDashboardProject;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-lg border p-4 text-left transition ${
        selected
          ? "border-orange-300/60 bg-orange-400/10 shadow-lg shadow-orange-950/20"
          : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-black text-white">{project.name}</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-stone-500">{titleCase(project.state)}</p>
        </div>
        <span className="shrink-0 rounded-full bg-white/8 px-2.5 py-1 text-xs font-black text-orange-100">{formatProgress(project.progress)}</span>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-stone-800">
        <div className="h-full rounded-full bg-orange-400" style={{ width: formatProgress(project.progress) }} />
      </div>
      <p className="mt-3 text-xs font-bold text-stone-400">Target: {formatDate(project.targetDate)}</p>
    </button>
  );
}

function ProjectOverview({ project }: { project: LinearDashboardProject }) {
  return (
    <section className="rounded-lg border border-white/10 bg-stone-900/80 p-5 shadow-xl shadow-black/15">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill>{titleCase(project.state)}</StatusPill>
            {project.issueLimitReached ? <StatusPill tone="warn">Issue list capped</StatusPill> : null}
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">{project.name}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-300">
            {project.description || "No project description is available in Linear yet."}
          </p>
        </div>
        <a href={project.url} target="_blank" rel="noreferrer" className="w-fit rounded-full border border-orange-300/30 bg-orange-400/10 px-4 py-2 text-sm font-bold text-orange-100 transition hover:border-orange-200 hover:bg-orange-400/20">
          Open in Linear
        </a>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Progress" value={formatProgress(project.progress)} />
        <Stat label="Open issues" value={String(project.openIssues.length)} />
        <Stat label="Completed" value={String(project.completedIssues.length)} />
        <Stat label="Needs attention" value={String(project.blockedIssues.length)} />
      </div>

      <div className="mt-6 grid gap-4 text-sm text-stone-300 lg:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-stone-950/60 p-4">
          <p className="font-black text-white">Timeline</p>
          <p className="mt-2">Start: {formatDate(project.startDate)}</p>
          <p className="mt-1">Target: {formatDate(project.targetDate)}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-stone-950/60 p-4">
          <p className="font-black text-white">Lead</p>
          <p className="mt-2">{project.lead?.displayName || "No lead set"}</p>
          {project.lead?.email ? <p className="mt-1 text-stone-500">{project.lead.email}</p> : null}
        </div>
        <div className="rounded-lg border border-white/10 bg-stone-950/60 p-4">
          <p className="font-black text-white">Teams</p>
          <p className="mt-2">{project.teams.length ? project.teams.map((team) => `${team.name}${team.key ? ` (${team.key})` : ""}`).join(", ") : "No teams listed"}</p>
        </div>
      </div>
    </section>
  );
}

function MilestonesSection({ project }: { project: LinearDashboardProject }) {
  return (
    <section className="rounded-lg border border-white/10 bg-stone-900/70 p-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-black text-white">Milestones / phases</h3>
        <span className="text-sm font-bold text-stone-500">{project.milestones.length}</span>
      </div>
      <div className="mt-4 space-y-3">
        {project.milestones.length ? (
          project.milestones.map((milestone) => (
            <div key={milestone.id} className="rounded-lg border border-white/10 bg-stone-950/60 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-black text-white">{milestone.name}</p>
                  <p className="mt-1 text-sm text-stone-400">{milestone.description || "No milestone description."}</p>
                </div>
                <StatusPill tone={milestone.status === "done" ? "good" : milestone.status === "overdue" ? "danger" : "neutral"}>
                  {titleCase(milestone.status)}
                </StatusPill>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-stone-800">
                  <div className="h-full rounded-full bg-emerald-400" style={{ width: formatProgress(milestone.progress) }} />
                </div>
                <span className="text-xs font-black text-stone-300">{formatProgress(milestone.progress)}</span>
              </div>
              <p className="mt-3 text-xs font-bold text-stone-500">Target: {formatDate(milestone.targetDate)}</p>
            </div>
          ))
        ) : (
          <EmptyState title="No milestones yet" message="Milestones or project phases will appear here when they exist in Linear." />
        )}
      </div>
    </section>
  );
}

function AttentionSection({ project }: { project: LinearDashboardProject }) {
  return (
    <section className="rounded-lg border border-amber-300/15 bg-amber-400/[0.06] p-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-black text-white">Blocked / needs attention</h3>
        <span className="text-sm font-bold text-amber-100">{project.blockedIssues.length}</span>
      </div>
      <div className="mt-4 space-y-3">
        {project.blockedIssues.length ? (
          project.blockedIssues.map((issue) => (
            <div key={issue.id} className="rounded-lg border border-amber-300/15 bg-stone-950/70 p-4">
              <IssueRow issue={issue} />
              <div className="mt-3 flex flex-wrap gap-2">
                {issue.attentionReasons.map((reason) => (
                  <span key={reason} className="rounded-full bg-amber-300/10 px-2.5 py-1 text-xs font-bold text-amber-100">
                    {reason}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <EmptyState title="Nothing flagged" message="No open issues are labeled blocked, urgent, overdue, or needs attention." />
        )}
      </div>
    </section>
  );
}

function IssuesSection({ project }: { project: LinearDashboardProject }) {
  const groups = groupIssuesByStatus(project.openIssues);

  return (
    <section className="rounded-lg border border-white/10 bg-stone-900/70 p-5">
      <h3 className="text-xl font-black text-white">Open issues by status</h3>
      <div className="mt-4 space-y-4">
        {groups.length ? (
          groups.map((group) => (
            <div key={group.name}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-stone-400">{group.name}</p>
                <span className="text-sm font-bold text-stone-500">{group.issues.length}</span>
              </div>
              <div className="space-y-2">
                {group.issues.map((issue) => (
                  <IssueRow key={issue.id} issue={issue} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <EmptyState title="No open issues" message="Every fetched issue for this project is completed." />
        )}
      </div>
    </section>
  );
}

function CompletedSection({ project }: { project: LinearDashboardProject }) {
  return (
    <section className="rounded-lg border border-white/10 bg-stone-900/70 p-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-black text-white">Completed issues</h3>
        <span className="text-sm font-bold text-stone-500">{project.completedIssues.length}</span>
      </div>
      <div className="mt-4 space-y-2">
        {project.completedIssues.length ? (
          project.completedIssues.slice(0, 12).map((issue) => <IssueRow key={issue.id} issue={issue} />)
        ) : (
          <EmptyState title="Nothing completed yet" message="Completed issues will appear here as Linear marks them done." />
        )}
      </div>
    </section>
  );
}

function ActivitySection({ project }: { project: LinearDashboardProject }) {
  return (
    <section className="rounded-lg border border-white/10 bg-stone-900/70 p-5">
      <h3 className="text-xl font-black text-white">Recent activity</h3>
      <div className="mt-4 space-y-3">
        {project.recentActivity.length ? (
          project.recentActivity.map((activity) => (
            <a key={activity.id} href={activity.url || project.url} target="_blank" rel="noreferrer" className="block rounded-lg border border-white/10 bg-stone-950/60 p-4 transition hover:border-cyan-300/30 hover:bg-white/[0.06]">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <p className="font-bold text-white">{activity.title}</p>
                <span className="text-xs font-bold text-stone-500">{formatRelativeDate(activity.createdAt)}</span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-400">{activity.detail}</p>
            </a>
          ))
        ) : (
          <EmptyState title="No recent activity" message="Issue updates and recent comments will appear here." />
        )}
      </div>
    </section>
  );
}

export function LinearProjectsDashboard() {
  const [result, setResult] = useState<LinearDashboardResult>({ projects: [], status: "ready" });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [query, setQuery] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await fetch("/api/admin/linear", { cache: "no-store" });
        const payload = (await response.json()) as LinearDashboardResult;

        if (!response.ok) {
          throw new Error(payload.message || "Linear projects could not be loaded.");
        }

        if (!cancelled) {
          setResult(payload);
          setSelectedProjectId((current) => current || payload.projects[0]?.id || null);
        }
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(error instanceof Error ? error.message : "Linear projects could not be loaded.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return result.projects;
    }

    return result.projects.filter((project) => {
      const haystack = [project.name, project.state, project.lead?.displayName || "", project.teams.map((team) => team.name).join(" ")]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [query, result.projects]);

  const selectedProject = useMemo(() => {
    return result.projects.find((project) => project.id === selectedProjectId) || filteredProjects[0] || null;
  }, [filteredProjects, result.projects, selectedProjectId]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#0c0a09_0%,_#1c1917_42%,_#0c0a09_100%)] px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-5 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-orange-300">Admin</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">Linear projects</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-stone-300">
              Read-only project health, milestones, blockers, assignments, and activity from Linear.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-stone-900/80 px-4 py-3 text-sm text-stone-300">
            {result.fetchedAt ? `Updated ${formatRelativeDate(result.fetchedAt)}` : "Waiting for Linear"}
          </div>
        </header>

        {isLoading ? (
          <div className="mt-8 rounded-lg border border-white/10 bg-stone-900/75 p-10 text-center">
            <p className="text-xl font-black text-white">Loading Linear projects...</p>
            <p className="mt-2 text-sm text-stone-400">Fetching through the server-side API route.</p>
          </div>
        ) : errorMessage ? (
          <div className="mt-8 rounded-lg border border-red-300/20 bg-red-400/10 p-8 text-center">
            <p className="text-xl font-black text-red-100">Linear could not be loaded</p>
            <p className="mt-2 text-sm leading-6 text-red-100/80">{errorMessage}</p>
          </div>
        ) : result.status === "unconfigured" ? (
          <div className="mt-8 rounded-lg border border-orange-300/25 bg-orange-400/10 p-8">
            <p className="text-2xl font-black text-white">Connect Linear to turn this on</p>
            <p className="mt-3 max-w-2xl leading-7 text-orange-100">
              {result.message || "Add LINEAR_API_KEY to your server environment, restart Next.js, and this dashboard will load your projects."}
            </p>
            <p className="mt-4 rounded-lg border border-white/10 bg-stone-950/70 px-4 py-3 font-mono text-sm text-stone-200">LINEAR_API_KEY=lin_api_...</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[22rem_minmax(0,1fr)]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-lg border border-white/10 bg-stone-900/80 p-4 shadow-xl shadow-black/15">
                <label htmlFor="project-search" className="text-xs font-black uppercase tracking-[0.18em] text-stone-500">
                  Search projects
                </label>
                <input
                  id="project-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Name, status, lead, team"
                  className="mt-2 w-full rounded-lg border border-white/10 bg-stone-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-stone-600 focus:border-orange-300 focus:ring-2 focus:ring-orange-200/40"
                />
                <div className="mt-4 max-h-[calc(100vh-15rem)] space-y-3 overflow-y-auto pr-1">
                  {filteredProjects.length ? (
                    filteredProjects.map((project) => (
                      <ProjectSidebarItem
                        key={project.id}
                        project={project}
                        selected={project.id === selectedProject?.id}
                        onSelect={() => setSelectedProjectId(project.id)}
                      />
                    ))
                  ) : (
                    <EmptyState title="No matches" message="Try another project name, status, lead, or team." />
                  )}
                </div>
              </div>
            </aside>

            {selectedProject ? (
              <div className="space-y-6">
                <ProjectOverview project={selectedProject} />
                <div className="grid gap-6 xl:grid-cols-2">
                  <MilestonesSection project={selectedProject} />
                  <AttentionSection project={selectedProject} />
                </div>
                <IssuesSection project={selectedProject} />
                <div className="grid gap-6 xl:grid-cols-2">
                  <CompletedSection project={selectedProject} />
                  <ActivitySection project={selectedProject} />
                </div>
              </div>
            ) : (
              <EmptyState title="No projects found" message="Linear returned no active projects for this API key." />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
