---
layout: post
title: マークダウンの勉強だよ
subtitle: ～Beautiful Jekyllってなんすか～
gh-repo: mikami1004i/blog
gh-badge: [star, fork, follow]
tags: [test]
comments: true
mathjax: true
js: /assets/js/copyCode.js
author: Rito
---


# 前書きなのだ
マークダウンがよくわからないので勉強もかねて書いておきます。このサイトはBeautiful Jekyllっていうのを使っていてちょっと特殊なマークダウン記法が使えるようになってる。

# 見出し
- 二つ目までは~~下線がつくよ~~ つかないよ

```
# 見出し
## 見出し２
###### 見出し６
```
結果↓

# 見出し
## 見出し２
###### 見出し６
<br>

# 斜体、太字、訂正線

```
*斜体*
**太字**
~~訂正線~~
```
結果↓

*斜体*<br>
**太字**<br>
~~訂正線~~<br>
<br>

# 箇条書き
```
- 1行目
- 2行目
  - ネスト1行目
    - ネストのネスト1行目
      - ネストのネストのネスト1行目
```
結果↓
- 1行目
- 2行目
	- ネスト1行目
		- ネストのネスト1行目
			- ネストのネストのネスト1行目
<br>

# 番号付きリスト
番号を変えなくても自動で順番にしてくれるよ
```
1. 肉
1. 野菜
	1. 緑黄色野菜
		1. レタス
		1. キャベツ
	1. 野菜っておいしいよね
1. 果物
```
結果↓
1. 肉
1. 野菜
	1. 緑黄色野菜
		1. レタス
		1. キャベツ
	1. 野菜っておいしいよね
1. 果物
<br>

# コード記述
三連バッククォートの後に言語名を描くと、その言語に合わせてシンタックスハイライトが適用されるよ
````
``` c
#include <stdio.h>

int main() {
	printf("Hello World!");
	return 0;
}
```
````
結果↓
``` c
{% include codeHeader.html %}
#include <stdio.h>

int main() {
	printf("Hello World!");
	return 0;
}
```
Jekyll(Liquid)のタグによって以下のような記述も可能

```{% raw %}
{% highlight c %}
#include <stdio.h>
int main() {
	printf("Let's Go!");
	return 0;
}
{% endhighlight %}
{% endraw %}
```
結果↓
{% highlight c %}
{% include codeHeader.html %}
#include <stdio.h>
int main() {
	printf("Let's Go!");
	return 0;
}
{% endhighlight %}

行番号付きにもできるよ
```
{% raw %}
{% highlight c linenos %}
#include <stdio.h>
int main() {
	printf("Let's Go!");
	return 0;
}
{% endhighlight %}
{% endraw %}
```
結果↓

{% highlight c linenos %}
#include <stdio.h>
int main() {
	printf("Let's Go!");
	return 0;
}
{% endhighlight %}

# 引用
```
> 参考：https://www.google.com/
```
結果↓
> 参考：https://www.google.com/

# リンク
[このリンク](http://endless.horse/)はほかのサイトのリンク、[このリンク](#local-link)はサイト内のリンク。（最後に飛ぶぞ）


# テーブル

| 左寄せ | 中央寄せ | 右寄せ |
| :--- | :---: | ---: |
| Dave | Six | Male |
| Ninez | Eleven | Female |
| Neiy | Five | Female |
| Kk | Three | Male |


# 数式
MathJaxっていうのが使えるらしい。<br>
You can use [MathJax](https://www.mathjax.org/) to write LaTeX expressions. For example:
When \\(a \ne 0\\), there are two solutions to \\(ax^2 + bx + c = 0\\) and they are $$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$

# 画像


![Crepe](https://beautifuljekyll.com/assets/img/crepe.jpg)<br>

It can also be centered!

![Crepe](https://beautifuljekyll.com/assets/img/crepe.jpg){: .mx-auto.d-block :}

### 画像についての注意
> When hosting a *project site* on GitHub Pages (for example, `https://USERNAME.github.io/MyProject`), URLs that begin with `/` and refer to local files may not work correctly due to how the root URL (`/`) is interpreted by GitHub Pages. You can read more about it [in the FAQ](https://beautifuljekyll.com/faq/#links-in-project-page). To demonstrate the issue, the following local image will be broken **if your site is a project site:**

![Crepe](/assets/img/crepe.jpg)

> If the above image is broken, then you'll need to follow the instructions [in the FAQ](https://beautifuljekyll.com/faq/#links-in-project-page). Here is proof that it can be fixed:

![Crepe]({{ '/assets/img/crepe.jpg' | relative_url }})

つまり、`![Creape](/assets/img/crepe.jpg)`では表示できないので、以下のどちらかの方法を用いる必要がある。

その１．　`![Creape](/blog/assets/img/crepe.jpg)`
![Creape](/blog/assets/img/crepe.jpg)


その２. 　`{% raw %}![Creape]({{ '/assets/img/crepe.jpg' | relative_url }}){% endraw %}`
![Creape]({{ '/assets/img/crepe.jpg' | relative_url }})



# ボックス
通知、警告、エラーボックスがおける

### 通知

{: .box-note}
**Note:** これが通知ボックス

### 警告

{: .box-warning}
**Warning:** これが警告ボックス

### エラー

{: .box-error}
**Error:** これがエラーボックス

## サイト内のリンクだよ {#local-link}

# 参考になるサイト

- [Jekyll公式サイト](https://jekyllrb-ja.github.io/docs/)
- [kramdown公式サイト](https://kramdown.gettalong.org/quickref.html)(このブログはkramdownで書いてるっぽい？)
- [これもわかりやすいサイト](https://mae0003.github.io/markdown/2015/06/21/kramdownRefference)