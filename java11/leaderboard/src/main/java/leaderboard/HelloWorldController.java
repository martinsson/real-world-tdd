package leaderboard;

import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.HttpStatus;

@Controller("/foo")
public class HelloWorldController {

    @Get("/")
    public HttpStatus index() {
        return HttpStatus.OK;
    }
}