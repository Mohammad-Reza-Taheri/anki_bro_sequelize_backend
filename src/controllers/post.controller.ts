// import { Request, Response } from 'express';
// import postService from '../services/post.service';
// import { PostAttributes } from '../models/Post.model';

// class PostController {
//   async createPost(req: Request, res: Response) {
//     try {
//       const { title, content } = req.body;
//       const userId = req.user?.id; // از میدلور احراز هویت می‌آید
      
//       const postData: PostAttributes = {
//         title,
//         content,
//         userId
//       };

//       const newPost = await postService.createPost(postData);
//       res.status(201).json(newPost);
//     } catch (error) {
//       res.status(500).json({ error: 'خطا در ایجاد پست' });
//     }
//   }

//   async getAllPosts(req: Request, res: Response) {
//     try {
//       const posts = await postService.getAllPosts();
//       res.json(posts);
//     } catch (error) {
//       res.status(500).json({ error: 'خطا در دریافت پست‌ها' });
//     }
//   }

//   async getPostById(req: Request, res: Response) {
//     try {
//       const post = await postService.getPostById(parseInt(req.params.id));
//       if (post) {
//         res.json(post);
//       } else {
//         res.status(404).json({ error: 'پست یافت نشد' });
//       }
//     } catch (error) {
//       res.status(500).json({ error: 'خطا در دریافت پست' });
//     }
//   }

//   async updatePost(req: Request, res: Response) {
//     try {
//       const postId = parseInt(req.params.id);
//       const userId = req.user?.id;
//       const { title, content } = req.body;

//       const updatedPost = await postService.updatePost(postId, userId, { title, content });
//       if (updatedPost) {
//         res.json(updatedPost);
//       } else {
//         res.status(404).json({ error: 'پست یافت نشد یا شما مجوز ویرایش ندارید' });
//       }
//     } catch (error) {
//       res.status(500).json({ error: 'خطا در به‌روزرسانی پست' });
//     }
//   }

//   async deletePost(req: Request, res: Response) {
//     try {
//       const postId = parseInt(req.params.id);
//       const userId = req.user?.id;

//       const success = await postService.deletePost(postId, userId);
//       if (success) {
//         res.json({ message: 'پست با موفقیت حذف شد' });
//       } else {
//         res.status(404).json({ error: 'پست یافت نشد یا شما مجوز حذف ندارید' });
//       }
//     } catch (error) {
//       res.status(500).json({ error: 'خطا در حذف پست' });
//     }
//   }

//   async getPostsByUser(req: Request, res: Response) {
//     try {
//       const posts = await postService.getPostsByUser(parseInt(req.params.userId));
//       res.json(posts);
//     } catch (error) {
//       res.status(500).json({ error: 'خطا در دریافت پست‌های کاربر' });
//     }
//   }
// }

// export default new PostController();


/////////without authentication///////////
// import { Request, Response } from 'express';
// import postService from '../services/post.service';
// import { PostAttributes } from '../models/Post.model';

// class PostController {
//   async createPost(req: Request, res: Response) {
//     try {
//       const { title, content, userId } = req.body; // User ID must be provided manually in the request body
//       if (!userId) {
//         return res.status(400).json({ error: 'User ID is required' });
//       }

//       const postData: PostAttributes = { title, content, userId };
//       const newPost = await postService.createPost(postData);
//       res.status(201).json(newPost);
//     } catch (error) {
//       res.status(500).json({ error: 'Error creating post' });
//     }
//   }

//   async getAllPosts(req: Request, res: Response) {
//     try {
//       const posts = await postService.getAllPosts();
//       res.json(posts);
//     } catch (error) {
//       res.status(500).json({ error: 'Error retrieving posts' });
//     }
//   }

//   async getPostById(req: Request, res: Response) {
//     try {
//       const post = await postService.getPostById(parseInt(req.params.id));
//       if (post) {
//         res.json(post);
//       } else {
//         res.status(404).json({ error: 'Post not found' });
//       }
//     } catch (error) {
//       res.status(500).json({ error: 'Error retrieving post' });
//     }
//   }

// //   async updatePost(req: Request, res: Response) {
// //     try {
// //       const postId = parseInt(req.params.id);
// //       const { title, content } = req.body;

// //       const updatedPost = await postService.updatePost(postId, { title, content });
// //       if (updatedPost) {
// //         res.json(updatedPost);
// //       } else {
// //         res.status(404).json({ error: 'Post not found' });
// //       }
// //     } catch (error) {
// //       res.status(500).json({ error: 'Error updating post' });
// //     }
// //   }

// //   async deletePost(req: Request, res: Response) {
// //     try {
// //       const postId = parseInt(req.params.id);

// //       const success = await postService.deletePost(postId);
// //       if (success) {
// //         res.json({ message: 'Post deleted successfully' });
// //       } else {
// //         res.status(404).json({ error: 'Post not found' });
// //       }
// //     } catch (error) {
// //       res.status(500).json({ error: 'Error deleting post' });
// //     }
// //   }

//   async getPostsByUser(req: Request, res: Response) {
//     try {
//       const posts = await postService.getPostsByUser(parseInt(req.params.userId));
//       res.json(posts);
//     } catch (error) {
//       res.status(500).json({ error: 'Error retrieving user posts' });
//     }
//   }
// }

// export default new PostController();


//////////////////////

//last works
// import { Request, Response } from 'express';
// import postService from '../services/post.service';
// import { PostAttributes } from '../models/Post.model';

// class PostController {
//   async createPost(req: Request, res: Response): Promise<void> {
//     try {
//       const { title, content, userId } = req.body;

//       if (!title || !content || !userId) {
//         res.status(400).json({ error: 'Title, content, and user ID are required' });
//         return;
//       }

//       const postData: PostAttributes = { title, content, userId };
//       const newPost = await postService.createPost(postData);

//       res.status(201).json(newPost);
//     } catch (error) {
//       res.status(500).json({ error: 'Error creating post', details: (error as Error).message });
//     }
//   }

//   async getAllPosts(req: Request, res: Response): Promise<void> {
//     try {
//       const posts = await postService.getAllPosts();
//       res.json(posts);
//     } catch (error) {
//       res.status(500).json({ error: 'Error retrieving posts', details: (error as Error).message });
//     }
//   }

//   async getPostById(req: Request, res: Response): Promise<void> {
//     try {
//       const postId = Number(req.params.id);
//       if (isNaN(postId)) {
//         res.status(400).json({ error: 'Invalid post ID' });
//         return;
//       }

//       const post = await postService.getPostById(postId);
//       post ? res.json(post) : res.status(404).json({ error: 'Post not found' });
//     } catch (error) {
//       res.status(500).json({ error: 'Error retrieving post', details: (error as Error).message });
//     }
//   }

//   async getPostsByUser(req: Request, res: Response): Promise<void> {
//     try {
//       const userId = Number(req.params.userId);
//       if (isNaN(userId)) {
//         res.status(400).json({ error: 'Invalid user ID' });
//         return;
//       }

//       const posts = await postService.getPostsByUser(userId);
//       res.json(posts);
//     } catch (error) {
//       res.status(500).json({ error: 'Error retrieving user posts', details: (error as Error).message });
//     }
//   }
// }

// export default new PostController();