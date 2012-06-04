var curdsoap = {}

curdsoap.ALLOWED_TAGS = ['strong', 'u']

curdsoap.ALLOWED_ATTRIBUTES = []

curdsoap.clean = function(str, kws) {
    var allowed_tags = curdsoap.ALLOWED_TAGS
    var allowed_attributes = curdsoap.ALLOWED_ATTRIBUTES
    
    var tag_map = {}
    
    $.each(allowed_tags, function(idx, val) {
        tag_map[val.toUpperCase()] = true
    })
    
    var rec_clean = function(str) {
        var out = $('<div/>')
        var dom = $('<div>' + str + '</div>')
        dom.contents().each(function() {
            if (this.nodeType == 3) {
                //text node
                out.append($(this).text())
            } else {
                if (tag_map[this.tagName] != undefined) {
                    var tag = $('<' + this.tagName + '/>')
                    tag.html(rec_clean($(this).html()))
                    out.append(tag)
                } else {
                    out.html(out.html() + rec_clean($(this).html()) + ' ')
                }
            }
        })
        return out.html()
    }
    return rec_clean(str)
}
