!
function (d) {
  function f() {
    return new Date(Date.UTC.apply(Date, arguments))
  }

  function b() {
    var g = new Date();
    return f(g.getUTCFullYear(), g.getUTCMonth(), g.getUTCDate())
  }
  var a = function (h, g) {
      var i = this;
      this.element = d(h);
      this.language = g.language || this.element.data("date-language") || "en";
      this.language = this.language in e ? this.language : this.language.split("-")[0];
      this.language = this.language in e ? this.language : "en";
      this.isRTL = e[this.language].rtl || false;
      this.format = c.parseFormat(g.format || this.element.data("date-format") || e[this.language].format || "mm/dd/yyyy");
      this.isInline = false;
      this.isInput = this.element.is("input");
      this.component = this.element.is(".date") ? this.element.find(".add-on, .btn") : false;
      this.hasInput = this.component && this.element.find("input").length;
      if (this.component && this.component.length === 0) {
        this.component = false
      }
      this._attachEvents();
      this.forceParse = true;
      if ("forceParse" in g) {
        this.forceParse = g.forceParse
      } else {
        if ("dateForceParse" in this.element.data()) {
          this.forceParse = this.element.data("date-force-parse")
        }
      }
      this.picker = d(c.template).appendTo(this.isInline ? this.element : "body").on({
        click: d.proxy(this.click, this),
        mousedown: d.proxy(this.mousedown, this)
      });
      if (this.isInline) {
        this.picker.addClass("datepicker-inline")
      } else {
        this.picker.addClass("datepicker-dropdown dropdown-menu")
      }
      if (this.isRTL) {
        this.picker.addClass("datepicker-rtl");
        this.picker.find(".prev i, .next i").toggleClass("icon-arrow-left icon-arrow-right")
      }
      d(document).on("mousedown", function (j) {
        if (d(j.target).closest(".datepicker.datepicker-inline, .datepicker.datepicker-dropdown").length === 0) {
          i.hide()
        }
      });
      this.autoclose = false;
      if ("autoclose" in g) {
        this.autoclose = g.autoclose
      } else {
        if ("dateAutoclose" in this.element.data()) {
          this.autoclose = this.element.data("date-autoclose")
        }
      }
      this.keyboardNavigation = true;
      if ("keyboardNavigation" in g) {
        this.keyboardNavigation = g.keyboardNavigation
      } else {
        if ("dateKeyboardNavigation" in this.element.data()) {
          this.keyboardNavigation = this.element.data("date-keyboard-navigation")
        }
      }
      this.viewMode = this.startViewMode = 0;
      switch (g.startView || this.element.data("date-start-view")) {
      case 2:
      case "decade":
        this.viewMode = this.startViewMode = 2;
        break;
      case 1:
      case "year":
        this.viewMode = this.startViewMode = 1;
        break
      }
      this.minViewMode = g.minViewMode || this.element.data("date-min-view-mode") || 0;
      if (typeof this.minViewMode === "string") {
        switch (this.minViewMode) {
        case "months":
          this.minViewMode = 1;
          break;
        case "years":
          this.minViewMode = 2;
          break;
        default:
          this.minViewMode = 0;
          break
        }
      }
      this.viewMode = this.startViewMode = Math.max(this.startViewMode, this.minViewMode);
      this.todayBtn = (g.todayBtn || this.element.data("date-today-btn") || false);
      this.todayHighlight = (g.todayHighlight || this.element.data("date-today-highlight") || false);
      this.calendarWeeks = false;
      if ("calendarWeeks" in g) {
        this.calendarWeeks = g.calendarWeeks
      } else {
        if ("dateCalendarWeeks" in this.element.data()) {
          this.calendarWeeks = this.element.data("date-calendar-weeks")
        }
      }
      if (this.calendarWeeks) {
        this.picker.find("tfoot th.today").attr("colspan", function (j, k) {
          return parseInt(k) + 1
        })
      }
      this.weekStart = ((g.weekStart || this.element.data("date-weekstart") || e[this.language].weekStart || 0) % 7);
      this.weekEnd = ((this.weekStart + 6) % 7);
      this.startDate = -Infinity;
      this.endDate = Infinity;
      this.daysOfWeekDisabled = [];
      this.setStartDate(g.startDate || this.element.data("date-startdate"));
      this.setEndDate(g.endDate || this.element.data("date-enddate"));
      this.setDaysOfWeekDisabled(g.daysOfWeekDisabled || this.element.data("date-days-of-week-disabled"));
      this.fillDow();
      this.fillMonths();
      this.update();
      this.showMode();
      if (this.isInline) {
        this.show()
      }
    };
  a.prototype = {
    constructor: a,
    _events: [],
    _attachEvents: function () {
      this._detachEvents();
      if (this.isInput) {
        this._events = [
          [this.element,
          {
            focus: d.proxy(this.show, this),
            keyup: d.proxy(this.update, this),
            keydown: d.proxy(this.keydown, this)
          }]
        ]
      } else {
        if (this.component && this.hasInput) {
          this._events = [
            [this.element.find("input"),
            {
              focus: d.proxy(this.show, this),
              keyup: d.proxy(this.update, this),
              keydown: d.proxy(this.keydown, this)
            }],
            [this.component,
            {
              click: d.proxy(this.show, this)
            }]
          ]
        } else {
          if (this.element.is("div")) {
            this.isInline = true
          } else {
            this._events = [
              [this.element,
              {
                click: d.proxy(this.show, this)
              }]
            ]
          }
        }
      }
      for (var g = 0, h, j; g < this._events.length; g++) {
        h = this._events[g][0];
        j = this._events[g][1];
        h.on(j)
      }
    },
    _detachEvents: function () {
      for (var g = 0, h, j; g < this._events.length; g++) {
        h = this._events[g][0];
        j = this._events[g][1];
        h.off(j)
      }
      this._events = []
    },
    show: function (g) {
      this.picker.show();
      this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
      this.update();
      this.place();
      d(window).on("resize", d.proxy(this.place, this));
      if (g) {
        g.preventDefault()
      }
      this.element.trigger({
        type: "show",
        date: this.date
      })
    },
    hide: function (g) {
      if (this.isInline) {
        return
      }
      if (!this.picker.is(":visible")) {
        return
      }
      this.picker.hide();
      d(window).off("resize", this.place);
      this.viewMode = this.startViewMode;
      this.showMode();
      if (!this.isInput) {
        d(document).off("mousedown", this.hide)
      }
      if (this.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val())) {
        this.setValue()
      }
      this.element.trigger({
        type: "hide",
        date: this.date
      })
    },
    remove: function () {
      this._detachEvents();
      this.picker.remove();
      delete this.element.data().datepicker;
      if (!this.isInput) {
        delete this.element.data().date
      }
    },
    getDate: function () {
      var g = this.getUTCDate();
      return new Date(g.getTime() + (g.getTimezoneOffset() * 60000))
    },
    getUTCDate: function () {
      return this.date
    },
    setDate: function (g) {
      this.setUTCDate(new Date(g.getTime() - (g.getTimezoneOffset() * 60000)))
    },
    setUTCDate: function (g) {
      this.date = g;
      this.setValue()
    },
    setValue: function () {
      var g = this.getFormattedDate();
      if (!this.isInput) {
        if (this.component) {
          this.element.find("input").val(g)
        }
        this.element.data("date", g)
      } else {
        this.element.val(g)
      }
    },
    getFormattedDate: function (g) {
      if (g === undefined) {
        g = this.format
      }
      return c.formatDate(this.date, g, this.language)
    },
    setStartDate: function (g) {
      this.startDate = g || -Infinity;
      if (this.startDate !== -Infinity) {
        this.startDate = c.parseDate(this.startDate, this.format, this.language)
      }
      this.update();
      this.updateNavArrows()
    },
    setEndDate: function (g) {
      this.endDate = g || Infinity;
      if (this.endDate !== Infinity) {
        this.endDate = c.parseDate(this.endDate, this.format, this.language)
      }
      this.update();
      this.updateNavArrows()
    },
    setDaysOfWeekDisabled: function (g) {
      this.daysOfWeekDisabled = g || [];
      if (!d.isArray(this.daysOfWeekDisabled)) {
        this.daysOfWeekDisabled = this.daysOfWeekDisabled.split(/,\s*/)
      }
      this.daysOfWeekDisabled = d.map(this.daysOfWeekDisabled, function (h) {
        return parseInt(h, 10)
      });
      this.update();
      this.updateNavArrows()
    },
    place: function () {
      if (this.isInline) {
        return
      }
      var i = parseInt(this.element.parents().filter(function () {
        return d(this).css("z-index") != "auto"
      }).first().css("z-index")) + 10;
      var h = this.component ? this.component.parent().offset() : this.element.offset();
      var g = this.component ? this.component.outerHeight(true) : this.element.outerHeight(true);
      this.picker.css({
        top: h.top + g,
        left: h.left,
        zIndex: i
      })
    },
    update: function () {
      var g, h = false;
      if (arguments && arguments.length && (typeof arguments[0] === "string" || arguments[0] instanceof Date)) {
        g = arguments[0];
        h = true
      } else {
        g = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val()
      }
      this.date = c.parseDate(g, this.format, this.language);
      if (h) {
        this.setValue()
      }
      if (this.date < this.startDate) {
        this.viewDate = new Date(this.startDate)
      } else {
        if (this.date > this.endDate) {
          this.viewDate = new Date(this.endDate)
        } else {
          this.viewDate = new Date(this.date)
        }
      }
      this.fill()
    },
    fillDow: function () {
      var h = this.weekStart,
        i = "<tr>";
      if (this.calendarWeeks) {
        var g = '<th class="cw">&nbsp;</th>';
        i += g;
        this.picker.find(".datepicker-days thead tr:first-child").prepend(g)
      }
      while (h < this.weekStart + 7) {
        i += '<th class="dow">' + e[this.language].daysMin[(h++) % 7] + "</th>"
      }
      i += "</tr>";
      this.picker.find(".datepicker-days thead").append(i)
    },
    fillMonths: function () {
      var h = "",
        g = 0;
      while (g < 12) {
        h += '<span class="month">' + e[this.language].monthsShort[g++] + "</span>"
      }
      this.picker.find(".datepicker-months td").html(h)
    },
    fill: function () {
      var y = new Date(this.viewDate),
        p = y.getUTCFullYear(),
        z = y.getUTCMonth(),
        s = this.startDate !== -Infinity ? this.startDate.getUTCFullYear() : -Infinity,
        w = this.startDate !== -Infinity ? this.startDate.getUTCMonth() : -Infinity,
        m = this.endDate !== Infinity ? this.endDate.getUTCFullYear() : Infinity,
        t = this.endDate !== Infinity ? this.endDate.getUTCMonth() : Infinity,
        n = this.date && this.date.valueOf(),
        x = new Date();
      this.picker.find(".datepicker-days thead th.switch").text(e[this.language].months[z] + " " + p);
      this.picker.find("tfoot th.today").text(e[this.language].today).toggle(this.todayBtn !== false);
      this.updateNavArrows();
      this.fillMonths();
      var B = f(p, z - 1, 28, 0, 0, 0, 0),
        v = c.getDaysInMonth(B.getUTCFullYear(), B.getUTCMonth());
      B.setUTCDate(v);
      B.setUTCDate(v - (B.getUTCDay() - this.weekStart + 7) % 7);
      var g = new Date(B);
      g.setUTCDate(g.getUTCDate() + 42);
      g = g.valueOf();
      var o = [];
      var r;
      while (B.valueOf() < g) {
        if (B.getUTCDay() == this.weekStart) {
          o.push("<tr>");
          if (this.calendarWeeks) {
            var h = new Date(+B + (this.weekStart - B.getUTCDay() - 7) % 7 * 86400000),
              k = new Date(+h + (7 + 4 - h.getUTCDay()) % 7 * 86400000),
              j = new Date(+(j = f(k.getUTCFullYear(), 0, 1)) + (7 + 4 - j.getUTCDay()) % 7 * 86400000),
              q = (k - j) / 86400000 / 7 + 1;
            o.push('<td class="cw">' + q + "</td>")
          }
        }
        r = "";
        if (B.getUTCFullYear() < p || (B.getUTCFullYear() == p && B.getUTCMonth() < z)) {
          r += " old"
        } else {
          if (B.getUTCFullYear() > p || (B.getUTCFullYear() == p && B.getUTCMonth() > z)) {
            r += " new"
          }
        }
        if (this.todayHighlight && B.getUTCFullYear() == x.getFullYear() && B.getUTCMonth() == x.getMonth() && B.getUTCDate() == x.getDate()) {
          r += " today"
        }
        if (n && B.valueOf() == n) {
          r += " active"
        }
        if (B.valueOf() < this.startDate || B.valueOf() > this.endDate || d.inArray(B.getUTCDay(), this.daysOfWeekDisabled) !== -1) {
          r += " disabled"
        }
        o.push('<td class="day' + r + '">' + B.getUTCDate() + "</td>");
        if (B.getUTCDay() == this.weekEnd) {
          o.push("</tr>")
        }
        B.setUTCDate(B.getUTCDate() + 1)
      }
      this.picker.find(".datepicker-days tbody").empty().append(o.join(""));
      var C = this.date && this.date.getUTCFullYear();
      var l = this.picker.find(".datepicker-months").find("th:eq(1)").text(p).end().find("span").removeClass("active");
      if (C && C == p) {
        l.eq(this.date.getUTCMonth()).addClass("active")
      }
      if (p < s || p > m) {
        l.addClass("disabled")
      }
      if (p == s) {
        l.slice(0, w).addClass("disabled")
      }
      if (p == m) {
        l.slice(t + 1).addClass("disabled")
      }
      o = "";
      p = parseInt(p / 10, 10) * 10;
      var A = this.picker.find(".datepicker-years").find("th:eq(1)").text(p + "-" + (p + 9)).end().find("td");
      p -= 1;
      for (var u = -1; u < 11; u++) {
        o += '<span class="year' + (u == -1 || u == 10 ? " old" : "") + (C == p ? " active" : "") + (p < s || p > m ? " disabled" : "") + '">' + p + "</span>";
        p += 1
      }
      A.html(o)
    },
    updateNavArrows: function () {
      var i = new Date(this.viewDate),
        g = i.getUTCFullYear(),
        h = i.getUTCMonth();
      switch (this.viewMode) {
      case 0:
        if (this.startDate !== -Infinity && g <= this.startDate.getUTCFullYear() && h <= this.startDate.getUTCMonth()) {
          this.picker.find(".prev").css({
            visibility: "hidden"
          })
        } else {
          this.picker.find(".prev").css({
            visibility: "visible"
          })
        }
        if (this.endDate !== Infinity && g >= this.endDate.getUTCFullYear() && h >= this.endDate.getUTCMonth()) {
          this.picker.find(".next").css({
            visibility: "hidden"
          })
        } else {
          this.picker.find(".next").css({
            visibility: "visible"
          })
        }
        break;
      case 1:
      case 2:
        if (this.startDate !== -Infinity && g <= this.startDate.getUTCFullYear()) {
          this.picker.find(".prev").css({
            visibility: "hidden"
          })
        } else {
          this.picker.find(".prev").css({
            visibility: "visible"
          })
        }
        if (this.endDate !== Infinity && g >= this.endDate.getUTCFullYear()) {
          this.picker.find(".next").css({
            visibility: "hidden"
          })
        } else {
          this.picker.find(".next").css({
            visibility: "visible"
          })
        }
        break
      }
    },
    click: function (m) {
      m.preventDefault();
      var l = d(m.target).closest("span, td, th");
      if (l.length == 1) {
        switch (l[0].nodeName.toLowerCase()) {
        case "th":
          switch (l[0].className) {
          case "switch":
            this.showMode(1);
            break;
          case "prev":
          case "next":
            var i = c.modes[this.viewMode].navStep * (l[0].className == "prev" ? -1 : 1);
            switch (this.viewMode) {
            case 0:
              this.viewDate = this.moveMonth(this.viewDate, i);
              break;
            case 1:
            case 2:
              this.viewDate = this.moveYear(this.viewDate, i);
              break
            }
            this.fill();
            break;
          case "today":
            var h = new Date();
            h = f(h.getFullYear(), h.getMonth(), h.getDate(), 0, 0, 0);
            this.showMode(-2);
            var n = this.todayBtn == "linked" ? null : "view";
            this._setDate(h, n);
            break
          }
          break;
        case "span":
          if (!l.is(".disabled")) {
            this.viewDate.setUTCDate(1);
            if (l.is(".month")) {
              var g = 1;
              var k = l.parent().find("span").index(l);
              var j = this.viewDate.getUTCFullYear();
              this.viewDate.setUTCMonth(k);
              this.element.trigger({
                type: "changeMonth",
                date: this.viewDate
              });
              if (this.minViewMode == 1) {
                this._setDate(f(j, k, g, 0, 0, 0, 0))
              }
            } else {
              var j = parseInt(l.text(), 10) || 0;
              var g = 1;
              var k = 0;
              this.viewDate.setUTCFullYear(j);
              this.element.trigger({
                type: "changeYear",
                date: this.viewDate
              });
              if (this.minViewMode == 2) {
                this._setDate(f(j, k, g, 0, 0, 0, 0))
              }
            }
            this.showMode(-1);
            this.fill()
          }
          break;
        case "td":
          if (l.is(".day") && !l.is(".disabled")) {
            var g = parseInt(l.text(), 10) || 1;
            var j = this.viewDate.getUTCFullYear(),
              k = this.viewDate.getUTCMonth();
            if (l.is(".old")) {
              if (k === 0) {
                k = 11;
                j -= 1
              } else {
                k -= 1
              }
            } else {
              if (l.is(".new")) {
                if (k == 11) {
                  k = 0;
                  j += 1
                } else {
                  k += 1
                }
              }
            }
            this._setDate(f(j, k, g, 0, 0, 0, 0))
          }
          this.hide();
          break
        }
      }
    },
    _setDate: function (g, i) {
      if (!i || i == "date") {
        this.date = g
      }
      if (!i || i == "view") {
        this.viewDate = g
      }
      this.fill();
      this.setValue();
      this.element.trigger({
        type: "changeDate",
        date: this.date
      });
      var h;
      if (this.isInput) {
        h = this.element
      } else {
        if (this.component) {
          h = this.element.find("input")
        }
      }
      if (h) {
        h.change();
        if (this.autoclose && (!i || i == "date")) {
          this.hide()
        }
      }
    },
    moveMonth: function (g, h) {
      if (!h) {
        return g
      }
      var l = new Date(g.valueOf()),
        p = l.getUTCDate(),
        m = l.getUTCMonth(),
        k = Math.abs(h),
        o, n;
      h = h > 0 ? 1 : -1;
      if (k == 1) {
        n = h == -1 ?
        function () {
          return l.getUTCMonth() == m
        } : function () {
          return l.getUTCMonth() != o
        };
        o = m + h;
        l.setUTCMonth(o);
        if (o < 0 || o > 11) {
          o = (o + 12) % 12
        }
      } else {
        for (var j = 0; j < k; j++) {
          l = this.moveMonth(l, h)
        }
        o = l.getUTCMonth();
        l.setUTCDate(p);
        n = function () {
          return o != l.getUTCMonth()
        }
      }
      while (n()) {
        l.setUTCDate(--p);
        l.setUTCMonth(o)
      }
      return l
    },
    moveYear: function (h, g) {
      return this.moveMonth(h, g * 12)
    },
    dateWithinRange: function (g) {
      return g >= this.startDate && g <= this.endDate
    },
    keydown: function (n) {
      if (this.picker.is(":not(:visible)")) {
        if (n.keyCode == 27) {
          this.show()
        }
        return
      }
      var j = false,
        i, h, m, g, l;
      switch (n.keyCode) {
      case 27:
        this.hide();
        n.preventDefault();
        break;
      case 37:
      case 39:
        if (!this.keyboardNavigation) {
          break
        }
        i = n.keyCode == 37 ? -1 : 1;
        if (n.ctrlKey) {
          g = this.moveYear(this.date, i);
          l = this.moveYear(this.viewDate, i)
        } else {
          if (n.shiftKey) {
            g = this.moveMonth(this.date, i);
            l = this.moveMonth(this.viewDate, i)
          } else {
            g = new Date(this.date);
            g.setUTCDate(this.date.getUTCDate() + i);
            l = new Date(this.viewDate);
            l.setUTCDate(this.viewDate.getUTCDate() + i)
          }
        }
        if (this.dateWithinRange(g)) {
          this.date = g;
          this.viewDate = l;
          this.setValue();
          this.update();
          n.preventDefault();
          j = true
        }
        break;
      case 38:
      case 40:
        if (!this.keyboardNavigation) {
          break
        }
        i = n.keyCode == 38 ? -1 : 1;
        if (n.ctrlKey) {
          g = this.moveYear(this.date, i);
          l = this.moveYear(this.viewDate, i)
        } else {
          if (n.shiftKey) {
            g = this.moveMonth(this.date, i);
            l = this.moveMonth(this.viewDate, i)
          } else {
            g = new Date(this.date);
            g.setUTCDate(this.date.getUTCDate() + i * 7);
            l = new Date(this.viewDate);
            l.setUTCDate(this.viewDate.getUTCDate() + i * 7)
          }
        }
        if (this.dateWithinRange(g)) {
          this.date = g;
          this.viewDate = l;
          this.setValue();
          this.update();
          n.preventDefault();
          j = true
        }
        break;
      case 13:
        this.hide();
        n.preventDefault();
        break;
      case 9:
        this.hide();
        break
      }
      if (j) {
        this.element.trigger({
          type: "changeDate",
          date: this.date
        });
        var k;
        if (this.isInput) {
          k = this.element
        } else {
          if (this.component) {
            k = this.element.find("input")
          }
        }
        if (k) {
          k.change()
        }
      }
    },
    showMode: function (g) {
      if (g) {
        this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + g))
      }
      this.picker.find(">div").hide().filter(".datepicker-" + c.modes[this.viewMode].clsName).css("display", "block");
      this.updateNavArrows()
    }
  };
  d.fn.datepicker = function (h) {
    var g = Array.apply(null, arguments);
    g.shift();
    return this.each(function () {
      var k = d(this),
        j = k.data("datepicker"),
        i = typeof h == "object" && h;
      if (!j) {
        k.data("datepicker", (j = new a(this, d.extend({}, d.fn.datepicker.defaults, i))))
      }
      if (typeof h == "string" && typeof j[h] == "function") {
        j[h].apply(j, g)
      }
    })
  };
  d.fn.datepicker.defaults = {};
  d.fn.datepicker.Constructor = a;
  var e = d.fn.datepicker.dates = {
    en: {
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      today: "Today"
    }
  };
  var c = {
    modes: [{
      clsName: "days",
      navFnc: "Month",
      navStep: 1
    }, {
      clsName: "months",
      navFnc: "FullYear",
      navStep: 1
    }, {
      clsName: "years",
      navFnc: "FullYear",
      navStep: 10
    }],
    isLeapYear: function (g) {
      return (((g % 4 === 0) && (g % 100 !== 0)) || (g % 400 === 0))
    },
    getDaysInMonth: function (g, h) {
      return [31, (c.isLeapYear(g) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][h]
    },
    validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
    nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
    parseFormat: function (i) {
      var g = i.replace(this.validParts, "\0").split("\0"),
        h = i.match(this.validParts);
      if (!g || !g.length || !h || h.length === 0) {
        throw new Error("Invalid date format.")
      }
      return {
        separators: g,
        parts: h
      }
    },
    parseDate: function (k, u, n) {
      if (k instanceof Date) {
        return k
      }
      if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(k)) {
        var w = /([\-+]\d+)([dmwy])/,
          m = k.match(/([\-+]\d+)([dmwy])/g),
          g, l;
        k = new Date();
        for (var o = 0; o < m.length; o++) {
          g = w.exec(m[o]);
          l = parseInt(g[1]);
          switch (g[2]) {
          case "d":
            k.setUTCDate(k.getUTCDate() + l);
            break;
          case "m":
            k = a.prototype.moveMonth.call(a.prototype, k, l);
            break;
          case "w":
            k.setUTCDate(k.getUTCDate() + l * 7);
            break;
          case "y":
            k = a.prototype.moveYear.call(a.prototype, k, l);
            break
          }
        }
        return f(k.getUTCFullYear(), k.getUTCMonth(), k.getUTCDate(), 0, 0, 0)
      }
      var m = k && k.match(this.nonpunctuation) || [],
        k = new Date(),
        r = {},
        t = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"],
        v = {
          yyyy: function (s, i) {
            return s.setUTCFullYear(i)
          },
          yy: function (s, i) {
            return s.setUTCFullYear(2000 + i)
          },
          m: function (s, i) {
            i -= 1;
            while (i < 0) {
              i += 12
            }
            i %= 12;
            s.setUTCMonth(i);
            while (s.getUTCMonth() != i) {
              s.setUTCDate(s.getUTCDate() - 1)
            }
            return s
          },
          d: function (s, i) {
            return s.setUTCDate(i)
          }
        },
        j, p, g;
      v.M = v.MM = v.mm = v.m;
      v.dd = v.d;
      k = f(k.getFullYear(), k.getMonth(), k.getDate(), 0, 0, 0);
      var q = u.parts.slice();
      if (m.length != q.length) {
        q = d(q).filter(function (s, y) {
          return d.inArray(y, t) !== -1
        }).toArray()
      }
      if (m.length == q.length) {
        for (var o = 0, h = q.length; o < h; o++) {
          j = parseInt(m[o], 10);
          g = q[o];
          if (isNaN(j)) {
            switch (g) {
            case "MM":
              p = d(e[n].months).filter(function () {
                var i = this.slice(0, m[o].length),
                  s = m[o].slice(0, i.length);
                return i == s
              });
              j = d.inArray(p[0], e[n].months) + 1;
              break;
            case "M":
              p = d(e[n].monthsShort).filter(function () {
                var i = this.slice(0, m[o].length),
                  s = m[o].slice(0, i.length);
                return i == s
              });
              j = d.inArray(p[0], e[n].monthsShort) + 1;
              break
            }
          }
          r[g] = j
        }
        for (var o = 0, x; o < t.length; o++) {
          x = t[o];
          if (x in r && !isNaN(r[x])) {
            v[x](k, r[x])
          }
        }
      }
      return k
    },
    formatDate: function (g, l, n) {
      var m = {
        d: g.getUTCDate(),
        D: e[n].daysShort[g.getUTCDay()],
        DD: e[n].days[g.getUTCDay()],
        m: g.getUTCMonth() + 1,
        M: e[n].monthsShort[g.getUTCMonth()],
        MM: e[n].months[g.getUTCMonth()],
        yy: g.getUTCFullYear().toString().substring(2),
        yyyy: g.getUTCFullYear()
      };
      m.dd = (m.d < 10 ? "0" : "") + m.d;
      m.mm = (m.m < 10 ? "0" : "") + m.m;
      var g = [],
        k = d.extend([], l.separators);
      for (var j = 0, h = l.parts.length; j < h; j++) {
        if (k.length) {
          g.push(k.shift())
        }
        g.push(m[l.parts[j]])
      }
      return g.join("")
    },
    headTemplate: '<thead><tr><th class="prev"><i class="icon-arrow-left"/></th><th colspan="5" class="switch"></th><th class="next"><i class="icon-arrow-right"/></th></tr></thead>',
    contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
    footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr></tfoot>'
  };
  c.template = '<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">' + c.headTemplate + "<tbody></tbody>" + c.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + c.headTemplate + c.contTemplate + c.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + c.headTemplate + c.contTemplate + c.footTemplate + "</table></div></div>";
  d.fn.datepicker.DPGlobal = c
}(window.jQuery);