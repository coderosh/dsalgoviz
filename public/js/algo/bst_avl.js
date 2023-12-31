function Node(a = null) {
  (this.value = a),
    (this.parent = null),
    (this.height = null),
    (this.left = null),
    (this.right = null),
    (this.json = { name: this.value, direction: null, children: [] }),
    (this.UpdateHeight = function () {
      var a = 0,
        b = 0;
      (this.json.children = []),
        this.left &&
          ((a = this.left.height),
          this.json.children.push(this.left.json),
          (this.left.json.direction = "left")),
        this.right &&
          ((b = this.right.height),
          this.json.children.push(this.right.json),
          (this.right.json.direction = "right")),
        (this.height = 1 + Math.max(a, b));
    }),
    (this.balancefactor = function () {
      var a = 0,
        b = 0;
      return (
        this.left && (a = this.left.height),
        this.right && (b = this.right.height),
        a - b
      );
    });
}
function BSTAVL() {
  (this.root = null),
    (this.RotateRight = function (a) {
      var b = a.left,
        c = null;
      return (
        b && (c = b.right),
        c && (c.parent = a),
        (b.right = a),
        (a.left = c),
        (b.parent = a.parent),
        (a.parent = b),
        a.UpdateHeight(),
        b.UpdateHeight(),
        a == this.root && (this.root = b),
        b
      );
    }),
    (this.RotateLeft = function (a) {
      var b = a.right,
        c = null;
      return (
        b && (c = b.left),
        c && (c.parent = a),
        (b.left = a),
        (a.right = c),
        (b.parent = a.parent),
        (a.parent = b),
        a.UpdateHeight(),
        b.UpdateHeight(),
        a == this.root && (this.root = b),
        b
      );
    }),
    (this.balance = function (a) {
      return (
        2 == a.balancefactor()
          ? (-1 == a.left.balancefactor() && (a.left = this.RotateLeft(a.left)),
            (a = this.RotateRight(a)))
          : -2 == a.balancefactor() &&
            (1 == a.right.balancefactor() &&
              (a.right = this.RotateRight(a.right)),
            (a = this.RotateLeft(a))),
        a
      );
    }),
    (this.Search = function (a, b = this.root) {
      return null == b
        ? -1
        : b.value == a
        ? b
        : a > b.value
        ? this.Search(a, b.right)
        : this.Search(a, b.left);
    }),
    (this.Insert = function (a, b) {
      return (
        null == a
          ? (a = new Node(b))
          : b <= a.value
          ? ((a.left = this.Insert(a.left, b)),
            (a.left.parent = a),
            (a.left.json.direction = "left"),
            a.json.children.push(a.left.json))
          : ((a.right = this.Insert(a.right, b)),
            (a.right.parent = a),
            (a.right.json.direction = "right"),
            a.json.children.push(a.right.json)),
        a.UpdateHeight(),
        (a = this.balance(a))
      );
    }),
    (this.InsertVal = function (a) {
      this.root = this.Insert(this.root, a);
    }),
    (this.DeleteVal = function (a) {
      var b = this.Search(a);
      -1 != b &&
        (this.Delete(b), this.root && (this.root = this.balance(this.root)));
    }),
    (this.Delete = function (a) {
      if (null == a.parent && null == a.right && null == a.left)
        return void (this.root = null);
      if (null == a.right)
        null == a.parent
          ? ((a = a.left), (a.parent = null))
          : a.parent.left == a
          ? (a.parent.left = a.left)
          : (a.parent.right = a.left),
          a.left && (a.left.parent = a.parent);
      else {
        if (null != a.left) {
          var b,
            c = a;
          for (c = a.left, b = a; null != c.right; ) (b = c), (c = c.right);
          for (
            a.value = c.value,
              a.json.name = a.value,
              b == a ? (b.left = c.left) : (b.right = c.left),
              b.UpdateHeight(),
              b = this.balance(b);
            b.parent;

          )
            (b = b.parent), b.UpdateHeight(), (b = this.balance(b));
          return;
        }
        null == a.parent
          ? ((a = a.right), (a.parent = null))
          : a.parent.left == a
          ? (a.parent.left = a.right)
          : (a.parent.right = a.right),
          a.right && (a.right.parent = a.parent);
      }
      for (; a.parent; )
        a.UpdateHeight(), (a = this.balance(a)), (a = a.parent);
      a.UpdateHeight(), (this.root = this.balance(a));
    }),
    (this.inorder = function (a = this.root) {
      var b = [];
      return (
        null != a &&
          ((b = this.inorder(a.left)),
          b.push(a.value),
          (b = b.concat(this.inorder(a.right)))),
        b
      );
    }),
    (this.preorder = function (a = this.root) {
      var b = [];
      return (
        null != a &&
          ((b = [a.value]),
          (b = b.concat(this.preorder(a.left))),
          (b = b.concat(this.preorder(a.right)))),
        b
      );
    }),
    (this.postorder = function (a = this.root) {
      var b = [];
      return (
        null != a &&
          ((b = b.concat(this.postorder(a.left))),
          (b = b.concat(this.postorder(a.right))),
          b.push(a.value)),
        b
      );
    });
}
var bst = new BSTAVL();
