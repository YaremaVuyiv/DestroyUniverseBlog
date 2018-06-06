using DestroyUniverseBlog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DestroyUniverseBlog.Repositories
{
    public interface ITopicRepository
    {
        Task<IEnumerable<Topic>> GetAllTopics();
        Task<Topic> GetTopicById(int id);
        Task AddTopic(Topic topic);
        Task RemoveTopic(int id);
        Task<Topic> UpdateTopic(int id, Topic topic);
    }
}
