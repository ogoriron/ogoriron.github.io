---
title: オゴリロン
permalink: /
chartjs: true
description: "日本における割り勘、奢り奢られ論に関するデータを分析します。「昔は・・」そんな都市伝説を解体！"
---
{% comment %}
> [!NOTE]
> [https://ogoriron.github.io](https://ogoriron.github.io/) がトップページです。

{% endcomment %}
日本における**割り勘**、**奢り奢られ**論に関するデータを分析します。昔は・・そんな都市伝説を解体！

奢り文化が変わったのは戦後。1947年の日本国憲法からの男女同権や平等意識で。ジェンダー平等や同一賃金法で、先輩後輩や男女の差はどんどん縮まった。

2008年『婚活時代』が出版され、91年間続いた『主婦の友』は廃刊した。若年層は、共働き8割時代に変わっていく。『婚活時代』の山田昌弘は、2002年には言っています。

- 昔の価値観のように男に経済的に頼るとか、高学歴女が格上の男を求めると、そういう条件を満たす男は少ないので結婚しにくい。

2003年の酒井順子『負け犬の遠吠え』で要因を分析している。
- 社会進出した女性から見ると、自分より上の男は足りない。結婚せずとも自立して生活できる。生活レベルが下がる結婚へと飛び込まない。

酒井は、親兄弟が死に2019年に『家族終了』を出版した。これが行き着く先か。

※用語の制限: 「奢り」は100%を支払う。「割り勘」は50%ずつ支払う。その間をどう呼ぶかは個々の価値観になる。

<div class="tag-page-wrapper">
  <ul class="post-list">

        <li>
{% assign p = site.posts | where_exp: "item", "item.path contains '1959-01-01'" | first %}
<div>{{ p.content }}</div>
        </li>

        <li>
{% assign p = site.posts | where_exp: "item", "item.path contains '2021-01-01'" | first %}
<div>{{ p.excerpt }}</div>
        </li>

  </ul>
</div>

<!--誘った方-->

### 関連項目

- 就業率
  - 給与
- [出産費用](baby/)

{% include x-tag-cloud.html %}

[記事一覧](list)


{% comment %}<br>
## ライセンス

このリポジトリは複数のライセンスを含みます。

- _includes/ と _layouts/ は MITライセンスです。
- assets/mains.css も MITライセンスです。
- その他のファイル（_posts/など）は著作者が著作権を保持します。

## License

This repository contains mixed licensing.

- _includes/ and _layouts/ are licensed under the MIT License.
- assets/mains.css is also licensed under the MIT License.
- All other files (including _posts/) are © 2026 ogoriron. All rights reserved.

{% endcomment %}
