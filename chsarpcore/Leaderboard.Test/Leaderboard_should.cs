using Abbotware.Interop.NUnit;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using System.Threading.Tasks;

namespace Leaderboard.Test
{
    [TestFixture]
    public class Leaderboard_should
    {

        [Test,Timeout(6000)]
        public async Task Display_a_leaderboard_with_the_state_of_all_games()
        {
            var server = new TestServer(
                // this is the start of the actual production code
                // You'll have to change this route and do something sensible in order
                // for the test to pass. Eventually you'll have to move this into "Production" code 
                new WebHostBuilder()
                    .ConfigureServices( services => services.AddRouting() )
                    .Configure(app =>
                    {
                        app.UseRouter(router =>
                        {
                            router.MapGet("/foo", async (request, response, routeData) =>
                            {
                                await response.WriteAsync("bar");
                            });
                        });
                    })
            );
            var client = server.CreateClient();

            var result = await client.GetAsync("/leaderboard");

            result.EnsureSuccessStatusCode();
            // then assert something on the response body
            var resultString = await result.Content.ReadAsStringAsync();

        }
    }
}

