using DestroyUniverseBlog.Data;
using DestroyUniverseBlog.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DestroyUniverseBlog.Repositories
{
    public class TopicRepository:ITopicRepository
    {
        private readonly ApplicationContext _dbContext;

        public TopicRepository(ApplicationContext context)
        {
            _dbContext = context;
        }

        public async Task AddTopic(Topic topic)
        {
            await _dbContext.Topics.AddAsync(topic);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<Topic> UpdateTopic(int id, Topic topic)
        {
            var topicToChange = await _dbContext.Topics.FindAsync(id);
            if (topicToChange != null)
            {
                _dbContext.Topics.Update(topic);
                await _dbContext.SaveChangesAsync();
            }
            return topicToChange;
        }

        public async Task<IEnumerable<Topic>> GetAllTopics()
        {
            return await _dbContext.Topics.ToListAsync();
        }

        public async Task<Topic> GetTopicById(int id)
        {
            var topic = await _dbContext.Topics.FindAsync(id);
            return topic;
        }

        public async Task RemoveTopic(int id)
        { 
            var topic = await _dbContext.Topics.FindAsync(id);
            if (topic != null)
            {
                _dbContext.Remove(topic);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
