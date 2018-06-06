using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace DestroyUniverseBlog.Controllers
{
    [Route("api/Home")]
    public class HomeController:Controller
    {
        IHostingEnvironment _env;

        public HomeController(IHostingEnvironment env)
        {
            _env = env;
        }

        [HttpGet("Index")]
        public IActionResult Index()
        {
            
            return new PhysicalFileResult(Path.Combine(_env.WebRootPath, "index.html"), "text/html");
        }
    }
}
