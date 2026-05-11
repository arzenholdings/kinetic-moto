export type LinearDashboardStatus = "ready" | "unconfigured" | "error";

export type LinearDashboardIssue = {
  id: string;
  identifier: string;
  title: string;
  description: string | null;
  priority: number;
  url: string;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  dueDate: string | null;
  estimate: number | null;
  state: {
    id: string;
    name: string;
    type: string;
    color: string | null;
  } | null;
  assignee: {
    id: string;
    name: string;
    displayName: string;
    email: string | null;
  } | null;
  delegate: {
    id: string;
    name: string;
    displayName: string;
    email: string | null;
  } | null;
  labels: {
    id: string;
    name: string;
    color: string | null;
  }[];
  comments: {
    id: string;
    body: string;
    createdAt: string;
    userName: string | null;
  }[];
  agentHints: string[];
  attentionReasons: string[];
};

export type LinearDashboardMilestone = {
  id: string;
  name: string;
  description: string | null;
  status: string;
  progress: number;
  targetDate: string | null;
  sortOrder: number | null;
};

export type LinearDashboardActivity = {
  id: string;
  type: "project" | "issue" | "comment";
  title: string;
  detail: string;
  createdAt: string;
  url: string | null;
};

export type LinearDashboardProject = {
  id: string;
  name: string;
  description: string | null;
  state: string;
  progress: number;
  startDate: string | null;
  targetDate: string | null;
  url: string;
  updatedAt: string;
  lead: {
    id: string;
    name: string;
    displayName: string;
    email: string | null;
  } | null;
  teams: {
    id: string;
    name: string;
    key: string;
  }[];
  milestones: LinearDashboardMilestone[];
  openIssues: LinearDashboardIssue[];
  completedIssues: LinearDashboardIssue[];
  blockedIssues: LinearDashboardIssue[];
  recentActivity: LinearDashboardActivity[];
  issueLimitReached: boolean;
};

export type LinearDashboardResult = {
  projects: LinearDashboardProject[];
  status: LinearDashboardStatus;
  message?: string;
  fetchedAt?: string;
};

type LinearGraphqlResponse = {
  data?: {
    projects?: LinearConnection<LinearProjectNode>;
  };
  errors?: {
    message?: string;
  }[];
};

type LinearConnection<T> = {
  nodes?: T[];
  pageInfo?: {
    endCursor?: string | null;
    hasNextPage?: boolean;
  };
};

type LinearProjectNode = {
  id?: unknown;
  name?: unknown;
  description?: unknown;
  content?: unknown;
  state?: unknown;
  status?: {
    id?: unknown;
    name?: unknown;
    type?: unknown;
    color?: unknown;
  } | null;
  progress?: unknown;
  startDate?: unknown;
  targetDate?: unknown;
  url?: unknown;
  updatedAt?: unknown;
  lead?: LinearUserNode | null;
  teams?: LinearConnection<LinearTeamNode>;
  projectMilestones?: LinearConnection<LinearMilestoneNode>;
  issues?: LinearConnection<LinearIssueNode>;
};

type LinearUserNode = {
  id?: unknown;
  name?: unknown;
  displayName?: unknown;
  email?: unknown;
};

type LinearTeamNode = {
  id?: unknown;
  name?: unknown;
  key?: unknown;
};

type LinearMilestoneNode = {
  id?: unknown;
  name?: unknown;
  description?: unknown;
  status?: unknown;
  progress?: unknown;
  targetDate?: unknown;
  sortOrder?: unknown;
};

type LinearIssueNode = {
  id?: unknown;
  identifier?: unknown;
  title?: unknown;
  description?: unknown;
  priority?: unknown;
  url?: unknown;
  createdAt?: unknown;
  updatedAt?: unknown;
  completedAt?: unknown;
  dueDate?: unknown;
  estimate?: unknown;
  state?: {
    id?: unknown;
    name?: unknown;
    type?: unknown;
    color?: unknown;
  } | null;
  assignee?: LinearUserNode | null;
  delegate?: LinearUserNode | null;
  labels?: LinearConnection<{
    id?: unknown;
    name?: unknown;
    color?: unknown;
  }>;
  comments?: LinearConnection<{
    id?: unknown;
    body?: unknown;
    createdAt?: unknown;
    user?: LinearUserNode | null;
  }>;
};

