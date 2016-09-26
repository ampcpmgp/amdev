<app>
  <before-login if={!isLogin} />
  <after-login if={isLogin} />
  <style scoped type="less">
    :scope {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  </style>
  <script type="coffee">
    @isLogin = false
  </script>
</app>

<before-login>
  <span>パスワードはappleです。ログインしてください。</span>
  <label for="id">
    <span>ID:</span>
    <input type="text" name="id" value="">
  </label>
  <label for="pw">
    <span>PW:</span>
    <input type="password" name="pw" value="">
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
    @errorMsg = ""
    @check = =>
      id = @id.value
      pw = @pw.value
      return @errorMsg = "ID/PWを入力してください" unless id or pw
      return @errorMsg = "PWが正しくないです" unless pw.match(/^(apple|google)$/)
      @errorMsg = ""
  </script>
</before-login>

<after-login>
  <div class="">
    ログイン成功
  </div>
</after-login>
