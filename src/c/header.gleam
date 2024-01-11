import lustre/attribute as a
import lustre/element.{text}
import lustre/element/html as h

pub fn header() {
  h.header([a.class("shadow flex w-full p-0 justify-center items-center m-0")], [
    h.img([
      a.class("block flex-initial p-1 h-12 w-12"),
      a.src("logo.png"),
      a.alt("logo"),
    ]),
    h.h1([a.class("m-0 flex-1")], [text("Gimbal IO")]),
    // h.input([
    //   a.class(
    //     "block flex-auto w-full pr-4 h-full drop-shadow-none inline-block w-full box-border h-full b-none",
    //   ),
    //   a.attribute("type", "text"),
    //   a.placeholder("Search"),
    // ]),
    // [text("content")],
    h.ul(
      [a.id("menu-items"), a.class("flex-1 hidden md:flex gap-2 list-none p-0")],
      [],
    ),
    h.img([
      a.class("block flex-initial w-12 h-12 rounded-full mx-auto p-1"),
      a.src("https://static.cdaringe.com/c/pub/img/headshot.jpeg"),
      a.alt("avatar"),
      a.width(200),
      a.height(200),
    ]),
    h.div([a.class("block md:hidden")], [
      h.label([a.id("chaboiga")], [
        h.input([a.attribute("type", "checkbox")]),
        h.span([a.class("menu")], [h.span([a.class("hamburger")], [])]),
        h.ul([a.id("menu-items")], [
          h.li([], [h.a([a.href("#")], [text("Home")])]),
          h.li([], [h.a([a.href("#")], [text("About")])]),
          h.li([], [h.a([a.href("#")], [text("Contact")])]),
        ]),
      ]),
    ]),
  ])
}
