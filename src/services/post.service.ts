// import models from '../models';
// const { Post } = models;
// import { PostAttributes } from '../models/Post.model';

// class PostService {
//     async createPost(postData: PostAttributes) {
//         return await Post.create(postData);
//     }

//     async getAllPosts() {
//         return await Post.findAll({
//             include: ['author'], // شامل اطلاعات کاربر ایجادکننده
//             order: [['createdAt', 'DESC']]
//         });
//     }

//     async getPostById(id: number) {
//         return await Post.findByPk(id, {
//             include: ['author']
//         });
//     }

//     async updatePost(postId: number, userId: number, updateData: Partial<PostAttributes>) {
//         const [affectedCount] = await Post.update(updateData, {
//             where: {
//                 id: postId,
//                 userId // فقط مالک پست می‌تواند ویرایش کند
//             }
//         });

//         if (affectedCount > 0) {
//             return await Post.findByPk(postId);
//         }
//         return null;
//     }

//     async deletePost(postId: number, userId: number) {
//         const deletedCount = await Post.destroy({
//             where: {
//                 id: postId,
//                 userId // فقط مالک پست می‌تواند حذف کند
//             }
//         });
//         return deletedCount > 0;
//     }

//     async getPostsByUser(userId: number) {
//         return await Post.findAll({
//             where: { userId },
//             include: ['author'],
//             order: [['createdAt', 'DESC']]
//         });
//     }
// }

// export default new PostService();