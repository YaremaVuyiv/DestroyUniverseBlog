using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DestroyUniverseBlog.ViewModels
{
    public class CommentViewModel
    {
        [Required]
        [Display(Name = "TopicId")]
        public int TopicId { get; set; }

        [Required]
        [Display(Name = "Text")]
        public string Text { get; set; }
    }
}
