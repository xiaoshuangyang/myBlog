export default function retraction(a) {
  let c = a.split("\\n");
  let e = [];
  let g = [];
  let i = 0;
  c.forEach((a, b, c) => {
    let d = a.lastIndexOf("{");
    if (d > 0) {
      if (b == 0) {
        a = a + "\n" + "#".repeat(b + 1);
        e.push(a);
      } else {
        a = a + "\n" + "#".repeat(b);
        e.push(a);
      }
      g.push("#".repeat(b + 1).length - 1);
      i++;
    } else {
      if (b + 1 < c.length) {
        if (c[b + 1].lastIndexOf("}") >= 0) {
          if (i > 0) {
            a = a + "\n" + "#".repeat(g[--i]);
            e.push(a);
          } else {
            a = a + "\n" + "#";
            e.push(a);
          }
        } else {
          if (i == 0) {
            a = a + "\n";
            e.push(a);
          } else {
            a = a + "\n" + "#".repeat(b);
            e.push(a);
          }
        }
        // console.log(b, a, c[b + 1].lastIndexOf('}'));
      } else {
        e.push(a);
      }
    }
  });
  return e.join("").replaceAll("#", " ");
}
