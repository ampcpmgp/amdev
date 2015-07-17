### memo
    必須機能：
        他オブジェクトの内容をたどれる
        インデントでの折り返しが出来る
        テキストをそのまま編集したものがオブジェクトになる。
        軽量を意識する（不被強なDOMは使わない）
####

server =
    enter_room: (type) =>
        [
            "socket.idからユーザーを取得する"
            "部屋にユーザーを#{type}として追加する"
        ]
flaw_arr = [
    "login"
    "enter lobby"
    "enter room(type)": [
        "if type is player": [
            "対局をする"
            server.enter_room("player")
        ]
        "if type is spectator": [
            "対局を見る"
            server.enter_room("spectator")
        ]
        "サーバーにtypeを送信"
    ]
    "logout #login後どこでも出来るのはどうする？"
    "disconnect"
]
indent = "  "

check_log = (val, recursive) ->
    val_type = typeof(val)
    switch val_type
        when "object"
            switch Array.isArray(val)
                when true
                    for arr_val, i in val
                        check_log(arr_val, recursive+1)
                else
                    for key, obj_val of val
                        check_log(key, recursive)
                        check_log(obj_val, recursive)
        when "function"
            1
        else
            tmp_indent = ""
            if recursive > 0
                for ___i in [1..recursive]
                    tmp_indent += indent
            console.log "#{tmp_indent}#{val}"

check_log(flaw_arr, -1)
