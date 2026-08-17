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
日本における**割り勘**、**奢り奢られ**論に関するデータを分析します。昔は・・そんな都市伝説を解体！（作成中）

**おおまかな傾向**: 1947年の日本国憲法により、男女同権となった。昔は先輩や男だからお金を持っていた。しかし雇用機会均等法などにより男女格差や年功格差を縮めてきた。いまや能力に応じての収入。お金の一部は女や後輩にも渡っている。

2008年『婚活時代』が出版され、91年間続いた「主婦の友」は廃刊した。若年層は、共働き8割時代に変わっていく。『婚活時代』の山田昌弘は、2002年には言っています。昔の価値観のように男に経済的に頼るとか、高学歴女が格上の男を求めると、そういう条件を満たす男は少ないので結婚しにくい。

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
