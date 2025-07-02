---
layout: post
title: マークダウンの勉強だよ
subtitle: ～Beautiful Jekyllってなんすか～
gh-repo: daattali/beautiful-jekyll
gh-badge: [star, fork, follow]
tags: [test]
comments: true
mathjax: true
author: Bill Smith
---

{: .box-success}
This is a demo post to show you how to write blog posts with markdown.  I strongly encourage you to [take 5 minutes to learn how to write in markdown](https://markdowntutorial.com/) - it'll teach you how to transform regular text into bold/italics/tables/etc.<br/>I also encourage you to look at the [code that created this post](https://raw.githubusercontent.com/daattali/beautiful-jekyll/master/_posts/2020-02-28-sample-markdown.md) to learn some more advanced tips about using markdown in Beautiful Jekyll.
# 見出し
- 二つ目までは下線がつくよ

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
これ表示されるんかな<br>
![Creape](/assets/img/crepe.jpg)

It can also be centered!

![Crepe](https://beautifuljekyll.com/assets/img/crepe.jpg){: .mx-auto.d-block :}

### 画像についての注意
> When hosting a *project site* on GitHub Pages (for example, `https://USERNAME.github.io/MyProject`), URLs that begin with `/` and refer to local files may not work correctly due to how the root URL (`/`) is interpreted by GitHub Pages. You can read more about it [in the FAQ](https://beautifuljekyll.com/faq/#links-in-project-page). To demonstrate the issue, the following local image will be broken **if your site is a project site:**

![Crepe](/assets/img/crepe.jpg)

If the above image is broken, then you'll need to follow the instructions [in the FAQ](https://beautifuljekyll.com/faq/#links-in-project-page). Here is proof that it can be fixed:

![Crepe]({{ '/assets/img/crepe.jpg' | relative_url }})

つまり、{% raw %}![Creape](/assets/img/crepe.jpg){% endraw %}では表示できないので、以下のどちらかの方法を用いる必要がある。

その１．　{% raw %}![Creape](/blog/assets/img/crepe.jpg){% endraw %}
![Creape](/blog/assets/img/crepe.jpg)

<br>
その２．　`![Creape]({{ '/assets/img/crepe.jpg' | relative_url }})`
![Creape]({{ '/assets/img/crepe.jpg' | relative_url }})

<br>


## Boxes
You can add notification, warning and error boxes like this:

### Notification

{: .box-note}
**Note:** This is a notification box.

### Warning

{: .box-warning}
**Warning:** This is a warning box.

### Error

{: .box-error}
**Error:** This is an error box.

## Local URLs in project sites {#local-urls}

## サイト内のリンクだよ{#local-link}