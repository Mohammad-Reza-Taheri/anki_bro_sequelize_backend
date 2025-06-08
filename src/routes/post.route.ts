// import { Router } from 'express';
// import postController from '../controllers/post.controller';
// // import { authenticate } from '../middlewares/auth.middleware';

// const router = Router();

// // ایجاد پست جدید (نیاز به احراز هویت)
// // router.post('/', authenticate, postController.createPost);
// router.post('/',  postController.createPost);


// // دریافت تمام پست‌ها
// router.get('/', postController.getAllPosts);

// // دریافت پست بر اساس ID
// router.get('/:id', postController.getPostById);

// // به‌روزرسانی پست (نیاز به احراز هویت)
// // router.put('/:id', authenticate, postController.updatePost);
// // router.put('/:id', postController.updatePost);

// // حذف پست (نیاز به احراز هویت)
// // router.delete('/:id', authenticate, postController.deletePost);
// // router.delete('/:id', postController.deletePost);

// // دریافت پست‌های یک کاربر خاص
// router.get('/user/:userId', postController.getPostsByUser);

// export default router;