const LINEAR_GRAPHQL_ENDPOINT = "https://api.linear.app/graphql";
const PROJECTS_QUERY = `
  query LinearProjectsDashboard($after: String) {
    projects(first: 100, after: $after, includeArchived: false) {
      nodes {
        id
        name
        description
        content
        state
        status {
          id
          name
          type
          color
        }
        progress
        startDate
        targetDate
        url
        updatedAt
        lead {
          id
          name
          displayName
          email
        }
        teams {
          nodes {
            id
            name
            key
          }
        }
        projectMilestones(first: 50) {
          nodes {
            id
            name
            description
            status
            progress
            targetDate
            sortOrder
          }
        }
        issues(first: 100) {
          nodes {
            id
            identifier
            title
            description
            priority
            url
            createdAt
            updatedAt
            completedAt
            dueDate
            estimate
            state {
              id
              name
              type
              color
            }
            assignee {
              id
              name
              displayName
              email
            }
            delegate {
              id
              name
              displayName
              email
            }
            labels {
              nodes {
                id
                name
                color
              }
            }
            comments(first: 3) {
              nodes {
                id
                body
                createdAt
                user {
                  id
                  name
                  displayName
                }
              }
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

function readString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function readNullableString(value: unknown) {
  return typeof value === "string" && value ? value : null;
}

function readNumber(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function getLinearApiKey() {
  const apiKey = process.env.LINEAR_API_KEY;
  return apiKey?.trim() || null;
}

async function queryLinearProjects(apiKey: string, after: string | null) {
  const response = await fetch(LINEAR_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: PROJECTS_QUERY,
      variables: { after },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Linear projects fetch failed.", {
      status: response.status,
      body: await response.text(),
    });

    return {
      ok: false as const,
      message: "Linear projects could not be loaded right now.",
    };
  }

  const payload = (await response.json()) as LinearGraphqlResponse;

  if (payload.errors?.length) {
    console.error("Linear projects GraphQL query returned errors.", payload.errors);

    return {
      ok: false as const,
      message: payload.errors[0]?.message || "Linear returned an unexpected GraphQL error.",
    };
  }

  return {
    ok: true as const,
    projects: payload.data?.projects,
  };
}

function mapUser(node: LinearUserNode | null | undefined) {
  if (!node) {
    return null;
  }

  const id = readString(node.id);
  const name = readString(node.name);
  const displayName = readString(node.displayName, name);

  if (!id || !name) {
    return null;
  }

  return {
    id,
    name,
    displayName: displayName || name,
    email: readNullableString(node.email),
  };
}

function extractAgentHints(issue: Pick<LinearDashboardIssue, "title" | "description" | "assignee" | "delegate" | "labels">) {
  const hints = new Set<string>();

  if (issue.delegate) {
    hints.add(issue.delegate.displayName || issue.delegate.name);
  }

  if (issue.assignee) {
    hints.add(issue.assignee.displayName || issue.assignee.name);
  }

  for (const label of issue.labels) {
    const directLabelMatch = /^(agent|owner|person|assigned)\s*[:/-]\s*(.+)$/i.exec(label.name);

    if (directLabelMatch?.[2]) {
      hints.add(directLabelMatch[2].trim());
      continue;
    }

    if (/\b(agent|owner|person)\b/i.test(label.name)) {
      hints.add(label.name);
    }
  }

  const text = [issue.title, issue.description || ""].join("\n");
  const inlineMatches = text.matchAll(/\b(?:agent|owner|person|assigned to)\s*[:/-]\s*([A-Z][A-Za-z0-9 ._-]{1,40})/gi);
  const mentionMatches = text.matchAll(/@([A-Za-z0-9][A-Za-z0-9 ._-]{1,38})/g);

  for (const match of inlineMatches) {
    if (match[1]) {
      hints.add(match[1].trim());
    }
  }

  for (const match of mentionMatches) {
    if (match[1]) {
      hints.add(`@${match[1].trim()}`);
    }
  }

  return Array.from(hints).slice(0, 4);
}

function extractAttentionReasons(issue: Pick<LinearDashboardIssue, "title" | "description" | "priority" | "state" | "labels" | "dueDate">) {
  const reasons = new Set<string>();
  const text = [issue.title, issue.description || "", issue.state?.name || "", issue.labels.map((label) => label.name).join(" ")].join(" ");

  if (/\b(blocked|blocker|blocking|stuck|waiting|dependency|needs attention|at risk|urgent)\b/i.test(text)) {
    reasons.add("Blocked or marked needs attention");
  }

  if (issue.priority > 0 && issue.priority <= 2) {
    reasons.add(issue.priority === 1 ? "Urgent priority" : "High priority");
  }

  if (issue.dueDate) {
    const dueDate = new Date(`${issue.dueDate}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!Number.isNaN(dueDate.getTime()) && dueDate < today) {
      reasons.add("Past due");
    }
  }

  return Array.from(reasons);
}

