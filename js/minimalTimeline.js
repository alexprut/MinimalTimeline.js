'use strict'

function Entry (title, deep, endDate, type, html) {
  this.title = title
  this.deep = deep
  this.endDate = endDate
  this.type = type
  this.html = html
}

function Timeline (settings) {
  this.entries = settings && settings.entries || []
  this.minDeep = settings && settings.minDeep || 1
  this.currentDeep = settings && settings.currentDeep || 1
  this.maxDeep = settings && settings.maxDeep || 1
}

Timeline.prototype.addEntry = function (title, deep, endDate, type, html) {
  this.entries.push(
    new Entry(title, deep, endDate, type, html)
  )

  this.maxDeep = (deep > this.maxDeep) ? deep : this.maxDeep
  this.minDeep = (deep < this.minDeep) ? deep : this.minDeep
}

Timeline.prototype.getEntriesFromToDeep = function (fromDeep, toDeep, type) {
  var returnEntries = []

  for (var i = 0, x = this.entries.length; i < x; i++) {
    var entry = this.entries[i]
    var check = entry.deep >= fromDeep && entry.deep <= toDeep

    if (!type && check) {
      returnEntries.push(entry)
    } else if (type && check && (entry.type === type || type.indexOf(entry.type) !== -1)) {
      returnEntries.push(entry)
    }
  }

  return returnEntries
}

Timeline.prototype.hasEntriesForNextDeep = function (type) {
  for (var i = 0, x = this.entries.length; i < x; i++) {
    var entry = this.entries[i]
    var check = entry.deep > this.currentDeep

    if ((!type && check) ||
      (type && check && (entry.type === type || type.indexOf(entry.type) !== -1))) {
      return true
    }
  }

  return false
}

Timeline.prototype.getEntriesOfDeep = function (deep, type) {
  return this.getEntriesFromToDeep(deep, deep, type)
}

Timeline.prototype.getEntriesUpToDeep = function (type) {
  return this.getEntriesFromToDeep(this.minDeep, this.currentDeep, type)
}

Timeline.prototype.getNextDeepEntries = function (type) {
  return this.getEntriesOfDeep(++this.currentDeep, type)
}

Timeline.prototype.isLastDeep = function () {
  return (this.currentDeep === this.maxDeep)
}

$.fn.timeline = function (options) {
  var isOneDeep = options && options.isOneDeep || false;
  var $handler = $(this)
  var $entries = $handler.find('.box')
  var $legendFilters = $handler.find('.legend a')
  var $moreButton = $handler.find('button')
  var content = $handler.find('.content')
  var types = []
  var timeline = new Timeline()

  var createDate = function (stringDate) {
    if (stringDate === 'current') {
      return new Date()
    }

    // The custom string format to parse needs to be 'year-month-day'
    stringDate = stringDate.split('-')

    return new Date(stringDate[0], stringDate[1], stringDate[2])
  }

  var addEntryTimeline = function (title, deep, endDate, type, html) {
    deep = deep || 1
    endDate = createDate(endDate)

    timeline.addEntry(title, deep, endDate, type, html)

    if (types.indexOf(type) === -1) {
      types.push(type)
    }
  }

  var addEntryDom = function (entry) {
    var insertionBlock = $handler.find('.block[data-year=' + (parseInt(entry.endDate.getFullYear()) + 1) + ']')
    var siblings = insertionBlock.find('.box')
    var insertionIndex = null

    entry.html = $(entry.html).css({'opacity': 0.1}).animate({'opacity': 1})

    if (!insertionBlock.length) {
      insertionBlock = $handler.find('.block').first()
    }

    siblings.each(function (index) {
      // Control if the entry date is bigger then his siblings
      if (entry.endDate >= createDate($(this).data('end'))) {
        insertionIndex = index

        // Break the loop if the position where to place is found
        return false
      }
    })

    // Insert the content inside the DOM
    if (insertionIndex !== null) {
      siblings.eq(insertionIndex).before(entry.html)
    } else {
      insertionBlock.append(entry.html)
    }
  }

  var showNextDeep = function (type) {
    timeline.getNextDeepEntries(type).forEach(function (entry) {
      addEntryDom(entry)
    })
  }

  var showEntriesOfType = function (type) {
    timeline.getEntriesUpToDeep(type).forEach(function (entry) {
      addEntryDom(entry)
    })
  }

  var removeEntriesOfType = function (type) {
    content.find('[data-type="' + type + '"]').animate({'opacity': 0.1}, {
      duration: 200,
      complete: function () {
        $(this).remove()
      }
    })
  }

  var toggleFilters = function () {
    var legendFilter = $(this)
    var type = legendFilter.data('type')

    if (legendFilter.hasClass('disabled')) {
      // Show
      types.push(type)
      showEntriesOfType(type)
      legendFilter.removeClass('disabled')
    } else {
      // Hide
      types.splice(types.indexOf(type), 1)
      removeEntriesOfType(type)
      legendFilter.addClass('disabled')
    }

    if (!timeline.isLastDeep() && timeline.hasEntriesForNextDeep(type)) {
      $moreButton.trigger('toggle')
    }
  }

  var clickFilters = function (event) {
    event.preventDefault()
    var $legendFilter = $(this)
    var disabledSiblings = $legendFilter.siblings().filter('.disabled')
    var isEnabled = !$legendFilter.hasClass('disabled')
    var numFilters = $legendFilters.length

    switch (numFilters) {
      case 1:
        break
      case 2:
        if (isEnabled && disabledSiblings) {
          disabledSiblings.trigger('toggle')
        }
        break
      default:
        var enabledFilters = $legendFilter.siblings().filter(':not(.disabled)')
        var isEnabledJustLastFilter = disabledSiblings.length === (numFilters - 2)

        if (isEnabled && isEnabledJustLastFilter) {
          enabledFilters.addClass('not-toggle').off('toggle')
        } else if (!isEnabled && isEnabledJustLastFilter) {
          enabledFilters.removeClass('not-toggle').on('toggle', toggleFilters)
        }
        break
    }

    $legendFilter.trigger('toggle')
  }

  var toggleMoreButton = function () {
    if ($moreButton.hasClass('disabled')) {
      $moreButton.removeClass('disabled').on('click', clickMoreButton)
    } else {
      $moreButton.addClass('disabled').off('click')
    }
  }

  var clickMoreButton = function () {
    if (isOneDeep) {
      while (!timeline.isLastDeep()) {
        showNextDeep(types)
      }
    } else {
      showNextDeep(types)
    }

    if (timeline.isLastDeep()) {
      $moreButton.trigger('toggle')
    }
  }

  var init = function () {
    // Parse HTML and populate the Timeline
    $entries.each(function () {
      var $this = $(this)

      addEntryTimeline(
        $this.find('.title a').text().trim(),
        $this.data('deep'),
        $this.data('end'),
        $this.data('type'),
        $('<p>').append($this.eq(0).clone()).html()
      )
    }).filter('[data-deep]').remove()

    $moreButton.on('click', clickMoreButton).on('toggle', toggleMoreButton)
    $legendFilters.on('click', clickFilters).on('toggle', toggleFilters)
  }

  init()
}
