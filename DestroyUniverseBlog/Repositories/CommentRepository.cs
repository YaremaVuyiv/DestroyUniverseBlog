using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DestroyUniverseBlog.Models;
using DestroyUniverseBlog.Data;
using Microsoft.EntityFrameworkCore;

namespace DestroyUniverseBlog.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationContext _dbContext;

        public CommentRepository(ApplicationContext context)
        {
            _dbContext = context;
        }

        public async Task AddComment(Comment comment)
        {
            await _dbContext.Comments.AddAsync(comment);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<Comment> UpdateComment(int id, Comment newComment)
        {
            var comment = await _dbContext.Comments.FindAsync(id);
            if (comment != null)
            {
                _dbContext.Comments.Update(newComment);
                await _dbContext.SaveChangesAsync();
            }
            return newComment;
        }

        public async Task DeleteComment(int id)
        {
            var commentToRemove = await _dbContext.Comments.FindAsync(id);//.ToList().Find(c => c.Id == id);
            if (commentToRemove != null)
            {
                _dbContext.Comments.Remove(commentToRemove);
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Comment>> GetAllComments()
        {
            var comments = await _dbContext.Comments.ToListAsync();
            return comments;
        }

        public async Task<Comment> GetCommentByTopicAndUser(int topicId, string userId)
        {
            var comment = await _dbContext.Comments.Where(c => c.TopicId == topicId && c.UserId == userId).ToListAsync();
            return comment.FirstOrDefault();
        }
    }
}
