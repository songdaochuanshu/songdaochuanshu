interface GitHubUser { created_at: string }
interface GitHubRepo { stargazers_count?: number }
interface GitHubSearch { total_count?: number }

export default defineCachedEventHandler(async () => {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'blog-openserve-cloud' }
  const [user, repos, commits, issues, pullRequests] = await Promise.all([
    $fetch<GitHubUser>('https://api.github.com/users/songdaochuanshu', { headers }),
    $fetch<GitHubRepo[]>('https://api.github.com/users/songdaochuanshu/repos?per_page=100', { headers }),
    $fetch<GitHubSearch>('https://api.github.com/search/commits?q=author%3Asongdaochuanshu', { headers }),
    $fetch<GitHubSearch>('https://api.github.com/search/issues?q=author%3Asongdaochuanshu+type%3Aissue', { headers }),
    $fetch<GitHubSearch>('https://api.github.com/search/issues?q=author%3Asongdaochuanshu+type%3Apr', { headers }),
  ])
  const createdAt = new Date(user.created_at)
  return {
    years: Math.max(1, Math.floor((Date.now() - createdAt.getTime()) / (365.25 * 24 * 60 * 60 * 1000))),
    commits: commits.total_count,
    issues: issues.total_count,
    pullRequests: pullRequests.total_count,
    stars: repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0),
  }
}, { maxAge: 600, swr: true })
