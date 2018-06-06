using DestroyUniverseBlog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DestroyUniverseBlog.Repositories
{
    public interface ILikesRepository
    {
        Task<Like> GetLikeByTopicAndUser(int topicId, string userId);
        Task<Like> UpdateLike(int id, Like like);
        Task AddLike(Like like);
        Task<IEnumerable<Like>> GetAllLikes();
        Task RemoveLike(int id);
    }
}
