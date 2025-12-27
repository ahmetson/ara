import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import { createBlog, getBlogById, getBlogsByAuthor, getAllBlogs } from '@/server-side/blog'
import { getStarById, getStarByUserId } from '@/server-side/star'
import { auth } from '@/lib/auth'
import type { Blog } from '@/types/blog'

export const server = {
    createBlog: defineAction({
        accept: 'json',
        input: z.object({
            starId: z.string(),
            title: z.string().min(1),
            content: z.string().min(1),
            description: z.string().optional(),
            tags: z.array(z.string()).min(1),
            projects: z.array(z.string()).optional(),
            projectTypes: z.array(z.string()).optional(),
            draft: z.boolean().default(false),
        }),
        handler: async ({ starId, title, content, description, tags, projects, projectTypes, draft }, { request }): Promise<{ success: boolean; error?: string; blogId?: string }> => {
            try {
                // Check authentication
                const session = await auth.api.getSession({
                    headers: request.headers,
                });

                if (!session || !session.user) {
                    return {
                        success: false,
                        error: 'Authentication required. Please log in to create a blog post',
                    };
                }

                const authenticatedUserId = session.user.id;

                // Get the star for the authenticated user
                const authenticatedUserStar = await getStarByUserId(authenticatedUserId);
                if (!authenticatedUserStar || !authenticatedUserStar._id) {
                    return {
                        success: false,
                        error: 'User profile not found. Please ensure your account is set up correctly.',
                    };
                }

                // Verify that the authenticated user's star ID matches the starId parameter
                const authenticatedStarId = String(authenticatedUserStar._id);
                const requestedStarId = String(starId);
                if (authenticatedStarId !== requestedStarId) {
                    return {
                        success: false,
                        error: 'You can only create blog posts for your own account',
                    };
                }

                // Get star to verify it exists
                const star = await getStarById(starId);
                if (!star) {
                    return {
                        success: false,
                        error: 'Star not found',
                    };
                }

                // Create blog
                const blog: Blog = {
                    author: starId,
                    title: title.trim(),
                    content: content.trim(),
                    description: description?.trim(),
                    tags: tags || [],
                    projects: projects || [],
                    projectTypes: projectTypes || [],
                    createdTime: Math.floor(Date.now() / 1000),
                    draft: draft ?? false,
                };

                const created = await createBlog(blog);
                if (!created) {
                    return {
                        success: false,
                        error: 'Failed to create blog',
                    };
                }

                // Fetch the created blog to get its ID
                // We'll need to find it by querying blogs
                const starBlogs = await getBlogsByAuthor(starId);
                const createdBlog = starBlogs.find(b =>
                    b.title === blog.title &&
                    b.author === starId &&
                    Math.abs((b.createdTime || 0) - (blog.createdTime || 0)) < 5 // Within 5 seconds
                ) || starBlogs[0]; // Fallback to first blog if not found

                return {
                    success: true,
                    blogId: createdBlog?._id,
                };
            } catch (error) {
                console.error('Error creating blog:', error);
                const errorMessage = error instanceof Error ? error.message : String(error);
                return {
                    success: false,
                    error: `An error occurred while creating blog: ${errorMessage}`,
                };
            }
        },
    }),

    getBlog: defineAction({
        accept: 'json',
        input: z.object({
            blogId: z.string(),
        }),
        handler: async ({ blogId }): Promise<{ success: boolean; blog?: Blog; error?: string }> => {
            try {
                const blog = await getBlogById(blogId);
                if (!blog) {
                    return {
                        success: false,
                        error: 'Blog not found',
                    };
                }

                return {
                    success: true,
                    blog,
                };
            } catch (error) {
                console.error('Error getting blog:', error);
                return {
                    success: false,
                    error: 'An error occurred while getting blog',
                };
            }
        },
    }),

    getBlogsByAuthor: defineAction({
        accept: 'json',
        input: z.object({
            authorId: z.string(),
        }),
        handler: async ({ authorId }): Promise<{ success: boolean; blogs?: Blog[]; error?: string }> => {
            try {
                const blogs = await getBlogsByAuthor(authorId);
                return {
                    success: true,
                    blogs,
                };
            } catch (error) {
                console.error('Error getting blogs by author:', error);
                return {
                    success: false,
                    error: 'An error occurred while getting blogs',
                };
            }
        },
    }),

    getAllBlogs: defineAction({
        accept: 'json',
        input: z.object({}),
        handler: async (): Promise<{ success: boolean; blogs?: Blog[]; error?: string }> => {
            try {
                const blogs = await getAllBlogs();
                return {
                    success: true,
                    blogs,
                };
            } catch (error) {
                console.error('Error getting all blogs:', error);
                return {
                    success: false,
                    error: 'An error occurred while getting blogs',
                };
            }
        },
    }),
}
