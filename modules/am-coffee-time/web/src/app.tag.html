<app>
  <before-login if={!Status.isLogin} />
  <after-login if={Status.isLogin} />
  <style scoped type="less">
    :scope {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  </style>
  <script type="coffee">
    Status = @Status = require("./Status")
    Status.on("update", => @update())
  </script>
</app>

<before-login>
  <span>パスワードはappleです。ログインしてください。</span>
  <label for="id">
    <span>ID:</span>
    <input type="text" name="id" ref="id" value="">
  </label>
  <label for="pw">
    <span>PW:</span>
    <input type="password" name="pw" ref="pw" value="">
  </label>
  <input type="button" name="check" value="login" onclick={check}>
  <span class="error">{errorMsg}</span>
  <style scoped type="less">
    :scope {
      height: 300px;
      border: 1px solid #555;
      padding: 0px 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    :scope > * {
      padding: 4px 0px;
    }
    label {
      display: flex;
      justify-content: space-between;
      width: 210px;
    }
    .error {
      height: 24px;
      color: rgba(255, 32, 32, 0.6);
    }
  </style>
  <script type="coffee">
    Status = require("./Status")
    @errorMsg = ""
    @check = =>
      id = @refs.id.value
      pw = @refs.pw.value
      return @errorMsg = "ID/PWを入力してください" unless id or pw
      return @errorMsg = "PWが正しくないです" unless pw.match(/^(apple)$/)
      Status.isLogin = true
      Status.trigger("update")
      @errorMsg = ""
  </script>
</before-login>

<after-login>
  <div class="">
    ログイン成功
  </div>
</after-login>
