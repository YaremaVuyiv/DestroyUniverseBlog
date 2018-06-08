using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Identity.UI.Services;
using DestroyUniverseBlog.Common;

namespace DestroyUniverseBlog.Helpers
{
    public class EmailSender : IEmailSender
    {
        public EmailSender(IOptions<AuthMessageSenderOptions> optionsAccessor)
        {
            Options = optionsAccessor.Value;
        }

        public AuthMessageSenderOptions Options { get; }

        public Task SendEmailAsync(string email, string subject, string message)
        {
            return Execute(Constants.SendGridApiKey, subject, message, email);
        }

        public async Task Execute(string apiKey, string subject, string message, string email)
        {
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("Felix.Martin.Ivan@gmail.com", "DU Blog"),
                Subject = subject,
                PlainTextContent = message,
                HtmlContent = message
            };
            msg.AddTo(new EmailAddress(email));
            var response = await client.SendEmailAsync(msg);
            //return response.;
        }
    }
}
