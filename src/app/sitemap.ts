import { MetadataRoute } from 'next'
import { BlogApi } from '@/entities/blog/api'
import { ProjectApi } from '@/entities/project/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cher1shrxd.me'

  // Get all blog posts and projects
  const [blogs, projects] = await Promise.all([
    BlogApi.getPosts(),
    ProjectApi.getProjects(),
  ])

  // Blog URLs
  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.id}`,
    lastModified: blog.last_edited_time,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Project URLs
  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: project.last_edited_time,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  return [...staticPages, ...blogUrls, ...projectUrls]
}
