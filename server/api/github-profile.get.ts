interface GitHubUser {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  followers: number
  following: number
  public_repos: number
  location: string | null
  blog: string | null
}

interface GitHubRepo {
  stargazers_count?: number
}

export default defineCachedEventHandler(async () => {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'blog-openserve-cloud' }
  const user = await $fetch<GitHubUser>('https://api.github.com/users/songdaochuanshu', { headers })
  const repos = await $fetch<GitHubRepo[]>('https://api.github.com/users/songdaochuanshu/repos?per_page=100', { headers })

  return {
    name: user.name || user.login,
    login: user.login,
    avatar: user.avatar_url,
    bio: user.bio || '',
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    stars: repos.reduce((total, repo) => total + (repo.stargazers_count || 0), 0),
    location: user.location || '',
    blog: 'https://blog.openserve.cloud',
    blogDomain: 'blog.openserve.cloud',
    githubUrl: `https://github.com/${user.login}`,
  }
}, { maxAge: 600, swr: true })
