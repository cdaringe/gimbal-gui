import plinth/javascript/global.{set_timeout}
import lustre/effect
import gleam/bool
import gleam/int
import gleam/uri.{type Uri}

pub type Model {
  Model(
    gimbal_url: Result(Uri, Nil),
    connected: Bool,
    history: List(String),
    is_streaming: Bool,
    manual_control_degrees: #(Int, Int),
  )
}

pub type Msg {
  ConnectionChanged(Bool)
  StartStream
  AddStreamHistory(String)
  SetManualControlDegrees(#(Int, Int))
  MoveRelative(#(Int, Int))
}

pub fn simple(v) {
  #(v, effect.none())
}

pub fn update(model, msg) {
  case msg {
    ConnectionChanged(state) -> simple(Model(..model, connected: state))
    StartStream -> #(
      Model(..model, is_streaming: True),
      effect.from(fn(dispatch) {
        set_timeout(fn(_) { dispatch(AddStreamHistory("GXX M1 R1 T3")) }, 1000)
      }),
    )
    AddStreamHistory(line) -> #(
      Model(..model, history: [line, ..model.history]),
      effect.from(fn(dispatch) {
        use <- bool.guard(!model.is_streaming, Nil)
        set_timeout(
          fn(_) {
            case model.is_streaming {
              True -> dispatch(AddStreamHistory("GXX M1 R62 T4"))
              _ -> Nil
            }
          },
          1000,
        )
      }),
    )
    SetManualControlDegrees(x) ->
      simple(Model(..model, manual_control_degrees: x))
    MoveRelative(x) -> {
      let dpan = int.to_string(x.0)
      let dtilt = int.to_string(x.1)

      #(
        model,
        effect.from(fn(dispatch) {
          dispatch(AddStreamHistory("GXX R" <> dpan <> " " <> " T" <> dtilt))
        }),
      )
    }
  }
}
