!function(e) {
    var n = {};
    function t(r) {
        if (n[r])
            return n[r].exports;
        var o = n[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, t),
        o.l = !0,
        o.exports
    }
    t.m = e,
    t.c = n,
    t.d = function(e, n, r) {
        t.o(e, n) || Object.defineProperty(e, n, {
            enumerable: !0,
            get: r
        })
    }
    ,
    t.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    t.t = function(e, n) {
        if (1 & n && (e = t(e)),
        8 & n)
            return e;
        if (4 & n && "object" == typeof e && e && e.__esModule)
            return e;
        var r = Object.create(null);
        if (t.r(r),
        Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
        }),
        2 & n && "string" != typeof e)
            for (var o in e)
                t.d(r, o, function(n) {
                    return e[n]
                }
                .bind(null, o));
        return r
    }
    ,
    t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return t.d(n, "a", n),
        n
    }
    ,
    t.o = function(e, n) {
        return Object.prototype.hasOwnProperty.call(e, n)
    }
    ,
    t.p = "",
    t(t.s = 0)
}([function(e, n) {
    !function() {
        var e, n, t, r, o, i;
        function u() {
            (e = new THREE.PerspectiveCamera(70,window.innerWidth / window.innerHeight,.01,10)).position.z = 1,
            n = new THREE.Scene(),
            r = new THREE.BoxGeometry(.2,.2,.2),
            o = new THREE.MeshNormalMaterial(),
            i = new THREE.Mesh(r,o),
            n.add(i),
            (t = new THREE.WebGLRenderer({
                antialias: !0
            })).setSize(window.innerWidth, window.innerHeight),
            document.body.appendChild(t.domElement)
        }
        u(),
        function r() {
            requestAnimationFrame(r);
            i.rotation.x += .01;
            i.rotation.y += .02;
            t.render(n, e)
        }(),
        console.log((u.toString().split("\n").map(e=>e.trim()).filter(e=>e.length > 0).map(e=>e.charAt(0)).filter(e=>/[a-z]/.test(e)),
        1))
    }()
}
]);
