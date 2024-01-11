import lustre/element/html as h
import lustre/element/svg
import lustre/attribute.{type Attribute} as a
import gleam/list
import gleam/dict

pub fn prop_attr(k: String, v: String) -> #(String, Attribute(a)) {
  #(k, a.attribute(k, v))
}

fn svg_attrs(l: List(#(String, Attribute(a)))) {
  let attr_by_key =
    [
      prop_attr("xmlns", "http://www.w3.org/2000/svg"),
      prop_attr("xmlns:xlink", "http://www.w3.org/1999/xlink"),
      prop_attr("xml:space", "preserve"),
      prop_attr("width", "367.971"),
      prop_attr("viewBox", "0 0 97.359 115.608"),
    ]
    |> dict.from_list

  l
  |> list.fold(attr_by_key, fn(acc, it) { dict.insert(acc, it.0, it.1) })
  |> dict.to_list
  |> list.map(fn(x) { x.1 })
}

fn path_attrs(l: List(#(String, Attribute(a)))) {
  let attr_by_key =
    [
      prop_attr(
        "d",
        "M44.71 115.115c-3.206-1.037-3.189-1.021-23.039-20.892C5.325 77.86 2.344 74.761 1.636 73.388-.05 70.126.004 71.205 0 40.287-.003 20.78.086 11.759.29 10.786c.771-3.701 3.92-7.771 7.205-9.313C10.728-.047 9.429 0 48.679 0s37.952-.046 41.186 1.473c3.285 1.542 6.434 5.612 7.205 9.313.203.973.292 9.995.289 29.5-.004 30.923.049 29.843-1.637 33.102-.707 1.367-3.679 4.466-19.507 20.347-11.893 11.932-19.248 19.115-20.26 19.783-.873.578-2.344 1.285-3.268 1.573-2.184.68-5.915.69-7.976.024",
      ),
      prop_attr("style", "fill:url(#pad_dir_g1)"),
    ]
    |> dict.from_list

  l
  |> list.fold(attr_by_key, fn(acc, it) { dict.insert(acc, it.0, it.1) })
  |> dict.to_list
  |> list.map(fn(x) { x.1 })
}

pub fn pad_dir(svg_props, path_props) {
  h.svg(svg_attrs(svg_props), [
    svg.defs([], [
      svg.linear_gradient([a.id("pad_dir_g1")], [
        svg.stop([
          a.attribute("offset", "0%"),
          a.attribute("stop-color", "#343e2c"),
        ]),
        svg.stop([
          a.attribute("offset", "100%"),
          a.attribute("stop-color", "#436428"),
        ]),
      ]),
      svg.linear_gradient(
        [
          #("xlink:href", "#pad_dir_g1"),
          #("id", "pad_dir_g2"),
          #("x1", "52.628"),
          #("x2", "149.987"),
          #("y1", "104.322"),
          #("y2", "104.322"),
          #("gradientTransform", "translate(-52.628 -46.519)"),
        ]
        |> to_attrs,
        [],
      ),
    ]),
    svg.path(path_attrs(path_props)),
  ])
}

pub fn to_attrs(attrs: List(#(String, String))) {
  attrs
  |> list.map(fn(x) { a.attribute(x.0, x.1) })
}
// <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" width="367.971" height="436.942" viewBox="0 0 97.359 115.608">
//     <defs>
//         <linearGradient id="a">
//             <stop offset="0" style="stop-color:#343e2c;stop-opacity:1"/>
//             <stop offset="1" style="stop-color:#436428;stop-opacity:1"/>
//         </linearGradient>
//         <linearGradient xlink:href="#a" id="b" x1="52.628" x2="149.987" y1="104.322" y2="104.322" gradientTransform="translate(-52.628 -46.519)" gradientUnits="userSpaceOnUse"/>
//     </defs>
//     <path d="M44.71 115.115c-3.206-1.037-3.189-1.021-23.039-20.892C5.325 77.86 2.344 74.761 1.636 73.388-.05 70.126.004 71.205 0 40.287-.003 20.78.086 11.759.29 10.786c.771-3.701 3.92-7.771 7.205-9.313C10.728-.047 9.429 0 48.679 0s37.952-.046 41.186 1.473c3.285 1.542 6.434 5.612 7.205 9.313.203.973.292 9.995.289 29.5-.004 30.923.049 29.843-1.637 33.102-.707 1.367-3.679 4.466-19.507 20.347-11.893 11.932-19.248 19.115-20.26 19.783-.873.578-2.344 1.285-3.268 1.573-2.184.68-5.915.69-7.976.024" style="fill:url(#b);fill-opacity:1;stroke:none"/>
// </svg>
