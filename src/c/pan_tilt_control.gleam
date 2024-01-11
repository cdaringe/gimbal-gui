import lustre/element.{text}
import lustre/attribute as a
import lustre/element/html as h
import c/pad_dir.{pad_dir}
import gleam/dynamic
import gleam/int
import gleam/list
import lustre/event
import model.{type Model, type Msg, MoveRelative, SetManualControlDegrees}

pub fn pan_tilt_control(modl: Model) -> element.Element(Msg) {
  let #(pan, tilt) = modl.manual_control_degrees
  let pad_dirs: List(element.Element(Msg)) = {
    [
      //
      #(1, 0, "rotate: 0deg; left: 40px"),
      //
      #(0, 1, "rotate: 90deg; right: 0; top: 36px;"),
      //
      #(-1, 0, "rotate: 180deg; left: 40px; bottom: 0;"),
      //
      #(0, -1, "rotate: 270deg; left: 0; top: 36px;"),
    ]
    |> list.map(fn(x) {
      let #(dtilt, dpan, style) = x
      pad_dir(
        [
          #("class", a.class("cursor-pointer transition hover:scale-125")),
          #(
            "style",
            a.attribute("style", "position: absolute; width: 50px; " <> style),
          ),
          #(
            "on_click",
            event.on_click(MoveRelative(#(pan * dpan, tilt * dtilt))),
          ),
        ],
        [],
      )
    })
  }

  h.div([], [
    h.div(
      [
        a.class("m-2"),
        a.style([
          #("position", "relative"),
          #("width", "130px"),
          #("height", "130px"),
        ]),
      ],
      pad_dirs,
    ),
    h.label([a.class("block"), a.for("pan")], [
      text("Pan " <> int.to_string(pan) <> "° / click"),
    ]),
    h.input([
      event.on_input(fn(next) {
        let assert Ok(next_int) = int.parse(next)
        SetManualControlDegrees(#(next_int, tilt))
      }),
      a.class("block"),
      a.name("pan"),
      a.type_("range"),
      a.min("1"),
      a.max("45"),
      a.value(dynamic.from(pan)),
    ]),
    h.label([a.class("block"), a.for("tilt")], [
      text("Tilt " <> int.to_string(tilt) <> "° / click"),
    ]),
    h.input([
      event.on_input(fn(next) {
        let assert Ok(next_int) = int.parse(next)
        SetManualControlDegrees(#(pan, next_int))
      }),
      a.class("block"),
      a.name("tilt"),
      a.type_("range"),
      a.min("1"),
      a.max("45"),
      a.value(dynamic.from(tilt)),
    ]),
  ])
}