function mapIssue(node: LinearIssueNode): LinearDashboardIssue | null {
  const id = readString(node.id);
  const identifier = readString(node.identifier);
  const title = readString(node.title);

  if (!id || !identifier || !title) {
    return null;
  }

  const assignee = mapUser(node.assignee);
  const delegate = mapUser(node.delegate);
  const labels = (node.labels?.nodes || [])
    .map((label) => ({
      id: readString(label.id),
      name: readString(label.name),
      color: readNullableString(label.color),
    }))
    .filter((label) => label.id && label.name);

  const issue: LinearDashboardIssue = {
    id,
    identifier,
    title,
    description: readNullableString(node.description),
    priority: readNumber(node.priority),
    url: readString(node.url),
    createdAt: readString(node.createdAt),
    updatedAt: readString(node.updatedAt),
    completedAt: readNullableString(node.completedAt),
    dueDate: readNullableString(node.dueDate),
    estimate: typeof node.estimate === "number" ? node.estimate : null,
    state: node.state
      ? {
          id: readString(node.state.id),
          name: readString(node.state.name),
          type: readString(node.state.type),
          color: readNullableString(node.state.color),
        }
      : null,
    assignee,
    delegate,
    labels,
    comments: (node.comments?.nodes || [])
      .map((comment) => ({
        id: readString(comment.id),
        body: readString(comment.body),
        createdAt: readString(comment.createdAt),
        userName: mapUser(comment.user)?.displayName || null,
      }))
      .filter((comment) => comment.id && comment.body && comment.createdAt),
    agentHints: [],
    attentionReasons: [],
  };

  issue.agentHints = extractAgentHints(issue);
  issue.attentionReasons = extractAttentionReasons(issue);

  return issue;
}

function mapMilestone(node: LinearMilestoneNode): LinearDashboardMilestone | null {
  const id = readString(node.id);
  const name = readString(node.name);

  if (!id || !name) {
    return null;
  }

  return {
    id,
    name,
    description: readNullableString(node.description),
    status: readString(node.status, "unstarted"),
    progress: readNumber(node.progress),
    targetDate: readNullableString(node.targetDate),
    sortOrder: typeof node.sortOrder === "number" ? node.sortOrder : null,
  };
}

function isCompletedIssue(issue: LinearDashboardIssue) {
  return issue.state?.type === "completed" || Boolean(issue.completedAt);
}

function sortNewestFirst<T extends { updatedAt?: string; createdAt?: string }>(items: T[]) {
  return [...items].sort((a, b) => {
    const aDate = new Date(a.updatedAt || a.createdAt || 0).getTime();
    const bDate = new Date(b.updatedAt || b.createdAt || 0).getTime();
    return bDate - aDate;
  });
}

