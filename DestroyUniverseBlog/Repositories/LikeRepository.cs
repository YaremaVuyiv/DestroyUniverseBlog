using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DestroyUniverseBlog.Models;
using DestroyUniverseBlog.Data;
using Microsoft.EntityFrameworkCore;

namespace DestroyUniverseBlog.Repositories
{
    public class LikeRepository : ILikesRepository
    {
        private readonly ApplicationContext _dbContext;

        public LikeRepository(ApplicationContext context)
        {
            _dbContext = context;
        }

        public async Task AddLike(Like like)
        {
            await _dbContext.Likes.AddAsync(like);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<Like> UpdateLike(int id, Like like)
        {
            var likeToChange = await _dbContext.Likes.FindAsync(id);
            if (likeToChange != null)
            {
                _dbContext.Likes.Update(like);
                await _dbContext.SaveChangesAsync();
            }
            return likeToChange;
        }

        public async Task<IEnumerable<Like>> GetAllLikes()
        {
            var likes = await _dbContext.Likes.ToListAsync();
            return likes;
        }

        public Task<Like> GetLikeById(int id)
        {
            var like = _dbContext.Likes.FindAsync(id);
            return like;
        }

        public async Task<Like> GetLikeByTopicAndUser(int topicId, string userId)
        {
            var likes = await _dbContext.Likes.Where(t => t.UserId == userId && t.TopicId == topicId).ToListAsync();
            return likes.FirstOrDefault();
        }

        public async Task RemoveLike(int id)
        {
            var like = await _dbContext.Likes.FindAsync(id);
            if (like != null)
            {
                _dbContext.Likes.Remove(like);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
