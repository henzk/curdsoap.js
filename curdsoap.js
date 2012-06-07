var curdsoap = {}

curdsoap.ALLOWED_TAGS = [
    'strong',
    'em',
    'u',
    'p',
    'ul',
    'ol',
    'li',
    'h1',
    'h2'
]

curdsoap.ALLOWED_ATTRIBUTES = {
    'a': ['href', 'alt', 'title']
}

curdsoap.IGNORED_TAGS = {
    'STYLE':true
}

curdsoap.clean = function(str, kws) {
    var allowed_tags = curdsoap.ALLOWED_TAGS
    var tag_map = curdsoap.ALLOWED_ATTRIBUTES
    var ignored_tags = curdsoap.IGNORED_TAGS

    if (kws != undefined) {
        if (kws.ALLOWED_TAGS != undefined) {
            allowed_tags = kws.ALLOWED_TAGS
        }
        if (kws.ALLOWED_ATTRIBUTES != undefined) {
            tag_map = kws.ALLOWED_ATTRIBUTES
        }
        if (kws.IGNORED_TAGS != undefined) {
            tag_map = kws.IGNORED_TAGS
        }
    }

    $.each(tag_map, function(key, val) {
        tag_map[key.toUpperCase()] = val
    })

    $.each(allowed_tags, function(idx, val) {
        tag_map[val.toUpperCase()] = []
    })

    var rec_clean = function(str) {
        var out = $('<div/>')
        var dom = $('<div>' + str + '</div>')
        dom.contents().each(function() {
            var node = $(this)
            if (this.nodeType == 3) {
                //text node
                out.append($(this).text())
            } else {
                if (tag_map[this.tagName] != undefined) {
                    var tag = $('<' + this.tagName + '/>')
                    $.each(tag_map[this.tagName], function(index, value) {
                        if (node.attr(value) != undefined) {
                            tag.attr(value, node.attr(value))
                        }
                    })
                    tag.html(rec_clean($(this).html()))
                    out.append(tag)
                } else {
                    if (ignored_tags[this.tagName] == undefined) {
                        out.html(out.html() + rec_clean(node.html()) + ' ')
                    }
                }
            }
        })
        return out.html()
    }
    return rec_clean(str)
}
