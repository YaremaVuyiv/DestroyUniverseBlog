using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DestroyUniverseBlog.Models;
using DestroyUniverseBlog.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using DestroyUniverseBlog.Helpers;
using Microsoft.AspNetCore.Mvc.Filters;
using DestroyUniverseBlog.Common;
using DestroyUniverseBlog.ViewModels;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DestroyUniverseBlog.Controllers
{

    [Route("api/topics")]
    [Authorize]
    public class TopicController : Controller
    {
        private readonly ITopicRepository _topicRepository;

        private readonly UserManager<User> _userManager;
        private readonly IJWTValidator _tokenValidator;

        private Task<User> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);

        public TopicController(ITopicRepository topicRepository, UserManager<User> userManager, IJWTValidator tokenValidator)
        {
            _userManager = userManager;
            _topicRepository = topicRepository;
            _tokenValidator = tokenValidator;
        }

        /*public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            _tokenValidator = new JWTValidator(_userManager, HttpContext.User);
        }*/

        [HttpGet]
        [AllowAnonymous]
        public async Task<IEnumerable<Topic>> Get()
        {
            return await _topicRepository.GetAllTopics();
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<Topic> Get(int id)
        {
            return await _topicRepository.GetTopicById(id);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]TopicViewModel topic)
        {
            if (ModelState.IsValid)
            {
                var isTokenValid = await _tokenValidator.IsTokenValid(Request.Headers, HttpContext);
                if (isTokenValid)
                {
                    var topicToAdd = new Topic() { Body = topic.Body, Name = topic.Name };
                    var user = await GetCurrentUserAsync();
                    topicToAdd.CreatorId = user.Id;
                    await _topicRepository.AddTopic(topicToAdd);
                    return Ok(topicToAdd);
                }
            }

            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Constants.Admin)]
        public async Task<IActionResult> Delete(int id)
        {
            if (ModelState.IsValid)
            {
                var isTokenValid = await _tokenValidator.IsTokenValid(Request.Headers, HttpContext);
                if (isTokenValid)
                {
                    await _topicRepository.RemoveTopic(id);
                    return Ok();
                }
            }

            return BadRequest();
        }
    }
}
