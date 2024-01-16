import lustre
import lustre/attribute as a
import lustre/element.{text}
import lustre/element/html as h
import lustre/event.{on_click}
import lustre/effect
import c/header.{header}
import c/pan_tilt_control.{pan_tilt_control}
import gleam/string
import gleam/uri
import gleam/list
import gleam/result
import gleam/option
import plinth/browser/window
import model.{type Model, ConnectionChanged, Model, StartStream, update}

pub fn main() {
  let app = lustre.application(init, update, view)
  let assert Ok(_) = lustre.start(app, "#app", Nil)
  Nil
}

fn init(_) {
  let gimbal_url: Result(uri.Uri, Nil) = {
    use window_url <- result.try(uri.parse(window.location()))
    use query_string <- result.try(option.to_result(window_url.query, Nil))
    use query_pairs <- result.try(uri.parse_query(query_string))
    let gimbal_url_param =
      list.find_map(query_pairs, fn(kv) {
        let #(key, value) = kv
        case key {
          "gimbal_url" -> Ok(value)
          _ -> Error(Nil)
        }
      })
    use gimbal_url_string <- result.try(gimbal_url_param)
    uri.parse(gimbal_url_string)
  }
  #(
    Model(
      gimbal_url: gimbal_url,
      connected: False,
      history: ["Waiting for stream..."],
      is_streaming: False,
      manual_control_degrees: #(20, 20),
    ),
    effect.none(),
  )
}

fn view(model: Model) {
  h.div(
    [
      a.class("max-w-4xl h-full flex flex-col"),
      a.style([#("margin", "0 auto")]),
    ],
    [
      header(),
      h.main([a.class("p-2")], [
        h.div(
          [a.class("flex flex-row items-center")],
          case model.connected {
            True -> #("Connected", "Disconnect", False)
            False -> #("Disconnected", "Connect", True)
          }
          |> fn(x: #(String, String, Bool)) {
            [
              h.h2([a.class("inline-block mr-2")], [text(x.0)]),
              h.button(
                [
                  a.class("inline-block text-xs"),
                  on_click(ConnectionChanged(x.2)),
                ],
                [text(x.1)],
              ),
            ]
          },
        ),
        h.div([a.class("flex flex-wrap w-full")], [
          h.div([a.class("flex flex-col flex-1 h-96 min-w-128")], [
            h.pre(
              [
                a.class(
                  "border-box m-0 flex-1 block w-full block p-2 bg-slate-200 rounded",
                ),
                a.disabled(True),
              ],
              [text(string.join(model.history, "\n"))],
            ),
            h.div([a.class("flex flex-initial")], [
              h.input([a.class("flex-1")]),
              h.button([], [text("Send")]),
            ]),
          ]),
          h.iframe([
            a.class("flex-1 h-96 .min-w-128"),
            a.src("http://localhost:8889/proxied/"),
          ]),
        ]),
        h.div([a.class("flex gap-2")], [
          h.div([], [
            h.button([a.class("flex-initial"), on_click(StartStream)], [
              text("Stream fake"),
            ]),
          ]),
        ]),
        pan_tilt_control(model),
      ]),
    ],
  )
}
