using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DestroyUniverseBlog.Models
{
    public class Like
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int TopicId { get; set; }
        public bool IsLiked { get; set; }
    }
}
