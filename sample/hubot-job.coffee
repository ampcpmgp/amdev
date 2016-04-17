googl = require('goo.gl')
googl.setKey('**') # key
googl.getKey()
client = require("cheerio-httpcli")

class Crawler
  constructor:(@siteName, @url) ->
    @params =
      sr: "latest" #新着順フラグ/スタンバイ
      sort: "date" #新着順フラグ/indeed
    @rate = 1
  start: (keyword) =>
    @params.q = keyword
    @paramsStr = "?"
    @paramsStr += "#{key}=#{val}&" for key, val of @params
    @fullUrl = "#{@url}#{@paramsStr}"
    googl.shorten(@fullUrl)
      .then((@shortUrl) =>
        client.fetch(@url, @params, @result)
      )
      .catch((err) =>
        @shortUrl = encodeURIComponent(@fullUrl.replace(/(^https?:\/\/)/, ""))
        @shortUrl = RegExp.$1 + @shortUrl
        client.fetch(@url, @params, @result)
      )
  result:  (err, $, res, body) =>
    return @retry(err) if err
    callback = (msg) =>
      Crawler::replyMessage += msg + "\n"
      @msg.send(Crawler::replyMessage + "```") unless --Crawler::num
    #get info
    jobNum = $(@selectors.jobNum).text().replace(/\s+/g, "").
      match(/(全|結果|of)([\d,]+)/, "")?[2].
      replace(/,/g, "") - 0.0
    unless jobNum
      jobNum = 0
      averageIncome = 0
    else
      averageIncome = @_getAverageIncome($)
    #finally
    callback("""
      #{@siteName} - #{@shortUrl}
      > 求人数(#{jobNum})　平均年収(#{averageIncome}万円)
    """)
  retry: (err) =>
    Crawler::replyMessage += "#{@siteName} - レスポンスエラー\n"
    @msg.send(Crawler::replyMessage + "```") unless --Crawler::num
  _getAverageIncome: ($) =>
    $dom = $(@selectors.incomeBox)
    sumJobNum = 0
    sumAnnual = 0
    $dom.each((i, el) =>
      $dom = $(el)
      minAnnual = $dom.find("a").text().replace(/\s+/, "").match(/([\d,]+)[万円|\+]/)[1].replace(/,/, "") - 0.0
      jobNum = $dom.text().match(/\(([\d,]+)\)/)[1].replace(/,/, "") - 0.0
      sumJobNum += jobNum
      sumAnnual += minAnnual * jobNum * @rate
      )
    return Math.floor(sumAnnual / sumJobNum)


module.exports = (robot) ->
  robot.hear /([\d\D]+)(の求人|\s?jobs)$/i, (msg) ->
    keyword = RegExp.$1
    #preset
    Crawler::num = 3
    Crawler::msg = msg
    Crawler::replyMessage = "`#{keyword}の求人　(1ドル=120円換算)`\n```\n"
    #crawler
    root.stanby = new Crawler("stanby", "https://jp.stanby.com/%E6%B1%82%E4%BA%BA")
    stanby.selectors =
      jobNum: ".cf > p.icn + div"
      incomeBox: ".jsc-accordion p:contains('推定年収') + ul li"
    stanby.start(keyword)
    root.indeed = new Crawler("indeed", "http://jp.indeed.com/%E6%B1%82%E4%BA%BA")
    indeed.selectors =
      jobNum: "#searchCount"
      incomeBox: "#SALARY_rbo li"
    indeed.start(keyword)
    root.indeedEn = new Crawler("indeedEn", "http://www.indeed.com/jobs")
    indeedEn.rate = 120 * 0.0001
    indeedEn.selectors =
      jobNum: "#searchCount"
      incomeBox: "#SALARY_rbo li"
    indeedEn.start(keyword)
  #help
  robot.respond /-h$/i, (msg) ->
    msg.send """
      <検索キー>の求人
      <検索キー> Jobs
      　　→ indeed(日本版、海外版）とスタンバイの求人数/平均年収を出力する
    """
