---
layout: post
title: サイゼリヤで1000円でおなかいっぱいになりたい
subtitle: ナップザック問題、動的計画法を用いて
mathjax: true
gh-repo: mikami1004/blog
gh-badge: [star, follow]
tags: [Programming]
---

# 前書き
ナップザック問題について調べていた時に面白い問題が出てきたので勉強がてら解いてみます。
今回使用したコードたちは[こちらのリポジトリ](https://github.com/mikami1004/saizeriya_menu)にありますので興味があったらのぞいてみてください。

# 問題
サイゼリヤのメニューを合計1000円以下になるように選んだときに、最大の総カロリーになるようなメニューの組み合わせを求めよ。<br>
先人たちはは重複なしで解いている人が多かったですが、今回は重複なしとありの２パターン求めてみようと思います。

# さあ、はじめるぞ
解く方針としては前書きにも述べたようにナップザック問題になるので、動的計画法で解いていこうと思います。ここで~~自分のために~~ナップザック問題、動的計画法についておさらいしておこうと思います。

### ナップザック問題とは
ナップザック問題とは以下のような問題です。<br>
> Nこの品物があり、各品物には**重さ**と**価値**が決まっている。これらの品物から**重さの総和がWを超えないように**選んだときの**価値の最大値**を求めよ。

解法としてまず思いつくのが全探索ですが、その計算量は$O(2^n)$となります。
[計算量の話](https://cppx.hatenablog.com/entry/2017/08/06/104144)や[【Python】AtcoderでTLEになる計算量の閾値を調べてみた 【PyPy】](https://rit-inc.hatenablog.com/entry/2021/12/13/180125)を見るとAtCoderでは$10^7$程度までの計算量には耐えうることがわかります。なので品物の数が少ない場合（23個以内）には全探索でもよいかと思いますが、それ以上になってしまうと計算が長くなってしまいます。<br>
まあ計算量が$O(2^n)$と指数関数的に増えてしまうので全探索は避けたほうが無難ですね。

そこで今回は動的計画法を使っていくことにします。

### 動的計画法とは
動的計画法とは、<br>
> 計算量が大きい問題を**小さな問題に部分化**し、それぞれの問題の計算結果を**表に記録**し、表から計算結果を参照しつつ問題を解く手法

です。言葉で言われてもよくわからないですよね。~~僕もよくわからない~~
皆さん「動的計画法とは」でググってくださいorz<br>
手を動かして理解したい方は[こちらの記事](https://qiita.com/drken/items/dc53c683d6de8aeacf5a)が参考になるかと思います。

(動的計画法について調べるとメモ化再帰についても出てくるけどこれらの違いがよくわかってないです...わかる方いたら教えてください m(_ _)m)

# いざ実践！
さて、今回の問題を解くためにまずサイゼリヤのメニューのデータが必要ですね。<br>
先人たちの努力を見てみると、メニュー表から手打ちしたり、既に存在するCSVファイルを用いたりしていますがメニュー改定により値段が変わっていたりします。最新のデータを使いたいですよね。<br>
そして手打ちはめんどくさい！楽したい！

そんな皆さんに朗報です。<br>
なんとですね、[こちらのサイト](https://allergy.saizeriya.co.jp/allergy)からスクレイピングをすることができます！うれしい！<br>
PythonでWebサイトのスクレイピングをする際、主に使われるのはBeautifulSoupやSeleniumだと思います。ですが今回の場合はもっと簡単にできるんですね。

このカロリーサイトはMaterial UIというもので構築されています。そして、内部的にAPIをたたいてデータを取得してサイトに表示しています。なのでその際に利用されているAPIエンドポイントを用いることで簡単にスクレイピングができるというわけです。<br>
気になる方は上記のリンクからアレルギー情報のサイトにアクセスし、開発者ツール->NetWorkのタブを開き、サイトの更新をしてみてください。<br>
view?lg=jaという名前のもののRequest URLにアクセスするとデータが取得できるのが確認できるかと思います。

以下がグランドメニューをスクレイピングするコードになります。データ形式はcsvでファイル名はsaizeriya_menu.csvとしています。
``` py
import requests
import pandas as pd

url = "https://allergy.saizeriya.co.jp/view?lg=ja"
resp = requests.get(url)
data = resp.json()["body"]

grand_menu = [item for item in data if item.get("category") == "グランド"]

# データ整形
df = pd.DataFrame(grand_menu)
df = df[["name", "includigTaxPrice", "calorie"]]
df.columns = ["商品名", "税込価格(円)", "カロリー(kcal)"]

# 保存
df.to_csv("saizeriya_menu.csv", index=False)
print(df.head())
```

保存されたcsvファイルを直接編集し、ドリンクバー以下のデータを消してしまいましょう（使用しないため）。

以下が重複なしパターンでの1000円で最大カロリーとなる組み合わせを算出するコードとなります。<br>
``` py
import pandas as pd

# CSV読み込み
df = pd.read_csv("saizeriya_menu.csv")

# データの成型
df = df.dropna(subset=["税込価格(円)", "カロリー(kcal)"]) # NaNを消去(念のため)
df["税込価格(円)"] = df["税込価格(円)"].astype(int)
df["カロリー(kcal)"] = df["カロリー(kcal)"].astype(int)

# ナップサック：制限1000円
budget = 1000
n = len(df)

# dp[i][w] : i番目までの商品から選んで合計w円以下で得られる最大カロリー
dp = [[0]*(budget+1) for _ in range(n+1)]

# DPテーブルを埋める
for i in range(n):
    cost = df.iloc[i]["税込価格(円)"]
    cal = df.iloc[i]["カロリー(kcal)"]
    for w in range(budget+1):
        if w >= cost:
            dp[i+1][w] = max(dp[i][w], dp[i][w-cost] + cal)
        else:
            dp[i+1][w] = dp[i][w]

# 最適解の復元
w = budget
chosen_items = []
for i in range(n, 0, -1):
    if dp[i][w] != dp[i-1][w]:
        item = df.iloc[i-1]
        chosen_items.append(item)
        w -= item["税込価格(円)"]

# 結果表示
total_price = sum(item["税込価格(円)"] for item in chosen_items)
total_cal = sum(item["カロリー(kcal)"] for item in chosen_items)

print("=== 1000円以内で最大カロリーを得られる組み合わせ（重複なし） ===")
for item in reversed(chosen_items):
    print(f"- {item['商品名']} | {item['税込価格(円)']}円 | {item['カロリー(kcal)']}kcal")
print(f"\n▶ 合計: {total_price}円, {total_cal}kcal")
```
プログラミングつよつよの皆さんならぱっと見でわかると思うんですけど、個人的に混乱するかなと思ったのが「最適解の復元」のところですかね。<br>
DPテーブルの右下からさかのぼって、dp配列の要素の値が変化した部分のitemを探してchosen_itemsに保存してます。そして選んだ商品が逆順になってしまうのでreversedで元の順序に直してます。

次に重複ありパターンでのコードです。<br>
``` py
import pandas as pd

# CSV読み込み
df = pd.read_csv("saizeriya_menu.csv")

# データの成型
df = df.dropna(subset=["税込価格(円)", "カロリー(kcal)"])
df["税込価格(円)"] = df["税込価格(円)"].astype(int)
df["カロリー(kcal)"] = df["カロリー(kcal)"].astype(int)

budget = 1000
n = len(df)

# dp[w]: 価格w円以下で得られる最大カロリー
dp = [0] * (budget + 1)

# 最適解の復元用の配列（どの商品を最後に選んだかのインデックス）
choice = [-1] * (budget + 1)

for w in range(budget + 1):
    for i in range(n):
        cost = df.iloc[i]["税込価格(円)"]
        cal = df.iloc[i]["カロリー(kcal)"]
        if cost <= w:
            val = dp[w - cost] + cal
            if val > dp[w]:
                dp[w] = val
                choice[w] = i

# 最適な組み合わせの復元
w = budget
chosen_items = []
while w > 0 and choice[w] != -1:
    i = choice[w]
    item = df.iloc[i]
    chosen_items.append(item)
    w -= item["税込価格(円)"]

# 集計と表示
total_price = sum(item["税込価格(円)"] for item in chosen_items)
total_cal = sum(item["カロリー(kcal)"] for item in chosen_items)

print("=== 1000円以内で最大カロリーを得る組み合わせ（重複あり） ===")
for item in chosen_items:
    print(f"- {item['商品名']} | {item['税込価格(円)']}円 | {item['カロリー(kcal)']}kcal")
print(f"\n▶ 合計: {total_price}円, {total_cal}kcal")
```
DPテーブルの部分を見比べてみるとわかると思うんですけど、重複ありのほうは１次元配列でいいんですね。理由は、何度も同じ商品を選んでもいいため、商品ごとの管理が不要だからです。~~説明が下手でごめんなさい~~

# 一番コスパの良い組み合わせはこれだ

重複なしの場合、実行結果は以下のようになります。

=== 1000円以内で最大カロリーを得られる組み合わせ（重複なし） ===
- ライス | 150円 | 303kcal
- ターメリックライス | 200円 | 424kcal
- ペペロンチーノ | 300円 | 582kcal
- 焼チーズ ミラノ風ドリア | 350円 | 666kcal

▶ 合計: 1000円, 1975kcal

ライス、ライス、パスタ、ドリア<br>
怒涛の炭水化物

続いて重複ありの場合です。

=== 1000円以内で最大カロリーを得る組み合わせ（重複あり） ===
- ターメリックライス | 200円 | 424kcal
- ターメリックライス | 200円 | 424kcal
- ターメリックライス | 200円 | 424kcal
- ターメリックライス | 200円 | 424kcal
- ターメリックライス | 200円 | 424kcal

▶ 合計: 1000円, 2120kcal

まさかのターメリックライス×４

# あとがき
今まで文章で誰かに説明するようなことがなかったので他の人が理解できる文章が書けた自信がないです。マークダウン記法もよくわかってないのでこれから精進していこうと思います。<br>
最後まで読んでいただき、ありがとうございました。