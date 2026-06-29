---
title: オゴリロン
permalink: /
chartjs: true
---
日本における**割り勘**、**奢り奢られ**論に関するデータを分析します。昔は・・そんな都市伝説を解体！（作成中）{% comment %}<br>
<br>[ogoriron.github.io](https://ogoriron.github.io/) がトップページです。<br><br>{% endcomment %}

**おおまかな傾向**: 1947年の日本国憲法により、男女同権となった。昔は先輩や男だからお金を持っていた。しかし雇用機会均等法などにより男女格差や年功格差を縮めてきた。いまや能力に応じる分配に代わった。お金の一部は今は女や後輩に渡っている。

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

### 関連

- 就業率
  - 給与
- [出産費用](baby/)

{% include tag-cloud.html %}

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
