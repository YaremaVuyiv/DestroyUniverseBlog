using DestroyUniverseBlog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DestroyUniverseBlog.Repositories
{
    public interface ICommentRepository
    {
        Task<Comment> GetCommentByTopicAndUser(int topicId, string userId);
        Task<IEnumerable<Comment>> GetAllComments();
        Task<Comment> UpdateComment(int id, Comment newComment);
        Task DeleteComment(int id);
        Task AddComment(Comment comment);
    }
}
