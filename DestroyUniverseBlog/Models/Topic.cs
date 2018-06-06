using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DestroyUniverseBlog.Models
{
    public class Topic
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Body { get; set; }
        public string CreatorId { get; set; }
        public float Rating { get; set; }
    }
}
