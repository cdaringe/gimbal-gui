import gleam/fetch
import gleam/http.{Get}
import gleam/http/request
import gleam/http/response.{Response}
import gleam/javascript/promise.{try_await}
import gleam/json.{array, int, null, object, string}
import gleam/dynamic.{
  field, float as dfloat, int as dint, list, string as dstring,
}

type StandardPayload(data) {
  StandardPayload(data: data, error: String)
}

type Position {
  Position(pan: Float, tilt: Float)
}

pub fn position_from_json(input: String) -> Result(Position, json.DecodeError) {
  let position_decoder =
    dynamic.decode3(
      Cat,
      field("pan", of: dstring),
      field("tilt", of: dint),
      field("nicknames", of: list(dstring)),
    )

  json.decode(from: input, using: cat_decoder)
}

pub fn cat_to_json(cat: Cat) -> String {
  object([
    #("name", string(cat.name)),
    #("lives", int(cat.lives)),
    #("flaws", null()),
    #("nicknames", array(cat.nicknames, of: string)),
  ])
  |> json.to_string
}

pub fn main() {
  let req =
    request.new()
    |> request.set_method(Get)
    |> request.set_host("test-api.service.hmrc.gov.uk")
    |> request.set_path("/hello/world")
    |> request.prepend_header("accept", "application/vnd.hmrc.1.0+json")

  // Send the HTTP request to the server
  use resp <- try_await(fetch.send(req))
  // use text <- try_await(fetch.read_text_body(resp))

  // We get a response record back
  let Response(body: body, headers: headers, status: status) = resp

  // assert Ok("application/json") = response.get_header(resp, "content-type")
  // assert "{\"message\":\"Hello World\"}" = resp.body

  promise.resolve(Ok(Nil))
}
