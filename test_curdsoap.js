$(document).ready(function(){
    test("clean text", function() {
        equal(curdsoap.clean(''), '', 'clean empty string')
        equal(curdsoap.clean('hello'), 'hello', 'single word')
    })

    test("tags", function() {
        equal(curdsoap.clean('<strong>hello</strong>'),
            '<strong>hello</strong>',
            'allowed tag containing text'
        )
        equal(curdsoap.clean('<muha>hallo</muha>'),
            'hallo ',
            'disallowed tag containing text'
        )
        equal(curdsoap.clean('<strong><u>hello</u>muha</strong>'),
            '<strong><u>hello</u>muha</strong>',
            'multiple allowed tags containing text'
        )
        equal(curdsoap.clean('<strong2><u2>hello</u2>muha</strong2>'),
            'hello muha ',
            'multiple disallowed tags containing text'
        )
        equal(curdsoap.clean('<strong><u2>hello</u2>muha</strong>test'),
            '<strong>hello muha</strong>test',
            'multiple disallowed tags containing text'
        )
    })

    test("attributes", function() {
        equal(curdsoap.clean('<spam foo="bar">hello</spam>'),
            'hello ',
            'disallowed attribute in disallowed tag without allowed attrs'
        )
        equal(curdsoap.clean('<strong foo="bar">hello</strong>'),
            '<strong>hello</strong>',
            'disallowed attribute in allowed tag without allowed attrs'
        )
        equal(curdsoap.clean('<a foo="bar">hello</a>'),
            '<a>hello</a>',
            'disallowed attribute in allowed tag with allowed attrs'
        )
        equal(curdsoap.clean('<a href="bar">hello</a>'),
            '<a href="bar">hello</a>',
            'allowed attribute in allowed tag'
        )
        equal(curdsoap.clean('<a href="bar" title="foo">hello</a>'),
            '<a href="bar" title="foo">hello</a>',
            'two allowed attributes in allowed tag'
        )
        equal(curdsoap.clean('<a href="bar" title="foo" alt="eggs">hello</a>'),
            '<a href="bar" alt="eggs" title="foo">hello</a>',
            'three allowed attributes in allowed tag'
        )
    })

    test("ignored nodes", function() {
        equal(curdsoap.clean('<style>style</style>'),
            '',
            'style node'
        )
    })

    function xss() {
        console.log('XSS! PANIC!!!')
        fail('XSS!! PANIC!!!!')
    }

    test("XSS", function() {
        equal(curdsoap.clean('<script>xss()</'+'script>'),
            'xss()',
            'script node'
        )
    })
})
