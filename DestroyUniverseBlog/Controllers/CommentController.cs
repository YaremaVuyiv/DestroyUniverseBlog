using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using DestroyUniverseBlog.Models;
using DestroyUniverseBlog.Repositories;
using Microsoft.AspNetCore.Authorization;
using DestroyUniverseBlog.ViewModels;
using System.IdentityModel.Tokens.Jwt;
using DestroyUniverseBlog.Helpers;
using Microsoft.AspNetCore.Mvc.Filters;
using DestroyUniverseBlog.Common;

namespace DestroyUniverseBlog.Controllers
{
    [Route("api/comment")]
    [Authorize]
    public class CommentController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly ICommentRepository _commentRepository;
        private readonly ITopicRepository _topicRepository;
        private readonly IJWTValidator _tokenValidator;


        public CommentController(UserManager<User> userManager, ICommentRepository commentRepository, ITopicRepository topicRepository,
            IJWTValidator tokenValidator)
        {
            _userManager = userManager;
            _commentRepository = commentRepository;
            _topicRepository = topicRepository;
            _tokenValidator = tokenValidator;
        }

        /*public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);
            
            _tokenValidator = new JWTValidator(_userManager, HttpContext.User);
        }*/

        [HttpGet("{topicId}")]
        [AllowAnonymous]
        public async Task<IEnumerable<Comment>> GetAllComments(int topicId)
        {
            if (ModelState.IsValid)
            {
                var comments = await _commentRepository.GetAllComments();
                comments = comments.Where(c => c.TopicId == topicId);
                comments.ToList().Sort((c1, c2) => { return c1.Time.CompareTo(c2.Time); });
                comments.ToList().ForEach(c =>
                {
                    c.Time = c.Time.ToLocalTime();
                    c.UserId = null;
                });
                return comments;
            }

            return null;
        }

        [HttpPost]
        public async Task AddComment([FromBody]CommentViewModel comment)
        {
            if (ModelState.IsValid)
            {
                var isTokenValid = await _tokenValidator.IsTokenValid(Request.Headers, HttpContext);
                if (isTokenValid)
                {
                    var commentToAdd = new Comment() {TopicId = comment.TopicId, Text = comment.Text };
                    commentToAdd.Time = DateTime.UtcNow;
                    var currentUser = await _userManager.GetUserAsync(HttpContext.User);
                    commentToAdd.UserId = currentUser.Id;
                    commentToAdd.UserName = currentUser.UserName;
                    await _commentRepository.AddComment(commentToAdd);
                }
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Constants.Admin)]
        public async Task<IActionResult> DeleteComment(int id)
        {
            if (ModelState.IsValid)
            {
                await _commentRepository.DeleteComment(id);

                return Ok();
            }

            return BadRequest();
        }
    }
}
