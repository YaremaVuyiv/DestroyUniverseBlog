using DestroyUniverseBlog.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using DestroyUniverseBlog.Common;

namespace DestroyUniverseBlog.Helpers
{
    public class JWTValidator : IJWTValidator
    {
        private readonly UserManager<User> _userManager;

        public JWTValidator(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<bool> IsTokenValid(IHeaderDictionary headerDictionary, HttpContext httpContext)
        {
            if (headerDictionary.ContainsKey(Constants.Authorization) &&
                headerDictionary[Constants.Authorization].ToString().Contains(" ") &&
                !headerDictionary[Constants.Authorization].ToString().Contains("null"))
            {
                var token = headerDictionary[Constants.Authorization].ToString();

                var tokenHandler = new JwtSecurityTokenHandler();
                var tokenInfo = tokenHandler.ReadJwtToken(token.Split(' ')[1]);

                var currentUser = await _userManager.GetUserAsync(httpContext.User);
                var user = _userManager.Users.ToList().Find(u => u.Id == tokenInfo.Claims.ToList().Find(c => c.Type == JwtRegisteredClaimNames.Jti).Value);
                var iscurrentUser = currentUser == null ? true : currentUser == user;

                return user.Email == tokenInfo.Claims.ToList().Find(c => c.Type == JwtRegisteredClaimNames.Email).Value &&
                    user.UserName == tokenInfo.Claims.ToList().Find(c => c.Type == JwtRegisteredClaimNames.Sub).Value &&
                    iscurrentUser;
            }
            return false;
        }
    }
}