function buildRecentActivity(project: {
  id: string;
  name: string;
  updatedAt: string;
  url: string;
  issues: LinearDashboardIssue[];
}) {
  const issueActivity = project.issues.map((issue) => ({
    id: `issue-${issue.id}`,
    type: "issue" as const,
    title: `${issue.identifier} updated`,
    detail: issue.title,
    createdAt: issue.updatedAt,
    url: issue.url,
  }));

  const commentActivity = project.issues.flatMap((issue) =>
    issue.comments.map((comment) => ({
      id: `comment-${comment.id}`,
      type: "comment" as const,
      title: `${comment.userName || "Someone"} commented on ${issue.identifier}`,
      detail: comment.body,
      createdAt: comment.createdAt,
      url: issue.url,
    }))
  );

  return sortNewestFirst([
    {
      id: `project-${project.id}`,
      type: "project" as const,
      title: "Project updated",
      detail: project.name,
      createdAt: project.updatedAt,
      url: project.url,
    },
    ...issueActivity,
    ...commentActivity,
  ]).slice(0, 12);
}

function mapProject(node: LinearProjectNode): LinearDashboardProject | null {
  const id = readString(node.id);
  const name = readString(node.name);

  if (!id || !name) {
    return null;
  }

  const issues = (node.issues?.nodes || []).map(mapIssue).filter((issue): issue is LinearDashboardIssue => Boolean(issue));
  const openIssues = sortNewestFirst(issues.filter((issue) => !isCompletedIssue(issue)));
  const completedIssues = sortNewestFirst(issues.filter(isCompletedIssue));
  const blockedIssues = openIssues.filter((issue) => issue.attentionReasons.length > 0);
  const url = readString(node.url);
  const updatedAt = readString(node.updatedAt);

  return {
    id,
    name,
    description: readNullableString(node.description) || readNullableString(node.content),
    state: readString(node.status?.name, readString(node.state, "unknown")),
    progress: readNumber(node.progress),
    startDate: readNullableString(node.startDate),
    targetDate: readNullableString(node.targetDate),
    url,
    updatedAt,
    lead: mapUser(node.lead),
    teams: (node.teams?.nodes || [])
      .map((team) => ({
        id: readString(team.id),
        name: readString(team.name),
        key: readString(team.key),
      }))
      .filter((team) => team.id && team.name),
    milestones: (node.projectMilestones?.nodes || [])
      .map(mapMilestone)
      .filter((milestone): milestone is LinearDashboardMilestone => Boolean(milestone))
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)),
    openIssues,
    completedIssues,
    blockedIssues,
    recentActivity: buildRecentActivity({ id, name, updatedAt, url, issues }),
    issueLimitReached: Boolean(node.issues?.pageInfo?.hasNextPage),
  };
}

export async function getLinearDashboardProjects(): Promise<LinearDashboardResult> {
  const apiKey = getLinearApiKey();

  if (!apiKey) {
    return {
      projects: [],
      status: "unconfigured",
      message: "Linear is not connected yet. Add LINEAR_API_KEY to load your projects here.",
    };
  }

  const projects: LinearProjectNode[] = [];
  let after: string | null = null;

  try {
    for (let page = 0; page < 5; page += 1) {
      const result = await queryLinearProjects(apiKey, after);

      if (!result.ok) {
        return {
          projects: [],
          status: "error",
          message: result.message,
        };
      }

      projects.push(...(result.projects?.nodes || []));

      if (!result.projects?.pageInfo?.hasNextPage) {
        break;
      }

      after = result.projects.pageInfo.endCursor || null;

      if (!after) {
        break;
      }
    }

    return {
      projects: projects.map(mapProject).filter((project): project is LinearDashboardProject => Boolean(project)),
      status: "ready",
      fetchedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Linear projects fetch threw.", error);

    return {
      projects: [],
      status: "error",
      message: "Linear projects could not be loaded right now.",
    };
  }
}
